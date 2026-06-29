pipeline {
    agent any

    tools {
        nodejs "NODE24"
    }
    environment {
        // Credenciales para variables de build (Astro las consume en npm run build).
        // El deploy lo hace CF Pages automáticamente via git integration —
        // este pipeline solo verifica que el build pasa antes de que CF Pages
        // lo recoja, y corre el link checker.
        PUBLIC_CLERK_PUBLISHABLE_KEY = credentials('PUBLIC_CLERK_PUBLISHABLE_KEY')
        CLERK_SECRET_KEY = credentials('CLERK_SECRET_KEY')
        PUBLIC_RECAPTCHA_SITE_KEY = credentials('PUBLIC_RECAPTCHA_SITE_KEY')
        INDEXNOW_KEY = credentials('INDEXNOW_KEY')
        SITE = "https://www.drenpos.com"
    }


    stages {
        stage('Checkout') {
            steps {
                slackSend(color: "#ffc800", message: "🫣 Empezamos con front")
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: "*/${env.BRANCH_NAME}"]],
                    extensions: [
                        [$class: 'CleanCheckout'],
                        [$class: 'LocalBranch', localBranch: "${env.BRANCH_NAME}"]
                    ],
                    userRemoteConfigs: [[
                        credentialsId: 'GITHUB-SSH',
                        url: 'git@github.com:Drenpos/landing-drp.git'
                    ]]
                ])
                sh 'git branch'
            }
        }

        stage('Link Check (lychee)') {
            steps {
                script {
                    echo "🔗 Checking external links with lychee..."
                    // Non-blocking: lychee exits non-zero on broken links;
                    // surface as warning, don't fail the build.
                    sh '''
                        docker run --rm -v "$PWD:/input" lycheeverse/lychee:latest \\
                            --no-progress \\
                            --max-concurrency 8 \\
                            --timeout 20 \\
                            --accept 200,206,429 \\
                            "/input/src/content/**/*.md" \\
                            "/input/src/content/**/*.mdx" \\
                        || echo "⚠️  Lychee found broken links — see log above"
                    '''
                }
            }
        }

        stage('Build verify') {
            steps {
                script {
                    echo "🏗️ Verifying build (CF Pages will build + deploy independently)..."
                    sh 'npm i --force'

                    echo "SITE configurado: ${SITE}"
                    echo "PUBLIC_RECAPTCHA_SITE_KEY configurado: ${PUBLIC_RECAPTCHA_SITE_KEY ? 'SÍ' : 'NO'}"
                    echo "PUBLIC_CLERK_PUBLISHABLE_KEY configurado: ${PUBLIC_CLERK_PUBLISHABLE_KEY ? 'SÍ' : 'NO'}"
                    echo "INDEXNOW_KEY configurado: ${INDEXNOW_KEY ? 'SÍ' : 'NO'}"

                    slackSend(color: "#ffc800", message: "🏗️ Build verify...")

                    withEnv([
                        "PUBLIC_CLERK_PUBLISHABLE_KEY=${PUBLIC_CLERK_PUBLISHABLE_KEY}",
                        "CLERK_SECRET_KEY=${CLERK_SECRET_KEY}",
                        "PUBLIC_RECAPTCHA_SITE_KEY=${PUBLIC_RECAPTCHA_SITE_KEY}",
                        "INDEXNOW_KEY=${INDEXNOW_KEY}",
                        "SITE=${SITE}",
                        "BRANCH_NAME=${env.BRANCH_NAME}"
                    ]) {
                        sh 'npm run build'
                    }

                    echo "✅ Build verified — CF Pages will publish from git push"
                    slackSend(color: "#2fff00", message: "✅ Build verified — CF Pages publica solo")
                }
            }
        }
    }

    post {
        success {
            slackSend(color: "#2fff00", message: "😎 Todo bien en front")
        }
        failure {
            slackSend(color: "#ff0000", message: "😱 No veas la que se ha liado")
        }
    }
}
