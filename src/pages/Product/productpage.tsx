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
import { getAuth, onAuthStateChanged } from 'firebase/auth'


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
                axios.delete(`http://localhost:3000/product/delete/${id}`).then((res) => { console.log(res) }).catch((err) => { console.log(err) })
            }
        })
    )
}
const Productpage = () => {

    // const [disable, setDisable] = useState(false)
    // const [uuid, setuuid] = useState<any>()
    // const auth = getAuth()
    // const [loading, setLoading] = useState(false)
    // const [user2, setUser2]= useState<any>({})


    // useEffect(() => {
    //     AuthCheck()
    // }, [auth])

    // const AuthCheck = onAuthStateChanged(auth, (user) => {
    //     if (user) {
    //          setuuid(user.uid) 
    //         setLoading(false)
    //         console.log(user.uid)
            
    //             axios({
    //                 method: 'GET',
    //                 url: `http://localhost:3000/user/one/${user.uid}`
    //             }).then((res) => {
    //                 console.log(res.data)
    //                 setUser2(res.data)
    //                 console.log(user2)

    //                 if(user2.role.id == 1){
    //                     console.log('soy operador')
    //                     setDisable(true)
    //                 }else{
    //                     console.log('soy admin')
    //                     setDisable(false)
    //                 }
    //             })
            

    //     } else {
            
    //     }
    // })
    const [user, setUser] = useState<IProvider[]>([])
    const navigate = useNavigate()
    const [idv, setIdv] = useState({
        id: 0
    })
    const getIdv5 = async (idv2: any): Promise<any> => {
        return (

            await axios({
                method: 'GET',
                url: `http://localhost:3000/product/${idv2}`
            }).then(async (res) => {
                console.log("x" + res)

                await setproduct(res.data)
                console.log(product)
                setIdv(idv2)


            }).catch((err) => { console.log(err) })


        )
    }
    // edit
    const [product, setproduct] = useState<IProduct>({

        name: '',
        description: '',
        brand: '',
        image: '',
        inventory: {
            quantity: 0,
            spot: '',
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

    const [open2, setOpen2] = useState(false);


    const handleOpen2 = async () => {

        await setOpen2(true)

        formik2.values.name = product.name;
        formik2.values.description = product.description;
        formik2.values.brand = product.brand;

    };

    const handleClose2 = () => setOpen2(false);




    const validationSchema2 = yup.object().shape({
        name: yup.string().trim().required('Nombre del producto es requerido'),
        description: yup.string().trim().required('La descripcion es requerida'),
        brand: yup.string().trim().required('La brand es requerida'),

    });

    const formik2 = useFormik<IProduct>({
        initialValues: {
            name: '',
            description: '',
            brand: '',
            image: '',
            inventory: {
                quantity: 0,
                spot: '',
            }

        },
        validationSchema: validationSchema2,
        onSubmit: async (values, { resetForm }) => {
            //alert(JSON.stringify(values, null, 2));

            const newProduct = {
                name: values.name,
                description: values.description,
                brand: values.brand,
                image: values.image
                
            }
            console.log(newProduct)
            //axios.put(`http://localhost:3000/employee/update/${params.id}`, {newEmployee}).then((res)=>{console.log(res.status)}).catch((err)=>{console.log(err)})

            await axios({
                method: 'PUT',
                url: `http://localhost:3000/product/update/${idv}`,
                data: JSON.stringify(newProduct),
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
            url: 'http://localhost:3000/product/all'
        }).then((res) => {
            console.log(res.data)
            setUser(res.data)
        })
    }, [])
    return (
        <div>
            <Typography variant='h3' textAlign={'center'}>Productos Registrados</Typography>
            <br />

            <TableContainer sx={{ textAlign: 'justify' }}>
                <Table>
                <TableHead >
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Descripcion</TableCell>
                        <TableCell>Brand</TableCell>
                        <TableCell>imagen</TableCell>
                        <TableCell>proveedor</TableCell>

                        <TableCell>Editar</TableCell>
                    </TableRow>

                </TableHead>
                <TableBody>

                    {
                        user.map((t: any, index) => (
                            <TableRow key={t.id}>
                                <TableCell key={t.id}>{index+1}</TableCell>
                                <TableCell>{t.name}</TableCell>
                                <TableCell>{t.description}</TableCell>
                                <TableCell>{t.brand}</TableCell>
                                <TableCell>{t.image}</TableCell>
                                <TableCell>{t.provider.name}</TableCell>
                                <TableCell>
                                    <Button color='success' variant='outlined' onClick={async () => {
                                        await getIdv5(t.id).then(async (res) => {
                                            await handleOpen2()

                                        })
                                        console.log(t.id)
                                        console.log(idv);
                                    }}>Edit</Button>


                                    &nbsp; <Button color='error' variant="outlined" onClick={() => {

                                        getId(t.id)

                                        // axios.delete(`http://localhost:3000/employee/delete/${t.id}`).then((res)=>{console.log(res)}).catch((err)=>{console.log(err)})
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
                            <Typography variant='h6'>Nombre</Typography>
                            <TextField name='name'
                                value={formik2.values.name}
                                onChange={formik2.handleChange}
                                error={formik2.touched.name && Boolean(formik2.errors.name)}
                                helperText={formik2.touched.name && formik2.errors.name} />
                            <br />

                            <Typography variant='h6'>descripcion</Typography>
                            <TextField name='description'
                                value={formik2.values.description}
                                onChange={formik2.handleChange}
                                error={formik2.touched.description && Boolean(formik2.errors.description)}
                                helperText={formik2.touched.description && formik2.errors.description} />
                            <br />
                            <Typography variant='h6'>brand</Typography>
                            <TextField name='brand'
                                value={formik2.values.brand}
                                onChange={formik2.handleChange}
                                error={formik2.touched.brand && Boolean(formik2.errors.brand)}
                                helperText={formik2.touched.brand && formik2.errors.brand} />
                            <br />
                            <Typography variant='h6'>imagen</Typography>
                            <TextField name='image' type='file'
                                value={formik2.values.image}
                                onChange={formik2.handleChange}
                                error={formik2.touched.image && Boolean(formik2.errors.image)}
                                helperText={formik2.touched.image && formik2.errors.image} />
                            <br />


                            <Grid item>
                                <Button variant='contained' type='submit'>Actualizar producto</Button>
                            </Grid>
                        </form>
                    </Box>
                </Modal>
            </>
        </div>
    )
}

export default Productpage