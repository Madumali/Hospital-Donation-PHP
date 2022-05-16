const db_connection = require("../routes/config/database");
// var dt = require('./date');

// const datenow = dt.date();

module.exports = {

    selectItemQty,
    selectStockPerMonth,
    selectStockPerCategory,
    selectPerMonth,
    selectPerMonthNCat
};


//Filter by category in inventory category filter
const selectstockperCat = (con,id) => {
  return new Promise((resolve, reject) => {
  
    const sqlquery = "SELECT stock_id,month(date) as month, codeid,SUM(`item_qty_in`) as receives,SUM(`item_qty_out`) as issues, SUM(`item_qty_in`)-SUM(`item_qty_out`) as `qty`,itemname,code FROM `stock` INNER JOIN item_name ON item_name.code = stock.codename WHERE codeid = '"+id+"' AND stock.delete_stk = 0 GROUP BY itemname ORDER BY itemname  ; ";

    con.query(sqlquery, function(err, result)
    {
      if (err) return reject(err);
        if (result.length < 1) {
          return resolve([{stock_id:0}]);
        } else {
          resolve(result);
        }
    }
    );
    });
}

async function selectPerMonthNCat(id) {
  try {

    const conn = await db_connection();
    const response = await selectstockperCat(conn,id)
    if(response.length < 1)
    {
      return {msg:"No data available"};
    }
    return {
      ...omitPassword(response),
    };
  } catch (e) {
    console.error;
  }
}


const selectstockpermnth = (con,id) => {
  return new Promise((resolve, reject) => {
  
    const sqlquery = "SELECT stock_id,month(date) as month, codeid,SUM(`item_qty_in`) as receives,SUM(`item_qty_out`) as issues, SUM(`item_qty_in`)-SUM(`item_qty_out`) as `qty` FROM `stock` WHERE month(date) = "+id+" AND delete_stk = 0  GROUP BY codeid ORDER BY codeid  ; ";
    con.query(sqlquery, function(err, result)
    {
      if (err) return reject(err);
        if (result.length < 1) {
          return resolve([{stock_id:0}]);
        } else {
          resolve(result);
        }
    }
    );
    });
}
async function selectPerMonth(id) {
  try {

    const conn = await db_connection();
    const response = await selectstockpermnth(conn,id)
    if(response.length < 1)
    {
      return {msg:"No data available"};
    }
    return {
      ...omitPassword(response),
    };
  } catch (e) {
    console.error;
  }
}



//pie chart

const selectstockpercat = (con) => {
  return new Promise((resolve, reject) => {
  
    const sqlquery = "SELECT stock_id, codeid,SUM(`item_qty_in`) as receives,SUM(`item_qty_out`) as issues, SUM(`item_qty_in`)-SUM(`item_qty_out`) as `qty` FROM `stock` WHERE delete_stk = 0  GROUP BY codeid ORDER BY codeid  ; ";

    con.query(sqlquery, function(err, result)
    {
      if (err) return reject(err);
        if (result.length < 1) {
          return resolve([]);
        } else {
          resolve(result);
        }
    }
    );
    });

}
async function selectStockPerCategory() {
  try {

    const conn = await db_connection();
    const response = await selectstockpercat(conn,);
    if(response.length < 1)
    {
      return {msg:"No data available"};
    }
    return {
      ...omitPassword(response),
    };
  } catch (e) {
    console.error;
  }
}



//dash board bar graph
const selectperday = (con)=>{
  return new Promise((resolve, reject) => {
  
    const sqlquery = "SELECT codeid, year(date) as year, month(date) as month, SUM(`item_qty_in`) as `qty`, SUM(item_qty_out) as qtyout FROM `stock` WHERE delete_stk = 0  GROUP BY month(date)  ORDER BY month(date) ; ";
   
    con.query(sqlquery, function(err, result)
    {
      if (err) return reject(err);
        if (result.length < 1) {
          return resolve([]);
        } else {
          resolve(result);
        }
    }
    );
    });
}

async function selectStockPerMonth() {
  try {

    const conn = await db_connection();
    const response = await selectperday(conn,)
    console.log(response);
    if(response.length < 1)
    {
      return {msg:"No data available"};
    }
    return {
      ...omitPassword(response),
    };
  } catch (e) {
    console.error;
  }
}


//for issue items
const selectQty = (con, id) => {
  return new Promise((resolve, reject) => {
  
const sqlquery = "SELECT `codeid`, `codename`, SUM(`item_qty_in`)-SUM(`item_qty_out`) as `qty` FROM `stock` WHERE `codename` = '"+id+"' AND delete_stk = 0 GROUP BY `codename` HAVING COUNT(*)>=1  ; ";
console.log(sqlquery);
con.query(sqlquery, function(err, result)
{
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





async function selectItemQty(id) {
  try {

    const conn = await db_connection();
    const response = await selectQty(conn,id)
    console.log(response);
    if(response.length < 1)
    {
      return {msg:"No data available"};
    }
    return {
      ...omitPassword(response),
    };
  } catch (e) {
    console.error;
  }
}









    async function registerStock(payload) {
        try {
          const conn = await db_connection();
          const response = await saveStock(conn, payload);
          console.log("response stock", response);
          if (response.codename == "")
          { return { status: 400, msg: "Something  Wrong", response };
            
            
          }else{
            return { status: 200, msg: "Stock Issued successfully", response };
          }
        } catch (e) {
          console.error(e);
          if (e.code == "ER_DUP_ENTRY") {
            return { status: 400, msg: "already exist" };
          }
          return { status: 400, msg: "Something is Wrong" };
        }
      }

      async function registerRequestStock(payload) {
        try {
          const conn = await db_connection();
          const response = await saveRequestStock(conn, payload);
          console.log("response stock", response);
          if (response.cd_name == "")
          { return { status: 400, msg: "Something  Wrong", response };
            
            
          }else{
            return { status: 200, msg: "Stock added successfully", response };
          }
        } catch (e) {
          console.error(e);
          if (e.code == "ER_DUP_ENTRY") {
            return { status: 400, msg: "already exist" };
          }
          return { status: 400, msg: "Something is Wrong" };
        }
      }



      async function registerIssueFromStock(payload) {
        try {
          const conn = await db_connection();
          const response = await saveIssuefrom(conn, payload);
          console.log("response stock", response);
          if (response.codename == "")
          { return { status: 400, msg: "Something  Wrong", response };
            
            
          }else{
            return { status: 200, msg: "Stock added successfully", response };
          }
        } catch (e) {
          console.error(e);
          if (e.code == "ER_DUP_ENTRY") {
            return { status: 400, msg: "already exist" };
          }
          return { status: 400, msg: "Something is Wrong" };
        }
      }

      function omitPassword(user) {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      }


      // SELECT `codeid`, `codename`, SUM(`item_qty_in`)-SUM(`item_qty_out`) as `qty` FROM `stock` WHERE `codename` = '"+id+"' GROUP BY `codename` HAVING COUNT(*)>=1  


      // const selectDonornameNow = (con, id) => {
//   console.log("donor",id);
//     return new Promise((resolve, reject) => {
    
//   const sqlquery = "SELECT * FROM `donor_all` WHERE `donor_id`= "+ id +" ";
//   console.log(sqlquery);
//   con.query(sqlquery, function(err, result)
//   {
//     if (err) return reject(err);
//       if (result.length < 1) {
//         return resolve([]);
//       } else {
//         resolve(result);
//       }
//   }
//   );
  
//   });
  
//   };
  


// const saveStock = (con, payload) => {
//     // console.log("data stock", payload);
// return new Promise((resolve, reject) => {
  
//         const query2 = "INSERT INTO `stock`(`enteredBy`, `codeid`, `codename`, `item_qty_in`, `item_qty_out`, `date`, `status`, `delete_stk`) VALUES  ? ";
//          var ts = Date.now();
//      var reg_datet = new Date(ts);
//         var val = payload.map(item=>[item.enteredBy, item.codeid, item.item_name, item.item_qty, '0', new Date(), '0','0']);
  
//         con.query(query2,[val], function (err, result)
        
//        {
//           if (err) return reject(err);
    
//           console.log(err);
         
//           resolve(result);
//         }
//       );
//     });
//     };



  //   const saveRequestStock = (con, payload) => {
  //     console.log("data stock", payload);
  // return new Promise((resolve, reject) => {
    
  //         let query2 = "INSERT INTO `request_inventory`(`requestedBy`, `itemCode`, `cd_name`, `request_qty`, `receive_qty`, `req_rec_date`, `delete_record`) VALUES ? ";
  //          var ts = Date.now();
  //      var reg_datet = new Date(ts);
  //         var val = payload.map(item=>[item.enteredby, item.type_code, item.item_name, item.item_qty, '', new Date(), '0']);
    
  //         con.query(query2,[val], function (err, result)
          
  //        {
  //           if (err) return reject(err);
      
  //           console.log(err);
           
  //           resolve(result);
  //         }
  //       );
  //     });
  //     };



  //     const saveIssuefrom = (con, payload) => {
  //       console.log("data stock", payload);
  //   return new Promise((resolve, reject) => {
      
  //     let query2 = "INSERT INTO `stock`( `enteredBy`, `donatedTo`, `codeid`, `codename`, `item_qty_in`, `item_qty_out`, `date`, `status`, `delete_stk`) VALUES ? ";
  //     var ts = Date.now();
  // var reg_datet = new Date(ts);
  //    var val = payload.map(item=>[item.enteredby, item.to_whom, item.type_code, item.item_name, '0', item.itemqty, new Date(), '0','0']);

  //    con.query(query2,[val], function (err, result)
     
            
  //          {
  //             if (err) return reject(err);
        
  //             console.log(err);
             
  //             resolve(result);
  //           }
  //         );
  //       });
  //       };

// async function selectLatestDonor(id) {
//   try {

//     const conn = await db_connection();
//     const response = await selectDonornameNow(conn,id)
//     console.log(response);
//     if(response.length < 1)
//     {
//       return {msg:"No data available"};
//     }
//     return {
//       ...omitPassword(response),
//     };
//   } catch (e) {
//     console.error;
//   }
// }
