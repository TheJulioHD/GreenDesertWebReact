import { ThemeContext } from '@emotion/react'
import { Person } from '@mui/icons-material'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import Style from './SignUp.module.css'

export const SignUp = () => {
  return (
    
    <>

      <Typography variant='h1'>¡Bienvenido!</Typography>
      <Typography variant='h2'>Registra tu cuenta</Typography>
      
      <Grid
        marginTop={1}
        marginBottom={1}
        container
        spacing={1}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          minHeight: '50vh', 
          backgroundColor: 'primary.dark', 
          borderRadius: 5
        }}
      >

          <div>
            <Person 
              sx={{
                color:'primary.main',
                fontSize: '400px'

              }}  
            />

          </div>
          <TextField
            margin='normal'
            className={Style.textFieldEmail}
            label='Correo'
            variant='filled'
            sx={{
              input: {color: 'white'},
              border: 'secondary.main',
              backgroundColor: 'primary.light'
            }}
          />


          <TextField
            margin='normal'
            className={Style.textFieldPassword}
            label='Contraseña'
            variant='filled'
            type='password'
            sx={{
              input: {color: 'white'},
              border: 'secondary.main',
              backgroundColor: 'primary.light'
            }}
          />


      </Grid>

          <Button
            variant='contained'
          >Registrar usuario</Button>

    </>


  )
}
