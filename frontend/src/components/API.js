export async function fetchLibVersion() {
    try {
        const response = await fetch(process.env.REACT_APP_SERVICE + "/API/v1.0/version");
        const data = await response.json();
        return "v" + data.version
    } catch (error) {
        console.error('Error:', error);
        return "v?";
    }
}

export async function fetchPrediction(inputPrediction) {
    try {
        const response = await fetch(process.env.REACT_APP_SERVICE + "/API/v1.0/predict", {
            method: "POST",
            body: JSON.stringify({ inputPrediction }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        return data.prediction;
    } catch (error) {
        console.error('Error:', error);
        return "Error";
    }
}