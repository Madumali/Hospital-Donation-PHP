const config = require("../config.json");
const jwt = require("jsonwebtoken");
const db_connection = require("../routes/config/database");
// const mysql = require("mysql");

module.exports = {
  registerSystemUser,
  authentication,
  selectAll,
  selectSingleUser,
  updateuserDelete,
  updateUserSelected
};

const verifySUser = (con, username, user_password) => {
  return new Promise((resolve, reject) => {
    con.query(
      "SELECT * FROM `user` WHERE `username` = '" +
        username +
        "' AND `user_password` = '" +
        user_password +
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

const selectAllUsers = (con) => {
  return new Promise((resolve, reject) => {
    con.query(
      "SELECT * FROM `user` INNER JOIN department ON user.user_department = department.dep_id INNER JOIN designation ON user.designation = designation.desig_id WHERE `user`.`deleted_user`= 0 ORDER BY `uid` ASC",
      

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

const selectUser = (con, id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM `user` WHERE `uid` = "+id+" && `deleted_user` = 0 ;";
    console.log("sible", sql)
    con.query(sql,
      function (err, result) {
        if (err) return reject(err);
        if (result.length < 1) {
          return resolve([]);
        } else {
          resolve(result[0]);
        }
      }
    );
  });
};
async function selectSingleUser(id) {
  try {
    const conn = await db_connection();
    const response = await selectUser(conn, id);
    if (response.length < 1) {
      return "No data available";
    }
    return {
      ...omitPassword(response),
    };
  } catch (e) {
    console.error;
  }
}



const saveSystemUser = (con, payload) => {
  return new Promise((resolve, reject) => {
    let sql =
      "INSERT INTO `user`(`user_full_name`, `user_nic`, `user_email`, `user_contact`, `designation`, `user_department`, `user_role`, `username`, `user_password`, `deleted_user`) VALUES (?) ";
    var val = [
      payload.user_full_name,
      payload.user_nic,
      payload.user_email,
      payload.user_contact,
      payload.designation,
      payload.user_department,
      payload.user_role,
      payload.username,
      payload.user_password,
      "0",
    ];
    con.query(sql, [val], function (err, result) {
      if (err) return reject(err);

      console.log(result);
      resolve(result);
    });
  });
};

async function authentication({ username, user_password }) {
  try {
    const conn = await db_connection();
    const response = await verifySUser(conn, username, user_password);
    if (response.length < 1) return "Username or password is incorrect";
    const token = jwt.sign({ sub: response.id }, config.secret, {
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

async function registerSystemUser(payload) {
  try {
    const conn = await db_connection();
    const response = await saveSystemUser(conn, payload);
    if (response.username == "") {
      return { status: 400, msg: "Something  Wrong", response };
    } else {
      return { status: 200, msg: "User added successfully", response };
    }
  } catch (e) {
    console.error(e);
    if (e.code == "ER_DUP_ENTRY") {
      return { status: 400, msg: "User already exist" };
    }
    return { status: 400, msg: "Something is Wrong" };
  }
}

async function selectAll() {
  try {
    const conn = await db_connection();
    const response = await selectAllUsers(conn);
    if (response.length < 1) {
      return "No data available";
    }
    return {
      ...omitPassword(response),
    };
  } catch (e) {
    console.error;
  }
}



//THIS WILL UPDATE DELETE STATUS OF ITEMS.NOT DELETING FROM DB
const deleteUser = (con,id,payload) => {
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE `user` SET `deleted_user`= 1 WHERE `uid`= ? ";
    con.query(sql,[payload.uid], function (err, result) {
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
async function updateuserDelete(id,payload) {
  try {
    const conn = await db_connection();
    const response = await deleteUser(conn, id, payload);
    // console.log(response, "ASDADASDASDADS");
    if (response.length < 1) return "No Data";
    if (response)
      return { status: 200, msg: "User deleted successfully", response };
    return { status: 400, msg: "Something  Wrong", response };
  } catch (e) {
    console.error;
  }
}


//THIS WILL UPDATE ITEMS
const updateUser = (con, id, payload) => {
  console.log("Update arrived", payload);
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE `user` SET `user_full_name`= ?,`user_nic`= ?,`user_email`= ?,`user_contact`= ?,`designation`= ?,`user_department`=?,`user_role`=?,`username`= ?,`user_password`= ? WHERE `uid`= ? ';
    con.query(sql,[
      payload.user_full_name,
      payload.user_nic,
      payload.user_email,
      payload.user_contact,
      payload.designation,
      payload.user_department,
      payload.user_role,
      payload.username,
      payload.user_password,
      payload.uid
    ], function (err, result) {
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

async function updateUserSelected(id, payload) {
  try {
    const conn = await db_connection();
    const response = await updateUser(conn, id, payload);
    console.log(response, "ASDADASDASDADS");
    if (response.length < 1) return "No Data";
    if (response)
      return { status: 200, msg: "User Updated successfully", response };
    return { status: 400, msg: "Something  Wrong", response };
  } catch (e) {
    console.error;
  }
}




function omitPassword(user) {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
