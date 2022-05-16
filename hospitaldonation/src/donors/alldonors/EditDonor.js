import React, { useState, useEffect } from "react";
import Input from "../../components/controls/Input";
import Controls from "../../components/controls/Controls";
import { useForm } from "../../components/useForm";
import { Form } from "../../components/useForm";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@material-ui/core";
import { Typography } from "@mui/material";

const paperStyle = {
  variant: "outlined",
  padding: 20,
  height: "75vh",
  width: 500,
  margin: "10px auto",
};
const paperStyle2 = {
  variant: "outlined",
  padding: 20,
  height: "auto",
  width: "auto",
  margin: "10px auto",
};
const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(2),
    padding: theme.spacing(5),
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.light,
  },
  searchInput: {
    width: "80%",
  },
  newButton: {
    position: "absolute",
    right: "2px",
  },
}));

const roleItems = [
  { id: "THERO", title: "Thero." },
  { id: "REV", title: "Rev." },
  { id: "MR", title: "Mr." },
  { id: "MRS", title: "Mrs." },
  { id: "MS", title: "Ms." },
  { id: "DR", title: "Dr." },
  { id: "PROF", title: "Prof." },
];

const bloodGroup = [
  { id: "A+", title: "A+" },
  { id: "A-", title: "A-" },
  { id: "B+", title: "B+" },
  { id: "B-", title: "B-" },
  { id: "AB+", title: "AB+" },
  { id: "AB-", title: "AB-" },
  { id: "O+", title: "O+" },
  { id: "O-", title: "O-" },
];
const initialFValues = {
  title:"THERO",
  national_id: "",
  donor_name: "",
  isBloodDon: false,
  address_line1: "",
  address_line2: "",
  contact_no: "",
  contact_no2: "",
  rer_date: new Date(),
  email: "",
  weight: "",
  birthDay:new Date(),
  bloodGroup: "A+",
  tattoo: false,
  hiv: false,
  hepatitis: false,
  std: false,
  cardiac: false,
  cancer: false,
};

export const EditDonor = (props) => {
  const { addOrEdit, recordForEdit } = props;
  const [check, setCheck] = useState(false);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("national_id" in fieldValues)
      temp.national_id = /^[0-9]{9}[vVxX]$|^[0-9]{12}$/.test(
        fieldValues.national_id
      )
        ? ""
        : "NIC is not valid.";

    if ("email" in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is not valid.";

    if ("contact_no" in fieldValues)
      temp.contact_no = /^([+]\d{2})?\d{10}$/.test(fieldValues.contact_no)
        ? ""
        : "Contact No is not valid.";
    if ("contact_no2" in fieldValues)
      temp.contact_no2 = /^([+]\d{2})?\d{10}$/.test(fieldValues.contact_no2)
        ? ""
        : "Contact No is not valid.";
      if("isBloodDon" in fieldValues == "1"){
        
        if ("weight" in fieldValues)
        temp.weight = fieldValues.weight.length != 0 ? "" : "weight is required.";
      if ("bloodGroup" in fieldValues)
        temp.bloodGroup = fieldValues.bloodGroup
          ? ""
          : "Blood Group is required.";

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
      console.log("donors", values);
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
    <Box
      direction="column"
      alignItems="center"
      justifyContent="center"
      marginTop={3}
      style={{ paddingBottom: "10px" }}
    >
      <Form onSubmit={handleSubmit}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Box
              marginLeft={1}
              style={{ border: "1px solid #b0bec5", width: "250px" }}
            >
              <Controls.RadioGroup2
                name="title"
                label="Title"
                value={values.title}
                onChange={handleInputChange}
                items={roleItems}
              />
            </Box>
            <Input
              name="national_id"
              label="NIC"
              value={values.national_id}
              onChange={handleInputChange}
              error={errors.national_id}
            />

            <Input
              name="donor_name"
              label="Name"
              value={values.donor_name}
              onChange={handleInputChange}
            />

            <Input
              name="address_line1"
              label="Address Line1"
              value={values.address_line1}
              onChange={handleInputChange}

            />

            <Input
              name="address_line2"
              label="Address Line2"
              value={values.address_line2}
              onChange={handleInputChange}

    
            />
          </Grid>

          <Grid item xs={6}>
            <Input
              name="contact_no"
              label="Contact"
              maxLength={10}
              value={values.contact_no}
              onChange={handleInputChange}
              error={errors.contact_no}
            />

            <Input
              label="Contact"
              name="contact_no2"
              value={values.contact_no2}
              onChange={handleInputChange}
              error={errors.contact_no2}
            />

            <Controls.Input
              name="email"
              label="Email"
              type="email"
              value={values.email}
              onChange={handleInputChange}
              error={errors.email}
            />

            <Controls.Checkbox
              name="isBloodDon"
              label="Want to be a Blood Donor?"
              value={values.isBloodDon}
              onChange={(e) => {
                setCheck(true);
                handleInputChange(e);
              }}
            />

            {check ? (
              <Box
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ paddingBottom: "10px" }}
              >
                <Grid container spacing={0.1}>
                  <Grid item xs={6}>
                  <Controls.DatePicker
                        name="birthDay"
                        label="Birth Day"
                        value={values.birthDay}
                        onChange={handleInputChange}
                        error={errors.birthDay}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Input
                      name="weight"
                      label="Weight"
                      value={values.weight}
                      onChange={handleInputChange}
                      error={errors.weight}
                    />
                  </Grid>

                  <Typography
                    style={{
                      marginTop: 10,
                      textAlign: "center",
                      color: "blue",
                    }}
                  >
                    Do You Have Any of the Followings?
                  </Typography>
                  <Grid item xs={6}>
                    <Controls.Checkbox
                      name="tattoo"
                      label="Piercing/Tattooing"
                      value={values.tattoo}
                      onChange={handleInputChange}
                    />
                    <Controls.Checkbox
                      name="hiv"
                      label="HIV AID"
                      value={values.hiv}
                      onChange={handleInputChange}
                    />
                    <Controls.Checkbox
                      name="hepatitis"
                      label="Hepatitis B/C"
                      value={values.hepatitis}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Controls.Checkbox
                      name="std"
                      label="STD"
                      value={values.std}
                      onChange={handleInputChange}
                    />
                    <Controls.Checkbox
                      name="cardiac"
                      label="Cardiac disease"
                      value={values.cardiac}
                      onChange={handleInputChange}
                    />
                    <Controls.Checkbox
                      name="cancer"
                      label="Cancer"
                      value={values.cancer}
                      onChange={handleInputChange}
                    />
                  </Grid>

                  <Box style={{ border: "1px solid #b0bec5", width: "430px" }}>
                    <Controls.RadioGroup2
                      name="bloodGroup"
                      label="Blood Group"
                      value={values.bloodGroup}
                      onChange={handleInputChange}
                      items={bloodGroup}
                      error={errors.bloodGroup}
                    />
                  </Box>
                </Grid>
              </Box>
            ) : null}
            <div style={{ marginLeft: 9, marginTop: 15 }}>
              <Controls.Button
                type="submit"
                text="Submit"
                style={{ marginRight: 5 }}
              />
              <Controls.Button
                text="Reset"
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

export default EditDonor;
