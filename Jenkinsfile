pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Inga unga sariyaana repository URL matrum credential ID irukku
                git branch: 'main', 
                    credentialsId: 'github-pat', 
                    url: 'https://github.com/mnigetha-a11y/farm-management-devops.git'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    echo "Running SonarQube Analysis..."
                    // SonarQube credentials-ah use panna intha block thevai
                    withCredentials([string(credentialsId: 'sonar-token', variable: 'SONAR_TOKEN')]) {
                        // Inga unga sonar-scanner command-ah poodunga
                    }
                }
            }
        }

        stage('Build and Deploy') {
            steps {
                script {
                    echo "Building and Pushing Docker Image..."
                    // Docker credentials-ah use panna intha block thevai
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                        // Inga unga docker build & push commands-ah poodunga
                    }
                }
            }
        }
    }
}
