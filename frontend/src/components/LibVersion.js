import React, { useEffect, useState } from "react";
import { Typography, Grid, Paper } from "@mui/material";
import { fetchLibVersion } from "./API.js";

export default function LibVersion() {
  const [version, setVersion] = useState("");

  useEffect(() => {
    fetchLibVersion().then(setVersion);
  }, []);

  return (
    <Grid item>
      <Paper
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          width: "250px",
          height: "250px",
        }}
      >
        <Typography component="h2" variant="h4" color="primary" gutterBottom>
          Lib-Version
        </Typography>
        <Typography component="p" variant="h4">
          {version}
        </Typography>
      </Paper>
    </Grid>
  );
}
