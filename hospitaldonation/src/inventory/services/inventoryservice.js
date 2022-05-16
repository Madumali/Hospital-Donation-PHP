export const filterByMonthlyCat = (ref) => {
    const token = localStorage.getItem("authToken");
    console.log(token, "token");
    return fetch("http://localhost:4000/stock/permonth/"+ref, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((response) => response.json());
  };


  export const getAllItemPercat = (cat)=> {  
  const token = localStorage.getItem('authToken');
  console.log(token, 'token');
fetch("http://localhost:4000/stock/percat"+cat,
  { 
    method: "GET",
    headers:  {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization' : 'Bearer ' + token
    }
}).then((response) => response.json());
};