import { Person } from '@mui/icons-material'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { employeeModel } from '../../assets/models/employee.model'
import axios from 'axios'
import * as yup from 'yup'
import { useFormik } from 'formik'

export const AddEmployePage = () => {
  
  const auth= getAuth();
  const navigate = useNavigate()
  const [authing, setAuthing] = useState(false)

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
  const url= 'http://localhost:3000/user'
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
  //     url:'http://localhost:3000/employee',
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
      fristSurname: yup.string().trim().required('El apellido paterno es requerido'),
      secondSurname: yup.string().trim().required('El apellido materno es requerido'),
      birthday: yup.string().trim().required('La fecha tiene que ser requerida'),
      email: yup.string().trim().required('El email tiene que ser requerido').email('ingresa un email valido'),
      phonenumber: yup.string().trim().required('El telefono tiene que ser requerido').min(10,'tiene que ser un minimo de 10 nuemros').max(10, 'tiene que tener un maximo de 10 numeros'),
      password: yup.string().trim().required('La contraseña tiene que ser requerida').min(6,'tiene que ser un minimo de 6 nuemros'),
      
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
      password:'',
      user: {
        uuid:'',
        password:'',
        role:0
      }
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      //alert(JSON.stringify(values, null, 2));
      
      createUserWithEmailAndPassword(auth, values.email, values.password).then(async(res) =>{
        const newEmployee ={
          name: values.name,
          fristSurname: values.fristSurname,
          secondSurname: values.secondSurname,
          birthday: values.birthday,
          email: values.email,
          phonenumber: values.phonenumber,
          status: 'activo',
          user: {
            uuid:'',
            password: values.password,
            role: 1
          }
        }
        newEmployee.user.uuid = res.user.uid
        await axios({
          method:'POST',
          url:'http://localhost:3000/employee',
          data:JSON.stringify(newEmployee),
          headers:{
            'Content-Type':'application/json'
          }
        }).then(res => console.log(res.data))
        .catch(err => console.log(err))
          
      }).catch((err) => {console.log(err)})


      navigate('/')
    },
  })
  return (
    <>
    </>

  )
}
