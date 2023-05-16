import { Box, Button, Grid, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { employeeModel } from '../../assets/models/employee.model'
import { userModel } from '../../assets/models/user.model'
import * as yup from 'yup'
import { IInventory } from '../../assets/models/inventory.model'
import { uuid } from '../../services/auth/AuthRouter'
import { customerModel } from '../../assets/models/customer.model'
import { getAuth, onAuthStateChanged } from 'firebase/auth'


let idTest: number
let idt: number

let idTest2: number
debugger
let uid = uuid

// 
const columns = [
    {
        name: "id",
        label: "ID"
    },
    {
        name: "quantity",
        label: "cantidad"
    },
    {
        name: "spot",
        label: "spot"
    },
    {
        name: "product2.name",
        label: "nombre del producto"
    }
]


//

const getId = (id: number): any => {
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
                axios.delete(`https://apigreendesert.onrender.com/customer/delete/${id}`).then((res) => { console.log(res) }).catch((err) => { console.log(err) })
            }
        })
    )
}
const Customerpage = () => {
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

    const [user, setUser] = useState<customerModel[]>([])
    const navigate = useNavigate()
    const [idv, setIdv] = useState({
        id: 0
    })
    const getIdv5 = async (idv2: any): Promise<any> => {
        return (

            await axios({
                method: 'GET',
                url: `https://apigreendesert.onrender.com/customer/${idv2}`
            }).then(async (res) => {
                console.log("x" + res)

                await setCustomer(res.data)
                console.log(customer)
                setIdv(idv2)


            }).catch((err) => { console.log(err) })


        )
    }
    // edit
    const [customer, setCustomer] = useState<customerModel>({


        name: '',
        fristSurname: '',
        secondSurname: '',
        email: '',
        phonenumber: '',
        status: true


    })
    useEffect(() => {

        // axios({
        //   method: 'GET',
        //   url: `https://apigreendesert.onrender.com/employee/${idv}`
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
    const [idprovedor, setIdProvedor] = useState();

    const [open2, setOpen2] = useState(false);


    const handleOpen2 = async () => {

        await setOpen2(true)

        formik2.values.name = customer.name
        formik2.values.fristSurname = customer.fristSurname
        formik2.values.secondSurname = customer.secondSurname
        formik2.values.email = customer.email
        formik2.values.phonenumber = customer.phonenumber
        // formik.values.address = provider.address
        // formik.values.email = provider.email
        // formik.values.phonenumber = provider.phonenumber
    };

    const handleClose2 = () => setOpen2(false);





    const validationSchema2 = yup.object().shape({
        name: yup.string().trim().required('El nombre es requerido'),
        fristSurname: yup.string().trim().required('La compañia paterno es requerido'),
        secondSurname: yup.string().trim().required('La direccion materno es requerido'),
        email: yup.string().trim().required('El email tiene que ser requerido').email('ingresa un email valido'),
        phonenumber: yup.string().trim().required('El telefono tiene que ser requerido').min(10, 'tiene que ser un minimo de 10 nuemros').max(10, 'tiene que tener un maximo de 10 numeros'),


    });

    const formik2 = useFormik<customerModel>({
        initialValues: {

            name: '',
            fristSurname: '',
            secondSurname: '',
            email: '',
            phonenumber: '',
            status: true


        },
        validationSchema: validationSchema2,
        onSubmit: async (values, { resetForm }) => {
            //alert(JSON.stringify(values, null, 2));

            const newCustomer = {
                name: values.name,
                fristSurname: values.fristSurname,
                secondSurname: values.secondSurname,
                email: values.email,
                phonenumber: values.phonenumber,
                status: true,
                //end
            }

            console.log(newCustomer)
            //axios.put(`https://apigreendesert.onrender.com/employee/update/${params.id}`, {newEmployee}).then((res)=>{console.log(res.status)}).catch((err)=>{console.log(err)})

            await axios({
                method: 'PUT',
                url: `https://apigreendesert.onrender.com/customer/update/${idv}`,
                data: JSON.stringify(newCustomer),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                console.log(res.data)
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Has actualizado con exito!',
                    showConfirmButton: false,
                    timer: 1500
                })
                resetForm()
            })
                .catch(err => console.log(err))
        }
    })

    // end edit
    useEffect(() => {
        axios({
            method: 'GET',
            url: 'https://apigreendesert.onrender.com/customer/all'
        }).then((res) => {
            console.log(res.data)
            setUser(res.data)
            console.log(JSON.stringify(uid))

        })
    }, [])

    const [id, setId] = useState({})
    const handelid = () => {
        setId(uid)
        console.log(id)
    }
    return (
        <div>
            <Typography variant='h3' textAlign={'center'}>Clientes Registrados</Typography>
            <br />

            <TableContainer sx={{ textAlign: 'justify' }}>
                <Table>
                    <TableHead >
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Apellido Paterno</TableCell>
                            <TableCell>Apellido Materno</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Celular</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>

                    </TableHead>
                    <TableBody>

                        {
                            user.map((t: any, index) => (
                                <TableRow key={t.id}>
                                    <TableCell key={t.id}>{index + 1}</TableCell>
                                    <TableCell>{t.name}</TableCell>
                                    <TableCell>{t.fristSurname}</TableCell>
                                    <TableCell>{t.secondSurname}</TableCell>
                                    <TableCell>{t.email}</TableCell>
                                    <TableCell>{t.phonenumber}</TableCell>
                                    <TableCell>{`${t.status}`}</TableCell>
                                    <TableCell>
                                        <Button color='success' disabled={disable} variant='outlined' onClick={async () => {
                                            await getIdv5(t.id).then(async (res) => {
                                                await handleOpen2()

                                            })
                                            console.log(t.id)
                                            console.log(idv);
                                        }}>Edit</Button>


                                        &nbsp; <Button color='error' disabled={disable} variant="outlined" onClick={() => {

                                            getId(t.id)

                                            // axios.delete(`https://apigreendesert.onrender.com/employee/delete/${t.id}`).then((res)=>{console.log(res)}).catch((err)=>{console.log(err)})
                                        }}>Deleted</Button>  &nbsp;

                                    </TableCell>
                                </TableRow>
                            ))
                        }

                    </TableBody>
                </Table>
            </TableContainer>




            <>
                <Modal
                    open={open2}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Button onClick={handleClose2}>X</Button>
                        <form onSubmit={formik2.handleSubmit}>
                            <br />
                            <Typography variant='h6'>Nombre</Typography>
                            <TextField name='name'
                                value={formik2.values.name}
                                onChange={formik2.handleChange}
                                error={formik2.touched.name && Boolean(formik2.errors.name)}
                                helperText={formik2.touched.name && formik2.errors.name} />
                            <br />

                            <Typography variant='h6'>Apellido paterno</Typography>
                            <TextField name='fristSurname'
                                value={formik2.values.fristSurname}
                                onChange={formik2.handleChange}
                                error={formik2.touched.fristSurname && Boolean(formik2.errors.fristSurname)}
                                helperText={formik2.touched.fristSurname && formik2.errors.fristSurname} />
                            <br />
                            <Typography variant='h6'>Apellido Materno</Typography>
                            <TextField name='secondSurname'
                                value={formik2.values.secondSurname}
                                onChange={formik2.handleChange}
                                error={formik2.touched.secondSurname && Boolean(formik2.errors.secondSurname)}
                                helperText={formik2.touched.secondSurname && formik2.errors.secondSurname} />
                            <br />
                            <Typography variant='h6'>Correo electronico</Typography>
                            <TextField name='email'
                                value={formik2.values.email}
                                onChange={formik2.handleChange}
                                error={formik2.touched.email && Boolean(formik2.errors.email)}
                                helperText={formik2.touched.email && formik2.errors.email} />
                            <br />
                            <Typography variant='h6'>numero celular</Typography>
                            <TextField name='phonenumber'
                                value={formik2.values.phonenumber}
                                onChange={formik2.handleChange}
                                error={formik2.touched.phonenumber && Boolean(formik2.errors.phonenumber)}
                                helperText={formik2.touched.phonenumber && formik2.errors.phonenumber} />
                            <br />


                            <Grid item>
                                <Button variant='contained' type='submit'>Actualizar Inventario</Button>
                            </Grid>
                        </form>
                    </Box>
                </Modal>
            </>
        </div>
    )
}

export default Customerpage