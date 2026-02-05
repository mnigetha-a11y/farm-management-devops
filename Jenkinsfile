pipeline {
    agent any

    tools {
        // 'sonarScanner' nu irundhadha ippo 'hudson.plugins.sonar.SonarRunnerInstallation' nu mathi irukkom
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
                    // Windows machine-la 'bat' use panni scanner-ah run panrom
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
}s
