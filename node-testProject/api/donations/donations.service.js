const db_connection = require("../routes/config/database"); //import db connection
const nodemailer = require("nodemailer"); //import nodemailer
var dt = require("./date"); //import date from date.js file in year.month.date format
const datenow = dt.date();

//export all async functions
  module.exports = {
  registerDonations,
  selectLatestDonation,
  selectLatestDonor,
  selectAllDonations,
  selectCountNewDonation,
  filterDonationByDates,
  updateDonationDelete,
  selectAllDeletedDonation,
restoreDeleteDonation,
DeleteDonationForever,
};


//SELECT DONATIONS BY FILTERING DATES
const filterDonationbyDates = (con, start_dated, end_dated) => {
  console.log("start date", start_dated);
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT  * FROM `donation` INNER JOIN `item_table` ON `donation`.donation_id = `item_table`.donationNum INNER JOIN `donor_all` ON `donation`.donorName = `donor_all`.donor_id INNER JOIN `item_name` ON `item_table`.item_name = `item_name`.code  WHERE `donation_delet` = 0 AND  (`donationDate` BETWEEN '" +
      start_dated +
      "' AND  '" +
      end_dated +
      "') ;";
    console.log("filter betweeen", sql);
    con.query(sql, function (err, result) {
      if (err) return reject(err);
      if (result.length < 1) {
        return resolve([{ item_id: 0, msg: "No data available" }]);
      } else {
        resolve(result);
      }
    });
  });
};
async function filterDonationByDates(start_dated, end_dated) {
  try {
    const conn = await db_connection();
    const response = await filterDonationbyDates(conn, start_dated, end_dated);
    console.log("this is response", response);
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





//This function will retrieve count of donation status
const selectNewDonation = (con) => {
  return new Promise((resolve, reject) => {
    const nowdon =
      "SELECT count(donationstatus) as newdonations FROM `donation` WHERE `donationstatus` = 1";
    con.query(nowdon, function (err, results) {
      if (err) return reject(err);
      if (results.length < 1) {
        return resolve([]);
      } else {
        resolve(results);
      }
    });
  });
};

async function selectCountNewDonation() {
  try {
    const conn = await db_connection(); //waiting fo db connection
    const response = await selectNewDonation(conn); //waiting for selectNewDonation to execute
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

//This function will retrieve all donations
const selectAllDonation = (con) => {
 
  return new Promise((resolve, reject) => {
    const sqlquery =
      "SELECT * FROM `item_table` INNER JOIN donation ON item_table.donationNum = donation.donation_id INNER JOIN `donor_all` ON `donation`.`donorName` = `donor_all`.`donor_id` INNER JOIN `item_name` ON `item_table`.`item_name` = `item_name`.`code` WHERE `item_table`.`deleted`= 0 ; ";

    con.query(sqlquery, function (err, result) {
      if (err) return reject(err);
      if (result.length < 1) {
        return resolve([]);
      } else {
        resolve(result);
      }
    });
  });
};
async function selectAllDonations() {
  try {
    const conn = await db_connection();
    const response = await selectAllDonation(conn);
    // console.log(response);
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

//This will retrieve all donation details of current donation done by a donor
const selectDonNow = (con, id) => {
  return new Promise((resolve, reject) => {
    const sqlquery =
      "SELECT * FROM `item_table` INNER JOIN donation ON item_table.donationNum = donation.donation_id INNER JOIN `donor_all` ON `donation`.`donorName` = `donor_all`.`donor_id` INNER JOIN `item_name` ON `item_table`.`item_name` = `item_name`.`code` WHERE `donation`.`donorName`= " +
      id +
      "  AND `receive_date` = '" +
      datenow +
      "'; ";

    con.query(sqlquery, function (err, result) {
      if (err) return reject(err);
      if (result.length < 1) {
        return resolve([]);
      } else {
        resolve(result);
      }
    });
  });
};

async function selectLatestDonation(id) {
  try {
    const conn = await db_connection();
    const response = await selectDonNow(conn, id);
    // console.log(response);
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


//This function will get currentdonation donor details
const selectDonornameNow = (con, id) => {
  return new Promise((resolve, reject) => {
    const sqlquery = "SELECT * FROM `donor_all` WHERE `donor_id`= " + id + " ";
    con.query(sqlquery, function (err, result) {
      if (err) return reject(err);
      if (result.length < 1) {
        return resolve([]);
      } else {
        resolve(result);
      }
    });
  });
};
async function selectLatestDonor(id) {
  try {
    const conn = await db_connection();
    const response = await selectDonornameNow(conn, id);
    // console.log(response);
    if (response.length < 1) {
      return { msg: "No data available" };
    }
    return {
      ...omitPassword(response),
    };
  } catch (e) {
    console.error;
  }
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

// This function saves donation to db
const saveDonations = (con, payload) => {
  return new Promise((resolve, reject) => {
    const selectQuery =
      "SELECT COUNT(`donation_id`) as donationId FROM `donation`";
    con.query(selectQuery, function (err, resultt) {
      let donationId = resultt[0].donationId + 1;
      const query1 =
        "INSERT INTO `donation`(`donation_id`, `user`, `donorName`, `donationDate`, `donation_delet`, `donationstatus`) VALUES (" +
        donationId +
        ", ?) ";
      var valT = [payload.added_by, payload.donor_name, datenow, "0", "1"];
      con.query(query1, [valT], function (err, result) {
        if (err) {
          return reject(err);
        } else {
          console.log(result);
          // var id = result.insertId;
          resolve(result);
        }
      });
//this query insert items of a particular donation to item_table
const selectSql =  "SELECT COUNT(`item_id`) as itemid FROM `item_table`;";
console.log("selectid, ",selectSql)
con.query(selectSql,function (err, result) { 
   var id = result[0].itemid + 1;
      let query2 =
        "INSERT INTO `item_table`(`item_id`,`donationNum`, `type_code`, `item_name`, `item_qty`, `item_description`, `receive_date`, `deleted`) VALUES ? ";
      var val = payload.inputFieldsd.map((item) => [
        id,
        donationId,
        item.type_code,
        item.item_name,
        item.item_qty,
        item.item_description,
        datenow,
        "0",
      ]);

      con.query(query2, [val], function (err, result) {
        if (err) return reject(err);

        console.log(err);

        resolve(result);

        const sqlselect =
          "SELECT * FROM donation INNER JOIN donor_all ON donation.donorName = donor_all.donor_id INNER JOIN item_table ON donation.donation_id = item_table.donationNum INNER JOIN item_name ON item_table.item_name = item_name.code WHERE donation.donorName = " +
          payload.donor_name +
          " ";
        con.query(sqlselect, function (err, results) {
          if (err) return reject(err);
          console.log(err);
          resolve(results);
          var donorname = results[0].donor_name;
          //send email to donor
          var mailOptions = {
            from: "<nadeeshamadumalihettiarachchi@gmail.com>",
            to: payload.email,
            subject: "Acknowledgement Of a Donation",
            html: `<p><b>${donorname}</b>! Thanks for donation, </p>
            <h5> we received ${results.map((item) => [
            item.itemname + "-" + item.item_qty,
            ])} </h5>`,
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

      //This query insert quantity details to stock table
    
      const query3 =
        "INSERT INTO `stock`(`item_num`,`enteredBy`, `codeid`, `codename`, `item_qty_in`, `item_qty_out`, `date`, `status`, `delete_stk`) VALUES  ? ";

      var val = payload.inputFieldsd.map((item) => [
        id,
        item.added_by,
        item.codeid,
        item.item_name,
        item.item_qty,
        "0",
        datenow,
        "0",
        "0",
      ]);

      con.query(query3, [val], function (err, result) {
        if (err) return reject(err);
        console.log(err);
        resolve(result);
      });


      if (err) return reject(err);
      if (result.length < 1) {
        return resolve([]);
      } else {
        resolve(result);
    }
  }
);
    });
  });
};


async function registerDonations(payload) {
  try {
    const conn = await db_connection();
    const response = await saveDonations(conn, payload);
    if (response.item_name == "") {
      return { status: 400, msg: "Please fill items", response };
    } else {
      return { status: 200, msg: "Donation added successfully", response };
    }
  } catch (e) {
    console.error(e);
    if (e.code == "ER_PARSE_ERROR") {
      return { status: 400, msg: "Something is Wrong" };
    }
    return { status: 400, msg: "Something is Wrong" };
  }
}



//DELETE DONATION BY CHANGING DELETE STATUS
const deleteDonation = (con, id, payload) => {
 console.log("payload", payload)
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE `item_table` SET `deleted`= 1 WHERE `item_id`= ? ";

    con.query(sql, [payload.item_id], function (err, result) {
      console.log(err, result, "result, error");
      if (err) return reject(err);
      if (result.length < 1) {
        return resolve([]);
      } else {
        resolve(result);
      }
    });

      const sql2 =
      "UPDATE `stock` SET `delete_stk` = 1  WHERE `item_num` = ? ";

    con.query(sql2, [payload.item_id], function (err, result) {
      console.log(err, result, "result, error");
      if (err) return reject(err);
      if (result.length < 1) {
        return resolve([]);
      } else {
        resolve(result);
      }
    });
  });
};
async function updateDonationDelete(id, payload) {
  try {
    const conn = await db_connection();
    const response = await deleteDonation(conn, id, payload);
    if (response.length < 1) return "No Data";
    if (response)
      return { status: 200, msg: "Donation deleted successfully", response };
    return { status: 400, msg: "Something  Wrong", response };
  } catch (e) {
    console.error(e);
  }
}

//SELECT  DELETED DONATIONS DETAILS FOR BACKUP
const selectAllDeleteDonation = (con) => {
  return new Promise((resolve, reject) => {
    con.query(
      "SELECT * FROM `item_table` INNER JOIN donation ON item_table.donationNum = donation.donation_id INNER JOIN `donor_all` ON `donation`.`donorName` = `donor_all`.`donor_id` INNER JOIN `item_name` ON `item_table`.`item_name` = `item_name`.`code` WHERE item_table.`deleted` = 1 ;",

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
async function selectAllDeletedDonation() {
  try {
    const conn = await db_connection();
    const response = await selectAllDeleteDonation(conn);
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


//RESTORE DELETED DONATIONS
const restoreDonation = (con, payload) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE `item_table` SET `deleted`= 0 WHERE `item_id`= "+payload+"";
    con.query(sql, function (err, result) {
      console.log(err, result, "result, error");
      if (err) return reject(err);
      if (result.length < 1) {
        return resolve([]);
      } else {
        resolve(result);
      }
    });
    const sql2 =  "UPDATE `stock` SET `delete_stk` = 0  WHERE `item_num` = ?";
   
    con.query(sql2,[payload], function (err, result) {
      console.log(err, result, "result, error");
      if (err) return reject(err);
      if (result.length < 1) {
        return resolve([]);
      } else {
        resolve(result);
      }
    });

  });
};

async function restoreDeleteDonation(payload) {
  try {
    const conn = await db_connection();
    const response = await restoreDonation(conn, payload);
    if (response.length < 1) return "No Data";
    if (response)
      return { status: 200, msg: "Restored successfully", response };
    return { status: 400, msg: "Something  Wrong", response };
  } catch (e) {
    if (e.code == "ER_DUP_ENTRY") {
      return { status: 400, msg: "already exist" };
    }
    return { status: 400, msg: "Something Went Wrong" };
  }
}

//DELETE DONATIONS FOREVER
const foreverDeletedonation = (con, payload) => {
  return new Promise((resolve, reject) => {
    const sql = 
    "DELETE FROM `item_table` WHERE `item_id`= "+payload+"";
    console.log("delete", sql)
    con.query(sql, function (err, result) {
      console.log(err, result, "result, error");
      if (err) return reject(err);
      if (result.length < 1) {
        return resolve([]);
      } else {
        resolve(result);
      }

      const sql2 =
      "DELETE FROM `stock` WHERE `item_num`= "+payload+"";
    con.query(sql2, [payload.item_name, payload.item_qty], function (err, result) {
      console.log(err, result, "result, error");
      if (err) return reject(err);
      if (result.length < 1) {
        return resolve([]);
      } else {
        resolve(result);
      }
    });

    });
  });
};

async function DeleteDonationForever(payload) {
  try {
    const conn = await db_connection();
    const response = await foreverDeletedonation(conn, payload);
    if (response.length < 1) return "No Data";
    if (response)
      return { status: 200, msg: "Deleted forever successfully", response };
    return { status: 400, msg: "Something Wrong", response };
  } catch (e) {
    if (e.code == "ER_DUP_ENTRY") {
      return { status: 400, msg: "Already exist" };
    }
    return { status: 400, msg: "Something Went Wrong" };
  }
}

function omitPassword(user) {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
