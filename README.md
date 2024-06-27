# App

## Description

This repository contains the code for a full-stack web application built with React.js for the frontend and Flask for the backend. The application is containerized using Docker to ensure consistency and ease of deployment across different environments. Upon a push to main, both packages are updated accordingly with automatic versioning, also a new release tag is created.

##  Repository Structure

```sh
└── app/
    ├── .github
    │   └── workflows
    ├── LICENSE
    ├── README.md
    ├── frontend
    │   ├── .dockerignore
    │   ├── dockerfile
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── public
    │   └── src
    └── service
        ├── dockerfile
        ├── poetry.lock
        ├── pyproject.toml
        └── src
```


## Features

- **React Frontend:** The frontend is built using React.js. It provides the following components:

   - **API.js:** Provides functions to fetch the library version and send prediction requests to the backend, utilizing asynchronous calls to handle API interactions.

   - **DashBoard.js:** Sets up the main dashboard layout using Material-UI, incorporating a dark theme and organizing LibVersion and Predict components in a responsive grid.

   - **LibVersion.js:** Displays the current version of the library by fetching data from the backend and presenting it within a styled Material-UI paper component.

   - **Predict.js:** Offers a form for users to input a URL and receive a prediction, validating the input and displaying results through a responsive Material-UI interface.
  
- **Flask Backend:** The backend is developed using Flask. It provides 3 endpoints, one that leverages lib-version to access the current released version number, one that furthers the predict request to the model-service and one leveraged by Prometheus for the metrics.

- **Dockerized Environment:** Both the frontend and backend are containerized using Docker and automatically released as packages in ghcr.

## Usage

To use the model service released package, follow these steps:

(Disclaimer) In order for the commands to work correctly the model-service should also be running.

> 1. Pull the latest docker images:
>
> ```console
> $ docker pull ghcr.io/remla24-team3/app-frontend:latest
> $ docker pull ghcr.io/remla24-team3/app-service:latest
> ```
>
> 2. Run the docker container:
> ```console
> $ docker run -p 106:106 ghcr.io/remla24-team3/app-service:latest
> $ docker run -p 3000:3000 ghcr.io/remla24-team3/app-frontend:latest
> ```
>
> 3. Access the frontend:
> ```console
> localhost:3000/
> ```
>
> 4. Access Swagger:
> ```console
> localhost:106/apidocs/#/
> ```


## Prometheus Metrics

This Flask application integrates Prometheus to monitor various metrics related to the application's performance and usage. The following metrics are tracked and exposed for Prometheus to scrape:

- **Request Processing Time**: Measures the time spent processing requests.
- **HTTP Request Count**: Tracks the total number of HTTP requests.
- **Prediction Request Count**: Tracks the total number of prediction requests.
- **Active Sessions**: Tracks the number of active sessions.

### Prometheus Metrics

- **REQUEST_TIME**: A `Summary` metric that records the time spent processing each request.
- **REQUEST_COUNT**: A `Counter` metric that counts the total number of HTTP requests.
- **PREDICTION_COUNT**: A `Counter` metric that counts the total number of prediction requests.
- **ACTIVE_SESSIONS**: A `Gauge` metric that records the number of active sessions.

### Prometheus Endpoint

The `/metrics` endpoint exposes the metrics in a format that Prometheus can scrape:

```python
@app.route('/metrics')
def metrics():
    """
    Endpoint to expose Prometheus metrics.
    ---
    responses:
      200:
        description: A plaintext response containing the Prometheus metrics
        content:
          text/plain:
            schema:
              type: string
    """
    return generate_latest(), 200, {'Content-Type': CONTENT_TYPE_LATEST}
```

### Usage in Application

- **Before Request**: The `before_request` function increments the request count and the number of active sessions:

```python
@app.before_request
def before_request():
    REQUEST_COUNT.inc()
    ACTIVE_SESSIONS.inc()
```

- **After Request**: The `after_request` function decrements the number of active sessions:

```python
@app.after_request
def after_request(response):
    ACTIVE_SESSIONS.dec()
    return response
```

These integrations help in monitoring the application's performance and resource utilization, providing valuable insights for optimizing and maintaining the system.