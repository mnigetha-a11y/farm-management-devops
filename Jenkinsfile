pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                // GitHub-la irunthu latest code-ah edukkum
                checkout scm
            }
        }
        stage('Build') {
            steps {
                // Nginx Alpine image-ah build pannum
                bat 'docker build -t farm-app-alpine .'
            }
        }
        stage('Deploy') {
            steps {
                // 1. Pazhaya container iruntha atha stop panni remove pannidum (Error varaama irukka)
                bat 'docker rm -f farm-app-container || true'
                
                // 2. Puthu container-ah Port 8085-la run pannum
                // -d na background-la run aagum, -p na browser-la paaka mudiyum
                bat 'docker run -d -p 8085:80 --name farm-app-container farm-app-alpine'
            }
        }
    }
}
