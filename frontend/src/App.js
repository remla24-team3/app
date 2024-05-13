import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [inputPrediction, setInputPrediction] = useState('');

  useEffect(() => {
    const versionUrl = process.env.REACT_APP_SERVICE + "/API/v1.0/version";
    fetch(versionUrl)
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const predict = () => {
    const predictionUrl = process.env.REACT_APP_SERVICE + "/API/v1.0/predict";
    fetch(predictionUrl, {
      method: "POST",
      body: JSON.stringify({ inputPrediction }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(response => response.json())
    .then(data => {
      setData(data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }

  const handleInputChange = (event) => {
    setInputPrediction(event.target.value);
  }

  return (
    <div className="App">
      {data && Object.hasOwn(data, "version") && (
        <div>
          <p>{data.version}</p>
        </div>
      )}
      {data && Object.hasOwn(data, "prediction") && (
        <div>
          <p>{data.prediction}</p>
        </div>
      )}
      <input type="text" value={inputPrediction} onChange={handleInputChange} />
      <button onClick={predict}>Predict</button>
    </div>
  );
}

export default App;
