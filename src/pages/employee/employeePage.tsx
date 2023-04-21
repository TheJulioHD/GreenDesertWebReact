import { Button, Grid, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useState } from 'react'
import { userModel } from '../../assets/models/user.model'
import { employeeModel } from '../../assets/models/employee.model'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



export const EmployeePage = () => {
  const [user, setUser] = useState<userModel[]>([])
  const navigate= useNavigate()
  axios({
    method:'GET',
    url:'http://localhost:3000/user/all'
  }).then((res) =>{
    console.log(res.data)
    setUser(res.data)
  })
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
                            
                            <TableCell><Button color='success' variant="outlined" onClick={()=>{
                              navigate(`/employee/edit/${t.id}`)
                            }}>Edit</Button>&nbsp; <Button color='error' variant="outlined" onClick={()=>{
                              axios.delete(`http://localhost:3000/employee/delete/${t.id}`).then((res)=>{console.log(res)}).catch((err)=>{console.log(err)})
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
