pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // GitHub-la irunthu code-ah edukum
                checkout scm
            }
        }

        stage('Build and Deploy') {
            steps {
                // Docker Compose moolama rendu container-aiyum onna build panni run pannum
                // 'down' - pazhaya container-ah remove pannum
                // 'up -d --build' - puthusa build panni background-la run pannum
                bat 'docker-compose down || true'
                bat 'docker-compose up -d --build'
            }
        }
    }
}
