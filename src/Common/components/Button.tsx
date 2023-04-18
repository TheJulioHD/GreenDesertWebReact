import { Button, hexToRgb} from '@mui/material'

interface Props {
  id : string,
  text : string,
  isDisabled? : boolean,
  operation? : any, //Use to set a function
  icon? : any,
  backgroundColor? : string,
  textColor? : string,
}

export const ButtonStyled = ({id, text, isDisabled, operation, icon, backgroundColor, textColor = ""} : Props) => {
  
  return (
    
    <Button 
      id={id}
      variant='contained'
      disabled = {isDisabled}
      onClick = {() => {
        operation();
      }}
      startIcon={icon}
      sx={{
        backgroundColor: {backgroundColor},
        color: hexToRgb(textColor), 
      }}
    >
        
    {text}</Button>
  )
}
