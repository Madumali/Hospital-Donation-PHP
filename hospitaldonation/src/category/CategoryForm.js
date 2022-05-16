import React, { useState, useEffect } from "react";
import Input from "../components/controls/Input";
import Controls from "../components/controls/Controls";

import { useForm } from "../components/useForm";
import { Form } from "../components/useForm";
// import * as employeeService from "../../services/employeeService";

import Box from "@mui/material/Box";

import Grid from "@mui/material/Grid";
import { useStyles } from "../components/BodyStyles";
// import { Form, Field } from 'react-final-form';






//   const roleItems = [
//     { id: "admin", title: "Admin" },
//     { id: "front user", title: "Front User" },
//     { id: "other", title: "Other" },
//   ];
  
  const initialFValues = {
   type_code: "",
    type_name: "",
    
  };


export const CategoryForm = (props) => {
  const { addOrEdit, recordForEdit } = props;
  const classes = useStyles();

  //const required = (value) => (value ? undefined : "Required");
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    
    if ("type_code" in fieldValues)
      temp.type_code =
        fieldValues.type_code.length != 0 ? "" : "Code is required.";
        if ("type_name" in fieldValues)
        temp.type_name =
          fieldValues.type_name.length != 0 ? "" : "Category Name is required.";
    
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, errors, handleInputChange, setErrors, resetForm } =
  useForm(initialFValues, true, validate);;

    
    
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
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

  

  return (
    <Box  direction="column" alignItems="center" justifyContent="center" style={{paddingBottom:"10px"}}>
      <Form onSubmit={handleSubmit}>
    
        <Grid container spacing={0.5}  >
          <Grid item xs={12}>
         
            <Input
              name="type_code"
              label="Category Code"
              value={values.type_code}
              onChange={handleInputChange}
              error={errors.type_code}
            
            />
         
            <Input
              name="type_name"
              label="Category Name"
              value={values.type_name}
              onChange={handleInputChange}
              error={errors.type_name}
            
            />
          </Grid>
         <Grid marginLeft={2} marginBottom={5} marginTop={2}>
          <Controls.Button type="submit" text="Submit" style={{marginRight:5}}/>
              <Controls.Button
                text="Reset"
                color='warning'
                style = {{backgroundColor:"#ECEFF1"}}
                onClick={resetForm}
              />
              </Grid>
        </Grid>
      </Form>
      </Box>
    );
  
  };

export default CategoryForm;

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