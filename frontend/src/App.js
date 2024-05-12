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
    fetch(process.env.REACT_APP_SERVICE + "/API/v1.0/predict", {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputPrediction }),
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
      {data && (
        <div>
          <p>{data.version}</p>
        </div>
      )}
      <input type="text" value={inputPrediction} onChange={handleInputChange} />
      <button onClick={predict}>Predict</button>
    </div>
  );
}

export default App;
