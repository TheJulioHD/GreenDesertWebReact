import { Person } from '@mui/icons-material'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import React, { useState } from 'react'
import { json, useNavigate } from 'react-router-dom'
import { employeeModel } from '../../assets/models/employee.model'
import axios from 'axios'
import * as yup from 'yup'
import { useFormik } from 'formik'
import Swal from 'sweetalert2'
import { IProvider } from '../../assets/models/provider.model'
import { customerModel } from '../../assets/models/customer.model'

export const AddCustomerpage = () => {
  
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
      fristSurname: yup.string().trim().required('La compañia paterno es requerido'),
      secondSurname: yup.string().trim().required('La direccion materno es requerido'),
      email: yup.string().trim().required('El email tiene que ser requerido').email('ingresa un email valido'),
      phonenumber: yup.string().trim().required('El telefono tiene que ser requerido').min(10,'tiene que ser un minimo de 10 nuemros').max(10, 'tiene que tener un maximo de 10 numeros'),
  });

  const formik = useFormik<customerModel>({
    initialValues: {
      name:'',
      fristSurname:'',
      secondSurname:'',
      email:'',
      phonenumber:'',
      status:true
    },
    validationSchema: validationSchema,
    onSubmit: async (values,  {resetForm }) => {
      //alert(JSON.stringify(values, null, 2));
      const newCustomer ={
        name: values.name,
        fristSurname: values.fristSurname,
        secondSurname: values.secondSurname,
        email: values.email,
        phonenumber: values.phonenumber,
        status: true,
        //end
      }
      
      console.log(newCustomer)
      await axios({
        method:'POST',
        url:'http://localhost:3000/customer',
        data:JSON.stringify(newCustomer),
        headers:{
          'Content-Type':'application/json'
        }
      }).then(res => {console.log(JSON.stringify(res.data.id))
        
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Customer Registrado Con exito',
            showConfirmButton: false,
            timer: 1500
          })
    })
      .catch(err => console.log(err))
      resetForm()


    },
  })
  return (
    <>

      <Grid container
      direction={'column'}
      alignItems='center'>
        <Typography variant='h2'>Registrar Customer</Typography>
      </Grid>

      <Grid container 
      columnSpacing={{xs:1, sm:2 , md:3}}
      direction={'row'}
      sx={{
        backgroundColor: 'primary.light',
        borderRadius: '5px',
        p: '2em'
      }}>

        <Grid container xs={5} sm={5} md={4}
        textAlign='center'
        alignContent='center'>
          <Person sx={{fontSize: '400px', color: 'white'}}/>
          <Button variant='outlined'/>
        </Grid>


      <Grid container 
        xs={10} sm={10} md={7}
        sx={{color: 'white'}}
        direction='column'
        alignContent='center'
        textAlign='center'>

        <form onSubmit={formik.handleSubmit}>
          <Typography variant='h6'>Nombre</Typography>
            <TextField name='name' 
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name} />
            <br />

            <Typography variant='h6'>Apellido paterno</Typography>
            <TextField  name='fristSurname' 
                value={formik.values.fristSurname}
                onChange={formik.handleChange}
                error={formik.touched.fristSurname && Boolean(formik.errors.fristSurname)}
                helperText={formik.touched.fristSurname && formik.errors.fristSurname}/>
            <br />
            <Typography variant='h6'>Apellido Materno</Typography>
            <TextField name='secondSurname' 
            value={formik.values.secondSurname}
            onChange={formik.handleChange}
            error={formik.touched.secondSurname && Boolean(formik.errors.secondSurname)}
            helperText={formik.touched.secondSurname && formik.errors.secondSurname}/>
            <br />
            <Typography variant='h6'>Correo electronico</Typography>
            <TextField  name='email' 
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}/>
            <br />
            <Typography variant='h6'>numero celular</Typography>
            <TextField name='phonenumber' 
            value={formik.values.phonenumber}
            onChange={formik.handleChange}
            error={formik.touched.phonenumber && Boolean(formik.errors.phonenumber)}
            helperText={formik.touched.phonenumber && formik.errors.phonenumber}/>
            <br />
            
          <Grid item>
            <Button variant='contained' type='submit'>Registrar customer</Button>
          </Grid>
        </form>
      </Grid>
      
      </Grid>
    </>

  )
}
