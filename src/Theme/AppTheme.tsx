import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import React from 'react'
import { darkTheme } from './DarkTheme'

export const AppTheme = ({ children } : any) => {
  return (
    <ThemeProvider theme={ darkTheme }>
      <CssBaseline/>
      { children }
    </ThemeProvider>
  );
}
