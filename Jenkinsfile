pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // GitHub-la irundhu code-ah yedukkum
                git branch: 'main', url: 'https://github.com/mnigetha-a11y/farm-mgmt.git'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                // SonarQube scan pannum
                withSonarQubeEnv('SonarQube') {
                    bat "sonar-scanner -Dsonar.projectKey=farm-mgmt -Dsonar.sources=."
                }
            }
        }

        stage('Build and Deploy') {
            steps {
                script {
                    // Docker Image Build
                    bat "docker build -t nigethadocker/farm-mgmt:latest ."
                    
                    // Docker Hub-ku login panni push pannum
                    // 'docker-hub-creds' thaan neenga Jenkins-la create panna ID
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', passwordVariable: 'DOCKER_PASS', usernameVariable: 'DOCKER_USER')]) {
                        bat "docker login -u %DOCKER_USER% -p %DOCKER_PASS%"
                        bat "docker push nigethadocker/farm-mgmt:latest"
                    }
                }
            }
        }
    }
}
