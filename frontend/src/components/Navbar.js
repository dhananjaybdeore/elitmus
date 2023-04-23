import { useState, useEffect } from "react";
import "../stylesheets/Navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import Logout from "../assets/logout.svg";
import { computeHeadingLevel } from "@testing-library/react";

function Navbar({ user, setUser, setIsLoggedin }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const [userData, setUserData] = useState("");
  const [currUserEmail, setCurrUserEmail] = useState("");

  const [admin, setAdmin] = useState(false);

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
        setCurrUserEmail(data.data.email);
        setUserData(data.data);

        if (data.data == "token expired") {
          alert("Token expired login again");
          window.localStorage.clear();
          window.location.href = "./sign-in";
        }
      });
  }, []);

  const logout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      window.localStorage.clear();
      window.location.href = "./sign-in";
    }
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProgress = (currTime, clueNo) => {
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
        currTime,
      }),
    }).then((res) => res.json());
  };

  const handleStartOver = () => {
    const now = new Date();
    const currentTime = now.toLocaleString();
    const clueNo = 0;

    handleProgress(currentTime, clueNo);
    navigate("/home");
  };
  const handleDashboard = () => {
    const secret_key = prompt("Enter secret Key");
    if (secret_key === "admin") navigate("/admin-dashboard");
    else alert("You are not allowed to access Dashboard");
  };
  return (
    <div className="navbar">
      <div className="navbar__left">
        <Link to="/">
          <div className="navbar__logo">
            <img
              src="https://repository-images.githubusercontent.com/246284582/167d7d00-bb97-11ea-9b19-0e672793b9a9"
              alt=""
            />
          </div>
        </Link>
      </div>
      <div className="navbar__right">
        <span>
          Name: {userData.fname} {userData.lname}{" "}
        </span>
        {/* {console.log(userData["progress"])}
        {userData.progress.map((e, i) => {
          console.log(e);
        })} */}

        <svg
          onClick={logout}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
          />
        </svg>
        <button onClick={handleStartOver}>Start Over</button>
        <button onClick={handleDashboard}>Way to Dashboard</button>
        <img src={Logout} alt="" className="logout" onClick={logout} />
        {/* <button onClick={logout}>Logout</button> */}
      </div>
    </div>
  );
}

export default Navbar;
