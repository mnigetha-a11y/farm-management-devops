pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                git 'https://github.com/mnigetha-a11y/farm-management-devops.git'
            }
        }

        stage('Set Minikube Docker Environment') {
            steps {
                // On Windows, use bat instead of sh
                bat 'minikube start'
                bat 'minikube docker-env'
            }
        }

        stage('Build Docker Images') {
            steps {
                bat 'docker build -t farm-backend ./backend'
                bat 'docker build -t farm-frontend ./frontend'
            }
        }

        stage('Deploy to Kubernetes (Minikube)') {
            steps {
                bat 'kubectl apply -f backend-deployment.yaml'
                bat 'kubectl apply -f backend-service.yaml'
                bat 'kubectl apply -f deployment.yaml'
                bat 'kubectl apply -f service.yaml'
            }
        }

        stage('Prometheus & Grafana Setup') {
            steps {
                bat 'kubectl apply -f prometheus.yml'
            }
        }
    }
}
