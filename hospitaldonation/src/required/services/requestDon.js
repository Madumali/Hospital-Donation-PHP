export const insertRequest = (url, data) => 
{
    const token = localStorage.getItem("authToken");
   return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token, 
    },
  })
    .then((response) => response)
    
}

//GET Request details TO request reports
export const getRequestDetails = (start,end) => {
     
  const token = localStorage.getItem('authToken');
  console.log(token, 'token');
  return fetch("http://localhost:4000/requests/requestDetails/"+start+"/"+end,
  {
    method: "GET",
    headers:  {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization' : 'Bearer ' + token
    }
  })
  .then((response) =>
     response.json()
   
  )  
}

//GET Request Items total per item
export const getRequestItemTotal = (start,end) => {
     
  const token = localStorage.getItem('authToken');
  console.log(token, 'token');
  return fetch("http://localhost:4000/requests/requestTotals/"+start+"/"+end,
  {
    method: "GET",
    headers:  {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization' : 'Bearer ' + token
    }
  })
  .then((response) =>
     response.json()
   
  )
      
    
}