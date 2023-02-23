import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";


export const GreenTheme = createTheme({

  palette: {
    primary: {
      light: '#1e8449',
      main: '#196f3d',
      dark: '#145a32'
    },
    secondary: {
      main: '#03C988'
    },
    error: {
      main: red[400],
    }
  }


});