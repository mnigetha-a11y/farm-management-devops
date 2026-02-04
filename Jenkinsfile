pipeline {
    agent any

    environment {
        SONAR_TOKEN = credentials('sonar-token-1')
    }

    tools {
        sonarQubeScanner 'sonar-scanner'
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
                withSonarQubeEnv('sonar-server') {
                    bat '''
                    sonar-scanner ^
                    -Dsonar.projectKey=farm-mgmt ^
                    -Dsonar.sources=. ^
                    -Dsonar.login=%SONAR_TOKEN%
                    '''
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
