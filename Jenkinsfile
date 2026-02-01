pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // GitHub-il ninnu puthiya code edukunnu
                checkout scm
            }
        }

        stage('Build and Deploy') {
            steps {
                // Pazhaya container-ne remove cheythu puthuthayi build cheyunnu
                bat 'docker-compose down || true'
                bat 'docker-compose up -d --build --force-recreate'
            }
        }

        stage('Cleanup') {
            steps {
                // Use cheyyatha pazhaya docker images remove cheyunnu (Storage save cheyyan)
                bat 'docker image prune -f'
            }
        }
    }
}