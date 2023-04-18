import { SelectChangeEvent, Box, FormControl, InputLabel, MenuItem, Select, Button } from '@mui/material';
import React from 'react'

export const SelectStyled = () => {

  const [status, setStatus] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };



  return (
    <Box sx={{ minWidth: 120 }}>
      
    </Box>
  );



}
