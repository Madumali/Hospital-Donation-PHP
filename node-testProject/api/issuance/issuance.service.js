const db_connection = require("../routes/config/database"); //IMPORT DATABASE CONNECTION
var dt = require("./date");
const datenow = dt.date();

module.exports = {
  registerIssuance,
};

const saveIssuance = (con, payload) => {
  return new Promise((resolve, reject) => {
    const selectQry = "SELECT COUNT(`issuance_id`) as issuance FROM issuance"; //SELECT THE COUNT OF ID COLUMN
    con.query(selectQry, function (err, results) {
      let issueid = results[0].issuance + 1;
      //QUERY TO INSERT INTO ISSUANCE TABLE
      const query2 =
        "INSERT INTO `issuance`(`issuance_id`,`issued_by`, `issue_dep`, `to_whom`, `issue_date`, `issue_delet`) VALUES  (" +
        issueid +
        ", ?) ";
      var val = [
        payload.enteredby,
        payload.user_department,
        payload.to_whom,
        datenow,
        "0",
      ];
      con.query(query2, [val], function (err, result) {
        if (err) return reject(err);
        console.log(err);
        resolve(result);
      });
      //QUERY TO INSERT ITEMS THAT ISSUE INTO ISSUE ITEM TABLE

      const selectSql =  "SELECT COUNT(`issueId`) as itemid FROM `issue_item`;";
con.query(selectSql,function (err, result) { 
   var id = result[0].itemid + 1;

      const query3 =
        "INSERT INTO `issue_item`(`issueId`,`issuance`, `issue_type`,`issue_item`,`issue_itemqty`, `issue_delete`) VALUES  ? ";
 
      var val3 = payload.inputFieldsd.map((item) => [
        id,
        issueid,
        item.type_code,
        item.item_name,
        item.itemqty,
        "0",
      ]);
      con.query(query3, [val3], function (err, result) {
        if (err) return reject(err);
        console.log(err);
        resolve(result);
      });
      //QUERY TO INSERT QUANTITY OF ISSUING INTO THE STOCK TABLE
      let query4 =
        "INSERT INTO `stock`(`issue_num`,`enteredBy`, `codeid`, `codename`, `item_qty_in`, `item_qty_out`, `date`, `status`, `delete_stk`) VALUES ? ";
      var val4 = payload.inputFieldsd.map((item) => [
        id,
        item.enteredby,
        item.type_code,
        item.item_name,
        "0",
        item.itemqty,
        datenow,
        "0",
        "0",
      ]);

      con.query(query4, [val4], function (err, result) {
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

//ASYNCHRONOUS FUNCTION WILL RETURN VALUE BASED ON PROMISE FUNCTION
async function registerIssuance(payload) {
  try {
    const conn = await db_connection();
    const response = await saveIssuance(conn, payload); //WAIT FOR THE SAVE ISSUANCE FUNCTION TO RETURN PROMISE
    
    if (response.issue_item == "") {
      return { status: 400, msg: "Something  Wrong", response };
    } else {
      return { status: 200, msg: "Request added successfully", response };
    }
  } catch (e) {
    console.error(e);
    if (e.codename == "ER_PARSE_ERROR") {
      return { status: 400, msg: "Something is Wrong" };
    }
    return { status: 400, msg: "Something is Wrong" };
  }
}



//This function will retrieve all donations
const selectAllDonation = (con) => { 
  return new Promise((resolve, reject) => {
    const sqlquery =
      "SELECT * FROM `issue_item` INNER JOIN `issuance` ON issue_item.donationNum = donation.donation_id INNER JOIN `donor_all` ON `donation`.`donorName` = `donor_all`.`donor_id` INNER JOIN `item_name` ON `item_table`.`item_name` = `item_name`.`code` WHERE `item_table`.`deleted`= 0 ; ";

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



function omitPassword(user) {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
