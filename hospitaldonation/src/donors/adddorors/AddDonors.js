import React, { useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from 'react-router-dom';
import AddDonorsForm from "./AddDonorsForm";
import {
  Paper,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import { makeStyles } from "@material-ui/core";
import useTable from "../../components/useTable";
import * as donors from "../services/donors";
import ConfirmDialog from "../../components/ConfirmDialog";
import Notification from "../../components/Notification";
import Controls from "../../components/controls/Controls";
import AddDonorTeam from "./AddDonorTeam";
import { PageHeader } from "../../components/controls/Common";
import { useStyles } from "../../components/BodyStyles";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';

const paperStyle = {
  variant: "outlined",
  padding: 20,
  width: 500,
  margin: "auto",
  backgroundColor: "#EEEEEE",
};
const paperStyle2 = {
  variant: "outlined",
  padding: 20,
  height: "auto",
  width: "auto",
  margin: "10px auto",
};

const headCells = [
  { id: "national_id", label: "NIC" },
  { id: "donor_name", label: "Name" },
  { id: "address_line1", label: "Address1" },
  { id: "address_line2", label: "Address2" },
  { id: "email", label: "Email" },
  { id: "contact_no", label: "Telephone" },
  { id: "actions", label: "Actions", disableSorting: true },
];
export const AddDonors = () => {
 
  const classes = useStyles();
  // const [recordForEdit, setRecordForEdit] = useState(null)
  const [check, setCheck] = useState(false);
  // const [records, setRecords] = useState([]);
  const [response, setResponse] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [donorData, setDonorData] = useState([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [recordForEdit, setRecordForEdit] = useState(null);

  const {
    TblContainer,
    TblHead,
    TblPagination,
    donorDataAfterPagingAndSorting,
  } = useTable(donorData, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter(
            (x) =>
              x.donor_name.toLowerCase().includes(target.value) ||
              x.national_id.toLowerCase().includes(target.value)
          );
      },
    });
  };

  useEffect(() => {
    getAllPerson();
  }, []);
  const getAllPerson = () => {
    donors
      .getDonorPersons()

      .then((data) => {
        if(data.msg == "No data available")
        {
          setResponse(data);
          
        }
        else {
        const dataarray = [];
        // setUserData(arr);
        for (const key in data) {
          const category = {
            id: key,
            ...data[key],
          };
          dataarray.push(category);
        }
        // console.log(dataarray);

        setDonorData(dataarray);
      }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
   
  };

  const addOrEdit = (donor, resetForm) => {
    if (donor.donor_id == null) {
      donors
        .insertDonor("http://localhost:4000/donors/", donor)
        .then((data) => {
          setResponse(data);
          if (data.status == 200) {
          //  notify (response.msg)
            setNotify({
              isOpen: true,
              message: "Successfully Added",
              type: "success",
              
            });
          } else if (data.status == 400) {
            setNotify({
              isOpen: true,
              message: "Something Wrong!",
              type: "warning",
            });
          }
          getAllPerson();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else
      donors
        .updateDonorPerson(donor.donor_id, donor)
        .then((data) => {
          if (data.status == 200) {
            setNotify({
              isOpen: true,
              message: "Successfully Added",
              type: "success",
            });
          } else if (data.status == 400) {
            setNotify({
              isOpen: true,
              message: "Something Wrong!",
              type: "warning",
            });
          }

          getAllPerson();
        })
        .catch((error) => {
          console.error("Error:", error);
        });

    setRecordForEdit(null);
    setOpenPopup(false);
    resetForm();
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const onDeleteP = (donor) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    donors
      .deleteDonor(donor.donor_id, donor)
      .then((data) => {
        getAllPerson();
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setNotify({
      isOpen: true,
      message: "Deleted Successfully",
      type: "error",
    });
  };

  return (
  
 <Box className={classes.section} style={{marginTop:1}} >
      <PageHeader
                title="New Donor"
                subTitle="Create new donor"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
   <Controls.Checkbox
        name="isCompany"
        label="Company / Team"
        onChange={() => setCheck(!check)}
      
      />
   <Paper className={classes.mainpaper}  style={{borderRadius:5,margin:"0 auto",width:1000, padding:"25px"}}>
     
      {check ? (
      <>
       <Typography variant="h5" component="div"  sx={{ flexGrow: 1 }} style={{paddingBottom:15,marginTop:-10, textAlign : "center"}}>
            Donor Information
             </Typography>
            <Divider />
        <AddDonorTeam />   
        </>
      ) : (
         <>
        <Typography variant="h5" component="div"  sx={{ flexGrow: 1 }} style={{paddingBottom:15,marginTop:-10, textAlign : "center"}}>
        Donor Information
         </Typography>
        <Divider />
              <AddDonorsForm
                recordForEdit={recordForEdit}
                addOrEdit={addOrEdit}
              />
              <Notification notify={notify} setNotify={setNotify} />
         
      
       
          <ConfirmDialog
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
          />

          </>
       
      )}
      </Paper>
    </Box>
  );
};

export default AddDonors;
