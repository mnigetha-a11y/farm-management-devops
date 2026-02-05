pipeline {
    agent any

    tools {
        // Jenkins Tools-la neenga 'SonarScanner' nu peru vacha dhaan idhu vela seiyum
        sonarScanner 'SonarScanner' 
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('SonarQube Analysis') {
            steps {
                // Settings-la neenga vacha 'sonar-server' name match aagudhu
                withSonarQubeEnv('sonar-server') {
                    // Windows machine-la tool-ah call panna 'bat' use panrom
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
