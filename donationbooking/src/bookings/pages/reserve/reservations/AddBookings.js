import React, { useState, useEffect } from "react";
import NavBar from "../../../NavBar";
import { Paper, Box, Button, Grid } from "@material-ui/core";
import BookingDonor from "./BookingDonor";
import { useStyles } from "../../../../components/BodyStyles";
import LoginDonor from "../../login/LoginDonor";
import * as bookingServices from "../../../bookservice/bookingServices";    
import Notification from "../../../../components/Notification";
import Controls from "../../../../components/controls/Controls";
import CloseIcon from '@mui/icons-material/Close';
import Popup from "../../../../components/Popup"

const AddBookings = () => {
const [openPopup, setOpenPopup] = useState(false)
    const [display, setDisplay] = useState(false);
    const [display2, setDisplay2] = useState(false);
    const [display3, setDisplay3] = useState(false);
    const[ show, setShow] = useState(true);
    const[ show2, setShow2] = useState(false);
    const classes = useStyles();
    const [response, setResponse] = useState("");
    const [notify, setNotify] = useState({ isOpen: false, message: [], type: '' })


    const addOrEdit = (donitems, resetForm) => {
       console.log("this is do  items", donitems);
      if(donitems.id != ''){
        bookingServices.insertDonor("http://localhost:4000/bookings/soupreserve",donitems ).then((data) =>  {
             if (data.status == 200) {
               setNotify({
                 isOpen: true,
                 message:"Success",
                 type: "success",
               });
               resetForm();
               setOpenPopup(true);
               setDisplay3(true);
               setResponse("Your reservation has been submitted.Once the reservation approved you will receive the Ingrediant List via mail.Thank You!");
             } else if (data.status == 400) {
               setNotify({
                 isOpen: true,
                 message: "Something Wrong!",
                 type: "warning",
               });
             }
               })
       .catch((error) => {
         console.error("Error:", error);
       });
     } else
     setNotify({
      isOpen: true,
      message: "Something Wrong!",
      type: "warning",
    });
       resetForm()
       
     }
   


    
    



    const select = (val) => {
        if(val =="sp")
        {
            setDisplay(!display)
            setDisplay2(false);
            setShow(!show)
        } else {
            setDisplay2(!display2);
        setDisplay(false);
        setShow(!show)
        }
      
    }
    const select2 = () => {
        setDisplay2(!display2);
        setDisplay(false);
    }
    
const handleclose = ()=>{
setDisplay3(false)
}



    return(<>
    
        <Paper  style={{height:"auto", marginTop:5, padding:10}}>
        {/* {show  ?    
   <Grid container spacing={1} style={{marginLeft:"20px", paddingTop:"50px", paddingBottom:"40px"}}>
       
     <Grid item xs={12} md={6} >
    <Button variant="contained"  onClick={()=>select("sp")} style={{width:"300px",backgroundColor:"#a9a9a9",fontFamily:"Times New Roman", fontWeight:600, color: "blue"}}>Soup Donations</Button>
       </Grid>  
        <Grid item xs={12} md={6} >
        <Button variant="contained"   onClick={()=>select()}  style={{width:"300px",backgroundColor:"#a9a9a9",fontFamily:"Times New Roman", fontWeight:600,color:"blue"}}>Meal Donations</Button>
       </Grid>
      
   </Grid>
      : <Grid container spacing={1} style={{marginLeft:"20px", paddingTop:"50px", paddingBottom:"40px"}}>
       
      <Grid item xs={12} md={6} >
     <Button variant="contained"  onClick={()=>select("sp")} style={{width:"300px",backgroundColor:"#a9a9a9",fontFamily:"Times New Roman", fontWeight:600, color: "blue"}}>Soup Donations</Button>
        </Grid>  
         <Grid item xs={12} md={6} >
         <Button variant="contained"   onClick={()=>select()}  style={{width:"300px",backgroundColor:"#a9a9a9",fontFamily:"Times New Roman", fontWeight:600,color:"blue"}}>Meal Donations</Button>
        </Grid>
       
    </Grid>
      } */}




{ display3 &&
<Popup 
style={{width:200}}
  openPopup={openPopup}
  setOpenPopup={setOpenPopup}  >
          <Paper  style={{backgroundColor:"lightblue"}} >
          {response}
          <Controls.ActionButton
                        color="secondary"
                        onClick={()=>{setDisplay3(false); localStorage.setItem("codeid2","")}}>
                        <CloseIcon />
                    </Controls.ActionButton>
        </Paper> 
        </Popup>
        }



   {/* {
        display &&  <Box  style={{border:"1px solid #ffffff", paddingBottom:"10px", margin:"10px auto"}} sx={{
          width: 500,
          // height: 300,
          backgroundColor: '#ffffff',
        }}> 
        { display3 &&
          <Paper  style={{backgroundColor:"lightblue"}} >
          {response}
          <Controls.ActionButton
                        color="secondary"
                        onClick={()=>{setDisplay3(false); localStorage.setItem("codeid2","")}}>
                        <CloseIcon />
                    </Controls.ActionButton>
        </Paper> 
        }
          
        <BookingDonor addOrEdit={addOrEdit}/>
       
          </Box>
    }
  
    {
        display2 &&    <LoginDonor/>
    } */}
 <BookingDonor addOrEdit={addOrEdit}/>
   </Paper>
   <Notification
          notify={notify}
          setNotify={setNotify} />
  
  
   
   
    </>);


}

export default AddBookings;