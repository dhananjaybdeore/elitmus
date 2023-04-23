import React from "react";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import back from "../assets/back.svg";
import "../stylesheets/Deadend2.scss";

const Deadend2 = ({
  userMail,
  setUserMail,
  user,
  setUser,
  isLoggedin,
  setIsLoggedin,
}) => {
  const navigate = useNavigate();
  const gobackHandler = () => {
    navigate("/clue3");
  };
  return (
    <div>
      <Navbar />
      <div className="deadend2">
        <p>
          Please enter the name of the fort which was sieged by Siddhi Johar
        </p>

        <button onClick={gobackHandler}>
          Go back
          <img src={back} alt="" />
        </button>
      </div>
    </div>
  );
};

export default Deadend2;
