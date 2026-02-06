pipeline {
    agent any

    environment {
        // Ensure this matches the name in Manage Jenkins -> Tools
        SCANNER_HOME = tool 'SonarScanner'
        // Ensure this matches the name in Manage Jenkins -> System
        SONAR_SERVER = 'sonar-server'
        APP_NAME = "farm-management-app"
    }

    stages {
        stage('Checkout') {
            steps {
                // Automatically clones the repository
                checkout scm
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    // This block triggers the code quality scan
                    withSonarQubeEnv(SONAR_SERVER) {
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
                echo "Building Docker Image inside Minikube environment..."
                // Build the image directly into Minikube's internal registry
                bat "minikube image build -t ${APP_NAME}:latest ."
            }
        }

        stage('Kubernetes Deployment') {
            steps {
                echo "Deploying Application to Minikube..."
                // Applies all YAML files in the k8s folder
                bat "kubectl apply -f k8s/"
            }
        }

        stage('Prometheus & Grafana Setup') {
            steps {
                echo "Deploying Monitoring Stack..."
                // Applies all monitoring YAML files (Prometheus/Grafana)
                bat "kubectl apply -f monitoring/"
            }
        }
    }

    post {
        success {
            echo "Pipeline completed successfully!"
        }
        failure {
            echo "Pipeline failed. Please check the Jenkins Tool configuration or Minikube status."
        }
    }
}
