import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";
import { Color } from "./Colors/Color";


export const GreenTheme = createTheme({

  palette: {
    primary: {
      light: Color.GreenUltraLight,
      main: Color.GreenLight,
      dark: Color.Green
    },
    secondary: {
      main: Color.Yellow
    },
    error: {
      main: red[400],
    }
  }


});