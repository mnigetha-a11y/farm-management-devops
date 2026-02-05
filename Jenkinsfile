pipeline {
    agent any

    environment {
        // Scanner irukkura unga local computer path
        SCANNER_HOME = 'C:\\sonar-scanner\\sonar-scanner-8.0.1.6346-windows-x64'
    }

    stages {
        stage('Checkout') {
            steps {
                // GitHub-la irundhu code-ai download pannum
                checkout scm
            }
        }

        stage('SonarQube Analysis') {
            steps {
                // Jenkins-la namba ippo save panna 'sonar-token' ID-ai inga use panrom
                withCredentials([string(credentialsId: 'sonar-token', variable: 'SONAR_TOKEN')]) {
                    withSonarQubeEnv('sonar-server') {
                        // Scanner-ai local path, token, matrum host URL-oda run pannum
                        bat "${SCANNER_HOME}\\bin\\sonar-scanner.bat -Dsonar.token=${SONAR_TOKEN} -Dsonar.projectKey=FarmManagement -Dsonar.host.url=http://localhost:9000"
                    }
                }
            }
        }

        stage('Quality Gate') {
            steps {
                // SonarQube result-kaaga wait pannum (Space illama correct-ah irukanum)
                waitForQualityGate abortPipeline: true
            }
        }
    }
}
