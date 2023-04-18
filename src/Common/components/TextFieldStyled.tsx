import { AccountCircle, Fullscreen } from "@mui/icons-material"
import { InputAdornment, TextField } from "@mui/material"

interface Props {
  id : string,
  labelText : string,
  required? : boolean,
  type? : string, //Type is for password and number
  disabled? : boolean,
  readOnly? : boolean,
  helperText? : string,
  isMultiline? : boolean, 
  fullWidth? : boolean,
}


export const TextFieldStyled = ({id, labelText, required, type, disabled, readOnly, helperText, isMultiline, fullWidth} : Props) => {
  return (
    
    <TextField 
      multiline = {isMultiline}
      helperText={helperText}
      id={id}
      label={labelText}
      variant='outlined'
      required = {required}
      type={type}
      disabled = {disabled}
      InputProps={{
        readOnly: readOnly, 
        startAdornment: ( //waiting to implements
          <InputAdornment position="start"> 
          </InputAdornment>
        )
      }}
      sx={{
        borderRadius: '5px',
      }}
      fullWidth = {fullWidth}
    />
  )
}
