import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { userModel } from '../../../assets/models/user.model';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { Person } from '@mui/icons-material';

export const SignIn = () => {

  const auth= getAuth();
  const navigate = useNavigate()
  const [authing, setAuthing] = useState(false)

  const[user, setUser] = useState<userModel>({
    uuid:'',
    email:'',
    password:'',
    status:'',
    role:0,
    employee:0,
    
  })
  const url= 'http://localhost:3000/user'
  const handleimputChange = ({target:{name, value}}:any) =>{
    
    // console.log(evt.currentTarget.value)
    console.log(name)
    setUser({...user, [name]:value})
  }
  const handleSubmit = async(evt: React.FormEvent<HTMLFormElement| HTMLButtonElement>) =>{
    setAuthing(true)
    evt.preventDefault();
    console.log(user)
    await signInWithEmailAndPassword(auth, user.email, user.password).then( async(res)=>{
      console.log(res.user.uid)
      user.uuid = res.user.uid
      // const resp = await GDApi.post('user', {user}).then(
      //   (res) => console.log(res.data)
      // ).catch((err)=>console.log(err))
      // debugger
      // const newuser ={
      //   uuid: user.uuid,
      //     email: user.email,
      //     password: user.password,
      //     status: user.status,
      //     role: 1,
      //     employee: 3
      // }
      // await axios({
      //   method:'POST',
      //   url:'http://localhost:3000/user',
      //   data:JSON.stringify(newuser),
      //   headers:{
      //     'Content-Type':'application/json'
      //   }
      // }).then(res => console.log(res.data))
      // .catch(err => console.log(err))

      // try {
      //   const resp = await axios.post(url, user)
      // console.log(resp.data)
      // } catch (error) {
      //   console.log(error)
      // }
      navigate('/')
    }).catch((err)=>{
      console.log(err)
      setAuthing(false)
    })
  }

  
  return (
    <Grid container
    direction="column"
    alignItems="center"
    justifyContent="center"
    justifyItems='center'>

  <Grid container
    direction='column'
    alignContent='center'
    alignItems='center'
    justifyItems='center'
    columnSpacing={1}>

    <Typography variant='h1'>¡Bienvenido!</Typography>
    <Typography variant='h3'>Logea tu cuenta</Typography>

  </Grid>
  
  <Grid container
    direction="column"
    alignItems="center"
    justifyContent="center"
    justifyItems='center'
    xs={8}
    sx={{
      backgroundColor: 'primary.dark', 
      borderRadius: 5
    }}>

    <Grid item>
      <Person 
        sx={{
          color:'white',
          fontSize: '300px'
        }}/>

    </Grid>
      <TextField
        name='email'
        margin='normal'
        label='Correo'
        variant='filled'
        onChange={handleimputChange}
        sx={{
          input: {color: 'white'},
          border: 'secondary.main',
          backgroundColor: 'primary.light'
        }}/>


      <TextField
        name='password'
        margin='normal'
        label='Contraseña'
        variant='filled'
        type='password'
        onChange={handleimputChange}
        sx={{
          input: {color: 'white'},
          border: 'secondary.main',
          backgroundColor: 'primary.light'
        }}/>

        
        
  </Grid>
  
  <Grid item>
    <Button variant='contained' onClick={handleSubmit}>Inicio de sesion</Button>
  </Grid>
  
</Grid>
  )
}
