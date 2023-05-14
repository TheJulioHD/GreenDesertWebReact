import { Person } from '@mui/icons-material'
import { Button, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField, Typography } from '@mui/material'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { json, useNavigate } from 'react-router-dom'
import { employeeModel } from '../../assets/models/employee.model'
import axios from 'axios'
import * as yup from 'yup'
import { useFormik } from 'formik'
import Swal from 'sweetalert2'
import { IProvider } from '../../assets/models/provider.model'
import { Ijobordermodel } from '../../assets/models/joborder.model'

export const AddJobOrderpage = () => {


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
  const url = 'http://localhost:3000/user'
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
    quantity: yup.number().required('La cantidad tiene que ser requerida').min(1, 'tiene que ser un minimo de 1 nuemros'),
    customer: yup.number().required('La cantidad tiene que ser requerida').min(1, 'tiene que ser un minimo de 1 nuemros'),
    employee: yup.number().required('La cantidad tiene que ser requerida').min(1, 'tiene que ser un minimo de 1 nuemros'),
    product: yup.number().required('La cantidad tiene que ser requerida').min(1, 'tiene que ser un minimo de 1 nuemros'),
  });

  const formik = useFormik<Ijobordermodel>({
    initialValues: {
      quantity: 0,
      customer: 0,
      employee: 0,
      status: true,
      inventory: {
        quantity: 0,
        spot: '',
      },
      product: 0,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      //alert(JSON.stringify(values, null, 2));
      const newjoborder = {
        quantity: values.quantity,
        customer: values.customer,
        employee: values.employee,
        status: true,
        inventory: {
          quantity: values.quantity,
          spot: values.inventory.quantity,
        },
        product: values.product
      }

      console.log(newjoborder)
      await axios({
          method: 'POST',
          url: 'http://localhost:3000/jobOrder',
          data: JSON.stringify(newjoborder),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((res)=>{console.log(res)
          Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'joborder Registrada Con exito',
                showConfirmButton: false,
                timer: 1500
              })})
      // await axios({
      //   method: 'POST',
      //   url: 'http://localhost:3000/provider',
      //   data: JSON.stringify(newProvider),
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // }).then(res => {
      //   console.log(JSON.stringify(res.data.id))
      //   const newimg = {
      //     image: newProvider.product.image,
      //     id: res.data.id
      //   }
      //   axios({
      //     method: 'POST',
      //     url: `http://localhost:3000/product/upload${JSON.stringify(res.data.id)}`,
      //     data: JSON.stringify(newimg),
      //     headers: {
      //       'Content-Type': 'application/json'
      //     }
      //   }).then((res) => {
      //     console.log(res.data)
      //   }).then((err) => { console.log(err) })
      //   Swal.fire({
      //     position: 'top-end',
      //     icon: 'success',
      //     title: 'proveedpr Registrado Con exito',
      //     showConfirmButton: false,
      //     timer: 1500
      //   })
      // })
      //   .catch(err => console.log(err))
      resetForm()


    },
  })
  
  return (
    <>

      <Grid container
        direction={'column'}
        alignItems='center'>
        <Typography variant='h2'>Registrar JobOrder</Typography>
      </Grid>

      <Grid container
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        direction={'row'}
        sx={{
          backgroundColor: 'primary.light',
          borderRadius: '5px',
          p: '2em'
        }}>

        <Grid container xs={5} sm={5} md={4}
          textAlign='center'
          alignContent='center'>
          <Person sx={{ fontSize: '400px', color: 'white' }} />
          <Button variant='outlined' />
        </Grid>


        <Grid container
          xs={10} sm={10} md={7}
          sx={{ color: 'white' }}
          direction='column'
          alignContent='center'
          textAlign='center'>

          <form onSubmit={formik.handleSubmit}>
            
            <Typography variant='h6'>cantidad</Typography>
            <TextField name="quantity" type='number'
              value={formik.values.quantity}
              onChange={formik.handleChange}
              error={formik.touched.quantity && Boolean(formik.errors.quantity)}
              helperText={formik.touched.quantity && formik.errors.quantity} />
            <br />
            <Typography variant='h6'>cliente</Typography>
            <TextField name="customer" type='number'
              value={formik.values.customer}
              onChange={formik.handleChange}
              error={formik.touched.customer && Boolean(formik.errors.customer)}
              helperText={formik.touched.customer && formik.errors.customer} />
            <br />
            <Typography variant='h6'>Empleado</Typography>
            <TextField name="employee" type='number'
              value={formik.values.employee}
              onChange={formik.handleChange}
              error={formik.touched.employee && Boolean(formik.errors.employee)}
              helperText={formik.touched.employee && formik.errors.employee} />
            <br />
            <Typography variant='h6'>Inventario</Typography>
            <TextField name="product" type='number'
              value={formik.values.product}
              onChange={formik.handleChange}
              error={formik.touched.inventory?.product && Boolean(formik.errors.product)}
              helperText={formik.touched.product && formik.errors.product} />
            <br />


            <Grid item>
              <Button variant='contained' type='submit'>Registrar joborder</Button>
            </Grid>
          </form>
        </Grid>

      </Grid>
    </>

  )
}
