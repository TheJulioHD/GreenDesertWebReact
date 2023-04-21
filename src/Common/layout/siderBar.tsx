import { Menu, MenuBook, TurnedInNot } from "@mui/icons-material"
import { Box, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { Color } from "../../Theme/Colors/Color";
import { Link, useNavigate } from "react-router-dom";

export const SideBar = ({drawerWidth = 340}) => {

  const navigate = useNavigate();
  let options = ['Inventario', 'Clientes', 'Empleados', 'Proveedores'];
  let descriptions = ['asd','b','c','d'];

  const changePage = (event: React.FormEvent<HTMLFormElement| HTMLButtonElement>) : any => {
    event.preventDefault();

  }


  return (

    <Box
      component='nav'
      sx={{ width: {sm: drawerWidth}, backgroundColor: Color.GrayUltraDark,flexShrink: {sm: 0}}}
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
        <List >
            {
              <Grid container direction={"column"} columnSpacing={{xs:1, sm:2 , md:3}}>
              <List >
              <ListItem>
                <ListItemButton disabled onClick={()=>{
                    navigate('/inventory/add')
                  }}>
                    <ListItemText>
                    Inventario
                    </ListItemText>
                  </ListItemButton>
                  
                </ListItem>
                <ListItem>
                    <Link to={'/login'}>
                      <ListItemText>
                      Clientes
                      </ListItemText>
                    
                    </Link>
                </ListItem>
                <ListItem>
                <ListItemButton disabled onClick={()=>{
                    navigate('/employee/add')
                  }}>
                    <ListItemText>
                    Empleados
                    </ListItemText>
                  </ListItemButton>
                  
                </ListItem>
                    
                <ListItem>
                <ListItemButton disabled onClick={()=>{
                    navigate('/provedores')
                  }}>
                    <ListItemText>
                    Probedores
                    </ListItemText>
                  </ListItemButton>
                  
                </ListItem>
                  {/* {
                    options.map( (text, index) => (
                      <ListItem key={text} disablePadding value={index}>
                        <ListItemButton onClick={handelNavigate} >
                          <ListItemIcon>
                            <TurnedInNot/>
                          </ListItemIcon>
                          <Grid container >
                              <ListItemText primary = {text}/>
                              <ListItemText secondary = {'opcion'}/>
                              <ListItemText secondary = {index+1}/>
                            </Grid>
                        </ListItemButton>
                      </ListItem>
                    ))
                  } */}
                </List>
      
              </Grid>
            }
          </List>
      </Drawer>
    </Box>
  )
}
