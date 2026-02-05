pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Repository-ah download pannum
                checkout scm
            }
        }

        stage('SonarQube Analysis') {
            steps {
                // 'sonar-server' nu name unga Jenkins settings-la irukradhu match aagum
                withSonarQubeEnv('sonar-server') {
                    // Windows machine nu log-la pathom, so 'bat' use panrom
                    // 'SonarScanner' nu oru tool config panni irundha idha use pannunga
                    bat 'sonar-scanner'
                }
            }
        }
        
        stage("Quality Gate") {
            steps {
                // SonarQube analysis mudiyura varai wait pannum
                waitForQualityGate abortPipeline: true
            }
        }
    }
}
