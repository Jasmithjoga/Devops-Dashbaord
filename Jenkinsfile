pipeline {
    agent any

    stages {

        stage('Clone Repository') {
            steps {
                git 'https://github.com/Jasmithjoga/Devops-Dashboard.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t devops-dashboard .'
            }
        }

    }
}