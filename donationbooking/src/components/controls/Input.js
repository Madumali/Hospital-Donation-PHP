import React, { useState } from "react";
import { TextField } from '@material-ui/core';
import InputAdornment from '@mui/material/InputAdornment';
import { makeStyles } from '@mui/styles';
// import { makeStyles, InputAdornment } from "@material-ui/core";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';  
// const useStyles = makeStyles(theme => ({
//   notchedOutline: {
//     border:'1px solid #add8e6',
//     borderRadius:10,
// @mui/material/TextField
       
// },
// }))




export default function Input(props) {
  // const classes = useStyles();

  const { name, label, value,error=null,type, onChange,variant,size,placeholder, ...other } = props;

  const [passwordeye, setPasswordEye] = useState(false);
  const handlePasswordClick = ()=> {
    setPasswordEye(!passwordeye)
  }
  


  return (
      <TextField
          // size={size || "medium"}
       
          // margin="dense"
          label={label}
          type={passwordeye ? "text": type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...other}
          {...(error && {error:true,helperText:error})}
          InputProps={{
            // style: {textTransform: "uppercase"},
            // classes: {
            //   notchedOutline: classes.notchedOutline
            // },
            endAdornment:
            type === "password" ? (
            <InputAdornment position="end">
             {passwordeye === false ? (<VisibilityOffIcon  onClick = {handlePasswordClick}/>) : (<RemoveRedEyeIcon onClick = {handlePasswordClick}/>) } 
            </InputAdornment>
          ): null
            }}
            inputProps={{
              style: {textTransform: "uppercase"},
            }}
            variant ="outlined"
      />
  )
}

