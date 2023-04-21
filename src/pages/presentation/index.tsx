import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import { SignIn } from '../Auth/SignIn/SignIn'
import { Color } from '../../Theme/Colors/Color'

export const Index = () => {
  
  
  return (

      <Grid 
      container 
      rowSpacing={1} 
      direction={'row'} 
      justifyContent={'center'}
      justifyItems='center'
      textAlign={'center'}
      mt={25}
      sx={{backgroundColor: Color.GrayUltraDark, color: 'white', padding: 10}}>
      
        <Grid item 
        mt={22}
        xs={10} md={5} sm={10} 
        direction='column'
        textAlign='center'
        alignContent='center'
        alignItems='center'>
          <h1>
            <Typography variant='h1'>
              
              ¡Bienvenido!
            </Typography>
          
          </h1>
          <img src="src\assets\logo.png" alt=""/>
        </Grid>

        <Grid item justifyItems={'justify'} justifyContent={'justify'} textAlign={'justify'} xs={6}>
        <h1 style={{textAlign:'center'}}>
          <Typography variant='inherit'>Sobre Nosotros</Typography>
        </h1>
        <Typography variant='h6'>
          Green Desert es una empresa sonorense creada bajo el concepto de calidad total brindando el servicio mas completo en la instalación y mantenimiento de canchas deportivas y espacios recreativos utilizando césped artificial.
          <br />
          Nuestro principal objetivo es satisfacer y superar las expectativas necesarias para hacer posible el buen desarrollo del deporte y los espacios de esparcimiento en los hogares.
          <br />
          <strong>Valores:</strong>
          <br />
          <ul style={{listStyle: 'none'}}>
            <li>-Buen servicio y satisfacción</li>
            <li>-Compromiso con el medio ambiente</li>
            <li>-Control de calidad en procesos</li>
          </ul>
          </Typography>  

        

        
        </Grid>

        <Grid item justifyItems={'justify'} justifyContent={'justify'} textAlign={'justify'} xs={6}>
        <h1 style={{textAlign:'center'}}>
          <Typography variant='inherit'>Contacto</Typography>
        </h1>
          <Grid 
           container 
           rowSpacing={1} 
           direction={'row'} 
           columnSpacing={{xs:1, sm:2 , md:3}} 
           justifyContent={'center'}
           justifyItems='center'
           textAlign={'center'}>
            <Grid item xs={10} sm={10} md={5}>
              <a href="https://www.facebook.com/GreenDesertMX?locale=es_LA"> 
              <Typography variant='h6'>
                Facebook
              </Typography>
              </a>
            </Grid>
            <Grid item xs={10} sm={10} md={5}>
               <Typography variant='h6'>
               correo electronico: info@greendesert.mx
               </Typography>
            </Grid>


          </Grid>  

        

        
        </Grid>

      </Grid>





  )
}
