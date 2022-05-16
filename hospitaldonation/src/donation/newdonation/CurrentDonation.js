import React, { useState, useEffect, useLayoutEffect } from "react";
import Input from "../../components/controls/Input";
import Controls from "../../components/controls/Controls";
import { Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useForm } from "../../components/useForm";
import { Form } from "../../components/useForm";
// import * as employeeService from "../../services/employeeService";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import * as donations from "../services/donations";
// import DonorList from "./DonorList";
import LogoNci from "../../components/LogoNci";
import Emblem from "../../components/Emblem";
import { PageHeader } from "../../components/controls/Common";
import { useStyles } from "../../components/BodyStyles";
import header from "../../components/images/header1.jpg";
import hdmsLogo5 from "../../components/images/hdms logo5.png";
// const paperStyle = {
//   variant: "outlined",
//   padding: 20,
//   height: 792,
//   width: 650,
//   margin: "0.01vh auto",
//   border: "1px solid lightBlue",
//   borderRadius: 5,
// };
// const useStyles = makeStyles((theme) => ({
//   pageContent: {
//     // marginLeft:5,
//     margin: theme.spacing(2),
//     padding: theme.spacing(5),
//     color: theme.palette.primary.main,
//     backgroundColor: theme.palette.primary.light,
//   },
//   searchInput: {
//     width: "80%",
//   },
//   paperstyle: {
//     //  border:'1px solid lightBlue',
//     //  borderRadius:5,
//     //  width:612,
//     //  height:792,
//     //  paddingTop:20
//   },
//   paperStylepdf: {
//     variant: "outlined",
//     // padding: 20,
//     width: "793.92px",
//     height:"1122.24px",
//      //612
//     margin: "0.01vh auto",
//     border: "1px solid lightBlue",
//     borderRadius: 5,
//   },
//   img: {
//     height: 50,
//     width: 145,
//   },
// }));

 export const CurrentDonation = React.forwardRef((props, ref) => {

  let currentDateTime = Date().toLocaleString();



  const classes = useStyles();
  const [response, setResponse] = useState([]);
  const [donationData, setDonationData] = useState([]);
const currentdate = new Date();
const date = `${currentdate.getDate()}-${currentdate.getMonth()+1}-${currentdate.getFullYear()}`;
  useEffect(() => {
    getCurrentDonation();
  }, []);
  let id = localStorage.getItem("donor");
  const getCurrentDonation = () => {
    // console.log(id);
    // let id = localStorage.getItem('donor');
    const token = localStorage.getItem("authToken");
    fetch("http://localhost:4000/donations/now/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        // console.log("donation current response", response);
        return response.json();
      })
      .then((data) => {
        // console.log("donation", data);
        // return (data ? JSON.parse(data) : {})
        if (data.msg == "No data available") {
          // setDonationData(data)
          // console.log("donationmnb", data);
        } else {
          const dataarray = [];
          // setUserData(arr);
          for (const key in data) {
            const don = {
              id: key,
              ...data[key],
            };
            dataarray.push(don);
          }
          // console.log("donationmmmm", dataarray);
       const nm = [...new Set(dataarray)];
          setDonationData(dataarray);
          // setResponse(dataarray);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };





  useEffect(() => {
    getCurrentDonor();
  }, []);
  // let id = localStorage.getItem("donor");
  const getCurrentDonor = () => {
    // console.log(id);
    // let id = localStorage.getItem('donor');
    const token = localStorage.getItem("authToken");
    fetch("http://localhost:4000/donations/don/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        // console.log("donor current response", response);
        return response.json();
      })
      .then((data) => {
        // console.log("donor", data);
        // return (data ? JSON.parse(data) : {})
        if (data.msg == "No data available") {
          setResponse(data);
          // console.log("donor", data);
        } else {
          const dataarray = [];
          // setUserData(arr);
          for (const key in data) {
            const don = {
              id: key,
              ...data[key],
            };
            dataarray.push(don);
          }
          // console.log("donationmmmm", dataarray);

          // setDonationData(dataarray);
          setResponse(dataarray);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };




  return (
  
    <Box className={classes.printback}>
      <PageHeader/>
      <div ref={ref}>
      <Paper className={classes.paperStylepdf}>
        {/* <Box sx = {{display:'flex', flexWrap: 'wrap', '& > :not(style)':{m:2, marginLeft:'auto', marginRight:'auto',marginBottom:2}}}> */}
        {/* <Paper className = {classes.paperstyle}> */}
        <Grid container spacing={0.5}>
          {/* <Grid item xs={3}>
            <Typography style={{ textAlign: "left",marginLeft:6, marginTop:15 }}>
              <Emblem />
            </Typography>{" "}
          </Grid>

          <Grid item xs={5}>
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1 }}
              style={{
                paddingBottom: 0,
                paddingTop: 10,
                textAlign: "center",
                fontWeight: 700,
                fontSize: 14
                , marginTop:10
              }}
            >
              APEKSHA HOSPITAL - MAHARAGAMA
            </Typography>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              style={{
                paddingBottom: 10,
                paddingTop: 0,
                textAlign: "center",
                fontWeight: 600,
                fontSize: 12,
              }}
            >
              Phone: 011-2850252 / 2850253.  <br />
              Fax: 011-2842051 <br />
              Email: apeksha@gmail.com <br />
              Web: www.ncisl.health.gov.lk
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography style={{ textAlign: "right", marginTop:10, marginRight:5 }}>
              <LogoNci className={classes.img} />
            </Typography>
          </Grid> */}
          <img src={header} style = {{maxHeight:400, maxWidth: 790, margin: "auto  1px auto 4px"}}/>
        </Grid>
        {/* <Divider /> */}
        <Box sx={{ pl: 5, py: 1, pr: 2 }}>
        <Grid container spacing={0.5}>
          <Grid item xs={6}>
        <Typography  style={{ fontWeight: 600, textAlign: "left" }}>
        {response.map((donor) => (
            <div key={donor.id}>
              <Typography style={{fontSize: 14,fontWeight: 600}}>
              {donor.title}.{donor.donor_name} <br/>
                {donor.address_line1} <br/>
                {donor.address_line2} <br/>
              </Typography>
            </div>
          ))}
          {date}
          </Typography></Grid>
          <Grid item xs={6}>
          <Typography  style={{ fontWeight: 600, textAlign: "right" }}>
        
          </Typography>
          </Grid>
          </Grid>

          <Typography style={{ fontWeight: 600,textAlign: "center",marginTop:10 }}> Acknowledgement Of a Donation </Typography>
          <Typography style={{ fontWeight: 600,textAlign: "center",marginTop:-20 }}>_______________________________</Typography>
          <Typography style={{
                fontSize: 14, marginTop: 10,fontWeight: 600
              }}>It is with immense gratitude we thank you for the thoughtful and Generous Gesture for the Donation of Following
items to Apeksha Hospital.</Typography>
         
          <Typography  style={{ fontSize: 14,fontWeight: 600, marginTop: 30,textAlign: "center" }}>
            <Grid container spacing={1}>
            
              <Grid item xs={4} style={{ backgroundColor: "lightBlue", border:"1px solid lightBlue" }}>
           
                Item Name{" "}
              </Grid>{" "}
             
              <Grid item xs={4} backgroundColor={"lightBlue"} style={{ border:"1px solid lightBlue"  }}>
               
                Qty
              </Grid>
             
            </Grid>
          </Typography>
          {donationData.msg}
          {donationData.map((donor) => (
            <div key={donor.id}>
              <Typography style={{ textAlign: "center",fontSize: 14,fontWeight: 600 }}>
                <Grid container spacing={0.5}>
                  <Grid item xs={4}>
                    {donor.itemname}{" "}
                  </Grid>{" "}
                  <Grid item xs={4}>
                    {" "}
                    {donor.item_qty}{" "}
                    {donor.item_description}
                  </Grid>
                  <Grid> </Grid>
                 
                </Grid>
                
              </Typography>
            </div>
          ))}
          <Typography style={{fontSize: 14, marginTop: 40, fontWeight: 600}}>
          Your valuable Donation will be of great help in improving the patient care services at the Apeksha Hospital
Maharagama.where a large number of cancer patients from all over the island are treated. <br/><br/>

We look forward to your continue support in our endeavours to provide efficient and effective patient care
services at this Hospital.<br/><br/>


Thank you.<br/>
Sincerely,
</Typography>
<Typography style={{fontSize: 14, marginTop: 10, fontWeight: 600, textAlign:"left"}}>
________________<br/>
 Director Signature <br/>
Apeksha Hospital-Maharagama.
</Typography>

<Grid container>
  <Grid item xs={12} sm={4} md={4} marginTop={20} fontFamily="helvetica" fontSize={10}>  {currentDateTime} </Grid>
  <Grid item xs={12} sm={4} md={4}><img src={hdmsLogo5} alt="this is car image" style = {{height:70, width: 200, margin: "30px auto", paddingBottom:0}}/></Grid>
  <Grid item xs={12} sm={4} md={4}></Grid>

</Grid>



        </Box>
        {/* </Paper> */}
        {/* </Box> */}
      </Paper>
      </div>
    </Box>
    
  );
 
});
export default CurrentDonation;
