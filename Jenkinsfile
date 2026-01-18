pipeline {
    agent any

    tools {
        nodejs "NODE24"
    }
       environment {
        // Mapeamos credenciales de Jenkins a env vars
        CLOUDFLARE_API_TOKEN = credentials('CLOUDFALRE_DRP_TOKEN')
        CLOUDFLARE_ACCOUNT_ID = credentials('CLOUDFALRE_DRP_USER')
        PUBLIC_CLERK_PUBLISHABLE_KEY = credentials('PUBLIC_CLERK_PUBLISHABLE_KEY')
        CLERK_SECRET_KEY = credentials('CLERK_SECRET_KEY')
        PUBLIC_RECAPTCHA_SITE_KEY = credentials('PUBLIC_RECAPTCHA_SITE_KEY')
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
                        url: 'git@github.com:Drenpos/landing.git'
                    ]]
                ])
                sh 'git branch'
            }
        }
        stage('Build app') {
            steps {
                script {
                    echo "🏗️ Building for production..."
                    sh 'npm i --force'
                    // Build shell
                     slackSend(color: "#ffc800", message: "🏗️ Building for production...")
                    sh 'npm run build'
                    
                    echo "✅ All microfrontends built successfully"
                     slackSend(color: "#2fff00", message: "✅ All microfrontends built successfully")
                }
            }
        }



      stage('Deploy to Cloudflare Pages') {
            steps {
                script {
                    echo "🚀 Deploying to Cloudflare Pages..."

                    
                    // Install Wrangler if not already installed
                    sh 'npm install -g wrangler || true'
                    
                    // Authenticate with Cloudflare using environment variables
                    sh 'wrangler whoami || echo "Setting up authentication..."'
                    
                    // Deploy contract 
                    sh '''
                        cd dist
                        wrangler pages deploy . --project-name=landing --branch=$BRANCH_NAME
                    '''
                    
                    
                    echo "✅ Contract deployed to Cloudflare Pages successfully"
                        slackSend(color: "#2fff00", message: "✅ Contract deployed to Cloudflare Pages successfully")
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
