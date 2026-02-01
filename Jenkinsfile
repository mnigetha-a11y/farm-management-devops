pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', 
                    credentialsId: 'github-pat', 
                    url: 'https://github.com/mnigetha-a11y/farm-management-devops.git'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    echo "Running SonarQube Analysis..."
                    withCredentials([string(credentialsId: 'sonar-token', variable: 'SONAR_TOKEN')]) {
                        // Sonar analysis commands inga varum
                    }
                }
            }
        }

        stage('Build and Deploy') {
            steps {
                script {
                    echo "Building and Pushing Docker Image..."
                    // Docker credentials use pannudhu
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                        
                        // 1. Docker Hub Login
                        bat "docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}"
                        
                        // 2. Build Image with Build Number
                        bat "docker build -t nigethadocker/farm-management-app:${env.BUILD_NUMBER} ."
                        
                        // 3. Tag as Latest
                        bat "docker tag nigethadocker/farm-management-app:${env.BUILD_NUMBER} nigethadocker/farm-management-app:latest"
                        
                        // 4. Push to Docker Hub
                        bat "docker push nigethadocker/farm-management-app:${env.BUILD_NUMBER}"
                        bat "docker push nigethadocker/farm-management-app:latest"
                    }
                }
            }
        }
    }
}
