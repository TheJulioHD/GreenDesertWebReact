import { Box, Button, Grid, Modal, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { userModel } from '../../assets/models/user.model'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useFormik } from 'formik'
import { employeeModel } from '../../assets/models/employee.model'
import * as yup from 'yup'

let idTest : number
let idt:number

let idTest2 : number



const getId = (id : number):any  => {
  return (
    Swal.fire({
      title: '¿Seguro que quieres eliminar?',
      text: "Una vez hecha esta accion no podra revertirce",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, quiero eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(id)
        Swal.fire(
          'Eliminado',
          'Los datos han sido eliminados',
          'success'
          )
          axios.delete(`http://localhost:3000/employee/delete/${id}`).then((res)=>{console.log(res)}).catch((err)=>{console.log(err)})
      }
    })
  )
}







export const EmployeePage = () => {
  
  const [user, setUser] = useState<userModel[]>([])
  const navigate= useNavigate()
  const [idv, setIdv] = useState({
    id:0
  })
  const getIdv5 = async (idv2 : any):Promise<any>  => {
    return (

      await axios({
        method: 'GET',
        url: `http://localhost:3000/employee/${idv2}`
      }).then(async(res) => {
        console.log("x" + res)
  
        await setEmployee(res.data)
        console.log(employee)
        setIdv(idv2)
        
  
      }).catch((err) => { console.log(err) })
  
      
    )}
  // edit
  const [employee, setEmployee] = useState<employeeModel>({
    name: '',
    fristSurname: '',
    secondSurname: '',
    birthday: '',
    email: '',
    phonenumber: '',
    status: '',
    password: '',
    user: {
      uuid: '',
      password: '',
      role: 0
    }
  })
  useEffect(() => {

    // axios({
    //   method: 'GET',
    //   url: `http://localhost:3000/employee/${idv}`
    // }).then((res) => {
    //   console.log("x" + res)

    //   setEmployee(res.data)
    //   console.log(employee)

    // }).catch((err) => { console.log(err) })

  }, [])
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = useState(false);
  const handleOpen = async() => {
    
    await setOpen(true)
    formik.values.name = employee.name
    formik.values.fristSurname = employee.fristSurname
    formik.values.secondSurname = employee.secondSurname
    formik.values.birthday = employee.birthday
    formik.values.email = employee.email
    formik.values.password = employee.password
    formik.values.phonenumber = employee.phonenumber
  };
  const handleClose = () => setOpen(false);


  const validationSchema = yup.object().shape({
    name: yup.string().trim().required('El nombre es requerido'),
    fristSurname: yup.string().trim().required('El apellido paterno es requerido'),
    secondSurname: yup.string().trim().required('El apellido materno es requerido'),
    birthday: yup.string().trim().required('La fecha tiene que ser requerida'),
    email: yup.string().trim().required('El email tiene que ser requerido').email('ingresa un email valido'),
    phonenumber: yup.string().trim().required('El telefono tiene que ser requerido').min(10, 'tiene que ser un minimo de 10 nuemros').max(10, 'tiene que tener un maximo de 10 numeros'),
    password: yup.string().trim().required('La contraseña tiene que ser requerida').min(6, 'tiene que ser un minimo de 6 nuemros'),

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
      password: '',
      user: {
        uuid: '',
        password: '',
        role: 0
      }

    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      //alert(JSON.stringify(values, null, 2));

      const newEmployee = {
        name: values.name,
        fristSurname: values.fristSurname,
        secondSurname: values.secondSurname,
        birthday: values.birthday,
        email: values.email,
        phonenumber: values.phonenumber,
        status: 'activo'
      }
      console.log(newEmployee)
      //axios.put(`http://localhost:3000/employee/update/${params.id}`, {newEmployee}).then((res)=>{console.log(res.status)}).catch((err)=>{console.log(err)})

      await axios({
        method: 'PUT',
        url: `http://localhost:3000/employee/update/${idv}`,
        data: JSON.stringify(newEmployee),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {console.log(res.data)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Has actualizado con exito!',
          showConfirmButton: false,
          timer: 1500
        })
      })
        .catch(err => console.log(err))
    }
  })
// end edit
   useEffect(()=>{
    axios({
      method:'GET',
      url:'http://localhost:3000/user/all'
    }).then((res) =>{
      console.log(res.data)
      setUser(res.data)
    })
   },[])
  return (
    <>
      <Grid container columnSpacing={{xs:1, sm:2 , md:3}}>
         <TableContainer>
            <TableHead> 
                <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>email</TableCell>
                    <TableCell>status</TableCell>
                    <TableCell>role</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Apellido Paterno</TableCell>
                    <TableCell>Apellido Materno</TableCell>
                    <TableCell>Fecha de Nacimiento</TableCell>
                    <TableCell>Telefono Celular</TableCell>
                    <TableCell>Editar</TableCell>
                </TableRow>

            </TableHead>
            <TableBody>

            {
                        user.map((t:any) =>(
                          <TableRow key={t.id}>
                             <TableCell key={t.id}>{t.id}</TableCell>
                            <TableCell >{t.email}</TableCell>
                            <TableCell >{t.status}</TableCell>
                            <TableCell >{t.role.name}</TableCell>
                            <TableCell >{t.employee.name}</TableCell>
                            <TableCell >{t.employee.fristSurname}</TableCell>
                            <TableCell >{t.employee.secondSurname}</TableCell>
                            <TableCell >{t.employee.birthday}</TableCell>
                            <TableCell >{t.employee.phonenumber}</TableCell>
                            
                            <TableCell>
                              <Button color='success' variant='outlined'  onClick={async()=>{
                                await getIdv5(t.id).then(async(res)=>{
                                 await handleOpen()

                                })
                                console.log(t.id)
                                console.log(idv);
                              }}>Edit</Button>
                              

                              &nbsp; <Button color='error' variant="outlined" onClick={()=>{

                              getId(t.id)

                              // axios.delete(`http://localhost:3000/employee/delete/${t.id}`).then((res)=>{console.log(res)}).catch((err)=>{console.log(err)})
                            }}>Deleted</Button></TableCell>
                            
                          </TableRow>
                        ))
                      }
                <TableRow>
                      
                </TableRow>
            </TableBody>
        </TableContainer>
      </Grid>

      <>
            <Modal
              open={open}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Button onClick={handleClose}>X</Button>
                <form onSubmit={formik.handleSubmit}>
                  <Typography variant='h6'>Nombre</Typography>
                  <TextField name='name'
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name} />
                  <br />

                  <Typography variant='h6'>Apellido paterno</Typography>
                  <TextField name='fristSurname'
                    value={formik.values.fristSurname}
                    onChange={formik.handleChange}
                    error={formik.touched.fristSurname && Boolean(formik.errors.fristSurname)}
                    helperText={formik.touched.fristSurname && formik.errors.fristSurname} />
                  <br />
                  <Typography variant='h6'>Apellido materno</Typography>
                  <TextField name='secondSurname'
                    value={formik.values.secondSurname}
                    onChange={formik.handleChange}
                    error={formik.touched.secondSurname && Boolean(formik.errors.secondSurname)}
                    helperText={formik.touched.secondSurname && formik.errors.secondSurname} />
                  <br />
                  <Typography variant='h6'>Fecha de nacimiento</Typography>
                  <TextField name='birthday' type='date'
                    value={formik.values.birthday}
                    onChange={formik.handleChange}
                    error={formik.touched.birthday && Boolean(formik.errors.birthday)}
                    helperText={formik.touched.birthday && formik.errors.birthday} />
                  <br />
                  <Typography variant='h6'>Correo electronico</Typography>
                  <TextField name='email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email} />
                  <br />
                  <Typography variant='h6'>Contraseña</Typography>
                  <TextField name="password"
                    type='password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password} />
                  <br />
                  <Typography variant='h6'>numero celular</Typography>
                  <TextField name='phonenumber'
                    value={formik.values.phonenumber}
                    onChange={formik.handleChange}
                    error={formik.touched.phonenumber && Boolean(formik.errors.phonenumber)}
                    helperText={formik.touched.phonenumber && formik.errors.phonenumber} />


                  <Grid item>
                    <Button variant='contained' type='submit'>Actualizar empleado</Button>
                  </Grid>
                </form>
              </Box>
            </Modal>
          </>
    </>
  )
}
