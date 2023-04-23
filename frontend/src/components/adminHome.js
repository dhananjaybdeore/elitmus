// import React from "react";

// export default function AdminHome({ userData }) {
//   //logout
//   const logOut = () => {
//     window.localStorage.clear();
//     window.location.href = "./sign-in";
//   };

//   return (
//     <div className="auth-wrapper" style={{ height: "auto" }}>
//       <div className="auth-inner" style={{ width: "auto" }}>
//         <h3>Welcom Admin</h3>

//         <button onClick={logOut} className="btn btn-primary">
//           Log Out
//         </button>
//       </div>
//     </div>
//   );
// }

import React, { Component, useEffect, useState } from "react";
import Navbar from "./Navbar.js"
export default function AdminHome({ userData }) {
  //setting state
 
  const [data, setData] = useState([]);
  useEffect(() => {
    getAllUser(updateField);
  }, []);
  const convert = (oldTime) => {
    if(oldTime===null) return "Not Attempted "
    const timeInMs = oldTime; // 1 hour, 1 minute, and 5 seconds in milliseconds
    const hours = Math.floor(timeInMs / 3600000);
    const minutes = Math.floor((timeInMs % 3600000) / 60000);
    const seconds = Math.floor((timeInMs % 60000) / 1000);
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    console.log(formattedTime); // output: "1:1:5"
    return formattedTime;
  };
  //fetching all user
  const getAllUser = () => {
    
    fetch("http://localhost:8000/getAllUser", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        setData(data.data);
      });
  };
  let updateField;
  const sortByFName=()=>{
    updateField="fname";

    console.log("sortByName called")
    //  updateField="lname";

     fetch("http://localhost:8000/updateField", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        updateField
      }),
    })

    getAllUser();
  }

  const sortByStages=()=>{
    updateField="noOfStageCompleted";

    console.log("sortByName called")
    //  updateField="lname";

     fetch("http://localhost:8000/updateField", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        updateField
      }),
    })

    getAllUser();
  }
  const sortByTime=()=>{
    updateField="totalTime";

    // console.log("sortByName called")
    //  updateField="lname";

     fetch("http://localhost:8000/updateField", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        updateField
      }),
    })

    getAllUser();
  }

  return (

    <div className="auth-wrapper" style={{ height: "auto" }}>
    <Navbar/>

      <div className="auth-inner" style={{ width: "auto" }}>
      <h3>Welcom Admin</h3>
      <h5> Sort By</h5>
      <span style={{border:"2px solid black", borderRadius:"5px", padding:"5px", cursor:"pointer", marginRight:"5px"}}  onClick={sortByFName}> FirstName</span>
      <span style={{border:"2px solid black", borderRadius:"5px", padding:"5px", cursor:"pointer", marginRight:"5px"}}  onClick={sortByStages}> Stages Completed</span>
      <span style={{border:"2px solid black", borderRadius:"5px", padding:"5px", cursor:"pointer"}}  onClick={sortByTime}> Total Time Taken </span>
     
        <table style={{ width: "90vw", marginTop:"20px", border:"10px" }}>
          <tr>
            <th >FirstName </th>
            <th >LastName</th>
            <th >Email</th>
            <th>Stages Completed</th>
            <th>Stage 1 Time</th>
            <th>Stage 2 Time</th>
            <th>Stage 3 Time</th>
            <th>Stage 4 Time</th>
            <th>Stage 5 Time</th>
            <th>Total Time</th>
          </tr>
          {data.map((i) => {
            return (
              <tr>
                <td >{i.fname}</td>
                <td>{i.lname}</td>
                <td>{i.email}</td>
                <td >{i.noOfStageCompleted}</td>
                <td>{convert(i.clue1CompTime)}</td>
                <td>{convert(i.clue2CompTime)}</td>
                <td>{convert(i.clue3CompTime)}</td>
                <td>{convert(i.clue4CompTime)}</td>
                <td>{convert(i.clue5CompTime)}</td>
                <td>{convert(i.totalTime)}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}
