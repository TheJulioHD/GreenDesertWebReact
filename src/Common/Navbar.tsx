import { Google, Logout, MenuOutlined } from "@mui/icons-material"
import { Grid, AppBar, IconButton, Toolbar, Typography } from "@mui/material"
import React from "react"

interface props{
  drawerWidth : number;
}


export const Navbar = ({drawerWidth} : props) => {
  return (
    <AppBar 
      position="fixed"
      sx={{
        width: {sm: `calc(100% - ${drawerWidth}px)`},
        ml: { sm: `${drawerWidth}px`}
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge='start'
          sx={{
            mr: 2, display: {sm: 'none'}
          }}
        >
          <MenuOutlined/>
        </IconButton>

        <Grid container
          direction='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <Typography variant="h6" noWrap component='div'>Green desert</Typography>
          
          <IconButton>
            <Logout color="error"/>
          </IconButton>
        </Grid>

      </Toolbar>
    </AppBar>
  )
}
