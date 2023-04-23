import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../stylesheets/Clue5.scss";
import { useNavigate } from "react-router";
import cancel from "../assets/cancel.svg";
import next from "../assets/next.svg";

const Clue5 = ({
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

  let first_false = -1;
  for (let i = 0; i < 5; i++) {
    if (progress[i] === false) {
      first_false = i;
      break;
    }
  }
  useEffect(() => {
    // if (first_false < 4 && first_false >= 0) {
    //   console.log("in if");
    //   console.log(`/clue${first_false + 1}`);
    //   navigate(`/clue${first_false + 1}`);
    // }
  });

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
  const clueNo = 5;

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
    if (
      userAnswer === "dandpatta" ||
      userAnswer === "dand-patta" ||
      userAnswer === "gauntlet-sword" ||
      userAnswer === "gauntletsword"
    ) {
      const newArray = [...progress];
      newArray[4] = true;
      const now = new Date();
      const currentTime = now.getTime();
      setProgress(newArray);
      handleProgress(currentTime);
      navigate("/success");
      console.log(userAnswer);
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
      <div className="clue5__main">
        <p>
          This is the last step in this puzzle. <br /> <br /> The answer of this
          question is the name of the weapon found by treasure hunter
        </p>

        <p className="question">
          What is the Primary Weapon of Veer Baji Prabhu Deshpande ?
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

export default Clue5;
