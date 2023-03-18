import { Button, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'

const Proveedorespage = () => {
  return (
    <div>

        <TableContainer>
            <TableHead> 
                <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Material</TableCell>
                    <TableCell>Proceedor</TableCell>
                    <TableCell>Codigo Proveedor</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Direccion</TableCell>
                    <TableCell>Telefono</TableCell>
                    <TableCell>Estatus</TableCell>
                    <TableCell>Observaciones</TableCell>
                    <TableCell>Editar</TableCell>
                </TableRow>

            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>a</TableCell>
                    <TableCell>a</TableCell>
                    <TableCell>a</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Direccion</TableCell>
                    <TableCell>Telefono</TableCell>
                    <TableCell>a</TableCell>
                    <TableCell>a</TableCell>
                    <TableCell><Button color='success' variant="outlined">Edit</Button>&nbsp; <Button color='error' variant="outlined">Deleted</Button></TableCell>
                </TableRow>
            </TableBody>
        </TableContainer>
    </div>
  )
}

export default Proveedorespage