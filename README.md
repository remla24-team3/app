# Step-by-Step Setup Guide

## 1. Provisioning with Vagrant and Ansible

### Start Vagrant and Provision VMs

1. Create and start the Vagrant VMs:
    ```sh
    vagrant up
    ```

## 2. Build and Use Local Docker Images with Minikube

### Switch to Minikube's Docker Daemon

1. Evaluate Minikube's Docker environment:
    ```sh
    eval $(minikube -p minikube docker-env)
    ```

### Build Docker Images in Minikube

1. Build the frontend Docker image:
    ```sh
    cd frontend
    docker build -t myfrontend-image:latest .
    ```

2. Build the service Docker image:
    ```sh
    cd ../service
    docker build -t myservice-image:latest .
    ```

## 3. Apply Kubernetes Manifests

### TODO: Install Prometheus Operator

### Apply Your Kubernetes Manifests

1. Apply the updated service manifest:
    ```sh
    kubectl apply -f kubernetes/service.yaml
    ```

2. Apply the other Kubernetes manifests:
    ```sh
    kubectl apply -f kubernetes/deployment.yaml
    kubectl apply -f kubernetes/ingress.yaml
    kubectl apply -f kubernetes/servicemonitor.yaml
    kubectl apply -f kubernetes/prometheusrule.yaml
    ```

## 4. Verify Setup

### Verify that all resources are created successfully

1. Get pods:
    ```sh
    kubectl get pods
    ```

2. Get services:
    ```sh
    kubectl get services
    ```

3. Get ingress:
    ```sh
    kubectl get ingress
    ```

4. Get ServiceMonitors:
    ```sh
    kubectl get servicemonitors
    ```

5. Get PrometheusRules:
    ```sh
    kubectl get prometheusrules
    ```
