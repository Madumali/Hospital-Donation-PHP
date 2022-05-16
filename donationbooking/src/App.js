
import React, { Component } from "react";
// import Login from './loginPage/Login';
// import HeaderComponent from "./components/Header/HeaderComponent"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
  Link,
  useHistory
} from "react-router-dom";

import { ThemeProvider } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core/styles';
import BookingComponent from "./bookings/BookingComponent";
import Home from "./bookings/pages/Home";
import LogInD from "./bookings/pages/login/LogInD";
import Donateus from "./bookings/pages/donateus/Donateus";
import LoginSignup from "./bookings/pages/container/LoginSignup";
import ConfirmPage from "./bookings/pages/login/ConfirmPage";
import SignUp from "./bookings/pages/signup/SignUp";
import MainPage from "./bookings/pages/reserve/mainpage/MainPage";
import AddBookings from "./bookings/pages/reserve/reservations/AddBookings";
import BookingTable from "./bookings/pages/reserve/reservations/bookingdetails/BookingTable";
import NavBar from "./bookings/NavBar";
import BookSide from "./bookings/BookSide";
const theme = createTheme({
  palette: {
    primary: {
      main: "#2196F3",
      light: '#E3F2FD',
      200:'#90CAF9',
  mainp: "#333996",
  lightp: '#3c44b126'
    },
    secondary: {
      main: "#673ab7",
      light: '#ede7f6',
  mains: "#f83245",
  lights: '#f8324526'
    },
    warning: {
      main: "#b9f6ca",
      light: "#ffe57f"
    },
    default:"#ffffff",
    error: {
      main: "#f44336",
      light: "#ef9a9a"
    },
    background: {
      default: "#f4f5fd"
    },
  },
  // #b9f6ca
  // #ffe57f
  overrides:{
    MuiAppBar:{
      root:{
        transform:'translateZ(0)'
      }
    }
  },
  props:{
    MuiIconButton:{
      disableRipple:true
    }
  }
})


// const useStyles = makeStyles({
//   appMain: {
//     paddingLeft: '320px',
//     width: '100%'
//   }
// })


const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

function App(){
  

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleDrawerClose = () => {
    setMobileOpen(false);
  };
  return (
  <>
     {/* <ThemeProvider theme={theme}> */}
    
    <Router>
        <React.Suspense fallback={loading}> 
        {/* <BookSide mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} handleDrawerClose={handleDrawerClose}/> */}
          <Switch>
         {/* <Route exact path="/" render={()=>{return (isLoggedIn ? <Redirect to="/login" />: <Redirect to="/"  />)}}/> */}
           {/* <Route exact path = '/' component={(props)=> <Protected Cmp = { Layout } {...props}/>} /> */}
            {/* <Route exact path='/login' component={()=><Login/>} /> */}
            <Route exact path='/' component={()=> <Home/> } />
           
           <Route exact path='/bookings/home' component={()=> <Home/>} />
           <Route exact path='/bookings/donate' component={()=> <Donateus/>} />
           <Route exact path='/bookings/main' component={()=> <LoginSignup/>} />
           <Route exact path='/bookings/signin' component={()=> <LogInD/>} />
           <Route exact path='/bookings/verify/:token_mail' component={()=> <ConfirmPage/>} />
           <Route exact path='/bookings/signup' component={()=> <SignUp/>} />
           
            {/* <Route exact path='/bookings/mainpage' component={()=> <MainPage/>} />
            <Route exact path='/bookings/mainpage/mybookings' component={()=> <BookingTable/>} />
            <Route exact path='/bookings/mainpage/mydonations' component={()=> <AddBookings/>} />   */}
            
        
            <BookingComponent/>
             </Switch>
             
             </React.Suspense>
          
      </Router> 
    


     
         
        

     {/* </ThemeProvider> */}
      </>
  );
}
// }

export default App;



