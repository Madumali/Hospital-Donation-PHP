const db_connection = require("../routes/config/database");
var dt = require("./date");

const datenow = dt.date();

module.exports = {
  registerDonors,
  registerDonorsTeam,
  selectAll,
  selectAllTeamDetails,
  selectAllMembers,
  selectAllPerson,
  selectSingleDonor,
  selectCurrent,
  updateDonor,
  updateDonorDelete,
  updateDonorTeam,
  updateDonorTeamDelete,
  filterDonorByDates,
  filterBloodDonorByDates,
  selectAllDeletedPerson,
  restoreDeleteDonor,
  DeleteDonorForever
  
};

//SELECT DONOR BY FILTERING DATES
const filterDonorbyDates = (con, start_dated, end_dated) => {
  console.log("start date", start_dated);
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT  * FROM `donor_all`  WHERE `delete_status` = 0 AND `R/D` = 'D' AND (`reg_date` BETWEEN '" +
      start_dated +
      "' AND  '" +
      end_dated +
      "')  ORDER BY `donor_id` DESC ;";
    console.log("filter betweeen", sql);
    con.query(sql, function (err, result) {
      if (err) return reject(err);
      if (result.length < 1) {
        return resolve([{ donor_id: 0, msg: "No data available" }]);
      } else {
        resolve(result);
      }
    });
  });
};
async function filterDonorByDates(start_dated, end_dated) {
  try {
    const conn = await db_connection();
    const response = await filterDonorbyDates(conn, start_dated, end_dated);
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

//SELECT BLOOD DONOR BY FILTERING DATES
const filterBloodDonorbyDates = (con, start_dated, end_dated) => {
  console.log("start date", start_dated);
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT  * FROM `donor_all` INNER JOIN `blooddon` ON `donor_all`.donor_id = `blooddon`.donorId  WHERE `donor_all`.`delete_status` = 0 AND `R/D` = 'D' AND `donor_all`.`isBloodDon`=1 AND `blooddon`.`birthday`<= '2004-12-30' AND `blooddon`.weight >=50 AND `tattoo`=0 AND `hiv`=0 AND `std` = 0 AND `hepatitis` = 0 AND `cardiac`=0 AND `cancer`=0 AND (`reg_date` BETWEEN '" +
      start_dated +
      "' AND  '" +
      end_dated +
      "')  ORDER BY `donor_id` DESC ;";
    console.log("filter betweeen", sql);
    con.query(sql, function (err, result) {
      if (err) return reject(err);
      if (result.length < 1) {
        return resolve([{ donor_id: 0, msg: "No data available" }]);
      } else {
        resolve(result);
      }
    });
  });
};
async function filterBloodDonorByDates(start_dated, end_dated) {
  try {
    const conn = await db_connection();
    const response = await filterBloodDonorbyDates(
      conn,
      start_dated,
      end_dated
    );
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

//SELECT TEAM DETAILS
const selectAllTeam = (con) => {
  return new Promise((resolve, reject) => {
    con.query(
      "SELECT  * FROM `donor_all`  WHERE `delete_status` = 0 AND `donor_type` = 'team' AND `R/D` = 'D'  ORDER BY `donor_id` DESC ;",

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
async function selectAllTeamDetails() {
  try {
    const conn = await db_connection();
    const response = await selectAllTeam(conn);
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

//SELECT ALL TEAM MEMBERS
const selectAllTeamMembers = (con, id) => {
  return new Promise((resolve, reject) => {
    const qry =
      "SELECT * FROM `donor_team` INNER JOIN `donor_all` ON `donor_team`.donor_name = `donor_all`.donor_id WHERE  `donor_team`.deletestatus = 0 AND `donor_id` = " +
      id +
      " ;";

    con.query(
      qry,

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

async function selectAllMembers(id) {
  try {
    const conn = await db_connection();
    const response = await selectAllTeamMembers(conn, id);
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

//SELECT ALL DONOR PERSONS TO DISPLAY IN LIST WITHOUT FILTERING BETWEEN DATES
const selectAllDonorPerson = (con) => {
  return new Promise((resolve, reject) => {
    con.query(
      "SELECT * FROM `donor_all`  LEFT JOIN `blooddon` ON `donor_all`.donor_id = `blooddon`.donorId WHERE `delete_status` = 0 AND `donor_type` = 'person' AND `R/D`='D' ORDER BY `donor_id` DESC;",

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
async function selectAllPerson() {
  try {
    const conn = await db_connection();
    const response = await selectAllDonorPerson(conn);
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

//SELECT SINGLE DONOR BY ID
const selectDonor = (con, id) => {
  // console.log("this is id",id);
  return new Promise((resolve, reject) => {
    const query1 =
      "SELECT * FROM `donor_all` WHERE `donor_id` = " +
      id +
      " AND `delete_status` = 0 AND `R/D` = 'D' ;";
    console.log(query1);
    con.query(query1, function (err, result) {
      if (err) return reject(err);
      if (result.length < 1) {
        return resolve([]);
      } else {
        resolve(result);
      }
    });
  });
};

async function selectSingleDonor(id) {
  try {
    const conn = await db_connection();
    const response = await selectDonor(conn, id);
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

//SAVE DONOR PERSONS
const saveDonors = (con, payload) => {
  return new Promise((resolve, reject) => {
    const selectQuery = "SELECT COUNT(`donor_id`) as idct FROM `donor_all`";
    con.query(selectQuery, function (err, resultt) {
      let iddd = resultt[0].idct + 1;
      if (payload.isBloodDon == "1") {
        const query =
          "INSERT INTO `donor_all`(`donor_id`,`donor_type`,`title`, `national_id`, `donor_name`, `address_line1`, `address_line2`, `email`, `contact_no`, `contact_no2`, `reg_date`, `isBloodDon`, `delete_status`) VALUES (" +
          iddd +
          ",?) ";
        var val = [
          "person",
          payload.title,
          payload.national_id,
          payload.donor_name,
          payload.address_line1,
          payload.address_line2,
          payload.email,
          payload.contact_no,
          payload.contact_no2,
          datenow,
          payload.isBloodDon,
          "0",
        ];
        con.query(query, [val], function (err, result) {
          if (err) return reject(err);

          console.log(result);
          resolve(result);
        });

        const bquery =
          "INSERT INTO `blooddon`(`donorId`, `birthDay`, `bloodGroup`, `weight`, `tattoo`, `std`, `hiv`, `cardiac`, `hepatitis`, `cancer`) VALUES (" +
          iddd +
          ",?) ";
        var val2 = [
          payload.birthDay,
          payload.bloodGroup,
          payload.weight,
          payload.tattoo,
          payload.std,
          payload.hiv,
          payload.cardiac,
          payload.hepatitis,
          payload.cancer,
        ];
        con.query(bquery, [val2], function (err, result) {
          if (err) return reject(err);

          console.log(result);
          resolve(result);
        });
      } else {
        let iddd = resultt[0].idct + 1;
        const query =
          "INSERT INTO `donor_all`(`donor_id`,`donor_type`,`title`, `national_id`, `donor_name`, `address_line1`, `address_line2`, `email`, `contact_no`, `contact_no2`, `reg_date`, `isBloodDon`, `delete_status`) VALUES (" +
          iddd +
          ",?) ";
        var val = [
          "person",
          payload.title,
          payload.national_id,
          payload.donor_name,
          payload.address_line1,
          payload.address_line2,
          payload.email,
          payload.contact_no,
          payload.contact_no2,
          datenow,
          payload.isBloodDon,
          "0",
        ];
        con.query(query, [val], function (err, result) {
          if (err) return reject(err);

          console.log(result);
          resolve(result);
        });
      }
    });
  });
};
async function registerDonors(payload) {
  try {
    const conn = await db_connection();
    const response = await saveDonors(conn, payload);
    if (response.donor_name == "") {
      return { status: 400, msg: "Something  Wrong", response };
    } else {
      return { status: 200, msg: "Donor added successfully", response };
    }
  } catch (e) {
    console.error(e);
    if (e.code == "ER_DUP_ENTRY") {
      return { status: 400, msg: "Donor already exist" };
    }
    return { status: 400, msg: "Something is Wrong" };
  }
}
//END OF SAVE DONOR PERSONS

//SAVE DONOR TEAM WITH MEMBERS
const saveDonorsTeam = (con, payload) => {
  console.log("data arrived", payload);

  return new Promise((resolve, reject) => {
    const selectQuery = "SELECT COUNT(`donor_id`) as idct FROM `donor_all`";
    con.query(selectQuery, function (err, resultt) {
      let iddd = resultt[0].idct + 1;
      console.log("this is id", iddd);
      const query1 =
        "INSERT INTO `donor_all`(`donor_id`,`donor_type`, `donor_name`, `national_id`, `address_line1`,  `email`, `contact_no`, `reg_date`, `delete_status`) VALUES(" +
        iddd +
        ", ?) ";
      // console.log(query1)
      var reg_datet = new Date();
      var valT = [
        "team",
        payload.donor_name,
        payload.id,
        payload.address_line1,
        payload.email,
        payload.contact_no,
        datenow,
        "0",
      ];
      con.query(query1, [valT], function (err, result) {
        if (err) {
          return reject(err);
        } else {
          console.log(result);
          // var id = result.insertId;
          resolve(result);
        }
      });

      let query2 =
        "INSERT INTO `donor_team`(`donor_name`, `membername`, `national_idt`, `address_line1t`, `address_line2t`, `contact_not`, `emailt`, `reg_datet`,deletestatus) VALUES  ?";
      var valt = payload.inputFields.map((item) => [
        iddd,
        item.membername,
        item.national_idt,
        item.address_line1t,
        item.address_line2t,
        item.contact_not,
        item.emailt,
        datenow,
        "0",
      ]);

      console.log(query2);
      con.query(query2, [valt], function (err, resultt) {
        if (err) return reject(err);

        console.log("this is team data", resultt);

        resolve(resultt);
      });
    });
  });
};
async function registerDonorsTeam(payload) {
  try {
    const conn = await db_connection();
    const response = await saveDonorsTeam(conn, payload);
    var id = response.insertId;
    if (response.donor_name == "") {
      return { status: 400, msg: "Something  Wrong", response };
    } else {
      return {
        status: 200,
        msg: "Donor added successfully",
        id: response.insertId,
      };
      // return id = response.insertId;
    }
  } catch (e) {
    console.error(e);
    if (e.code == "ER_DUP_ENTRY") {
      return { status: 400, msg: "Donor already exist" };
    }
    return { status: 400, msg: "Something is Wrong" };
  }
}
//END OF SAVE DONOR TEAMS

//UPDATE DONOR PERSON
const updateDonorPerson = (con, id, payload) => {
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE `donor_all` LEFT JOIN `blooddon` ON `donor_all`.donor_id = `blooddon`.donorId SET `national_id`= ?,`donor_name`= ?,`address_line1`= ? ,`address_line2`= ? ,`email`=  ? ,`contact_no`= ? ,`contact_no2`= ?, `birthDay`= ?,`bloodGroup`= ?,`weight`= ?,`tattoo`= ?,`std`= ?,`hiv`= ?,`cardiac`= ?,`hepatitis`= ?,`cancer`= ? WHERE `donor_id`= ? ";
    con.query(
      sql,
      [
        payload.national_id,
        payload.donor_name,
        payload.address_line1,
        payload.address_line2,
        payload.email,
        payload.contact_no,
        payload.contact_no2,
        payload.birthDay,
        payload.bloodGroup,
        payload.weight,
        payload.tattoo,
        payload.std,
        payload.hiv,
        payload.cardiac,
        payload.hepatitis,
        payload.cancer,
        payload.donor_id,
      ],
      function (err, result) {
        console.log(err, result, "result, error");
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
async function updateDonor(id, payload) {
  try {
    const conn = await db_connection();
    const response = await updateDonorPerson(conn, id, payload);
    // console.log(response, "ASDADASDASDADS");
    if (response.length < 1) return "No Data";
    if (response)
      return { status: 200, msg: "Donor Updated successfully", response };
    return { status: 400, msg: "Something  Wrong", response };
  } catch (e) {
    if (e.code == "ER_DUP_ENTRY") {
      return { status: 400, msg: "Donor already exist" };
    }
    return { status: 400, msg: "Something Went Wrong" };
  }
}

//DELETE DONOR BY CHANGING DELETE STATUS
const deleteDonor = (con, id, payload) => {
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE `donor_all` SET `delete_status`= 1 WHERE `donor_id`= ? ";
    con.query(sql, [payload.donor_id], function (err, result) {
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
async function updateDonorDelete(id, payload) {
  try {
    const conn = await db_connection();
    const response = await deleteDonor(conn, id, payload);
    if (response.length < 1) return "No Data";
    if (response)
      return { status: 200, msg: "Donor deleted successfully", response };
    return { status: 400, msg: "Something  Wrong", response };
  } catch (e) {
    console.error(e);
  }
}

//UPDATE DONOR TEAM MEMBERS
const updateDonorT = (con, id, payload) => {
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE `donor_team` SET `donor_name`= ?,`title`= ?,`membername`= ?,`national_idt`= ? ,`address_line1t`= ? ,`address_line2t`= ? ,`contact_not`= ? ,`emailt`= ? WHERE `teamid`= ? ";

    con.query(
      sql,
      [
        payload.donor_name,
        payload.title,
        payload.membername,
        payload.national_idt,
        payload.address_line1t,
        payload.address_line2t,
        payload.contact_not,
        payload.emailt,
        payload.teamid,
      ],
      function (err, result) {
        console.log(err, result, "result, error");
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
async function updateDonorTeam(id, payload) {
  try {
    const conn = await db_connection();
    const response = await updateDonorT(conn, id, payload);
    if (response.length < 1) return "No Data";
    if (response)
      return { status: 200, msg: "Donor Updated successfully", response };
    return { status: 400, msg: "Something  Wrong", response };
  } catch (e) {
    if (e.code == "ER_DUP_ENTRY") {
      return { status: 400, msg: "Donor already exist" };
    }
    return { status: 400, msg: "Something Went Wrong" };
  }
}

//DELETE DONOR TEAM BY UPDATING DELETE STATUS
const deleteDonorT = (con, id, payload) => {
  console.log("Update delete team arrived", payload);
  return new Promise((resolve, reject) => {
    const sql = "UPDATE `donor_team` SET `deletestatus`= 1 WHERE `teamid`= ? ";
    con.query(sql, [payload.teamid], function (err, result) {
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

async function updateDonorTeamDelete(id, payload) {
  try {
    const conn = await db_connection();
    const response = await deleteDonorT(conn, id, payload);
    // console.log(response, "ASDADASDASDADS");
    if (response.length < 1) return "No Data";
    if (response)
      return { status: 200, msg: "Deleted successfully", response };
    return { status: 400, msg: "Something  Wrong", response };
  } catch (e) {
    if (e.code == "ER_DUP_ENTRY") {
      return { status: 400, msg: "already exist" };
    }
    return { status: 400, msg: "Something Went Wrong" };
  }
}

//SELECT  DELETED DONORS DETAILS FOR BACKUP
const selectAllDeleteDonorPerson = (con) => {
  return new Promise((resolve, reject) => {
    con.query(
      "SELECT * FROM `donor_all` WHERE `delete_status` = 1 ;",

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
async function selectAllDeletedPerson() {
  try {
    const conn = await db_connection();
    const response = await selectAllDeleteDonorPerson(conn);
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


//RESTORE DELETED DONORS
const restoreDonor = (con, payload) => {
  console.log("Update delete team arrived", payload);
  return new Promise((resolve, reject) => {
    const sql = "UPDATE `donor_all` SET `delete_status`= 0 WHERE `donor_id`= "+payload+"";
    console.log("restore", sql)
    con.query(sql, function (err, result) {
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

async function restoreDeleteDonor(payload) {
  try {
    const conn = await db_connection();
    const response = await restoreDonor(conn, payload);
    // console.log(response, "ASDADASDASDADS");
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

//DELETE DONORS FOREVER
const foreverDeletedonor = (con, payload) => {
  console.log("Update delete team arrived", payload);
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM `donor_all` WHERE `donor_id`= "+payload+"";
    console.log("delete", sql)
    con.query(sql, function (err, result) {
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

async function DeleteDonorForever(payload) {
  try {
    const conn = await db_connection();
    const response = await foreverDeletedonor(conn, payload);
    if (response.length < 1) return "No Data";
    if (response)
      return { status: 200, msg: "Deleted forever successfully", response };
    return { status: 400, msg: "Something  Wrong", response };
  } catch (e) {
    if (e.code == "ER_DUP_ENTRY") {
      return { status: 400, msg: "already exist" };
    }
    return { status: 400, msg: "Something Went Wrong" };
  }
}






function omitPassword(user) {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

//SELECT LAST ENTERED DONOR NOT CURRENTLY USING
const selectCurrentDonor = (con) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT * FROM `donor_all` WHERE `delete_status` = 0  ORDER BY `donor_id` DESC LIMIT 1;";
    console.log("lastdonor", sql);
    con.query(sql, function (err, result) {
      if (err) return reject(err);
      if (result.length < 1) {
        return resolve([]);
      } else {
        resolve(result);
      }
    });
  });
};
async function selectCurrent() {
  try {
    const conn = await db_connection();
    const response = await selectCurrentDonor(conn);
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

//SELECT ALL DONOR PERSONS AND TEAMS
const selectAllDonors = (con) => {
  return new Promise((resolve, reject) => {
    con.query(
      "SELECT * FROM `donor_all` WHERE `delete_status` = 0 AND `R/D` = 'D' ORDER BY `donor_id` DESC;",
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
async function selectAll() {
  try {
    const conn = await db_connection();
    const response = await selectAllDonors(conn);
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
// async function registerDonorsTeammember(payload,id) {
//   console.log("just returned",id);
//   try {
//     const conn = await db_connection();
//     // const response1 = await saveDonorsTeam(conn, payload);
//     // var id = response1.insertId;
//     const response = await saveDonorsTeammember(conn, payload);
//     console.log("team members", response)
//     if (response.donor_name == "")
//     { return {status: 400, msg: "Something  Wrong", response};

//     }else{
//       return { status: 200, msg: "Donor added successfully", response};
//     }
//   } catch (e) {
//     console.error(e);
//     if (e.code == "ER_DUP_ENTRY") {
//       return { status: 400, msg: "Donor already exist" };
//     }
//     return { status: 400, msg: "Something is Wrong" };
//   }
// }