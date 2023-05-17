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
import { IInventory } from '../../assets/models/inventory.model'
import { uuid } from '../../services/auth/AuthRouter'
import MUIDataTable from "mui-datatables";
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
                axios.delete(`http://localhost:3000/inventory/delete/${id}`).then((res) => { console.log(res) }).catch((err) => { console.log(err) })
            }
        })
    )
}
const Inventoriypage = () => {
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
    // });

    const [user, setUser] = useState<IInventory[]>([])
    const navigate = useNavigate()
    const [idv, setIdv] = useState({
        id: 0
    })
    const getIdv5 = async (idv2: any): Promise<any> => {
        return (

            await axios({
                method: 'GET',
                url: `http://localhost:3000/inventory/${idv2}`
            }).then(async (res) => {
                console.log("x" + res)

                await setInventory(res.data)
                console.log(inventory)
                setIdv(idv2)
                

            }).catch((err) => { console.log(err) })


        )
    }
    // edit
    const [inventory, setInventory] = useState<IInventory>({
        

                quantity: 0,
                spot: '',
            
        
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
    const [idprovedor, setIdProvedor]=useState();
 
    const [open2, setOpen2] = useState(false);
   

    const handleOpen2 = async () => {

        await setOpen2(true)
       
        formik2.values.quantity = inventory.quantity
        formik2.values.spot = inventory.spot
        // formik.values.address = provider.address
        // formik.values.email = provider.email
        // formik.values.phonenumber = provider.phonenumber
    };
 
    const handleClose2 = () => setOpen2(false);



   

    const validationSchema2 = yup.object().shape({
        quantity: yup.number().required('La cantidad del producto es requerida').min(1, 'el minimo tiene que ser 1'),
        spot: yup.string().trim().required('La descripcion es requerida'),
        
       
    });

    const formik2 = useFormik<IInventory>({
        initialValues: {
            
                quantity: 0,
                spot: '',
            

        },
        validationSchema: validationSchema2,
        onSubmit: async (values, { resetForm }) => {
            //alert(JSON.stringify(values, null, 2));

            const newInventory = {
                    quantity: values.quantity,
                    spot: values.spot,
                
            }
            console.log(newInventory)
            //axios.put(`http://localhost:3000/employee/update/${params.id}`, {newEmployee}).then((res)=>{console.log(res.status)}).catch((err)=>{console.log(err)})

            await axios({
                method: 'PUT',
                url: `http://localhost:3000/inventory/update/${idv}`,
                data: JSON.stringify(newInventory),
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
            url: 'http://localhost:3000/inventory/all'
        }).then((res) => {
            console.log(res.data)
            setUser(res.data)
            console.log(JSON.stringify(uid))
            axios({
                method: 'GET',
                url: `http://localhost:3000/user/one${uid}`
            }).then((res)=>{
                console.log(res.data)
            })
        })
    }, [])

    const [id, setId] = useState({})
const handelid=()=>{
    setId(uid)
    console.log(id)
}
    return (
        <div>
            <Typography variant='h3' textAlign={'center'}>Inventario Registrados</Typography>
            <br />
            
            <TableContainer  sx={{textAlign:'justify'}}>
                <Table>
                <TableHead >
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Cantida</TableCell>
                        <TableCell>Spot</TableCell>
                        <TableCell>Nombre del producto</TableCell>
                       
                        <TableCell>Editar</TableCell>
                    </TableRow>

                </TableHead>
                <TableBody>

                    {
                        user.map((t: any, index) => (
                            <TableRow key={t.id}>
                                <TableCell key={t.id}>{index}</TableCell>
                                <TableCell>{t.quantity}</TableCell>
                                <TableCell>{t.spot}</TableCell>
                                <TableCell>{t.product.name}</TableCell>
                                <TableCell>
                                    <Button color='success'  variant='outlined' onClick={async () => {
                                        await getIdv5(t.id).then(async (res) => {
                                            await handleOpen2()

                                        })
                                        console.log(t.id)
                                        console.log(idv);
                                    }}>Edit</Button>


                                    &nbsp; <Button color='error'  variant="outlined" onClick={() => {

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
                            <br />
                            <Typography variant='h6'>cantidad</Typography>
                            <TextField name='quantity'
                                value={formik2.values.quantity}
                                onChange={formik2.handleChange}
                                error={formik2.touched.quantity && Boolean(formik2.errors.quantity)}
                                helperText={formik2.touched.quantity && formik2.errors.quantity} />
                            <br />

                            <Typography variant='h6'>spot</Typography>
                            <TextField name='spot'
                                value={formik2.values.spot}
                                onChange={formik2.handleChange}
                                error={formik2.touched.spot && Boolean(formik2.errors.spot)}
                                helperText={formik2.touched.spot && formik2.errors.spot} />
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

export default Inventoriypage