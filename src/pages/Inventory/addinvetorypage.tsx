import { Button, Grid, TextField, Typography } from '@mui/material'
import React from 'react'

const Addinvetorypage = () => {
    return (
        <div>
            <Typography>Agregar Inventario </Typography><br />

            <Grid container justifyContent='space-between'  direction={'row'}>
                <form >
                    
                    <Typography>Material</Typography>
                    <TextField id="outlined-basic" label="Material" variant="outlined" />
                    <Typography>Cantidad</Typography>
                    <TextField id="outlined-basic" label="Cantidad" variant="outlined" />
                    <Typography>Codigo</Typography>
                    <TextField id="outlined-basic" label="Codigo" variant="outlined" />
                    <Typography>Estatus</Typography>
                    <TextField id="outlined-basic" label="Estatus" variant="outlined" />
                    <Typography>Observaciones</Typography>
                    <TextField id="outlined-basic" label="Observaciones" variant="outlined" />
                        <br /><br />
                    <Button variant="outlined">Agregrar</Button>
                </form>
            </Grid>

        </div>
    )
}

export default Addinvetorypage