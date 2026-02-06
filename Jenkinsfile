pipeline {
    agent any

    environment {
        // IMPORTANT: Jenkins -> Tools-ல் நீங்கள் கொடுத்த அதே பெயர் இங்கே இருக்க வேண்டும்
        SCANNER_HOME = tool 'SonarScanner'
        APP_NAME = "farm-management-app"
    }

    stages {
        stage('1. Checkout Code') {
            steps {
                // இது தானாகவே 'main' பிராஞ்சை டவுன்லோட் செய்யும்
                checkout scm
            }
        }

        stage('2. SonarQube Quality Check') {
            steps {
                script {
                    // Jenkins -> System-ல் நீங்கள் கொடுத்த 'sonar-server' பெயருடன் மேட்ச் ஆக வேண்டும்
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

        stage('3. Build Docker Image (Minikube)') {
            steps {
                script {
                    echo "Building Docker image inside Minikube..."
                    // Windows-ல் 'minikube image build' பயன்படுத்துவது சிறந்தது
                    bat "minikube image build -t ${APP_NAME}:latest ."
                }
            }
        }

        stage('4. Deploy App to Kubernetes') {
            steps {
                echo "Deploying App to Minikube..."
                // உங்கள் k8s ஃபோல்டரில் உள்ள deployment மற்றும் service ஃபைல்களை ரன் செய்யும்
                bat "kubectl apply -f k8s/"
            }
        }

        stage('5. Setup Prometheus & Grafana') {
            steps {
                echo "Applying Monitoring (Prometheus & Grafana)..."
                // உங்கள் monitoring ஃபோல்டரில் உள்ள YAML ஃபைல்களை ரன் செய்யும்
                bat "kubectl apply -f monitoring/"
            }
        }
    }

    post {
        success {
            echo "Congratulations! Your CI/CD pipeline finished successfully."
        }
        failure {
            echo "Pipeline failed. Check SonarScanner name in Jenkins Tools or Minikube status."
        }
    }
}
