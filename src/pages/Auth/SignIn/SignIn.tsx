import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { userModel } from '../../../assets/models/user.model';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { Person } from '@mui/icons-material';
import * as yup from 'yup'
import { useFormik } from 'formik';
import { loginModel } from '../../../assets/models/login.model';
import { Toldbar } from '../../../Common/layout/toldbar';
import { Color } from '../../../Theme/Colors/Color';



export const SignIn = () => {

  //hooks
  const [authing, setAuthing] = useState(false)
  
  //Firebase utilities
  const auth= getAuth();
  const navigate = useNavigate()
  const url= 'http://localhost:3000/user'

  const[user, setUser] = useState<userModel>({
    uuid:'',
    email:'',
    password:'',
    status:'',
    role:0,
    employee:0,
  })


  //Functions
  const validationSchema = yup.object().shape({
    email: yup.string().trim().required('Ingrese un email.').email('ingresa un email valido'),
    password: yup.string().trim().required('Ingrese una contraseña').min(8, 'Debe de contener al menos 8 caracteres').uppercase('Debe contener una mayuscula')
  });

  const formik = useFormik<loginModel>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      signInWithEmailAndPassword(auth, values.email, values.password).then((res) =>{
        console.log(res.user.uid)
        
        navigate('/home')
      })
    },
  })
  
  return (

    <Box marginTop={25}>
      
      <Toldbar/>
    
      <Grid container
        md={12}
        direction="row"
        alignItems="center"
        justifyContent="center"
        justifyItems='center'>

      <Grid container
        md={12}
        direction='column'
        alignContent='center'
        alignItems='center'
        justifyItems='center'
        columnSpacing={1}>

        <Typography variant='h1'>¡Bienvenido!</Typography> 
        <Typography variant='h2'>Green desert</Typography> 

      </Grid>

        <Grid container
          md={5}
          sm={10}
          xs={10}
          direction="column"
          alignItems="center"
          justifyContent="center"
          justifyItems='center'
          sx={{
            backgroundColor: Color.GrayUltraDark, 
            borderRadius: 5
          }}>

        <Grid item>
          <Person 
            sx={{
              color:'white',
              fontSize: '300px'
            }}/>

        </Grid>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            name='email'
            margin='normal'
            label='Correo'
            variant='filled'
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{
              input: {color: 'black'},
              borderRadius: '5px',
              backgroundColor: Color.GreenUltraLight
            }}/>

          <br />
          <TextField
            name='password'
            margin='normal'
            label='Contraseña'
            variant='filled'
            type='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={{
              input: {color: 'black'},
              borderRadius: '5px',
              backgroundColor: Color.GreenUltraLight
            }}/>

          <Grid item
            textAlign='center'
            sx={{
              mt: 2,
              mb: 5,
            }}>
        
            <Button 
              variant='contained' 
              type='submit'
              sx={{
                color: 'white',
                backgroundColor: Color.Green,
              }}
            >Inicio de sesion</Button>
          </Grid>  
      
        </form>    
          
      </Grid>

            

      </Grid>

    </Box>
      )
}
