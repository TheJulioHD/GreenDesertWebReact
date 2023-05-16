import { Person } from '@mui/icons-material'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { json, useNavigate } from 'react-router-dom'
import { employeeModel } from '../../assets/models/employee.model'
import axios from 'axios'
import * as yup from 'yup'
import { useFormik } from 'formik'
import Swal from 'sweetalert2'
import { IProvider } from '../../assets/models/provider.model'

export const AddProveedorespage = () => {
  const [disable, setDisable] = useState(false)
    const [uuid, setuuid] = useState<any>()
    const auth = getAuth()
    const [loading, setLoading] = useState(false)
    const [user2, setUser2]= useState<any>({})


    useEffect(() => {
        AuthCheck()
    }, [auth])

    const AuthCheck = onAuthStateChanged(auth, (user) => {
        if (user) {
             setuuid(user.uid) 
            setLoading(false)
            console.log(user.uid)
            
                axios({
                    method: 'GET',
                    url: `https://apigreendesert.onrender.com/user/one/${user.uid}`
                }).then((res) => {
                    console.log(res.data)
                    setUser2(res.data)
                    console.log(user2)

                    if(user2.role.id == 1){
                        console.log('soy operador')
                        setDisable(true)
                    }else{
                        console.log('soy admin')
                        setDisable(false)
                    }
                })
            

        } else {
            
        }
    });
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
  const url= 'https://apigreendesert.onrender.com/user'
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
  //     url:'https://apigreendesert.onrender.com/employee',
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
      company: yup.string().trim().required('La compañia paterno es requerido'),
      address: yup.string().trim().required('La direccion materno es requerido'),
      email: yup.string().trim().required('El email tiene que ser requerido').email('ingresa un email valido'),
      phonenumber: yup.string().trim().required('El telefono tiene que ser requerido').min(10,'tiene que ser un minimo de 10 nuemros').max(10, 'tiene que tener un maximo de 10 numeros'),
      nameproduct: yup.string().trim().required('Nombre del producto es requerido'),
      description: yup.string().trim().required('La descripcion es requerida'),
      brand: yup.string().trim().required('La brand es requerida'),
      quantity: yup.string().trim().required('La cantidad tiene que ser requerida').min(1,'tiene que ser un minimo de 1 nuemros'),
      
  });

  const formik = useFormik<IProvider>({
    initialValues: {
        name: '',
        company: '',
        address: '',
        email: '',
        phonenumber: '',
        status: true,
        //porduct
        nameproduct: '',
        description: '',
        brand: '',
        image: '',
        //end 
        //inventory
        quantity: 0,
        spot: '',
        //end
        product: {
            name: '',
            description: '',
            brand: '',
            image: '',
            inventory: {
                quantity: 0,
                spot: '',
            }
        }
    },
    validationSchema: validationSchema,
    onSubmit: async (values,  {resetForm }) => {
      //alert(JSON.stringify(values, null, 2));
      const newProvider ={
        name: values.name,
        company: values.company,
        address: values.address,
        email: values.email,
        phonenumber: values.phonenumber,
        status: true,
        //end
        product: {
            name: values.nameproduct,
            description: values.description,
            brand: values.brand,
            image: values.image,
            inventory: {
                quantity: values.quantity,
                spot: values.spot,
            }
        }
      }
      
      console.log(newProvider)
      await axios({
        method:'POST',
        url:'https://apigreendesert.onrender.com/provider',
        data:JSON.stringify(newProvider),
        headers:{
          'Content-Type':'application/json'
        }
      }).then(res => {console.log(JSON.stringify(res.data.id))
        const newimg={
          image: newProvider.product.image,
          id: res.data.id
        }
        axios({
          method:'POST',
          url:`https://apigreendesert.onrender.com/product/upload${JSON.stringify(res.data.id)}`,
          data:JSON.stringify(newimg),
          headers:{
            'Content-Type':'application/json'
          }
        }).then((res)=>{
          console.log(res.data)
        }).then((err) =>{console.log(err)})
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'proveedpr Registrado Con exito',
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
        <Typography variant='h2'>Registrar proveedor</Typography>
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

            <Typography variant='h6'>Compañia</Typography>
            <TextField  name='company' 
                value={formik.values.company}
                onChange={formik.handleChange}
                error={formik.touched.company && Boolean(formik.errors.company)}
                helperText={formik.touched.company && formik.errors.company}/>
            <br />
            <Typography variant='h6'>Direccion</Typography>
            <TextField name='address' 
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}/>
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
            <Typography variant='h6'>Nombre del producto</Typography>
            <TextField  name='nameproduct' 
            value={formik.values.nameproduct}
            onChange={formik.handleChange}
            error={formik.touched.nameproduct && Boolean(formik.errors.nameproduct)}
            helperText={formik.touched.nameproduct && formik.errors.nameproduct}/>
            <br />
            <Typography variant='h6'>descripcion del producto</Typography>
            <TextField  name="description" 
            value={formik.values.description}
            onChange={formik.handleChange}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}/>
            <br />
            <Typography variant='h6'>brand</Typography>
            <TextField  name="brand" 
            value={formik.values.brand}
            onChange={formik.handleChange}
            error={formik.touched.brand && Boolean(formik.errors.brand)}
            helperText={formik.touched.brand && formik.errors.brand}/>
            <br />
            <Typography variant='h6'>imagen</Typography>
            <TextField  name="image" type='file'
            value={formik.values.image}
            onChange={formik.handleChange}
            error={formik.touched.image && Boolean(formik.errors.image)}
            helperText={formik.touched.image && formik.errors.image}/>
            <br />
            <Typography variant='h6'>cantidad</Typography>
            <TextField  name="quantity" 
            value={formik.values.quantity}
            onChange={formik.handleChange}
            error={formik.touched.quantity && Boolean(formik.errors.quantity)}
            helperText={formik.touched.quantity && formik.errors.quantity}/>
            <br />
            <Typography variant='h6'>spot</Typography>
            <TextField  name="spot" 
            value={formik.values.spot}
            onChange={formik.handleChange}
            error={formik.touched.spot && Boolean(formik.errors.spot)}
            helperText={formik.touched.spot && formik.errors.spot}/>
            <br />
           

            
          <Grid item>
            <Button variant='contained' disabled={disable} type='submit'>Registrar proveedor</Button>
          </Grid>
        </form>
      </Grid>
      
      </Grid>
    </>

  )
}
