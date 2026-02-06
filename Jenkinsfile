pipeline {
    agent any

    environment {
        // Change 'acer' to your actual Windows username if it is different
        MINIKUBE_HOME = 'C:\\Users\\acer'
        KUBECONFIG = 'C:\\Users\\acer\\.kube\\config'
        SCANNER_HOME = tool 'SonarScanner'
        APP_NAME = "farm-management-app"
    }

    stages {
        stage('Checkout') {
            steps {
                // Downloads your code from GitHub
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
                echo "Building Docker Image inside Minikube..."
                // Build the image directly inside Minikube's Docker node
                bat "minikube image build -p minikube -t ${APP_NAME}:latest ."
            }
        }

        stage('Kubernetes Deployment') {
            steps {
                echo "Deploying to Kubernetes using files in k8s folder..."
                // This command runs ALL .yaml files inside your k8s folder
                bat "kubectl apply -f k8s/"
            }
        }

        stage('Prometheus & Grafana Setup') {
            steps {
                echo "Setting up Monitoring..."
                // This command runs ALL .yaml files inside your monitoring folder
                bat "kubectl apply -f monitoring/"
            }
        }
    }

    post {
        success {
            echo "Pipeline completed successfully!"
        }
        failure {
            echo "Pipeline failed. Please check the logs above."
        }
    }
}
