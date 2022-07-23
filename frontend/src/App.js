import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import BoxStack from "./boxStack";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    background: {
      default: "#e7ebf0",
    },
  },
});

export default function App() {
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              KUDOBOX
            </Typography>
          </Toolbar>
        </AppBar>
        <Container>
          <CssBaseline />
          <BoxStack />
        </Container>
      </ThemeProvider>
    </div>
  );
}
