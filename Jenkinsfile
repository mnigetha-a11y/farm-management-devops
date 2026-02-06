pipeline {
    agent any

    stages {

        // -------------------------------
        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/mnigetha-a11y/farm-management-devops.git', branch: 'main'
            }
        }

        // -------------------------------
        stage('SonarQube Analysis') {
            steps {
                echo 'Skipping SonarQube analysis (optional)'
                // If later you want SonarQube, uncomment below
                // withSonarQubeEnv('MySonarQubeServer') {
                //     sh 'npm install && npm run lint'
                // }
            }
        }

        // -------------------------------
        stage('Set Minikube Docker Environment') {
            steps {
                // Activate Minikube Docker environment
                sh 'eval $(minikube docker-env)'
                echo 'Minikube Docker environment set'
            }
        }

        // -------------------------------
        stage('Build Docker Images') {
            steps {
                sh 'docker build -t farm-backend ./backend'
                sh 'docker build -t farm-frontend ./frontend'
                echo 'Docker images built successfully'
            }
        }

        // -------------------------------
        stage('Deploy to Kubernetes (Minikube)') {
            steps {
                sh 'kubectl apply -f backend-deployment.yml'
                sh 'kubectl apply -f backend-service.yml'
                sh 'kubectl apply -f frontend-deployment.yml'
                sh 'kubectl apply -f frontend-service.yml'
                echo 'Kubernetes deployments and services applied'
            }
        }

        // -------------------------------
        stage('Prometheus & Grafana Setup') {
            steps {
                sh 'helm repo add prometheus-community https://prometheus-community.github.io/helm-charts'
                sh 'helm repo add grafana https://grafana.github.io/helm-charts'
                sh 'helm repo update'

                sh 'helm install prometheus prometheus-community/prometheus'
                sh 'helm install grafana grafana/grafana'
                echo 'Prometheus & Grafana deployed successfully'
            }
        }
    }

    post {
        success {
            echo '🎉 Pipeline completed successfully! Build SUCCESS'
        }
        failure {
            echo '❌ Pipeline failed! Check the logs'
        }
    }
}
