
pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build') {
            steps {
                // Docker image build pannum
                bat 'docker build -t farm-app-alpine .'
            }
        }
        stage('Deploy') { 
            steps {
                // Build aana image-ah run panni app-ah start pannum
                bat 'docker run -d --name farm-container farm-app-alpine' 
            }
        }
    }
}
