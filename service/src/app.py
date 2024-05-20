"""
Flask application for version retrieval and prediction.

This module contains a Flask application that provides two endpoints:
- /API/v1.0/version: Retrieves the version of the application.
- /API/v1.0/predict: Accepts input data and returns a prediction.

It uses the VersionUtil class from lib_version_group3 to retrieve the version,
and sends a POST request to a model service for prediction.

"""

import os
from flask import Flask, jsonify, request
from lib_version_group3.version import VersionUtil
from flask_cors import CORS
import requests
from prometheus_client import Summary, Counter, Gauge
from prometheus_client import generate_latest, CONTENT_TYPE_LATEST

app = Flask(__name__)
CORS(app)

# Create metrics
REQUEST_TIME = Summary('request_processing_seconds', 'Time spent')
REQUEST_COUNT = Counter('http_requests_total', 'Total HTTP request count')
PREDICTION_COUNT = Counter('prediction_requests_total', 'Total predictions')
ACTIVE_SESSIONS = Gauge('active_sessions', 'Number of active sessions')


@app.before_request
def before_request():
    """
    Executed before each request.

    Increments the request count and active sessions.
    """
    REQUEST_COUNT.inc()
    ACTIVE_SESSIONS.inc()


@app.after_request
def after_request(response):
    """
    Executed after each request.

    Decrements the active sessions.

    Args:
        response (Response): The Flask response object.

    Returns:
        Response: The same response object.
    """
    ACTIVE_SESSIONS.dec()
    return response


@app.route('/API/v1.0/version')
def version():
    """
    Endpoint to retrieve the version of the application.

    Returns:
        JSON: A JSON object containing the version information.
    """
    version_string = VersionUtil.get_version()
    version_data = {'version': version_string}
    return jsonify(version_data)


@app.route('/API/v1.0/predict', methods=['POST'])
def predict():
    """
    Endpoint to predict based on input data.

    Returns:
        JSON: A JSON object containing the prediction result.
    """
    PREDICTION_COUNT.inc()
    url = request.json.get('inputPrediction')
    response = requests.post(
        os.environ.get('MODEL_SERVICE') + '/API/v1.0/predict',
        params={"url": url},
        timeout=10
    )
    prediction = response.text
    prediction_data = {'prediction': prediction}
    return jsonify(prediction_data)


@app.route('/metrics')
def metrics():
    """
    Endpoint to expose Prometheus metrics.

    Returns:
        Response: A plaintext response containing the Prometheus metrics.
    """
    return generate_latest(), 200, {'Content-Type': CONTENT_TYPE_LATEST}


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=106, debug=True)
