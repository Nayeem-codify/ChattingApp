import { TextField } from '@mui/material';
import React from 'react'

const InputBox = ({variant,placeholder,styleing,id,name,type,values,onChange}) => {
  return (
    <TextField name={name} type={type} fullWidth className={styleing} id={id} label={placeholder} variant={variant} value={values} onChange={onChange} />
  )
}

export default InputBox
