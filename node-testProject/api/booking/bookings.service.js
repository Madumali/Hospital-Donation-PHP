const db_connection = require("../routes/config/database");
var dt = require("./date");
var dtOnly = require("./dateOnly");
const nodemailer = require("nodemailer");
const config = require("../config.json");
const jwt = require("jsonwebtoken");
const datenow = dt.date();
const dateonly = dtOnly.dateOnly();

module.exports = {
  registerDonors,
  verifyEmail,
  authenticationDonor,
  registerBooking,
  selectBookDate,
  selectBookings,
};

//email sender detail
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nadeeshamadumalihettiarachchi@gmail.com",
    pass: "qiuqwymsqnsbnvzr",
  },
  tls: {
    rejectUnauthorized: false,
  },
});
//signup booking donor
const saveReserveDonors = (con, payload) => {
  var mail = {
    email: payload.email,
  };
  const token_mail = jwt.sign(mail, config.secret, { expiresIn: "1d" });
  var url = "http://localhost:3000/bookings/verify/" + token_mail;

  return new Promise((resolve, reject) => {
    const selectQuery = "SELECT COUNT(`donor_id`) as idct FROM `donor_all`";
    con.query(selectQuery, function (err, resultt) {
      let iddd = resultt[0].idct + 1;
      const query =
        "INSERT INTO `donor_all`(`donor_id`, `R/D`, `donor_type`, `title`, `national_id`, `donor_name`, `email`, `contact_no`, `reg_date`, `donor_password`, `isVerified`, `isBloodDon`, `delete_status`) VALUES (" +
        iddd +
        ",?) ";
      var val = [
        "B",
        "person",
        payload.title,
        payload.national_id,
        payload.donor_name,
        payload.email,
        payload.contact_no,
        datenow,
        payload.donor_password,
        "0",
        "0",
        "0",
      ];
      con.query(query, [val], function (err, result) {
        if (err) return reject(err);
        console.log(result);
        resolve(result);

        //send verification email to donor
        var mailOptions = {
          from: '"Verify your email" <nadeeshamadumalihettiarachchi@gmail.com>',
          to: payload.email,
          subject: "Account Verification",
          html: `<p><b>${payload.donor_name}</b>! Thanks for registering on our site, kindly use this <a href=${url}>link</a> to verify your email address</p>`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
            return reject(error);
          } else {
            console.log("Email sent: " + info.response);
            resolve(info);
          }
        });
      });
    });
  });
};

async function registerDonors(payload) {
  try {
    const conn = await db_connection();
    const response = await saveReserveDonors(conn, payload);
    if (response.donor_name == "") {
      return { status: 400, msg: "Something  Wrong", response };
    } else {
      return {
        status: 200,
        msg: "Please Check Your Email Id to Confirm Registration",
        response,
      };
    }
  } catch (e) {
    console.error(e);
    if (e.code == "ER_DUP_ENTRY") {
      return { status: 400, msg: "Donor already exist" };
    }
    return { status: 400, msg: "Something is Wrong" };
  }
}
//verify signup email
const verifymail = (con, token) => {
  return new Promise((resolve, reject) => {
    if (token) {
      jwt.verify(token, config.secret, (e, decoded) => {
        if (e) {
          console.log(e);
        } else {
          email = decoded.email;
          const selectQuery =
            "SELECT isVerified FROM donor_all WHERE email='" + email + "'";
          con.query(selectQuery, function (err, resultt) {
            if (err) return reject(err);
            if (resultt[0].isVerified == "0") {
              const sqlqry =
                "UPDATE donor_all SET isVerified = 1 WHERE email='" +
                email +
                "'";
              console.log(sqlqry);
              con.query(sqlqry, function (err, result) {
                if (err) return reject(err);
                if (result.length < 1) {
                  return resolve([]);
                } else {
                  resolve(result);
                }
              });
            } else {
              console.log("2");
              resolve(resultt[0]);
              console.log("elsepart", resultt[0]);
            }
          });
        }
      });
    }
  });
};

async function verifyEmail(token) {
  try {
    const conn = await db_connection();
    const response = await verifymail(conn, token);
    const r = response;
    console.log("this is verification", r);
    if (response.length < 1) {
      return { statusTxt: "", msg: "No data available" };
    } else {
      if (response.isVerified == 1) {
        return {
          response,
          statusTxt: "true",
          msg: "Email has Already Verified!",
        };
      } else {
        return {
          response,
          statusTxt: "success",
          msg: "Email Verification Success!",
        };
      }
    }
  } catch (e) {
    console.error;
  }
}

//login authentication
const loginDonor = (con, email, donor_password) => {
  return new Promise((resolve, reject) => {
    con.query(
      "SELECT * FROM `donor_all` WHERE `email` = '" +
        email +
        "' AND `donor_password` = '" +
        donor_password +
        "' ; ",

      function (err, result) {
        if (err) return reject(err);

        if (result.length < 1) {
          return resolve([]);
        } else {
          return resolve(result[0]);
        }
      }
    );
  });
};

async function authenticationDonor({ email, donor_password }) {
  try {
    const conn = await db_connection();
    const response = await loginDonor(conn, email, donor_password);
    if (response.length < 1) return "Username or password is incorrect";
    const token = jwt.sign({ sub: response.donor_id }, config.secret, {
      expiresIn: "1d",
    });
    return {
      ...omitPassword(response),
      token,
    };
  } catch (e) {
    console.error;
  }
}

// book donation meal/soup
const saveReserve = (con, payload) => {
  console.log("ppppp", payload);
  var type = payload.id;

  return new Promise((resolve, reject) => {
    const selectQuery =
      "SELECT COUNT(`booking_id`) as bookCount FROM `bookings`";
    con.query(selectQuery, function (err, resultt) {
      let iddd = resultt[0].bookCount + 1;
      if (type == "SP") {
        var descrip = "soup";
        const query =
          "INSERT INTO `bookings`(`booking_id`,`temp_donor`, `reserved_date`, `reserved_in`, `reserve_status`, `reserve_delete`, `approve`) VALUES  (" +
          iddd +
          ",?) ";
        var val = [
          payload.temp_donor,
          payload.reserved_date,
          datenow,
          "1",
          "0",
          "pending",
        ];
        con.query(query, [val], function (err, result) {
          if (err) return reject(err);
          console.log(result);
          resolve(result);
        });

        //this part will work if the reservationis for soup

        let query2 =
          "INSERT INTO `temp_item_table`(`bookingId`, `code`, `item_name`, `item_qty`, `item_description`, `action`) VALUES  (" +
          iddd +
          ",?) ";

        var val2 = [payload.code, payload.item_name, "0", descrip, "0"];
        console.log("query2", query2);
        con.query(query2, [val2], function (err, result) {
          if (err) return reject(err);

          console.log(err);

          resolve(result);

          const sqlselect =
            "SELECT * FROM bookings INNER JOIN donor_all ON bookings.temp_donor = donor_all.donor_id INNER JOIN temp_item_table ON bookings.booking_id = temp_item_table.bookingId INNER JOIN item_name ON temp_item_table.item_name = item_name.code WHERE bookings.temp_donor = " +
            payload.temp_donor +
            " ";
          con.query(sqlselect, function (err, results) {
            if (err) return reject(err);

            console.log(err);

            resolve(results);
            results.forEach((element) => {
              console.log("there are", element);
            });
            var donorname = results[0].donor_name;
            var donorEmail = results[0].email;
            //send email to bookingdonor
            var mailOptions = {
              from: "<nadeeshamadumalihettiarachchi@gmail.com>",
              to: donorEmail,
              subject: "Reservation for Donation",
              html: `<p><b>${donorname}</b>! Thanks for the reservation, </p>
  <h5> Once the reservation approved you will receive ingrediant list for your donation</h5>`,
            };

            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
                return reject(error);
              } else {
                console.log("Email sent: " + info.response);
                resolve(info);
              }
            });
          });
        });

        const query3 =
          "INSERT INTO `soup`(`donation_num`, `morning`, `evening`) VALUES  (" +
          iddd +
          ",?) ";
        console.log("query3", query3);
        var val3 = [payload.morning, payload.evening];
        con.query(query3, [val3], function (err, result) {
          if (err) return reject(err);
          console.log(result);
          resolve(result);
        });
      } else {
        const query =
          "INSERT INTO `bookings`(`booking_id`,`temp_donor`, `reserved_date`, `reserved_in`, `reserve_status`, `reserve_delete`, `approve`) VALUES  (" +
          iddd +
          ",?) ";
        var val = [
          payload.temp_donor,
          payload.reserved_date,
          datenow,
          "1",
          "0",
          "pending",
        ];
        con.query(query, [val], function (err, result) {
          if (err) return reject(err);
          console.log(result);
          resolve(result);
        });
        //this code part will work if the booking is not a soup
        var descrip = "meal";
        let query2 =
          "INSERT INTO `temp_item_table`(`bookingId`, `code`, `item_name`, `item_qty`, `item_description`, `action`) VALUES (" +
          iddd +
          ",?) ";

        var val2 = [payload.code, payload.item_name, 0, descrip, "0"];
        console.log("query2", query2);
        con.query(query2, [val2], function (err, result) {
          if (err) return reject(err);

          console.log(err);

          resolve(result);

          const sqlselect =
            "SELECT * FROM bookings INNER JOIN donor_all ON bookings.temp_donor = donor_all.donor_id INNER JOIN temp_item_table ON bookings.booking_id = temp_item_table.bookingId INNER JOIN item_name ON temp_item_table.item_name = item_name.code WHERE bookings.temp_donor = " +
            payload.temp_donor +
            " ";
          con.query(sqlselect, function (err, results) {
            if (err) return reject(err);

            console.log(err);

            resolve(results);
            results.forEach((element) => {
              console.log("there are", element);
            });
            var donorname = results[0].donor_name;
            var donorEmail = results[0].email;
            //send email to bookingdonor
            var mailOptions = {
              from: "<nadeeshamadumalihettiarachchi@gmail.com>",
              to: donorEmail,
              subject: "Reservation for Donation",
              html: `<p><b>${donorname}</b>! Thanks for the reservation, </p>
<h5> Once the reservation approved you will receive ingrediant list for your donation</h5>`,
            };

            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
                return reject(error);
              } else {
                console.log("Email sent: " + info.response);
                resolve(info);
              }
            });
          });
        });
      }
    });
  });
};

async function registerBooking(payload) {
  try {
    const conn = await db_connection();
    const response = await saveReserve(conn, payload);
    if (response.id == "") {
      return { status: 400, msg: "Something  Wrong", response };
    } else {
      return {
        status: 200,
        msg: "Please Check Your Email Id to Confirm Registration",
        response,
      };
    }
  } catch (e) {
    console.error(e);
    if (e.code == "ER_DUP_ENTRY") {
      return { status: 400, msg: "Donor already exist" };
    }
    return { status: 400, msg: "Something is Wrong" };
  }
}

function omitPassword(user) {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

const selectAllML = (con) => {
  return new Promise((resolve, reject) => {
    con.query(
      "SELECT reserved_date as dates, month(reserved_date) as month  FROM `bookings` WHERE reserve_delete = 0 AND approve = 'approve'  ORDER BY month;",

      function (err, result) {
        if (err) return reject(err);
        if (result.length < 1) {
          return resolve([]);
        } else {
          resolve(result);
        }
      }
    );
  });
};

async function selectBookDate() {
  try {
    const conn = await db_connection();
    const response = await selectAllML(conn);
    if (response.length < 1) {
      return { msg: "No data available" };
    }
    return {
      ...omitPassword(response),
    };
  } catch (e) {
    console.error;
  }
}

const selectAllBookin = (con, id) => {
  return new Promise((resolve, reject) => {
    con.query(
      "SELECT *  FROM `bookings` INNER JOIN temp_item_table ON bookings.booking_id = temp_item_table.bookingId INNER JOIN item_name ON temp_item_table.item_name = item_name.code WHERE temp_donor = " +
        id +
        " AND reserve_delete = 0 ;",

      function (err, result) {
        if (err) return reject(err);
        if (result.length < 1) {
          return resolve([]);
        } else {
          resolve(result);
        }
      }
    );
  });
};

async function selectBookings(id) {
  try {
    const conn = await db_connection();
    const response = await selectAllBookin(conn, id);
    console.log("this is book", response);
    if (response.length < 1) {
      return { msg: "No data available" };
    }
    return {
      ...omitPassword(response),
    };
  } catch (e) {
    console.error;
  }
}
