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

app = Flask(__name__)
CORS(app)


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
    url = request.json.get('inputPrediction')
    response = requests.get(
        os.environ.get('MODEL_SERVICE') + '/API/v1.0/predict',
        params={"url": url},
        timeout=10
    )
    prediction = response.text
    prediction_data = {'prediction': prediction}
    return jsonify(prediction_data)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=106, debug=True)
