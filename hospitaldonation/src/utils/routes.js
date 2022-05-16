import React from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AddNewUsers from "../systemuser/newusers/AddNewUsers";
import Category from "../category/Categories";
import Login from "../loginPage/Login";
import AddDonors from "../donors/adddorors/AddDonors";
import AddDonation from "../donation/newdonation/AddDonation";
import AddItem from "../items/AddItem";
import AddRequired from "../required/AddRequired";
import AddIssuance from "../issuance/AddIssuance";
import CurrentDonation from "../donation/newdonation/CurrentDonation";
import Print from "../donation/newdonation/Print";
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import TableViewOutlinedIcon from '@mui/icons-material/TableViewOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import DonationList from "../donation/alldonation/DonationList";
import Dashboard from "../dashboard/Dashboard";
import Inventory from "../inventory/Inventory";
import AddBookings from "../bookings/pages/reserve/reservations/AddBookings";
import AllUsers from "../systemuser/allusers/AllUsers";
import AllDonor from "../donors/alldonors/AllDonor";
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import BookOnlineOutlinedIcon from '@mui/icons-material/BookOnlineOutlined';
import SingleUser from "../systemuser/allusers/SingleUser";
import ReportsMain from "../reports/ReportsMain";
import AssessmentTwoToneIcon from '@mui/icons-material/AssessmentTwoTone';
import BackupDonor from "../backups/donorBackup/BackupDonor";
import BackupDonation from "../backups/donationBackup/BackupDonation";
import BackupIssue from "../backups/donIssueBackup/BackupIssue";

const routes = [

  {
    path: "/dashboard",
    displayName: "Dashboard",
    component: <div> <Dashboard /> </div>,
    icon: <DashboardOutlinedIcon />,
  },
  {
    path: "/user",
    displayName: "System User",
    component: <div> <AddNewUsers /> </div>,
    icon: <AdminPanelSettingsOutlinedIcon />,
    iconClosed: <ArrowDropDownIcon />,
    iconOpened: <ArrowDropUpIcon />,
    roles: ['admin'],
    subNav: [
      {
        path: "/user/addnew",
        displayName: "Add User",
        component: <div> <AddNewUsers /> </div>,
        icon: <AccountCircleIcon />,
      },
      {
        path: "/user/list",
        displayName: "Users",
        component: <div> <AllUsers /> </div>,
        icon: <SupervisorAccountIcon />,
      },
      // {
      //   path: "/user/list/id",
      //   displayName: "Users",
      //   component: <div> <SingleUser /> </div>,
      //   icon: <SupervisorAccountIcon />,
      // }
    ]

  },


  {
    path: "/items",
    displayName: "Items",
    component: <div> <AddItem /> </div>,
    icon: <CategoryOutlinedIcon />,
    //  icon: <AdminPanelSettingsIcon/>,
    iconClosed: <ArrowDropDownIcon />,
    iconOpened: <ArrowDropUpIcon />,
    // roles: ['admin','front user'],
    subNav: [
      {
        path: "/items/category",
        displayName: "Add Category",
        component: <div> <Category /> </div>,
        icon: <TableViewOutlinedIcon />,
       
      },
      {
        path: "/items/items",
        displayName: "Items",
        component: <div> <AddItem /> </div>,
        icon: <ListAltOutlinedIcon />,
        
      },
     

    ]
  },



  {
    path: "/donors",
    displayName: "Donors",
    component: <div> <AddDonors /> </div>,
    icon: <GroupAddOutlinedIcon />,
    iconClosed: <ArrowDropDownIcon />,
    iconOpened: <ArrowDropUpIcon />,
    roles: ['admin', 'front user'],
    subNav: [
      {
        path: "/donors/list",
        displayName: "Donor List",
        component: <div> <AllDonor /> </div>,
        icon: <ListAltOutlinedIcon />
      },
    ]
  },

  {
    path: "/donations/",
    displayName: "Donations",
    component: <div> <AddDonation /> </div>,
    icon: <VolunteerActivismOutlinedIcon />,
    iconClosed: <ArrowDropDownIcon />,
    iconOpened: <ArrowDropUpIcon />,
    roles: ['admin', 'front user'],
    subNav: [
      {
        path: "/donations/list",
        displayName: "Donation List",
        component: <div> <DonationList /> </div>,
        icon: <ListAltOutlinedIcon />
      },
    ]
  },

  {
    path: "/requires",
    displayName: "Request Donation ",
    component: <div> <AddRequired /> </div>,
    icon: <CardGiftcardIcon />,
    roles: ['admin','receiver'],
  },

  {
    path: "/issuance",
    displayName: "Issue Items",
    component: <div> <AddIssuance /> </div>,
    icon: <LocalShippingOutlinedIcon />,
    roles: ['admin', 'front user'],
  },
  {
    path: "/inventory",
    displayName: "Inventory",
    component: <div> <Inventory /> </div>,
    icon: <StorefrontOutlinedIcon />,
    roles: ['admin', 'front user'],
  },
  
  {
    path: "/reports",
    displayName: "Reports",
    component: <div> <ReportsMain /> </div>,
    icon: <AssessmentTwoToneIcon />,
  },
  {
    path: "/backup",
    displayName: "BackUps",
    // component: <div> <AddBookings /> </div>,
    iconClosed: <ArrowDropDownIcon />,
    iconOpened: <ArrowDropUpIcon />,
    // icon: <BookOnlineOutlinedIcon />,
    roles: ['admin'],
    subNav: [
      {
        path: "/backup/donors",
        displayName: "Donors",
        component: <div> <BackupDonor /> </div>,
        icon: <ListAltOutlinedIcon />
      },
      {
        path: "/backup/donation",
        displayName: "Donation",
        component: <div> <BackupDonation /> </div>,
        icon: <ListAltOutlinedIcon />
      },
      {
        path: "/backup/issue",
        displayName: "Issue",
        component: <div> <BackupIssue /> </div>,
        icon: <ListAltOutlinedIcon />
      },
    ]
  },

  {
    path: "/current",
    displayName: "",
    component: <CurrentDonation />
  },

  {
    path: "/print",
    displayName: "",
    component: <Print />
  },





  // { path: "/donations/:id",  component: <div> <AddDonation/> </div>},
  // { path: "/donors/:id", component: <div> <AddDonors/> </div>},
];

export default routes;
