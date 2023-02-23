import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";


export const darkTheme = createTheme({

  palette: {
    primary: {
      light: '#1C82AD',
      main: '#00337C',
      dark: '#13005A'
    },
    secondary: {
      main: '#03C988'
    },
    error: {
      main: red[400],
    }
  }


});