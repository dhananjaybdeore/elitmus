import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../stylesheets/Clue4.scss";
import next from "../assets/next.svg";
import cancel from "../assets/cancel.svg";


import { useNavigate } from "react-router";

const Clue4 = ({
  user,
  setUser,
  isLoggedin,
  setIsLoggedin,
  progress,
  setProgress,
}) => {
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(true);
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
    // if (first_false < 3 && first_false >= 0) {
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
  const clueNo = 4;

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

  function handleVideoEnd() {
    setShowMessage(true);
  }
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    let userAnswer = e.target[0].value.toLowerCase().split(" ").join("");
    if (userAnswer === "bajiprabhudeshpande") {
      const newArray = [...progress];
      newArray[3] = true;
      const now = new Date();
      const currentTime = now.getTime();
      setProgress(newArray);
      handleProgress(currentTime);
      navigate("/clue5");
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
      <div className="clue4__main">
        <p>Refer this Video</p>
        <iframe
          width="860"
          height="515"
          src="https://www.youtube.com/embed/iqxcjD-eAsg"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
        {showMessage && (
          <>
            <p>
              Enter the full name of the Warrior who is standing alone against
              the enemy's army
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
          </>
        )}
      </div>
    </div>
  );
};

export default Clue4;
