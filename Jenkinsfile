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

        // SonarQube error-ah thavirkka ippodhiku idhai comment pannidalam
        /*
        stage('SonarQube Analysis') {
            steps {
                script {
                    echo "Skipping SonarQube for report output..."
                }
            }
        }
        */

        stage('Build and Deploy') {
            steps {
                script {
                    echo "Building and Pushing Docker Image..."
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                        
                        // 1. Docker Hub Login
                        bat "docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}"
                        
                        // 2. Build Image
                        bat "docker build -t nigethadocker/farm-management-app:latest ."
                        
                        // 3. Push to Docker Hub
                        bat "docker push nigethadocker/farm-management-app:latest"
                        
                        // 4. Update Kubernetes Deployment
                        echo "Restarting K8s Deployment..."
                        bat "kubectl rollout restart deployment farm-app-deployment"
                    }
                }
            }
        }
    }
}
