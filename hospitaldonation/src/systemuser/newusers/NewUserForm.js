import React, { useState, useEffect } from "react";
import Input from "../../components/controls/Input";
import Controls from "../../components/controls/Controls";
import { useForm } from "../../components/useForm";
import { Form } from "../../components/useForm";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Select as MuiSelect, MenuItem, InputAdornment} from '@mui/material';
import * as systemusers from "../services/systemusers";
import { useStyles } from "../../components/BodyStyles";        
              
  const roleItems = [
    { id: "admin", title: "Admin" },
    { id: "front user", title: "User" },
    { id: "receiver", title: "Receiver" },
    { id: "other", title: "Other" },
  ];
  
  const initialFValues = {
    user_nic: "",
    user_full_name: "",
    user_department: "",
    designation: "",
    user_role: "other",
    username: "",
    user_password: "",
    confirmpassword: "",
    user_email: "",
    user_contact:"",
   
  };


export const NewUserForm = (props) => {
  const { addOrEdit, recordForEdit} = props;
  const [response, setResponse] = useState([]);
  const [department, setDepartment] = useState([]);
const [designation, setDesignation] = useState([]);

  //const required = (value) => (value ? undefined : "Required");
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ('user_nic' in fieldValues)
        temp.user_nic = fieldValues.user_nic ? "" : "NIC is required."
    if ("user_email" in fieldValues)
      temp.user_email = /$^|.+@.+..+/.test(fieldValues.user_email)
        ? ""
        : "Email is not valid.";

    if ("user_nic" in fieldValues)
      temp.user_nic = /^[0-9]{9}[vVxX]$|^[0-9]{12}$/.test(fieldValues.user_nic)
        ? "": "NIC is not valid.";
    if ('user_contact' in fieldValues)
        temp.user_contact = /^([+]\d{2})?\d{10}$/.test(fieldValues.user_contact)
        ? ""
        : "Contact No is not valid." ;

    if ("username" in fieldValues)
      temp.username =
        fieldValues.username.length != 0 ? "" : "Username is required.";

    if ("user_department" in fieldValues)
        temp.user_department =
          fieldValues.user_department.length != 0 ? "" : "Department is required.";
    
          if ("designation" in fieldValues)
          temp.designation =
            fieldValues.designation.length != 0 ? "" : "Designation is required.";

    if ("user_password" in fieldValues)
      temp.user_password = fieldValues.user_password ? "": "Password is required.";
      temp.confirmpassword = (fieldValues.confirmpassword == fieldValues.user_password ) ? "" : "Passwords don't match."
        if ("confirmpassword" in fieldValues){
      temp.confirmpassword = fieldValues.confirmpassword ? "": "Confirm Password is required.";
     
        }
   
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
      addOrEdit(values, resetForm);
      
    }
  };

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);

  
  useEffect(() => {
    getDep();
  }, []);
  const getDep = () => {
    systemusers
      .getDepartments()

      .then((data) => {
        if(data.msg == "No data available")
        {
          setResponse(data);
          
        }
        else {
        const dataarray = [];
        for (const key in data) {
          const dep = {
            id: key,
            ...data[key],
          };
          dataarray.push(dep);
        }

        setDepartment(dataarray);
      }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
   
  };





  useEffect(() => {
    getDes();
  }, []);
  const getDes = () => {
    systemusers
      .getDesignation()

      .then((data) => {
        if(data.msg == "No data available")
        {
          setResponse(data);
          
        }
        else {
        const dataarray = [];
        // setUserData(arr);
        for (const key in data) {
          const dep = {
            id: key,
            ...data[key],
          };
          dataarray.push(dep);
        }
      
        setDesignation(dataarray);
      }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
   
  };





  return (
    <Box  direction="column" alignItems="center" justifyContent="center" marginTop={3} style={{paddingBottom:"10px"}}>
      <Form onSubmit={handleSubmit}>
       
             <Grid container spacing={1}>
                <Grid item xs={6}>
           <Controls.Input
           type="text"
             name="user_nic"
             label="NIC"
             value={values.user_nic}
             onChange={handleInputChange}
             error={errors.user_nic}
            
           />
        
           <Controls.Input
              type="text"
             label="Full Name"
             name="user_full_name"
             value={values.user_full_name}
             onChange={handleInputChange}
           
           
           />
      
           <Controls.Input
              type="text"
             label="Email"
             name="user_email"
             value={values.user_email}
             onChange={handleInputChange}
             error={errors.user_email}
          
           />
        
           <Controls.Input
             label="Contact"
             name="user_contact"
             value={values.user_contact}
             onChange={handleInputChange}
             error={errors.user_contact}
          
           />
      
       <Controls.Input
              select
              name="user_department"
              label="Department"
              value={values.user_department}
              onChange={handleInputChange}
              error={errors.user_department}
             
              
                
                >
                {/* // onChange={e => handleChange(inputField.id, e)}> */}
                
                <MenuItem defaultValue = "">None</MenuItem>
                {
                  department.map((item ,i)=> (
                   <MenuItem key = {i}   value={item.dep_id} >{item.dep_name}</MenuItem>))
                    
                }
            </Controls.Input> 
         
                  
                    <Controls.Input
              select
              label="Designation"
              name="designation"
              value={values.designation}
              onChange={handleInputChange}
              error={errors.designation}
           
              
                
                >
                {/* // onChange={e => handleChange(inputField.id, e)}> */}
                
                <MenuItem defaultValue = "">None</MenuItem>
                {
                  designation.map((item,i) => (
                   <MenuItem key = {i}   value={item.desig_id} >{item.desig_name}</MenuItem>))
                    
                }
            </Controls.Input> 
        
      </Grid>
                <Grid item xs={6}>
     
          <Controls.RadioGroup2
              name="user_role"
              label="Role"
              value={values.user_role}
              onChange={handleInputChange}
              items={roleItems}  
             
            />
            
         
            <Input
         
              name="username"
              label="Username"
              value={values.username}
              onChange={handleInputChange}
              error={errors.username}
            />
         
            <Input
          
              name="user_password"
              label="Password"
              type="password"
              value={values.user_password}
              onChange={handleInputChange}
              error={errors.user_password}
            
            />
         
            <Controls.Input
           
              name="confirmpassword"
              label="Confirm Password"
              type="password"
              value={values.confirmpassword}
              onChange={handleInputChange}
              error={errors.confirmpassword}
             
         
            />
         
         <div style={{marginLeft:9, marginTop:15}}>
        <Controls.Button type="submit" text="Submit" style={{marginRight:5}} />
              <Controls.Button
                text="Reset"
                color='warning'
                style = {{backgroundColor:"#ECEFF1"}}
                onClick={resetForm}
              />
              </div>
           </Grid>
           </Grid>

       
      </Form>
     </Box>
    );
  
  };

export default NewUserForm;

{/* <For
    onSubmit={onSubmit}
    validate={validate}
    render={({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <h2>Simple Default Input</h2>
        <div>
          <label>First Name</label>
          <Field name="firstName" component="input" placeholder="First Name" />
        </div>

        <h2>An Arbitrary Reusable Input Component</h2>
        <div>
          <label>Interests</label>
          <Field name="interests" component={InterestPicker} />
        </div>

        <h2>Render Function</h2>
        <Field
          name="bio"
          render={({ input, meta }) => (
            <div>
              <label>Bio</label>
              <textarea {...input} />
              {meta.touched && meta.error && <span>{meta.error}</span>}
            </div>
          )}
        />

        <h2>Render Function as Children</h2>
        <Field name="phone">
          {({ input, meta }) => (
            <div>
              <label>Phone</label>
              <input type="text" {...input} placeholder="Phone" />
              {meta.touched && meta.error && <span>{meta.error}</span>}
            </div>
          )}
        </Field>

        <button type="submit">Submit</button>
      </form>
    )}
  /> */}