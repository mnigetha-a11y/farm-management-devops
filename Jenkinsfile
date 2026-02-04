pipeline {
    agent any

    environment {
        SONAR_TOKEN = credentials('sonar-token-1')
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Test') {
            steps {
                bat '''
                cd backend
                npm install
                npm test
                '''
            }
        }

        stage('Code Analysis') {
            steps {
                script {
                    def scannerHome = tool 'sonar-scanner'
                    withSonarQubeEnv('sonar-server') {
                        bat """
                        ${scannerHome}\\bin\\sonar-scanner ^
                        -Dsonar.projectKey=farm-mgmt ^
                        -Dsonar.sources=. ^
                        -Dsonar.login=%SONAR_TOKEN%
                        """
                    }
                }
            }
        }

        stage('Build and Deploy') {
            steps {
                echo "Build & Deploy stage running"
            }
        }
    }
}
