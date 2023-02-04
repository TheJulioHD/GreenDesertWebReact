import { Box } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Stack } from '@mui/system'
import React from 'react'

const Navbar:React.FC<{}> = () => {
  return (

    <Box sx={{flexGrow:1}}>
        <AppBar position='fixed'>
            <Toolbar>
                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography variant='h4'>GreenDesert</Typography>
                    </Grid>
                    <Grid item>
                        <Stack direction='row' spacing={2}>
                            <Button 
                                variant='contained' 
                                sx={{backgroundColor: 'primary.light'
                                }}>Login</Button>
                            <Button variant='contained' sx={{backgroundColor: 'primary.light'}}> Register</Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    </Box>

  )
}

export default Navbar