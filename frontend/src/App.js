import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { useState } from "react";
import Home from "./pages/Home";
import Clue1 from "./pages/Clue1";
import Clue2 from "./pages/Clue2";
import Clue3 from "./pages/Clue3";
import Clue4 from "./pages/Clue4";
import Clue5 from "./pages/Clue5";
import Deadend1 from "./pages/Deadend1";
import Deadend2 from "./pages/Deadend2";
import Success from "./pages/Success";

import Login from "./components/login_component";
import SignUp from "./components/signup_component";
import UserDetails from "./components/userDetails";
import AdminHome from "./components/adminHome";

function App() {
  const [userMail, setUserMail] = useState("");
  const [user, setUser] = useState(null);

  // const navigate = useNavigate();
  const [progress, setProgress] = useState([false, false, false, false, false]);
  const [isLoggedin, setIsLoggedin] = useState(false);
  // if (!userMail) {
  //   navigate("/");
  // }

  const isLoggedIn = window.localStorage.getItem("loggedIn");

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<>Page Not Found</>} />
          <Route exact path="/" element={<Home />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/userDetails" element={<UserDetails />} />
          <Route path="/admin-dashboard" element={<AdminHome />} />
          <Route
            path="/clue1"
            exact
            element={
              // isLoggedin ? (
              <Clue1
                userMail={userMail}
                setUserMail={setUserMail}
                user={user}
                setUser={setUser}
                isLoggedin={isLoggedin}
                setIsLoggedin={setIsLoggedin}
                progress={progress}
                setProgress={setProgress}
              />
              // ) : (
              //   <Signin
              //     userMail={userMail}
              //     setUserMail={setUserMail}
              //     user={user}
              //     setUser={setUser}
              //     isLoggedin={isLoggedin}
              //     setIsLoggedin={setIsLoggedin}
              //   />
              // )
            }
          ></Route>
          <Route
            path="/clue2"
            exact
            element={
              // isLoggedin ? (
              <Clue2
                userMail={userMail}
                setUserMail={setUserMail}
                user={user}
                setUser={setUser}
                isLoggedin={isLoggedin}
                setIsLoggedin={setIsLoggedin}
                progress={progress}
                setProgress={setProgress}
              />
              // ) : (
              //   <Signin
              //     userMail={userMail}
              //     setUserMail={setUserMail}
              //     user={user}
              //     setUser={setUser}
              //     isLoggedin={isLoggedin}
              //     setIsLoggedin={setIsLoggedin}
              //   />
              // )
            }
          ></Route>
          <Route
            path="/clue3"
            exact
            element={
              // isLoggedin ? (
              <Clue3
                userMail={userMail}
                setUserMail={setUserMail}
                user={user}
                setUser={setUser}
                isLoggedin={isLoggedin}
                setIsLoggedin={setIsLoggedin}
                progress={progress}
                setProgress={setProgress}
              />
              // ) : (
              //   <Signin
              //     userMail={userMail}
              //     setUserMail={setUserMail}
              //     user={user}
              //     setUser={setUser}
              //     isLoggedin={isLoggedin}
              //     setIsLoggedin={setIsLoggedin}
              //   />
              // )
            }
          ></Route>
          <Route
            path="/clue4"
            exact
            element={
              // isLoggedin ? (
              <Clue4
                userMail={userMail}
                setUserMail={setUserMail}
                user={user}
                setUser={setUser}
                isLoggedin={isLoggedin}
                setIsLoggedin={setIsLoggedin}
                progress={progress}
                setProgress={setProgress}
              />
              // ) : (
              //   <Signin
              //     userMail={userMail}
              //     setUserMail={setUserMail}
              //     user={user}
              //     setUser={setUser}
              //     isLoggedin={isLoggedin}
              //     setIsLoggedin={setIsLoggedin}
              //   />
              // )
            }
          ></Route>
          <Route
            path="/clue5"
            exact
            element={
              // isLoggedin ? (
              <Clue5
                userMail={userMail}
                setUserMail={setUserMail}
                user={user}
                setUser={setUser}
                isLoggedin={isLoggedin}
                setIsLoggedin={setIsLoggedin}
                progress={progress}
                setProgress={setProgress}
              />
              // ) : (
              //   <Signin
              //     userMail={userMail}
              //     setUserMail={setUserMail}
              //     user={user}
              //     setUser={setUser}
              //     isLoggedin={isLoggedin}
              //     setIsLoggedin={setIsLoggedin}
              //   />
              // )
            }
          ></Route>
          <Route
            path="/home"
            exact
            element={
              // isLoggedin ? (
              <Home
                userMail={userMail}
                setUserMail={setUserMail}
                user={user}
                setUser={setUser}
                isLoggedin={isLoggedin}
                setIsLoggedin={setIsLoggedin}
              />
              // ) : (
              //   <Signin
              //     userMail={userMail}
              //     setUserMail={setUserMail}
              //     user={user}
              //     setUser={setUser}
              //     isLoggedin={isLoggedin}
              //     setIsLoggedin={setIsLoggedin}
              //   />
              // )
            }
          ></Route>
          <Route
            path="/deadend1"
            exact
            element={
              // isLoggedin ? (
              <Deadend1
                userMail={userMail}
                setUserMail={setUserMail}
                user={user}
                setUser={setUser}
                isLoggedin={isLoggedin}
                setIsLoggedin={setIsLoggedin}
              />
              // ) : (
              //   <Signin
              //     userMail={userMail}
              //     setUserMail={setUserMail}
              //     user={user}
              //     setUser={setUser}
              //     isLoggedin={isLoggedin}
              //     setIsLoggedin={setIsLoggedin}
              //   />
              // )
            }
          ></Route>
          <Route
            path="/deadend2"
            exact
            element={
              // isLoggedin ? (
              <Deadend2
                userMail={userMail}
                setUserMail={setUserMail}
                user={user}
                setUser={setUser}
                isLoggedin={isLoggedin}
                setIsLoggedin={setIsLoggedin}
              />
              // ) : (
              //   <Signin
              //     userMail={userMail}
              //     setUserMail={setUserMail}
              //     user={user}
              //     setUser={setUser}
              //     isLoggedin={isLoggedin}
              //     setIsLoggedin={setIsLoggedin}
              //   />
              // )
            }
          ></Route>
          <Route
            path="/success"
            exact
            element={
              // isLoggedin ? (
              <Success
                userMail={userMail}
                setUserMail={setUserMail}
                user={user}
                setUser={setUser}
                isLoggedin={isLoggedin}
                setIsLoggedin={setIsLoggedin}
              />
              // ) : (
              //   <Signin
              //     userMail={userMail}
              //     setUserMail={setUserMail}
              //     user={user}
              //     setUser={setUser}
              //     isLoggedin={isLoggedin}
              //     setIsLoggedin={setIsLoggedin}
              //   />
              // )
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
