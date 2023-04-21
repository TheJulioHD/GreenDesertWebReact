import { Person } from '@mui/icons-material'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { employeeModel } from '../../assets/models/employee.model'
import axios from 'axios'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { Color } from '../../Theme/Colors/Color'

export const AddEmployePage = () => {
  
  const auth= getAuth();
  const navigate = useNavigate()
  const [authing, setAuthing] = useState(false)

  // const[employee, setEmployee] = useState<employeeModel>({
  //     name: '',
  //     fristSurname: '',
  //     secondSurname: '',
  //     birthday: '',
  //     email: '',
  //     phonenumber: '',
  //     status: '',
  //     user: {}
    
  // })
  const url= 'http://localhost:3000/user'
  // const handleimputChange = ({target:{name, value}}:any) =>{
    
  //    console.log(evt.currentTarget.value)
  //   console.log(name)
  //   setEmployee({...employee, [name]:value})
  // }
  
  // const handleSubmit = async(evt: React.FormEvent<HTMLFormElement| HTMLButtonElement>) =>{
  //   evt.preventDefault()
  //   console.log(employee)

    
  //   const newEmployee ={
  //     name: employee.name,
  //     fristSurname: employee.fristSurname,
  //     secondSurname: employee.secondSurname,
  //     birthday: employee.birthday,
  //     email: employee.email,
  //     phonenumber: employee.phonenumber,
  //     status: 'activo',
  //   }
  //   await axios({
  //     method:'POST',
  //     url:'http://localhost:3000/employee',
  //     data:JSON.stringify(newEmployee),
  //     headers:{
  //       'Content-Type':'application/json'
  //     }
  //   }).then(res => console.log(res.data))
  //   .catch(err => console.log(err))
  // }
  {/*
    Atributes
      name
      fristSurname
      secondSurname
      birthday
      address
      email
      phonenumber
      status
  */}
  {/*
    Atributes
      name
      fristSurname
      secondSurname
      birthday
      email
      phonenumber
      status
  */}

  const validationSchema = yup.object().shape({
      name: yup.string().trim().required('El nombre es requerido'),
      fristSurname: yup.string().trim().required('El apellido paterno es requerido'),
      secondSurname: yup.string().trim().required('El apellido materno es requerido'),
      birthday: yup.string().trim().required('La fecha tiene que ser requerida'),
      email: yup.string().trim().required('El email tiene que ser requerido').email('ingresa un email valido'),
      phonenumber: yup.string().trim().required('El telefono tiene que ser requerido').min(10,'tiene que ser un minimo de 10 nuemros').max(10, 'tiene que tener un maximo de 10 numeros'),
      password: yup.string().trim().required('La contraseña tiene que ser requerida').min(6,'tiene que ser un minimo de 6 nuemros'),
      
  });

  const formik = useFormik<employeeModel>({
    initialValues: {
      name: '',
      fristSurname: '',
      secondSurname: '',
      birthday: '',
      email: '',
      phonenumber: '',
      status: '',
      password:'',
      user: {
        uuid:'',
        password:'',
        role:0
      }
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      //alert(JSON.stringify(values, null, 2));
      
      createUserWithEmailAndPassword(auth, values.email, values.password).then(async(res) =>{
        const newEmployee ={
          name: values.name,
          fristSurname: values.fristSurname,
          secondSurname: values.secondSurname,
          birthday: values.birthday,
          email: values.email,
          phonenumber: values.phonenumber,
          status: 'activo',
          user: {
            uuid:'',
            password: values.password,
            role: 1
          }
        }
        newEmployee.user.uuid = res.user.uid
        await axios({
          method:'POST',
          url:'http://localhost:3000/employee',
          data:JSON.stringify(newEmployee),
          headers:{
            'Content-Type':'application/json'
          }
        }).then(res => console.log(res.data))
        .catch(err => console.log(err))
          
      }).catch((err) => {console.log(err)})


    },
  })
  return (
    <>

      <Grid container
      direction={'column'}
      alignItems='center'>
        <Typography variant='h2'>Registrar empleado</Typography>
      </Grid>

      <Grid container
      columnSpacing={{xs:1, sm:2 , md:3}}
      direction={'row'}
      sx={{
        backgroundColor: Color.GrayUltraDark,
        borderRadius: '5px',
        p: '2em'
      }}>

        <Grid container xs={5} sm={4} md={2}
        textAlign='center'
        alignContent='center'>
          <Person sx={{fontSize: '400px', color: 'white'}}/>
        </Grid>


      <Grid container 
        xs={10} sm={10}
        sx={{color: 'white'}}
        direction='column'
        alignContent='center'
        textAlign='center'>

        <form onSubmit={formik.handleSubmit}>
          <Typography variant='h6'>Nombre</Typography>
            <TextField name='name' 
            sx={{backgroundColor: Color.GreenUltraLight, borderRadius: 2,color: Color.black}}
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name} />
            <br />

            <Typography variant='h6'>Apellido paterno</Typography>
            <TextField  name='fristSurname' 
            sx={{backgroundColor: Color.GreenUltraLight, borderRadius: 2,color: Color.black}}
                value={formik.values.fristSurname}
                onChange={formik.handleChange}
                error={formik.touched.fristSurname && Boolean(formik.errors.fristSurname)}
                helperText={formik.touched.fristSurname && formik.errors.fristSurname}/>
            <br />
            <Typography variant='h6'>Apellido materno</Typography>
            <TextField name='secondSurname' 
            sx={{backgroundColor: Color.GreenUltraLight, borderRadius: 2,color: Color.black}}
            value={formik.values.secondSurname}
            onChange={formik.handleChange}
            error={formik.touched.secondSurname && Boolean(formik.errors.secondSurname)}
            helperText={formik.touched.secondSurname && formik.errors.secondSurname}/>
            <br />
            <Typography variant='h6'>Fecha de nacimiento</Typography>
            <TextField  name='birthday' type='date' 
            sx={{backgroundColor: Color.GreenUltraLight, borderRadius: 2,color: Color.black}}
            value={formik.values.birthday}
            onChange={formik.handleChange}
            error={formik.touched.birthday && Boolean(formik.errors.birthday)}
            helperText={formik.touched.birthday && formik.errors.birthday}/>
            <br />
            <Typography variant='h6'>Correo electronico</Typography>
            <TextField  name='email' 
            sx={{backgroundColor: Color.GreenUltraLight, borderRadius: 2,color: Color.black}}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}/>
            <br />
            <Typography variant='h6'>Contraseña</Typography>
            <TextField  name="password" 
            sx={{backgroundColor: Color.GreenUltraLight, borderRadius: 2,color: Color.black}}
            type='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}/>
            <br />
            <Typography variant='h6'>numero celular</Typography>
            <TextField name='phonenumber' 
            sx={{backgroundColor: Color.GreenUltraLight, borderRadius: 2,color: Color.black}}
            value={formik.values.phonenumber}
            onChange={formik.handleChange}
            error={formik.touched.phonenumber && Boolean(formik.errors.phonenumber)}
            helperText={formik.touched.phonenumber && formik.errors.phonenumber}/>

            
          <Grid item>
            <Button 
            sx={{mt: 5, backgroundColor: Color.GREEN}}
            variant='contained' type='submit'>Registrar empleado</Button>
          </Grid>
        </form>
      </Grid>
      
      </Grid>
    </>

  )
}
