import { Menu, MenuBook, TurnedInNot } from "@mui/icons-material"
import { Box, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"

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
              options.map( text => (
                <ListItem key={text} disablePadding>  
                  <ListItemButton>
                    <ListItemIcon>
                      <TurnedInNot/>
                    </ListItemIcon>
                    <Grid container>
                        <ListItemText primary = {text}/>
                        <ListItemText secondary = {'opcion'}/>
                      </Grid>
                  </ListItemButton>
                </ListItem>
              ))
            }
          </List>
      </Drawer>
    </Box>
  )
}
