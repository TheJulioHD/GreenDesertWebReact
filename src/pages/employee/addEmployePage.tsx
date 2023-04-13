import { Person } from '@mui/icons-material'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { getAuth } from 'firebase/auth'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { employeeModel } from '../../assets/models/employee.model'
import axios from 'axios'

export const AddEmployePage = () => {
  
  const auth= getAuth();
  const navigate = useNavigate()
  const [authing, setAuthing] = useState(false)

  const[employee, setEmployee] = useState<employeeModel>({
      name: '',
      fristSurname: '',
      secondSurname: '',
      birthday: '',
      email: '',
      phonenumber: '',
      status: '',
    
  })
  const url= 'http://localhost:3000/user'
  const handleimputChange = ({target:{name, value}}:any) =>{
    
    // console.log(evt.currentTarget.value)
    console.log(name)
    setEmployee({...employee, [name]:value})
  }
  
  const handleSubmit = async(evt: React.FormEvent<HTMLFormElement| HTMLButtonElement>) =>{
    evt.preventDefault()
    console.log(employee)

    
    const newEmployee ={
      name: employee.name,
      fristSurname: employee.fristSurname,
      secondSurname: employee.secondSurname,
      birthday: employee.birthday,
      email: employee.email,
      phonenumber: employee.phonenumber,
      status: 'activo',
    }
    await axios({
      method:'POST',
      url:'http://localhost:3000/employee',
      data:JSON.stringify(newEmployee),
      headers:{
        'Content-Type':'application/json'
      }
    }).then(res => console.log(res.data))
    .catch(err => console.log(err))
  }
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
  return (
    <>

      <Grid container
      direction={'column'}
      alignItems='center'>
        <Typography variant='h2'>Registrar usuario</Typography>
      </Grid>

      <Grid container
      sx={{
        backgroundColor: 'primary.light',
        borderRadius: '5px',
        p: '2em'
      }}>

        <Grid container xs={6}
        textAlign='center'
        alignContent='center'>
          <Person sx={{fontSize: '400px', color: 'white'}}/>
          <Button variant='outlined'/>
        </Grid>


      <Grid container 
        xs={6}
        sx={{color: 'white'}}
        direction='column'
        alignContent='center'
        textAlign='center'>

          <Typography variant='h6'>Nombre</Typography>
          <TextField name='name' onChange={handleimputChange} />

          <Typography variant='h6'>Apellido paterno</Typography>
          <TextField  name='fristSurname' onChange={handleimputChange}/>

          <Typography variant='h6'>Apellido materno</Typography>
          <TextField name='secondSurname' onChange={handleimputChange}/>

          <Typography variant='h6'>Fecha de nacimiento</Typography>
          <TextField  name='birthday' type='date' onChange={handleimputChange}/>

          <Typography variant='h6'>Correo electronico</Typography>
          <TextField  name='email' onChange={handleimputChange}/>

          <Typography variant='h6'>numero celular</Typography>
          <TextField name='phonenumber' onChange={handleimputChange}/>

          
      </Grid>
      
      <Grid item>
        <Button variant='contained' onClick={handleSubmit}>Registrar empleado</Button>
      </Grid>
      </Grid>
    </>

  )
}
