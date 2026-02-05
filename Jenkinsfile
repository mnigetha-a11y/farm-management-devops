pipeline {
    agent any

    tools {
        'hudson.plugins.sonar.SonarRunnerInstallation' 'SonarScanner' 
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('sonar-server') {
                    bat 'sonar-scanner'
                }
            }
        }
        
        stage("Quality Gate") {
            steps {
                waitForQualityGate abortPipeline: true
            }
        }
    }
}
