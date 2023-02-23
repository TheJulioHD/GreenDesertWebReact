import { Person } from '@mui/icons-material'
import { Box, Button, Grid, TextField, Typography } from '@mui/material'


export const SignUp = () => {
  return (
    
    <Grid container
        direction="column"
        alignItems="center"
        justifyContent="center"
        justifyItems='center'>

      <Grid container
        direction='column'
        alignContent='center'
        alignItems='center'
        justifyItems='center'
        columnSpacing={1}>

        <Typography variant='h1'>¡Bienvenido!</Typography>
        <Typography variant='h3'>Registra tu cuenta</Typography>

      </Grid>
      
      <Grid container
        direction="column"
        alignItems="center"
        justifyContent="center"
        justifyItems='center'
        xs={8}
        sx={{
          backgroundColor: 'primary.dark', 
          borderRadius: 5
        }}>

        <Grid item>
          <Person 
            sx={{
              color:'white',
              fontSize: '300px'
            }}/>

        </Grid>
          <TextField
            margin='normal'
            label='Correo'
            variant='filled'
            sx={{
              input: {color: 'white'},
              border: 'secondary.main',
              backgroundColor: 'primary.light'
            }}/>


          <TextField
            margin='normal'
            label='Contraseña'
            variant='filled'
            type='password'
            sx={{
              input: {color: 'white'},
              border: 'secondary.main',
              backgroundColor: 'primary.light'
            }}/>
      </Grid>
      
      <Grid item>
        <Button variant='contained'>Registrar usuario</Button>
      </Grid>
      
    </Grid>
  )
}
