import React, { Component, useEffect, useState } from "react";
import Navbar from "./Navbar";

export default function UserHome({ userData }) {
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };
  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <div>
          <Navbar />
          {/*           
          Name<h1>{userData.fname}</h1>
          Email <h1>{userData.email}</h1> */}
          <br />
          <button onClick={logOut} className="btn btn-primary">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
