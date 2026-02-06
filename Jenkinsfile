pipeline {
    agent any

    environment {
        SCANNER_HOME = tool 'SonarScanner'
        APP_NAME = "farm-management-app"
        // 1. Force Jenkins to look at your specific user folder
        MINIKUBE_HOME = 'C:\\Users\\acer'
        KUBECONFIG = 'C:\\Users\\acer\\.kube\\config'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    withSonarQubeEnv('sonar-server') {
                        bat """
                        "${SCANNER_HOME}\\bin\\sonar-scanner.bat" ^
                        -Dsonar.projectKey=farm-management-devops ^
                        -Dsonar.sources=. ^
                        -Dsonar.host.url=http://localhost:9000
                        """
                    }
                }
            }
        }

        stage('Docker Build (Minikube)') {
            steps {
                echo "Building Docker Image..."
                // 2. Added '-p minikube' to specify the profile
                bat "minikube image build -p minikube -t ${APP_NAME}:latest ."
            }
        }

        stage('Kubernetes Deployment') {
            steps {
                echo "Deploying to Minikube..."
                bat "kubectl apply -f k8s/"
            }
        }

        stage('Prometheus & Grafana') {
            steps {
                bat "kubectl apply -f monitoring/"
            }
        }
    }

    post {
        failure {
            echo "Build failed. Check if minikube is running in CMD."
        }
    }
}
