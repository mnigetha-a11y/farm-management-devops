pipeline {
    agent any

    environment {
        // Neenga extract panna scanner folder path
        SCANNER_HOME = 'C:\\sonar-scanner\\sonar-scanner-8.0.1.6346-windows-x64'
    }

    stages {
        stage('Checkout') {
            steps {
                // Unga code-ai git-la irundhu edukum
                checkout scm
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('sonar-server') {
                    // Direct-ah bin folder ulla irukkura .bat file-ai run pannum
                    bat "${SCANNER_HOME}\\bin\\sonar-scanner.bat"
                }
            }
        }

        stage('Quality Gate') {
            steps {
                waitForQuality Gate abortPipeline: true
            }
        }
    }
}
