import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Profile from "./pages/Profile";
import Game from "./pages/Game";
import Progress from "./pages/Progress";
// import NavBar from "./components/navBar/NavBar";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import ProtectedRoute from "./components/Authentication/requireAuth";
// import Logout from "./components/Authentication/Logout";
import ProfileButton from './images/Background_Buttons/ProfileButtonTextYellow.png'
import "./App.css";



export default function App() {
  const navigate = useNavigate();
 const [profileHighlighted, setProfileHighlighted] = useState(false);
  const [progressHighlighted, setProgressHighlighted] = useState(false);
  const [gameHighlighted, setGameHighlighted] = useState(false);

  const navigateToProfile = ()  => {
    navigate("/profile");  
    setProfileHighlighted(true);
    setProgressHighlighted(false);
    setGameHighlighted(false);
  };

  const navigateToProgress = ()  => {
    navigate("/progress");
    setProfileHighlighted(false);
    setProgressHighlighted(true);
    setGameHighlighted(false);

  }

  const navigateToGame = ()  => {
    navigate("/game");
    setProfileHighlighted(false);
    setProgressHighlighted(false);
    setGameHighlighted(true);
  }

  const navigateToLogin = ()  => {
    navigate("/");
  }

  const navigateToRegister = ()  => {
    navigate("/register");
  }
  // <?xml version="1.0" standalone="no"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" d="M0,256L48,229.3C96,203,192,149,288,128C384,107,480,117,576,112C672,107,768,85,864,80C960,75,1056,85,1152,112C1248,139,1344,181,1392,202.7L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
  // use this svg for the background
  // do this by adding it to the css file
  return (
    <div className="App">

      {/* <NavBar /> */}
      <div className="navBar">
      <div className="navBarLoginDiv">
      <button className="navButtonLogin" onClick={navigateToLogin}>Login</button>
      <button className="navButtonRegister" onClick={navigateToRegister}>Register</button>
        <button className="navButtonLogout" onClick={navigateToLogin}>Logout</button>
        </div>
        <div className="navBarPageDiv">
        <button onClick={navigateToProfile} className={profileHighlighted ? "navButtonProfileHighlighted" : "navButtonProfile"}></button>
        <button onClick={navigateToProgress} className={progressHighlighted ? "navButtonProgressHighlighted" : "navButtonProgress"}></button>
        <button onClick={navigateToGame} className={gameHighlighted ? "navButtonGameHighlighted" : "navButtonGame"}></button>
      </div>
      </div>
      
      {/* <BrowserRouter> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/game" element={<Game />} />

          {/* <Route
            path="/profile"
            element={
              <ProtectedRoute>
                {" "}
                <Profile />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/progress"
            element={
              <ProtectedRoute>
                {" "}
                <Progress />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/game"
            element={
              <ProtectedRoute>
                {" "}
                <Game />{" "}
              </ProtectedRoute>
            }
          /> */}
        </Routes>
      {/* </BrowserRouter> */}
    </div>
  );
}
