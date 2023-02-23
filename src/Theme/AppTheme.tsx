import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import React from 'react'
import { darkTheme } from './DarkTheme'
import { GreenTheme } from './GreenTheme'

export const AppTheme = ({ children } : any) => {
  return (

    <ThemeProvider theme={ GreenTheme }>
      <CssBaseline/>
      { children }
    </ThemeProvider>

  );
}
