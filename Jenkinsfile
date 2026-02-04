pipeline {
    agent any

    stages {
        stage('Checkout Source') {
            steps {
                git branch: 'main', 
                    credentialsId: 'github-pat', 
                    url: 'https://github.com/mnigetha-a11y/farm-management-devops.git'
            }
        }

        stage('Build & Push to DockerHub') {
            steps {
                script {
                    echo "Building Docker Image..."
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                        
                        // Docker Hub Login
                        bat "docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}"
                        
                        // Build and Tag
                        bat "docker build -t nigethadocker/farm-management-app:latest ."
                        
                        // Push to Docker Hub
                        bat "docker push nigethadocker/farm-management-app:latest"
                    }
                }
            }
        }

        stage('Kubernetes Deployment') {
            steps {
                script {
                    echo "Deploying to Minikube..."
                    // Kubernetes-la app-ah refresh pannum
                    bat "kubectl rollout restart deployment farm-app-deployment"
                }
            }
        }
    }
}
