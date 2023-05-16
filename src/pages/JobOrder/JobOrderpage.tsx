import { Box, Button, Grid, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { employeeModel } from '../../assets/models/employee.model'
import { userModel } from '../../assets/models/user.model'
import * as yup from 'yup'
import { IProvider } from '../../assets/models/provider.model'
import { IProduct } from '../../assets/models/product.model'
import { Ijobordermodel } from '../../assets/models/joborder.model'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { uuid } from '../../services/auth/AuthRouter'


let idTest: number
let idt: number

let idTest2: number



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
                axios.delete(`https://apigreendesert.onrender.com/jobOrder/delete/${id}`).then((res) => { console.log(res) }).catch((err) => { console.log(err) })
            }
        })
    )
}

const JobOrderpage = () => {
    
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

    
    // useEffect(() =>{
    //     axios({
    //         method: 'GET',
    //         url: `https://apigreendesert.onrender.com/user/one/${uuid}`
    //     }).then((res) => {
    //         console.log(res.data)
    //         setUser2(res.data)
    //         console.log(user2)
    //     })
    // }, [])
    const [user, setUser] = useState<IProvider[]>([])
    const navigate = useNavigate()
    const [idv, setIdv] = useState({
        id: 0
    })
    const getIdv5 = async (idv2: any): Promise<any> => {
        return (

            await axios({
                method: 'GET',
                url: `https://apigreendesert.onrender.com/jobOrder/${idv2}`
            }).then(async (res) => {
                console.log("x" + res)

                await setprovider(res.data)
                console.log(provider)
                setIdv(idv2)

            }).catch((err) => { console.log(err) })


        )
    }
    // edit
    const [provider, setprovider] = useState<Ijobordermodel>({
        quantity: 0,
        customer: 0,
        employee: 0,
        status: true,
        inventory: {
            quantity: 0,
            spot: '',
        },
        product: 0,
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
    const [open, setOpen] = useState(false);
    const handleOpen = async () => {

        await setOpen(true)
        formik.values.customer = provider.customer
        formik.values.employee = provider.employee
        formik.values.product = provider.product
        formik.values.quantity = provider.quantity

    };

    const handleClose = () => setOpen(false);



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
            //axios.put(`https://apigreendesert.onrender.com/employee/update/${params.id}`, {newEmployee}).then((res)=>{console.log(res.status)}).catch((err)=>{console.log(err)})

            await axios({
                method: 'PUT',
                url: `https://apigreendesert.onrender.com/jobOrder/update/${idv}`,
                data: JSON.stringify(newjoborder),
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
            url: 'https://apigreendesert.onrender.com/jobOrder/all'
        }).then((res) => {
            console.log(res.data)
            setUser(res.data)
        })
    }, [])

    
    return (
        <div>
            <Typography variant='h3' textAlign={'center'}>JobOrder Registrados</Typography>
            <br />

            <TableContainer sx={{ textAlign: 'justify' }}>
                <Table>
                    <TableHead >
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>cantidad</TableCell>
                            <TableCell>Cliente</TableCell>
                            <TableCell>Empleado</TableCell>
                            <TableCell>status</TableCell>
                            <TableCell>Editar</TableCell>
                        </TableRow>

                    </TableHead>
                    <TableBody>

                        {
                            user.map((t: any, index) => (
                                <TableRow key={t.id}>
                                    <TableCell key={t.id}>{index + 1}</TableCell>
                                    <TableCell>{t.name}</TableCell>
                                    <TableCell>{t.quantity}</TableCell>
                                    <TableCell>{t.customer.name}</TableCell>
                                    <TableCell>{t.employee.name}</TableCell>
                                    <TableCell>{`${t.status}`}</TableCell>
                                    <TableCell>
                                        <Button color='success' disabled={disable} variant='outlined' onClick={async () => {
                                            await getIdv5(t.id).then(async (res) => {
                                                await handleOpen()

                                            })
                                            console.log(t.id)
                                            console.log(idv);
                                        }}>Edit</Button>


                                        &nbsp; <Button disabled={disable} color='error' variant="outlined" onClick={() => {

                                            getId(t.id)

                                            // axios.delete(`https://apigreendesert.onrender.com/employee/delete/${t.id}`).then((res)=>{console.log(res)}).catch((err)=>{console.log(err)})
                                        }}>Deleted</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        }

                    </TableBody>
                </Table>
            </TableContainer>

            <>
                <Modal
                    open={open}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Button onClick={handleClose}>X</Button>
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
                                <Button disabled={disable} variant='contained' type='submit'>Actualizar proveedor</Button>
                            </Grid>
                        </form>
                    </Box>
                </Modal>
            </>

        </div>
    )
}

export default JobOrderpage