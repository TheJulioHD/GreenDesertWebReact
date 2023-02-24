import { Person } from '@mui/icons-material'
import { Button, Grid, TextField, Typography } from '@mui/material'
import React from 'react'

export const AddEmployePage = () => {
  {/*
    Atributes
      name
      fistSurname
      secondSurname
      birthdate
      address
      email
      phoneNumber
      status
  */}
  return (
    <>

      <Grid container
      direction={'column'}
      alignItems='center'>
        <Typography variant='h2'>Registrar usuario</Typography>
      </Grid>

      <Grid container
      sx={{
        backgroundColor: 'primary.light',
        borderRadius: '5px',
        p: '2em'
      }}>

        <Grid container xs={6}
        textAlign='center'
        alignContent='center'>
          <Person sx={{fontSize: '400px', color: 'white'}}/>
          <Button variant='outlined'/>
        </Grid>


      <Grid container 
        xs={6}
        sx={{color: 'white'}}
        direction='column'
        alignContent='center'
        textAlign='center'>

          <Typography variant='h6'>Nombre</Typography>
          <TextField />

          <Typography variant='h6'>Apellido paterno</Typography>
          <TextField />

          <Typography variant='h6'>Apellido materno</Typography>
          <TextField />

          <Typography variant='h6'>Fecha de nacimiento</Typography>
          <TextField />

          <Typography variant='h6'>Correo electronico</Typography>
          <TextField />

          <Typography variant='h6'>numero celular</Typography>
          <TextField />

      </Grid>
      </Grid>
    </>

  )
}
