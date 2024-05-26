import { useState } from "react";
import { Typography, Grid, Paper, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { fetchPrediction } from "./API.js";

export default function Predict() {
  const [urlValue, setUrlValue] = useState("");
  const [prediction, setPrediction] = useState("predict");
  const [isLoading, setIsLoading] = useState(false);

  const handleUrlChange = (event) => {
    setUrlValue(event.target.value);
  };

  const isValidUrl = (url) => {
    const pattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return pattern.test(url);
  };

  const predict = () => {
    if (!isValidUrl(urlValue)) {
      setPrediction("Invalid URL");
      return;
    }

    setIsLoading(true);
    fetchPrediction(urlValue).then((result) => {
      setPrediction(result);
      setIsLoading(false);
    });
  };

  return (
    <Grid item>
      <Paper
        component="form"
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          width: "400px",
          height: "250px",
        }}
        onSubmit={(e) => e.preventDefault()}
      >
        <Typography component="h2" variant="h4" color="primary" gutterBottom>
          Prediction
        </Typography>

        <TextField
          id="url"
          label="URL"
          variant="filled"
          size="small"
          value={urlValue}
          onChange={handleUrlChange}
          margin="normal"
        />

        <LoadingButton loading={isLoading} variant="outlined" onClick={predict}>
          {prediction}
        </LoadingButton>
      </Paper>
    </Grid>
  );
}
