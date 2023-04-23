import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../stylesheets/Clue1.scss";
import next from "../assets/next.svg";
import cancel from "../assets/cancel.svg";
import { useNavigate } from "react-router";
function Clue1({
  user,
  setUser,
  isLoggedin,
  setIsLoggedin,
  progress,
  setProgress,
}) {
  const [userData, setUserData] = useState("");
  const [admin, setAdmin] = useState(false);
  const [currUserEmail, setCurrUserEmail] = useState("");
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
          setAdmin(true);
        }

        setUserData(data.data);
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
  const navigate = useNavigate();
  const [isWrong, setIsWrong] = useState(false);

  //////////
  const clueNo = 1;

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
    let userAnswer = e.target[0].value.toLowerCase();
    if (userAnswer === "maharashtra") {
      const newArray = [...progress];
      const now = new Date();
      const currentTime = now.getTime();
      newArray[0] = true;
      setProgress(newArray);
      handleProgress(currentTime);

      navigate("/clue2");
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
      <div className="clue1__main">
        <p>
          Write down the name of the state which is : <br /> The current state
          of Capital of the Empire which ruled <br /> "The country shown in
          image" before British
        </p>
        <img
          src="https://t4.ftcdn.net/jpg/01/70/68/63/240_F_170686358_BXBQutio9gmVuS0324gv9r2ACNxcFfbH.jpg"
          alt=""
        />
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
}

export default Clue1;
