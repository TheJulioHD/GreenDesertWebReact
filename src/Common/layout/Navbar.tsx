import { Google, Logout, MenuOutlined } from "@mui/icons-material"
import { Grid, AppBar, IconButton, Toolbar, Typography } from "@mui/material"
import React from "react"
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from 'firebase/auth'
interface props{
  drawerWidth : number;
}

export const Navbar = ({drawerWidth} : props) => {
  const navigate = useNavigate() 
  const auth = getAuth()
  const handleSubmit = (evt: React.FormEvent<HTMLFormElement| HTMLButtonElement>)=>{
    evt.preventDefault()
    signOut(auth)
    navigate('/auth/signup')
  }  
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
          
          <IconButton onClick={handleSubmit}>
            <Logout color="error"/>
          </IconButton>
        </Grid>

      </Toolbar>
    </AppBar>
  )
}
