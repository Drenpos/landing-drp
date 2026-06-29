pipeline {
    agent any

    tools {
        nodejs "NODE24"
    }
       environment {
        // Mapeamos credenciales de Jenkins a env vars
        PUBLIC_CLERK_PUBLISHABLE_KEY = credentials('PUBLIC_CLERK_PUBLISHABLE_KEY')
        CLERK_SECRET_KEY = credentials('CLERK_SECRET_KEY')
        PUBLIC_RECAPTCHA_SITE_KEY = credentials('PUBLIC_RECAPTCHA_SITE_KEY')
        INDEXNOW_KEY = credentials('INDEXNOW_KEY')
        SITE="https://www.drenpos.com"
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

        stage('Build app') {
            steps {
                script {
                    echo "🏗️ Building for production..."
                    sh 'npm i --force'

                    // Verificar que las variables existen (sin mostrar valores sensibles)
                    echo "Verificando variables de entorno..."
                    echo "SITE configurado: ${SITE}"
                    echo "PUBLIC_RECAPTCHA_SITE_KEY configurado: ${PUBLIC_RECAPTCHA_SITE_KEY ? 'SÍ' : 'NO'}"
                    echo "PUBLIC_CLERK_PUBLISHABLE_KEY configurado: ${PUBLIC_CLERK_PUBLISHABLE_KEY ? 'SÍ' : 'NO'}"
                    echo "INDEXNOW_KEY configurado: ${INDEXNOW_KEY ? 'SÍ' : 'NO'}"

                    // Build shell
                     slackSend(color: "#ffc800", message: "🏗️ Building for production...")

                    // Pasar las variables de entorno al build de Astro
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

                    echo "✅ All microfrontends built successfully"
                     slackSend(color: "#2fff00", message: "✅ All microfrontends built successfully")
                }
            }
        }



    //   stage('Deploy to Cloudflare Pages') {
    //oootra
    //         steps {
    //             script {
    //                 echo "🚀 Deploying to Cloudflare Pages..."


    //                 // Install Wrangler if not already installed
    //                 sh 'npm install -g wrangler || true'

    //                 // Authenticate with Cloudflare using environment variables
    //                 sh 'wrangler whoami || echo "Setting up authentication..."'

    //                 // Deploy contract
    //                 sh '''
    //                     cd dist
    //                     wrangler pages deploy . --project-name=landing-drp --branch=$BRANCH_NAME
    //                 '''


    //                 echo "✅ Contract deployed to Cloudflare Pages successfully"
    //                     slackSend(color: "#2fff00", message: "✅ Contract deployed to Cloudflare Pages successfully")
    //             }
    //         }
    //     }



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
