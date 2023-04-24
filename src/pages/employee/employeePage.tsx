import { Button, Grid, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { userModel } from '../../assets/models/user.model'
import { employeeModel } from '../../assets/models/employee.model'
import axios from 'axios'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import EditEmployePage from './EditEmployePage'

let idTest : number

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
  const getIdv2 = (idv : number):any  => {
    navigate('/employee/edit/'+idv)
  }
  
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
    <div>
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
                        user.map((t:userModel) =>(
                          <TableRow key={t.id}>
                             <TableCell >{t.id}</TableCell>
                            <TableCell >{t.email}</TableCell>
                            <TableCell >{t.status}</TableCell>
                            <TableCell >{t.role.name}</TableCell>
                            <TableCell >{t.employee.name}</TableCell>
                            <TableCell >{t.employee.fristSurname}</TableCell>
                            <TableCell >{t.employee.secondSurname}</TableCell>
                            <TableCell >{t.employee.birthday}</TableCell>
                            <TableCell >{t.employee.phonenumber}</TableCell>
                            
                            <TableCell>
                              <Link to={`edit/${t.id}`}><Button color='success' variant="outlined">Edit</Button></Link>
                              &nbsp; <Button color='error' variant="outlined" onClick={()=>{

                              idTest = getId(t.id);

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

    </div>
  )
}
