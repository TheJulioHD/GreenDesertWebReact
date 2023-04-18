import { MenuOutlined, Logout, OutlinedFlag, Add, Home, Login, SignpostOutlined, PersonAdd } from '@mui/icons-material'
import { AppBar, Box, Grid, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Toldbar = () => {

  const navigate = useNavigate();


  return (
    <AppBar 
      position="fixed"
      sx={{
      }}
    >
      <Toolbar>
        
        <Grid container
          direction='row'
          justifyContent='normal'
          alignItems='center'
        >
          <Typography variant="h6" noWrap component='div'>Green desert</Typography>

        </Grid>

        <Grid container
          direction='row'
          justifyContent='end'
          alignItems='center'
        >

          <Grid item
            direction='row'
            sx={{
              margin: 0,
              padding: 0,
            }}
          >
          
            <IconButton sx={{backgroundColor: '', color: 'white'}}>
              <Typography variant='body1'>Inicio</Typography>
              <Home/>
            </IconButton>

          </Grid>
          
          
          <Grid item
            direction='row'
            sx={{
              margin: 0,
              padding: 0,
            }}
          >
          
            <IconButton sx={{backgroundColor: '', color: 'white'}}>
              <Typography variant='body1'>Iniciar sesion</Typography>
              <Login/>
            </IconButton>

          </Grid>

          
          <Grid item
            direction='row'
            sx={{
              margin: 0,
              padding: 0,
            }}
          >
          
            <IconButton 
              onClick={() => {navigate('auth/signup')}}
              sx={{
                backgroundColor: '', 
                color: 'white'
              }}
              
            >
              <Typography variant='body1'>Registrar</Typography>
              <PersonAdd/>
            </IconButton>

          </Grid>


        </Grid>

      </Toolbar>
    </AppBar>
  )
}
