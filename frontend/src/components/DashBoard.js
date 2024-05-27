import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Box, Grid } from "@mui/material";

import LibVersion from "./LibVersion.js";
import Predict from "./Predict.js";

const defaultTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function Dashboard() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3} p={5}>
          <LibVersion />

          <Predict />
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
