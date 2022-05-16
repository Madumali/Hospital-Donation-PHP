const express = require("express");
const router = express.Router();
const bookingsService = require("./bookings.service");


router.get("/allbookings/:donor_id", selectBookings)
router.get("/bookddate", selectBookDate);
router.post("/soupreserve", registerBooking);
router.post("/signin", authenticationDonor);
router.get("/verify/:token_mail", verifyEmail);
router.post("/signup", registerDonors);
module.exports = router;




function selectBookings(req, res, next)
{
  bookingsService
.selectBookings(req.params.donor_id)
.then((bookings) => res.json(bookings))
.catch(next);

}

function selectBookDate(req, res, next)
{
  bookingsService
.selectBookDate()
.then((bdonors) => res.json(bdonors))
.catch(next);

}

function authenticationDonor(req, res, next)
  {
    bookingsService
    .authenticationDonor(req.body)
    .then((bdonor) => res.json(bdonor))
    .catch(next);


  }

function verifyEmail(req, res, next)
  {
    bookingsService
    .verifyEmail(req.params.token_mail)
    .then((donor) =>res.json(donor))
    
    .catch(next);


  }


  function registerBooking(req, res, next) {
    bookingsService
       .registerBooking(req.body)
       .then((response) => {
         res.status(response.status);
         res.json(response);
       })
       .catch(next);
   }

function registerDonors(req, res, next) {
   bookingsService
      .registerDonors(req.body)
      .then((response) => {
        res.status(response.status);
        res.json(response);
      })
      .catch(next);
  }