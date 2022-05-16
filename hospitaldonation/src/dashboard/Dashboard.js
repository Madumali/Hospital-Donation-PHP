import { Box, Card, CardContent, Grid, Paper, Typography } from "@mui/material";
import { blue, blueGrey, lightGreen, orange, red } from "@mui/material/colors";
import React, { Fragment, useEffect, useState } from "react";
import { useStyles } from "../components/BodyStyles";
import { PageHeader } from "../components/controls/Common";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Controls from "../components/controls/Controls";
import { Graph } from "../components/controls/Graph";
import { randomValue } from "../utils/GraphData";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { GraphData } from "../utils/GraphData";
import { indigo } from "@mui/material/colors";
import MainGraph from "./MainGraph";
import DonationGraph from "./DonationGraph";
import Popup from "../components/Popup";
import { Button } from "@mui/material";
import NewUserForm from "../systemuser/newusers/NewUserForm";
import { makeStyles } from "@mui/styles";




const Dashboard = ()=>{
    const classes = useStyles()
const [fetched,setFetched] = useState(false);
const [data,setdata] = useState();
const [auth, setauth] = useState(true);
const [openPopup, setOpenPopup] = useState(false);

const id = localStorage.getItem("userrole");

// if(id == "admin")
// {
    // useEffect(()=>{
    //     if(id == "admin")
    // {
    //     setdata("this will display only when admin logged in");
    // }
    // },[id])

    const [record, setItemData] = useState([])
    useEffect(()=>{
        if(id == "admin")
        {
            getItems();
        }
       
        }, []);
    
        const handlesubmit = (e)=>{
            e.preventDefault();
            setauth(false);
        }       
        let sessionUser = localStorage.getItem("name");
    
          const getItems = () => {
           
            const token = localStorage.getItem('authToken');
            console.log(token, 'token');
            fetch("http://localhost:4000/donations/newdonations",
            {
              method: "GET",
              headers:  {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization' : 'Bearer ' + token
              }
            })
            .then((response) => {
              console.log(response)
              return response.json();
             
            })
                .then(data => {
                   console.log("newdata",data);
                  //  setItemData(data);
                   const dataarray = [];
                   // setUserData(arr);
                   for (const key in data){
                       const donor = {
                           id:key,
                           ...data[key]
                       };
                       dataarray.push(donor);
                       if(donor.newdonations == 0)
                       {
                      setauth(false);
                        }
                   }
                   console.log(dataarray);
                 
                    setItemData(dataarray);
                  })
                  .catch((error) => {
                    console.error('Error:', error);
                  })
        }



const displayData = [
    {label:"Surgical Consumable", value:randomValue({digit: 1000} ),icon:<ArrowDropUpIcon/>, iconLabel:"17%"},
    {label:"Consumable Items", value:randomValue({digit: 100}),icon:<ArrowDropUpIcon/>, iconLabel:"78%"},
    {label:"Surgical Items", value:randomValue({digit: 200}),icon:<ArrowDropUpIcon/>, iconLabel:"43%"},
    {label:"Drugs", value:randomValue({digit: 100}),icon:<ArrowDropUpIcon/>, iconLabel:"11%"},
    {label:"General Items", value:randomValue({digit: 1000}),icon:<ArrowDropUpIcon/>, iconLabel:"23%"},
    {label:"Foods", value:randomValue({digit: 50}),icon:<ArrowDropUpIcon/>, iconLabel:"23%"},
]

const graphData = [
    {
        id: "Surgical Consumable",
    data: GraphData({count:9,digit:100}),
    brColor:blue[500],
    bgColor:blue[50],

    },
    {
    id: "Consumable Items",
    data: GraphData({count:9,digit:100}),
    brColor:indigo[500],
    bgColor:indigo[50],

    },
    {
        id: "Surgical Items",
    data: GraphData({count:9,digit:100}),
    brColor:lightGreen[500],
    bgColor:lightGreen[50],

    },
    {
        id: "Drugs",
    data: GraphData({count:9,digit:100}),
    brColor:orange[500],
    bgColor:orange[50],

    },
    {
        id: "General Items",
    data: GraphData({count:9,digit:100}),
    brColor:red[500],
    bgColor:red[50],

    },
    {
        id: "Foods",
    data: GraphData({count:9,digit:100}),
    brColor:red[500],
    bgColor:red[50],

    },
]

    useEffect(()=>{
        if(!fetched)
        {
            graphData.map((item,i) =>  
            {Graph(
         {   id: item.id,
    data: item.data,
    brColor: item.brColor,
    bgColor: item.bgColor
})}
);    
    setFetched(true)
        }
       
    },[fetched]);
    return(
        <>
        <Box >

        <Grid container spacing={1}>
        {auth && (
             
<>
 {record.map((item,i)=>
  <Grid key = {i} item xs={6} sm={4}>
 <Card>
 <CardContent  className={classes.cardContent} style={{backgroundColor:'#F3E5F5'}}>
 <Typography variant="body2" className={classes.cardlabel}>
                               You have received  {item.newdonations} new Donations.
                             </Typography>
                             <Typography component={"p"} style={{textAlign:"center", marginBottom:"0px",}}>
                             <Controls.Button
                             color="inherit"
                             text="View" size="small"   
                             onClick={() => setOpenPopup(true)}/>
                              
                        
                             </Typography>
                             </CardContent>
     </Card> 
  </Grid> )}
 

  </>
        )}
        </Grid>  
        <Popup
            title="View Details"
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
          >
              <Paper>
                  <form onSubmit={handlesubmit}>
<Controls.Button type="submit" text="Submit" onClick={()=>{setauth(false)}}/>
                  </form>
              </Paper>
     {/* <NewUserForm addnew = {addnew}/> */}
          </Popup>
        </Box>

    <Box className={classes.section}>
        <Grid container spacing={1}>

        
                    {displayData.map((item,i) => 
                        
                     <Grid key = {i} item xs={6} sm={2}>
                         
                     <Card>
                         <CardContent  className={classes.cardContent}>
                         <canvas id= {item.label} className={classes.displayCard}></canvas>
                     
                             <Typography variant="body2" className={classes.cardlabel}>
                                 {item.label}
                             </Typography>
                             <Typography variant="h5" component="h6" className={classes.carditem}>
                               {item.value}
                             </Typography>
                             <Typography component={"p"} style={{textAlign:"center", marginBottom:"0px",}}>
                             <Button size="small" className={classes.ratio} startIcon={item.icon} 
                             style={{color: item.label[0] === "S" ? indigo[500] : lightGreen[500]}}>
                              {item.iconLabel}
                             </Button>
                             </Typography>
                         </CardContent>
                         </Card>
            </Grid>
                         )}
                        
        </Grid>
         

    
        <DonationGraph/>
   
       
    </Box>

   



    </>
    );

}
export default Dashboard;