pipeline {
    agent any

    stages {

        // Stage 1: Checkout code
        stage('Checkout') {
            steps {
                git url: 'https://github.com/your-repo.git', branch: 'main'
            }
        }

        // Stage 2: SonarQube Analysis (optional)
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('MySonarQubeServer') {
                    // Node.js project example:
                    sh 'npm install'
                    sh 'npm run lint'
                }
            }
        }

        // Stage 3: Set Minikube Docker environment
        stage('Set Minikube Docker Env') {
            steps {
                // Linux/Mac
                sh 'eval $(minikube docker-env)'
                // Windows PowerShell: minikube docker-env --shell powershell
            }
        }

        // Stage 4: Build Docker images
        stage('Build Docker Images') {
            steps {
                sh 'docker build -t farm-backend ./backend'
                sh 'docker build -t farm-frontend ./frontend'
            }
        }

        // Stage 5: Deploy Backend & Frontend to Minikube
        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f backend-deployment.yml'
                sh 'kubectl apply -f backend-service.yml'
                sh 'kubectl apply -f frontend-deployment.yml'
                sh 'kubectl apply -f frontend-service.yml'
            }
        }

        // Stage 6: Deploy Prometheus & Grafana using Helm
        stage('Prometheus & Grafana Setup') {
            steps {
                sh 'helm repo add prometheus-community https://prometheus-community.github.io/helm-charts'
                sh 'helm repo add grafana https://grafana.github.io/helm-charts'
                sh 'helm repo update'

                sh 'helm install prometheus prometheus-community/prometheus'
                sh 'helm install grafana grafana/grafana'
            }
        }

    }

    post {
        success {
            echo 'Pipeline completed successfully! 🚀'
        }
        failure {
            echo 'Pipeline failed! ❌'
        }
    }
}
