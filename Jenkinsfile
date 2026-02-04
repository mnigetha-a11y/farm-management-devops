pipeline {
    agent any

    environment {
        SONARQUBE_SERVER = 'SonarQube'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    bat '''
                    sonar-scanner ^
                    -Dsonar.projectKey=farm-mgmt ^
                    -Dsonar.projectName=farm-mgmt ^
                    -Dsonar.sources=.
                    '''
                }
            }
        }
    }
}
