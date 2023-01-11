import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Profile from "./pages/Profile";
import Game from "./pages/Game";
import Progress from "./pages/Progress";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import ProtectedRoute from "./components/Authentication/requireAuth";
import "./App.css";
import { auth } from "./pages/firebaseConfig";
import Logout from "./components/Authentication/Logout";
// import ProfileButton from "./images/Background_Buttons/ProfileButtonTextYellow.png";

const authed = auth;

export default function App() {
  const navigate = useNavigate();
  const [profileHighlighted, setProfileHighlighted] = useState(false);
  const [progressHighlighted, setProgressHighlighted] = useState(false);
  const [gameHighlighted, setGameHighlighted] = useState(false);

  const navigateToProfile = () => {
    navigate("/profile");
    setProfileHighlighted(true);
    setProgressHighlighted(false);
    setGameHighlighted(false);
  };

  const navigateToProgress = () => {
    navigate("/progress");
    setProfileHighlighted(false);
    setProgressHighlighted(true);
    setGameHighlighted(false);
  };

  const navigateToGame = () => {
    navigate("/game");
    setProfileHighlighted(false);
    setProgressHighlighted(false);
    setGameHighlighted(true);
  };

  const navigateToLogin = () => {
    navigate("/");
  };

  const navigateToRegister = () => {
    navigate("/register");
  };

  console.log(authed.currentUser);

  return (
    <div className="App">
      <div className="navBar">
        {authed.currentUser ? (
          <div className="navBarPageDiv">
            <Logout />
            <button
              onClick={navigateToProfile}
              className={
                profileHighlighted
                  ? "navButtonProfileHighlighted"
                  : "navButtonProfile"
              }
            ></button>
            <button
              onClick={navigateToProgress}
              className={
                progressHighlighted
                  ? "navButtonProgressHighlighted"
                  : "navButtonProgress"
              }
            ></button>
            <button
              onClick={navigateToGame}
              className={
                gameHighlighted ? "navButtonGameHighlighted" : "navButtonGame"
              }
            ></button>
          </div>
        ) : (
          <div className="navBarLoginDiv">
            <button className="navButtonLogin" onClick={navigateToLogin}>
              Login
            </button>
            <button className="navButtonRegister" onClick={navigateToRegister}>
              Register
            </button>
          </div>
        )}
      </div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/progress"
          element={
            <ProtectedRoute>
              <Progress />
            </ProtectedRoute>
          }
        />
        <Route
          path="/game"
          element={
            <ProtectedRoute>
              <Game />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}
