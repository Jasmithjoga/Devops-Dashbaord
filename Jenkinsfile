pipeline {
    agent any

    stages {

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t devops-dashboard .'
            }
        }

        stage('Tag Docker Image') {
            steps {
                bat 'docker tag devops-dashboard jasmithjoga/devops-dashboard'
            }
        }

        stage('Push Docker Image') {
            steps {
                bat 'docker push jasmithjoga/devops-dashboard'
            }
        }

    }
}