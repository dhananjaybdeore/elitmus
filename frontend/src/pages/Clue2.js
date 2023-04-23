import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../stylesheets/Clue2.scss";
import clue2_audio from "../assets/clue2_audio.mp3";
import next from "../assets/next.svg";
import cancel from "../assets/cancel.svg";

import { useNavigate } from "react-router";

const Clue2 = ({
  user,
  setUser,
  isLoggedin,
  setIsLoggedin,
  progress,
  setProgress,
}) => {
  const navigate = useNavigate();

  const [isWrong, setIsWrong] = useState(false);
  const [currUserEmail, setCurrUserEmail] = useState("");
  const [userData, setUserData] = useState("");
  const [noOfStageCompleted, setNoOfStageCompleted] = useState("");

  const [isOldName, setIsOldName] = useState(false);
  let first_false = -1;
  for (let i = 0; i < 5; i++) {
    if (progress[i] === false) {
      first_false = i;
      break;
    }
  }

  useEffect(() => {
    fetch("http://localhost:8000/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        if (data.data.userType == "Admin") {
          // setAdmin(true);
        }

        setUserData(data.data);
        setNoOfStageCompleted(data.data.noOfStageCompleted);
        if (data.data.noOfStageCompleted < 5)
          navigate(`/clue${data.data.noOfStageCompleted + 1}`);
        else navigate("/success");

        setCurrUserEmail(data.data.email);

        if (data.data == "token expired") {
          alert("Token expired login again");
          window.localStorage.clear();
          window.location.href = "./sign-in";
        }
      });
  }, []);

  //////////
  const clueNo = 2;

  const handleProgress = (currentTime) => {
    fetch("http://localhost:8000/updateProgress", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        clueNo,
        currUserEmail,
        currentTime,
      }),
    }).then((res) => res.json());
  };

  ////////

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    let userAnswer = e.target[0].value.toLowerCase().split(" ").join("");
    if (userAnswer === "sambhajinagar") {
      const newArray = [...progress];
      newArray[1] = true;

      const now = new Date();
      const currentTime = now.getTime();

      setProgress(newArray);
      handleProgress(currentTime);

      navigate("/clue3");
      console.log(userAnswer);
    } else if (userAnswer === "dharashiv") {
      navigate("/deadend1");
    } else if (userAnswer === "aurangabad" || userAnswer === "usmanabad") {
      // alert("Enter the new name of this city");
      setIsOldName(true);
      setTimeout(() => {
        setIsOldName(false);
      }, 2000);
    } else {
      setIsWrong(true);
      setTimeout(() => {
        setIsWrong(false);
      }, 2000);
      // alert("Wrong Answer!!!! \n Please enter the correct answer");
    }
  };
  return (
    <div>
      <Navbar />
      <div className="clue2__main">
        <p>Refer this Audio</p>
        <video controls>
          <source src={clue2_audio} type="audio/mpeg" />
        </video>
        <p>
          Enter the name of the city which is related to the incident in the
          above audio
        </p>

        <form action="" onSubmit={submitHandler}>
          <input type="text" placeholder="Enter the answer here" required />
          <button type="submit">
            <img src={next} alt="" />
          </button>
        </form>
        <div className={isWrong ? "wrong" : "hidden"}>
          <img src={cancel} alt="" /> Wrong Answer
        </div>
        <div className={isOldName ? "old" : "hidden"}>
          <img src={cancel} alt="" /> Please enter the new name of this city
        </div>
      </div>
    </div>
  );
};

export default Clue2;
