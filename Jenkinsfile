pipeline {
    agent any

    environment {
        // Change these names based on your Jenkins Global Tool Configuration
        SCANNER_HOME = tool 'SonarScanner'
        APP_NAME = "farm-management-app"
    }

    stages {
        stage('1. Checkout Code') {
            steps {
                // Pulls the code from your 'main' branch
                checkout scm
            }
        }

        stage('2. SonarQube Quality Check') {
            steps {
                script {
                    // 'sonar-server' is the name configured in Jenkins -> System
                    withSonarQubeEnv('sonar-server') {
                        bat "${SCANNER_HOME}/bin/sonar-scanner.bat " +
                            "-Dsonar.projectKey=farm-management-devops " +
                            "-Dsonar.sources=. " +
                            "-Dsonar.host.url=http://localhost:9000"
                    }
                }
            }
        }

        stage('3. Build Docker Image (Minikube)') {
            steps {
                script {
                    echo "Building Docker image inside Minikube..."
                    // Directly builds the image inside Minikube's internal Docker registry
                    bat "minikube image build -t ${APP_NAME}:latest ."
                }
            }
        }

        stage('4. Deploy to Kubernetes (Minikube)') {
            steps {
                echo "Deploying the Application..."
                // Ensure you have a 'k8s' folder with deployment.yaml and service.yaml
                bat "kubectl apply -f k8s/"
            }
        }

        stage('5. Setup Prometheus & Grafana') {
            steps {
                echo "Setting up Monitoring Tools..."
                // Ensure you have a 'monitoring' folder with Prometheus/Grafana YAMLs
                bat "kubectl apply -f monitoring/"
            }
        }
    }

    post {
        success {
            echo "Pipeline Successful! All stages completed."
        }
        failure {
            echo "Pipeline Failed. Please check the logs."
        }
    }
}
