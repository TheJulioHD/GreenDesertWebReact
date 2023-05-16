import { Category, Hail, Inventory, LocalShipping, Menu, MenuBook, Person, TurnedInNot } from "@mui/icons-material"
import { Box, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { Color } from "../../Theme/Colors/Color";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

export const SideBar = ({ drawerWidth = 340 }) => {

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

  const navigate = useNavigate();
  let options = ['Inventario', 'Clientes', 'Empleados', 'Proveedores'];
  let descriptions = ['asd', 'b', 'c', 'd'];

  const changePage = (event: React.FormEvent<HTMLFormElement | HTMLButtonElement>): any => {
    event.preventDefault();

  }

  

  return (

    <Box
      component='nav'
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
        }}
      >
        <Toolbar >

          <Grid container
            direction='row'
            justifyContent='space-between'
            alignItems='center'

          >
            <Typography variant="h6" noWrap component='div'>Menu</Typography>

            <IconButton>
              <Menu />
            </IconButton>
          </Grid>


        </Toolbar>

        <Divider />
        <List>
          {
            <ListItem key={'a'} disablePadding>

              <Grid width='100%'>

                <ListItemButton onClick={() => { }}>
                  <ListItem>
                    <Person />
                    <ListItemText primary={'Empleados'} />
                  </ListItem>
                </ListItemButton>


                <ListItemButton disabled={disable} onClick={() => { }}>
                  <ListItem sx={{ ml: 2 }}>
                    <a href="/employee/add">

                      <Person />
                      <ListItemText secondary={'Agregar empleados'} />
                    </a>
                  </ListItem>
                </ListItemButton>

                <ListItemButton disabled={disable} onClick={() => { }}>
                  <ListItem sx={{ ml: 2 }}>
                    <a href="/employee">

                      <Person />

                      <ListItemText secondary={'Visualizar empleados'} />
                    </a>
                  </ListItem>
                </ListItemButton>

                <ListItemButton  onClick={() => { }}>
                  <ListItem>
                    <Hail />
                    <ListItemText primary={'Clientes'} />
                  </ListItem>
                </ListItemButton>


                <ListItemButton disabled={disable} onClick={() => { }}>
                  <ListItem sx={{ ml: 2 }}>
                    <a href="/customer/add">

                      <Hail />
                      <ListItemText secondary={'Agregar cliente'} />
                    </a>
                  </ListItem>
                </ListItemButton>

                <ListItemButton disabled={disable} onClick={() => { }}>
                  <ListItem sx={{ ml: 2 }}>
                    <a href="/customer">

                      <Hail />
                      <ListItemText secondary={'Visualizar clientes'} />
                    </a>
                  </ListItem>
                </ListItemButton>

                <ListItemButton onClick={() => { }}>
                  <ListItem>
                    <Inventory />
                    <ListItemText primary={'Inventario'} />
                  </ListItem>
                </ListItemButton>


                <ListItemButton disabled={disable} onClick={() => { }}>
                  <ListItem sx={{ ml: 2 }}>
                    <a href="/invetory">
                      <Inventory />
                      <ListItemText secondary={'Visualizar inventario'} />
                    </a>
                  </ListItem>
                </ListItemButton>

                <ListItemButton disabled={disable} onClick={() => {  }}>
                  <ListItem>
                    <LocalShipping />
                    <ListItemText primary={'Provedores'} />
                  </ListItem>
                </ListItemButton>

                <ListItemButton disabled={disable} onClick={() => { }}>
                  <ListItem sx={{ ml: 2 }}>
                    <a href="/proveedores/add">

                    <LocalShipping />
                    <ListItemText secondary={'Agregar proveedor'} />
                    </a>
                  </ListItem>
                </ListItemButton>

                <ListItemButton disabled={disable} onClick={() => {  }}>
                  <ListItem sx={{ ml: 2 }}>
                    <a href="/proveedores">

                    <LocalShipping />
                    <ListItemText secondary={'Visualizar provedores'} />
                    </a>
                  </ListItem>
                </ListItemButton>

                <ListItemButton onClick={() => { }}>
                  <ListItem>
                    <Category />
                    <ListItemText primary={'Productos'} />
                  </ListItem>
                </ListItemButton>


                <ListItemButton disabled={disable} onClick={() => { }}>
                  <ListItem sx={{ ml: 2 }}>
                    <a href="/productos">

                    <Category />
                    <ListItemText secondary={'Visualizar productos'} />
                    </a>
                  </ListItem>
                </ListItemButton>

                <ListItemButton  onClick={() => { }}>
                  <ListItem>
                    <Category />
                    <ListItemText primary={'JobOrder'} />
                  </ListItem>
                </ListItemButton>


                <ListItemButton disabled={disable} onClick={() => { }}>
                  <ListItem sx={{ ml: 2 }}>
                    <a href="/joborder/add">

                    <Category />
                    <ListItemText secondary={'Crear Joborder'} />
                    </a>
                  </ListItem>
                </ListItemButton>
                
                <ListItemButton disabled={disable} onClick={() => { }}>
                  <ListItem sx={{ ml: 2 }}>
                    <a href="/joborder">

                    <Category />
                    <ListItemText secondary={'Visualizar joborder'} />
                    </a>
                  </ListItem>
                </ListItemButton>

              </Grid>

            </ListItem>
          }
        </List>
      </Drawer>
    </Box>
  )
}
