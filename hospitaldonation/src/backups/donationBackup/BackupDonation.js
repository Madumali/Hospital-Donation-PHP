import React, { useState, useEffect } from "react";
import * as donations from "../../donation/services/donations"
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import { Grid,} from "@material-ui/core";
import { Box } from "@material-ui/core";
import Stack from '@mui/material/Stack';
import Controls from "../../components/controls/Controls";
import AssessmentTwoToneIcon from '@mui/icons-material/AssessmentTwoTone';
import { PageHeader } from "../../components/controls/Common";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import RestoreIcon from '@mui/icons-material/Restore';
import ConfirmDialog from "../../components/ConfirmDialog";
import Notification from "../../components/Notification";
import RestoreConfirm from "../../components/RestoreConfirm";

  

 function BackupDonation() {
  
    const [records, setRecords] = useState([]);
    const [response, setResponse] = useState([]);
 const [startdate, setStartdate] = useState(new Date());
 const [enddate, setEnddate] = useState(new Date());
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
    const [restoreConfirm, setRestoreConfirm] = useState({
      isOpen: false,
      title: "",
      subTitle: "",
    });

//THIS WILL GET ALL DATA OF DELETED DONORS
useEffect(() => {
  getDonations();
}, []);
const getDonations = () => {
  donations
    .getDeletedDonation()
    .then((data) => {
      if(data.msg == "No data available")
      {
        setResponse(data)
      }
      else {
        const dataarray = [];
        // setUserData(arr);
        for (const key in data) {
          const donors = {
            id: key,
            ...data[key],
          };
          dataarray.push(donors);
        }
        // console.log(dataarray);
        if(dataarray.donor_id == 0)
        {
          setRecords(dataarray.msg)
        }
        else {
          setRecords(dataarray);
          console.log(dataarray);
        }
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
 
};

    //field names of table
const columns = [
    {field: "item_id",  headerName: "ID",width: 150
    , headerClassName: 'super-app-theme--header'},
    {  field: "donor_name", headerName: "Name",width: 190,editable: true,  headerClassName: 'super-app-theme--header', },
    {  field: "type_code", headerName: "Category",width: 70,editable: true,  headerClassName: 'super-app-theme--header', },
    {  field: "itemname", headerName: "Item Name" ,width:100,editable: true,  headerClassName: 'super-app-theme--header',},
    {  field: "item_qty", headerName: "Qty" ,width: 80,editable: true,  headerClassName: 'super-app-theme--header',},
    {  field: "item_description", headerName: "Description" ,width: 200,editable: true,  headerClassName: 'super-app-theme--header',},
    {  field: "receive_date", headerName: "Receive Date" ,width: 120,editable: true,  headerClassName: 'super-app-theme--header',},
    {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        width: 100,
        disableClickEventBubbling: true,
        headerClassName: 'super-app-theme--header',
        renderCell:(params) => {
        return (
        <>
            <Controls.ActionButton
                  color="primary"
                  onClick={() => {
                    setRestoreConfirm({
                      isOpen: true,
                      title: "Are you sure to restore this record?",
                      // subTitle: "You can't undo this operation",
                      onConfirm: () => {
                    restoreDonation(params.row);
                  },
                })
                  }} 
                            >
      <RestoreIcon fontSize="small" />
   
        </Controls.ActionButton>
        <Controls.ActionButton
                  color="error"
                  onClick={() => {
                    setConfirmDialog({
                      isOpen: true,
                      title: "Are you sure to delete this record?",
                      subTitle: "You can't undo this operation",
                      onConfirm: () => {
                        deleteDonation(params.row);
                      },
                    });
                  }}
                            >
      <DeleteOutline fontSize="small" />
   
        </Controls.ActionButton>
  </>
        )
    },
    }
    
  ];


    //restore deleted donors
    const restoreDonation = (uid) => {
        console.log("id",uid)
      setRestoreConfirm({
        ...restoreConfirm,
        isOpen: false,
      });
        donations.restoreDeleteDonation(uid.item_id, uid)
      
        .then((data) => {
       
            if (data.status == 200) {
              setNotify({
                isOpen: true,
                message: "Successfully Updated",
                type: "success",
              });
          
            } else if (data.status == 400) {
              setNotify({
                isOpen: true,
                message: "Something Wrong!",
                type: "warning",
              });
            }
            // changeCategory(item);
            getDonations();
          })
          .catch((error) => {
            console.error("Error:", error);
          });
  }


  //DELETE FOREVER
  const deleteDonation = (uid) => {
    setConfirmDialog({
        ...confirmDialog,
        isOpen: false,
      });

      donations
      .deleteDonationForever(uid.item_id, uid)
      .then((data) => {
        getDonations();
      })
      .catch((error) => {
        console.error("Error:", error);
      });

  setNotify({
    isOpen: true,
    message: "Deleted Successfully",
    type: "error",
  });
  }

function MyExportButton() {
  return (
    <GridToolbarContainer>
       <GridToolbarFilterButton/>

      <GridToolbarExport 
       printOptions={{
        hideFooter: true,
        hideToolbar: true,
      }}
      />
     
    </GridToolbarContainer>
  );
}



    return (
      <>
      <PageHeader
              title="Back up Donations"
              subTitle="Deleted list of Donations"
              icon={<AssessmentTwoToneIcon fontSize="large" />}
          />
        <Box
        sx={{
          height: 400,
          width: '83%',
          '& .super-app-theme--header': {
            backgroundColor: '#E3F2FD',
          },
        }}
        margin="50px auto"
      >

  
        <DataGrid
          getRowId={row => row.item_id}
          rows={records}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          // checkboxSelection
          disableSelectionOnClick
          components={{
            NoRowsOverlay: () => (
              <Stack height="100%" alignItems="center" justifyContent="center">
                No rows in DataGrid
              </Stack>
            ),
            NoResultsOverlay: () => (
              <Stack height="100%" alignItems="center" justifyContent="center">
                Local filter returns no result
              </Stack>
            ),
            Toolbar: MyExportButton,
            
          }}
   
        
        /></Box>
         <Notification notify={notify} setNotify={setNotify} />
<ConfirmDialog
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
          />
          <RestoreConfirm
            restoreConfirm={restoreConfirm}
            setRestoreConfirm={setRestoreConfirm}
          />
        </>
    );
}
export default BackupDonation;