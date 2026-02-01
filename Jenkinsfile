pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Test') {
            steps {
                bat 'cd backend && npm install && npm test'
            }
        }

        stage('Code Analysis') {
            steps {
                script {
                    // Jenkins Tools-la kudutha 'sonar-scanner' name-ah check pannikonga
                    def scannerHome = tool 'sonar-scanner'
                    
                    // Jenkins System-la kudutha 'sonar-server' name-ah check pannikonga
                    withSonarQubeEnv('sonar-server') {
                        bat "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=farm-mgmt -Dsonar.sources=."
                    }
                }
            }
        }

        stage('Build and Deploy') {
            steps {
                bat 'docker-compose up -d --build'
            }
        }

        stage('Cleanup') {
            steps {
                bat 'docker image prune -f'
            }
        }
    }
}