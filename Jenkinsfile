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
                // Windows Jenkins-ku 'bat' use pannanum
                bat 'docker build -t farm-app-alpine .'
            }
        }
    }
}
