import { FireTruck, Google, Hail, Inventory, LocalShipping, Menu, MenuBook, Person, TurnedInNot } from "@mui/icons-material"
import { Box, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { Link } from "react-router-dom";

export const SideBar = ({drawerWidth = 340}) => {

  let options = ['Inventario', 'Clientes', 'Empleados', 'Proveedores'];
  let descriptions = ['asd','b','c','d'];

  return (

    <Box
      component='nav'
      sx={{ width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
    >
      <Drawer
        variant="permanent"
        open
        sx={{
          display: {xs: 'block'},
          '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth}
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
            <Menu/>
          </IconButton>
          </Grid>

          
        </Toolbar>
        
        <Divider/>
        <List>
            {
              <ListItem key={'a'} disablePadding>  
                
                <Grid width='100%'>

                  <ListItemButton>
                    <ListItem>
                      <Person/>
                      <ListItemText primary = {'Empleados'}/>
                    </ListItem>

                    
                  </ListItemButton>

                  
                  <ListItemButton>
                    <ListItem sx={{ml: 2}}>
                      <Person/>
                      <ListItemText secondary = {'Agregar empleados'}/>
                    </ListItem>
                    
                  </ListItemButton>
                  <ListItemButton>
                    <ListItem sx={{ml: 2}}>
                      <Person/>
                      <ListItemText secondary = {'Visualizar empleados'}/>
                    </ListItem>
                    
                  </ListItemButton>


                  <ListItemButton>
                    <ListItem>
                      <Hail/>
                      <ListItemText primary = {'Clientes'}/>
                    </ListItem>

                    
                  </ListItemButton>

                  
                  <ListItemButton>
                    <ListItem sx={{ml: 2}}>
                      <Hail/>
                      <ListItemText secondary = {'Agregar empleados'}/>
                    </ListItem>
                    
                  </ListItemButton>
                  <ListItemButton>
                    <ListItem sx={{ml: 2}}>
                      <Hail/>
                      <ListItemText secondary = {'Visualizar empleados'}/>
                    </ListItem>
                    
                  </ListItemButton>

                  <ListItemButton>
                    <ListItem>
                      <Inventory/>
                      <ListItemText primary = {'Inventario'}/>
                    </ListItem>

                    
                  </ListItemButton>

                  
                  <ListItemButton>
                    <ListItem sx={{ml: 2}}>
                      <Inventory/>
                      <ListItemText secondary = {'Agregar empleados'}/>
                    </ListItem>
                    
                  </ListItemButton>
                  <ListItemButton>
                    <ListItem sx={{ml: 2}}>
                      <Inventory/>
                      <ListItemText secondary = {'Visualizar empleados'}/>
                    </ListItem>
                    
                  </ListItemButton>
                  
                  <ListItemButton>
                    <ListItem>
                      <LocalShipping/>
                      <ListItemText primary = {'Provedores'}/>
                    </ListItem>

                    
                  </ListItemButton>

                  
                  <ListItemButton>
                    <ListItem sx={{ml: 2}}>
                      <LocalShipping/>
                      <Link to={'/employee/add'}>


                      <ListItemText secondary = {'Agregar empleados'}/>

                      </Link>
                    </ListItem>
                    
                  </ListItemButton>
                  <ListItemButton>
                    <ListItem sx={{ml: 2}}>
                      <LocalShipping/>
                      <ListItemText secondary = {'Visualizar empleados'}/>
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
