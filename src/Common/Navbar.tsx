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
                        <Typography>GreenDesert</Typography>
                    </Grid>
                    <Grid item>
                        <Stack direction='row' spacing={2}>
                            <Button variant='contained' color='success'> Login</Button>
                            <Button variant='contained' color='secondary'> Register</Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    </Box>
  )
}

export default Navbar