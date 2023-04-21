import { Button, Grid, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useFormik } from 'formik'
import React, {  useState } from 'react'
import {useParams} from 'react-router-dom'
import { employeeModel } from '../../assets/models/employee.model'
import * as yup from 'yup'
import { Person } from '@mui/icons-material'

const EditEmployePage = () => {
    const params =useParams()
    const [employee, setEmployee] = useState<employeeModel>({
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
    })
    axios({
        method:'GET',
        url:`http://localhost:3000/employee/${params.id}`
    }).then((res) =>{console.log(res.data)
        setEmployee(res.data)
    }).catch((err) =>{console.log(err)})


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
        name: employee.name,
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
        
        const newEmployee ={
            name: values.name,
            fristSurname: values.fristSurname,
            secondSurname: values.secondSurname,
            birthday: values.birthday,
            email: values.email,
            phonenumber: values.phonenumber,
            status: 'activo'
          }
          console.log(newEmployee)
          axios.put(`http://localhost:3000/employee/update/${params.id}`, {newEmployee}).then((res)=>{console.log(res.status)}).catch((err)=>{console.log(err)})

        //   await axios({
        //     method:'POST',
        //     url:'http://localhost:3000/employee',
        //     data:JSON.stringify(newEmployee),
        //     headers:{
        //       'Content-Type':'application/json'
        //     }
        //   }).then(res => console.log(res.data))
        //   .catch(err => console.log(err))
            
    }
})
  return (
    <>

      <Grid container
      direction={'column'}
      alignItems='center'>
        <Typography variant='h2'>Actualizar empleado</Typography>
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
            <Typography variant='h6'>Apellido materno</Typography>
            <TextField name='secondSurname' 
            value={formik.values.secondSurname}
            onChange={formik.handleChange}
            error={formik.touched.secondSurname && Boolean(formik.errors.secondSurname)}
            helperText={formik.touched.secondSurname && formik.errors.secondSurname}/>
            <br />
            <Typography variant='h6'>Fecha de nacimiento</Typography>
            <TextField  name='birthday' type='date' 
            value={formik.values.birthday}
            onChange={formik.handleChange}
            error={formik.touched.birthday && Boolean(formik.errors.birthday)}
            helperText={formik.touched.birthday && formik.errors.birthday}/>
            <br />
            <Typography variant='h6'>Correo electronico</Typography>
            <TextField  name='email' 
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}/>
            <br />
            <Typography variant='h6'>Contraseña</Typography>
            <TextField  name="password" 
            type='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}/>
            <br />
            <Typography variant='h6'>numero celular</Typography>
            <TextField name='phonenumber' 
            value={formik.values.phonenumber}
            onChange={formik.handleChange}
            error={formik.touched.phonenumber && Boolean(formik.errors.phonenumber)}
            helperText={formik.touched.phonenumber && formik.errors.phonenumber}/>

            
          <Grid item>
            <Button variant='contained' type='submit'>Actualizar empleado</Button>
          </Grid>
        </form>
      </Grid>
      
      </Grid>
    </>
  )
}

export default EditEmployePage