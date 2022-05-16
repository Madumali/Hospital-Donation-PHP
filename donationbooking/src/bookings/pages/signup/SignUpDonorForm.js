import React, { useState, useEffect } from "react";
import Input from "../../../components/controls/Input";
import Controls from "../../../components/controls/Controls";
import { useForm } from "../../../components/useForm";
import { Form } from "../../../components/useForm";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useStyles } from "../../../components/BodyStyles";





const roleItems = [
  { id: "THERO", title: "Thero." },
  { id: "REV", title: "Rev." },
  { id: "MR", title: "Mr." },
  { id: "MRS", title: "Mrs." },
  { id: "MS", title: "Ms." },
  { id: "DR", title: "Dr." },
  { id: "PROF", title: "Prof." },
];
const initialFValues = {
  title:"",
    national_id: "",
    donor_name: "",
    contact_no: "",
    donor_password:"",
    email: "",
    cpassword:""
  };

const SignUpDonorForm = (props) => {
    const classes = useStyles();
  const { addOrEdit, recordForEdit } = props;
 
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("national_id" in fieldValues)
        temp.national_id = /^[0-9]{9}[vVxX]$|^[0-9]{12}$/.test(fieldValues.national_id)
          ? ""
          : "NIC is not valid.";

    if ("email" in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is not valid.";
      
    if ('contact_no' in fieldValues)
    temp.contact_no = /^([+]\d{2})?\d{10}$/.test(fieldValues.contact_no)
    ? ""
    : "Contact No is not valid.";
    if ('contact_no2' in fieldValues)
    temp.contact_no2 = /^([+]\d{2})?\d{10}$/.test(fieldValues.contact_no2)
    ? ""
    : "Contact No is not valid.";
    if ("donor_password" in fieldValues)
      temp.donor_password = fieldValues.donor_password ? "": "Password is required.";
      temp.cpassword = (fieldValues.cpassword == fieldValues.donor_password ) ? "" : "Passwords don't match."
        if ("cpassword" in fieldValues){
      temp.cpassword = fieldValues.cpassword ? "": "Confirm Password is required.";}
   
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, errors, handleInputChange, setErrors, resetForm } =
  useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("donors",values)
      addOrEdit(values, resetForm);
      
    }
   
  };

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);



    return( <Form onSubmit={handleSubmit}>
      
     
           <Grid container spacing={0.5}>
           <Grid  item  xs={12} md={12}>
             <Controls.RadioGroup2
              name="title"
              label="Title"
              value={values.title}
              onChange={handleInputChange}
              items={roleItems}  
             
            />
            </Grid>
             <Grid  item  xs={12} md={12}>
            
               <Input
               fullWidth
               variant="filled"
                 name="national_id"
                 label="NIC"
                 value={values.national_id}
                 onChange={handleInputChange}
                 error={errors.national_id}
                
               />
             </Grid>
           
   
             <Grid  item  xs={12} md={12}>
             <Input
             variant="filled"
                 name="donor_name"
                 label="Name"
                 value={values.donor_name}
                 onChange={handleInputChange}
                 
               />
             </Grid>
           
             {/* <Grid>
               <Input
                 name="address_line1"
                 label="Address Line1"
                 value={values.address_line1}
                 onChange={handleInputChange}
                 style={{width:400}}
                 // error={errors.username}
               />
             </Grid>
            
             <Grid>
             <Input
                           name="address_line2"
                           label="Address Line2"
                           value={values.address_line2}
                           onChange={handleInputChange}
                           style={{width:400}}
                           // options={}
                           // error={errors.user_department}
                       />
                       </Grid>
                   */}
   
             
                <Grid item  xs={12} md={12}>
               <Input
               variant="filled"
                 name="contact_no"
                 label="Contact"
                maxLength={10}
                 value={values.contact_no}
                 onChange={handleInputChange}
                 error={errors.contact_no}
                 
               />
             </Grid>
           
           
             
             <Grid item  xs={12} md={12}>
               <Controls.Input
               variant="filled"
                 name="email"
                 label="Email"
                 type="email"
                 value={values.email}
                 onChange={handleInputChange}
                 error={errors.email}
                 
           
               />
             </Grid>
             <Grid item  xs={12} md={12}>
               <Input
               variant="filled"
               type="password"
                 label="Password"
                 name="donor_password"
                 value={values.donor_password}
                 onChange={handleInputChange}
                 error={errors.donor_password}
                 
               />
             </Grid>

             <Grid item  xs={12} md={12}>
               <Input
               variant="filled"
               type="password"
                 label="Confirm Password"
                 name="cpassword"
                 value={values.cpassword}
                 onChange={handleInputChange}
                 error={errors.cpassword}
                 
               />
             </Grid>
             <Grid item  xs={12} md={12}>
             <Controls.Button type="submit" text="Submit" style={{marginRight:5}}/>
                 <Controls.Button
                   text="Reset"
                   color="warning"
                   onClick={resetForm}
                 />
                    </Grid>
           </Grid>
         
              
             
  
   
                  
         </Form>
   );

}
export default SignUpDonorForm;