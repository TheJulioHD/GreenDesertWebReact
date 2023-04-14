import { Person } from '@mui/icons-material'
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import React, { useState} from 'react'
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { GDApi } from '../../../assets/config/config'
import axios from 'axios'
import { userModel } from '../../../assets/models/user.model'
import * as yup from 'yup'
import { useFormik } from 'formik'
// import {createUserWithEmai1AndPassword} from 'firebase/auth'
// import {auth} from '../../firebase/firebase'

export const SignUp = () => {
  const auth= getAuth();
  const navigate = useNavigate()
  const [authing, setAuthing] = useState(false)

  const[user, setUser] = useState<userModel>({
    uuid:'',
    email:'',
    password:'',
    status:'',
    role:0,
    employee:0,
    
  })
  const url= 'http://localhost:3000/user'
  // const handleimputChange = ({target:{name, value}}:any) =>{
    
  //    console.log(evt.currentTarget.value)
  //   console.log(name)
  //   setUser({...user, [name]:value})
  // }
  // const handleSubmit = async(evt: React.FormEvent<HTMLFormElement| HTMLButtonElement>) =>{
  //   setAuthing(true)
  //   evt.preventDefault();
  //   console.log(user)
  //   await createUserWithEmailAndPassword(auth, user.email, user.password).then( async(res)=>{
  //     console.log(res.user.uid)
  //     user.uuid = res.user.uid
  //     const resp = await GDApi.post('user', {user}).then(
  //       (res) => console.log(res.data)
  //     ).catch((err)=>console.log(err))
  //     debugger
  //     const newuser ={
  //       uuid: user.uuid,
  //         email: user.email,
  //         password: user.password,
  //         status: user.status,
  //         role: 1,
  //         employee: 3
  //     }
  //     await axios({
  //       method:'POST',
  //       url:'http://localhost:3000/user',
  //       data:JSON.stringify(newuser),
  //       headers:{
  //         'Content-Type':'application/json'
  //       }
  //     }).then(res => console.log(res.data))
  //     .catch(err => console.log(err))

  //     try {
  //       const resp = await axios.post(url, user)
  //     console.log(resp.data)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //     navigate('/')
  //   }).catch((err)=>{
  //     console.log(err)
  //     setAuthing(false)
  //   })
  // }
  /*
   uuid: user.uuid,
          email: user.email,
          password: user.password,
          status: user.status,
          role: 1,
          employee: 3
  */ 
  const validationSchema = yup.object().shape({
    email: yup.string().trim().required('El email tiene que ser requerido').email('ingresa un email valido'),
    password: yup.string().trim().required('La contraseña es requerida').min(8, 'Debe de contener al menos 8 caracteres').uppercase('Debe contener una mayuscula'),
    status: yup.string().trim().required('El status tiene que ser requerido'),
    role: yup.number().required('El rol tiene que ser requerido').positive('el valor tiene que ser positivo'),
    employee: yup.number().required('El empleado tiene que ser requerido').positive('el valor tiene que ser positivo')
  });

  const formik = useFormik<userModel>({
    initialValues: {
      uuid:'',
      email:'',
      password:'',
      status:'',
      role:0,
      employee:0,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      //alert(JSON.stringify(values, null, 2));
      createUserWithEmailAndPassword(auth, values.email, values.password).then(async(res) =>{
        console.log(res.user.uid)
        const newuser ={
          uuid: res.user.uid,
            email: values.email,
            password: values.password,
            status: values.status,
            role: values.role,
            employee: values.employee
        }
        await axios({
          method:'POST',
          url:'http://localhost:3000/user',
          data:JSON.stringify(newuser),
          headers:{
            'Content-Type':'application/json'
          }
        }).then(res => console.log(res.data))
        .catch(err => console.log(err))
  
        navigate('/')
      })
    },
  })
  
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
                input: {color: 'white'},
                border: 'secondary.main',
                backgroundColor: 'primary.light'
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
                input: {color: 'white'},
                border: 'secondary.main',
                backgroundColor: 'primary.light'
              }}/>

             <br /> 
            <TextField
              name='status'
              margin='normal'
              label='status'
              variant='filled'
              value={formik.values.status}
              onChange={formik.handleChange}
              error={formik.touched.status && Boolean(formik.errors.status)}
              helperText={formik.touched.status && formik.errors.status}
              sx={{
                input: {color: 'white'},
                border: 'secondary.main',
                backgroundColor: 'primary.light'
              }}/>
              <br />
            <TextField
              name='role'
              margin='normal'
              label='role'
              variant='filled'
              type='number'
              value={formik.values.role}
              onChange={formik.handleChange}
              error={formik.touched.role && Boolean(formik.errors.role)}
              helperText={formik.touched.role && formik.errors.role}
              sx={{
                input: {color: 'white'},
                border: 'secondary.main',
                backgroundColor: 'primary.light'
              }}/>
              <br />
            <TextField
              name='employee'
              margin='normal'
              label='employee'
              variant='filled'
              type='number'
              value={formik.values.employee}
              onChange={formik.handleChange}
              error={formik.touched.employee && Boolean(formik.errors.employee)}
              helperText={formik.touched.employee && formik.errors.employee}
              sx={{
                input: {color: 'white'},
                border: 'secondary.main',
                backgroundColor: 'primary.light'
              }}/>

          <Grid item>
            <Button variant='contained' type='submit'>Registrar usuario</Button>
          </Grid>
          
          </form>      
      </Grid>
      
     
      
    </Grid>
  )
}
