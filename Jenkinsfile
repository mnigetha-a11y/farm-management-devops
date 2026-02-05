pipeline {
    agent any

    environment {
        // Neenga extract panna scanner folder oda correct path
        SCANNER_HOME = 'C:\\sonar-scanner\\sonar-scanner-8.0.1.6346-windows-x64'
    }

    stages {
        stage('Checkout') {
            steps {
                // Git repository-la irundhu code-ai edukkum
                checkout scm
            }
        }

        stage('SonarQube Analysis') {
            steps {
                // Jenkins credentials-la neenga vacha 'sonar-token' ID-ai inga use panrom
                withCredentials([string(credentialsId: 'sonar-token', variable: 'SONAR_TOKEN')]) {
                    withSonarQubeEnv('sonar-server') {
                        // Scanner-ai local path-la irundhu token-oda run pannum
                        bat "${SCANNER_HOME}\\bin\\sonar-scanner.bat -Dsonar.token=${SONAR_TOKEN} -Dsonar.projectKey=FarmManagement"
                    }
                }
            }
        }

        stage('Quality Gate') {
            steps {
                // SonarQube analysis mudiyum varai wait pannum
                waitForQualityGate abortPipeline: true
            }
        }
    }
}
