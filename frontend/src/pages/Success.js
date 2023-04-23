import React from "react";
import Navbar from "../components/Navbar";
import "../stylesheets/Success.scss";

import { Link } from "react-router-dom";

function Success({ user, setUser, isLoggedin, setIsLoggedin }) {
  return (
    <>
      <Navbar
        user={user}
        setUser={setUser}
        isLoggedin={isLoggedin}
        setIsLoggedin={setIsLoggedin}
      />
      <div className="success__div">
        <p>Congratulations !!!</p>
      </div>
    </>
  );
}
export default Success;
