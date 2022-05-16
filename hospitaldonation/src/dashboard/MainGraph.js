import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, CardHeader, Grid, Typography } from "@material-ui/core";
import { blue, purple } from "@material-ui/core/colors";
import { useStyles } from "../components/BodyStyles";
import { GraphMain } from "../components/controls/Graph";
import { GraphData } from "../utils/GraphData";
// import { Chart, registerables } from "chart.js";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js';
ChartJS.register(LineController, LineElement, PointElement, LinearScale, Title);

const MainGraph = () => {
    const classes = useStyles();
    const [chartData, setChartData] = useState({});
    const [employeeSalary, setEmployeeSalary] = useState([]);
    const [employeeAge, setEmployeeAge] = useState([]);
  
    const chart = () => {
     
    //   axios
    //     .get("http://dummy.restapiexample.com/api/v1/employees")
    //     .then(res => {
    //       console.log(res);
    //       for (const dataObj of res.data.data) {
    //         empSal.push(parseInt(dataObj.employee_salary));
    //         empAge.push(parseInt(dataObj.employee_age));
    //       }
          setChartData({
            labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
            datasets: [
              {
                label: "level of thiccness",
                data: [ 32,11,22,55,66,55,99,88,66,33,22,33 ],
                backgroundColor: ["rgba(75, 192, 192, 0.6)"],
                borderWidth: 4
              }
            ]
          });
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    //   console.log(empSal, empAge);
    };
  
    useEffect(() => {
      chart();
    }, []);
    // useEffect(()=>{
    //     getTotalDonation();
    //     // setUserData([]);
    // }, []);

    // const getTotalDonation = () => {
     
    //     const token = localStorage.getItem('authToken');
    //     console.log(token, 'token');
    //     fetch("http://localhost:4000/stock/totaldonperMonth",
    //     {
    //       method: "GET",
    //       headers:  {
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json',
    //         'Authorization' : 'Bearer ' + token
    //       }
    //     })
    //     .then((response) => {
    //       console.log("permontheee",response)
    //       return response.json()
         
    //     })
            
    //         .then(data => {
    //           //  console.log(data);
    //            const dataarray = [];
    //            // setUserData(arr);
    //            for (const key in data){
    //                const stock = {
    //                    id:key,
    //                    ...data[key]
    //                };
    //                dataarray.push(stock);
    //            }
    //            console.log("per month",dataarray);
    //            setTotalPerMonth(dataarray)
    //           })
    //           .catch((error) => {
    //             console.error('Error:', error);
    //           })
    // }
   


// const chart = () => {

//     setChartData({
//     labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
//     datasets: [{
//       label:'received',
//       data:[ 32,11,22,55,66,55,99,88,66,33,22,33 ],
//     //   fill: true,
//     //   borderColor: blue["A200"],
      
//       backgroundColor: [
//            'rgba(21,101,192,0.6)' 
//         ],
//    borderWidth : 4
//     },

//         ]

// });

// }

   

    useEffect(()=>{
        chart();
    },[])


    return(
        // <Box className={classes.section}>
        //     <Grid container spacing={1}>
        //         <Grid item xs ={12} sm={7}>
        //         <Card>
        //             <CardContent>
        //                 <Typography variant="h5" component="h6">
        //                     Donations
        //                 </Typography>
        //             </CardContent>
        //             <CardContent>
                      //  <canvas id= "monthlyDonationsPie" className={classes.displayMainGraph}></canvas>
                      <div>
                    <Bar
                    data = {chartData}
          
          options={{
            responsive: true,
            title: { text: "THICCNESS SCALE", display: true },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true
                  },
                  gridLines: {
                    display: false
                  }
                }
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false
                  }
                }
              ]
            }
          }}
        />
          </div>      /* //     </CardContent> */
                 /* </Card> */

                // </Grid>


                // <Grid item xs ={12} sm={5}>
                // <Card>
                //     <CardContent>
                //         <Typography variant="h5" component="h6">
                //             Donations Inventory
                //         </Typography>
                //     </CardContent>
                //     <CardContent>
                /* <canvas id= "monthlyDonationsPie" className={classes.displayMainGraph}></canvas> */
        //         </CardContent>
        //         </Card>
        //         </Grid>
        //     </Grid>
        // </Box>
    )

}
export default MainGraph;






// const graphData = [
    //     {
    // id: "monthlyDonations",
    // type: "bar",
    // data: dataarray,
    // lbl:"Received",
        // {
        //     label: "Received",
        //     data: totalpermonth,
        //     backgroundColor: "rgba(21,101,192,0.6)",
        //     borderdColor:blue["A200"],
        //     fill:true,
        //     tension:0.5
        // },
        // {
        //     label: "Issued",
        //     data: GraphData({count:30,digit:100}),
        //     backgroundColor: "rgba(198,40,40,0.6)",
        //     borderdColor:purple["A200"],
        //     fill:true,
        //     tension:0.5
        // }
    
    // xAxislabels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    //     },

        // {
        //     id: "monthlyDonationsPie",
        //     type: "pie",
        //     datasets: [
        //         {
        //             label: "Received",
        //             data: GraphData({count:6,digit:1000}),
        //             backgroundColor:[ blue[100],blue[200],blue[300],blue[400],blue[500],blue[600]],
        //             borderdColor:blue["A200"],
        //             fill:true,
        //             tension:0.5
        //         },
                // {
                //     label: "Issued",
                //     data: GraphData({count:30,digit:100}),
                //     backgroundColor: "rgba(198,40,40,0.6)",
                //     borderdColor:purple["A200"],
                //     fill:true,
                //     tension:0.5
    //             // }
    //         ],
    //         xAxislabels: ["SC","SI","CI","DR","GI","FD"],
    //             }


    // ]