pipeline {
    agent any

    environment {
        // Unge Docker Hub username-ah maathikonga
        DOCKER_IMAGE = "nigethadocker/farm-management-app:${env.BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                // Inga thaan neenga create panna credential ID use aagudhu
                git branch: 'main', 
                    credentialsId: 'github-pat', 
                    url: 'https://github.com/mnigetha-a11y/farm-mgmt.git'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    // SonarQube credentials-ah use pannudhu
                    withCredentials([string(credentialsId: 'sonar-token', variable: 'SONAR_TOKEN')]) {
                        echo "Running SonarQube Analysis..."
                        // Inga unga sonar-scanner command-ah poodunga
                    }
                }
            }
        }

        stage('Build and Deploy') {
            steps {
                script {
                    // Docker credentials-ah use pannudhu
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                        echo "Building and Pushing Docker Image..."
                        // Inga unga docker build & push commands-ah poodunga
                    }
                }
            }
        }
    }
}
