import React from "react";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import "../stylesheets/Deadend1.scss";
import back from "../assets/back.svg";

const Deadend1 = ({
  userMail,
  setUserMail,
  user,
  setUser,
  isLoggedin,
  setIsLoggedin,
}) => {
  const navigate = useNavigate();
  const gobackHandler = () => {
    navigate("/clue2");
  };
  return (
    <div>
      <Navbar />
      <div className="deadend1">
        <p>
          You entered one of the correct answer, but we are expecting name of
          another city.
        </p>
        <p>So, you have reached the DEADEND</p>
        <button onClick={gobackHandler}>
          Go back
          <img src={back} alt="" />
        </button>
      </div>
    </div>
  );
};

export default Deadend1;
