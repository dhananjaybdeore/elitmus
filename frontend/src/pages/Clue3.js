import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../stylesheets/Clue3.scss";
import next from "../assets/next.svg";
import cancel from "../assets/cancel.svg";

import clue2_audio from "../assets/clue2_audio.mp3";
import { useNavigate } from "react-router";

const Clue3 = ({
  user,
  setUser,
  isLoggedin,
  setIsLoggedin,
  progress,
  setProgress,
}) => {
  const [isWrong, setIsWrong] = useState(false);
  const [currUserEmail, setCurrUserEmail] = useState("");
  const [userData, setUserData] = useState("");

  const navigate = useNavigate();
  let first_false = -1;
  for (let i = 0; i < 5; i++) {
    if (progress[i] === false) {
      first_false = i;
      break;
    }
  }
  useEffect(() => {
    // if (first_false < 2 && first_false >= 0) {
    //   console.log("in if");
    //   console.log(`/clue${first_false + 1}`);
    //   navigate(`/clue${first_false + 1}`);
    // }
  });
  /////////
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
        setCurrUserEmail(data.data.email);
        if (data.data.noOfStageCompleted < 5)
          navigate(`/clue${data.data.noOfStageCompleted + 1}`);
        else navigate("/success");
        if (data.data == "token expired") {
          alert("Token expired login again");
          window.localStorage.clear();
          window.location.href = "./sign-in";
        }
      });
  }, []);

  //////////
  const clueNo = 3;

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

  //////////
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    let userAnswer = e.target[0].value.toLowerCase().split(" ").join("");
    if (userAnswer === "panhala") {
      const newArray = [...progress];
      newArray[2] = true;
      const now = new Date();
      const currentTime = now.getTime();
      setProgress(newArray);
      handleProgress(currentTime);
      navigate("/clue4");
    } else if (userAnswer === "pratapgad") {
      navigate("/deadend2");
    } else {
      setIsWrong(true);
      setTimeout(() => {
        setIsWrong(false);
      }, 2000);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="clue3__main">
        <p>
          What is the name of the fort that was sieged by the Adilshahi forces
          when Chhtrapati Shivaji Maharaj himself was present at this fort?
          <br />
          <br />
          The siege of this Fort was a significant event during the Maratha
          Empire.
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
      </div>
    </div>
  );
};

export default Clue3;
