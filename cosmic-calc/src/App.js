import React, { useState, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Profile from "./pages/Profile";
import Game from "./pages/Game";
import Progress from "./pages/Progress";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import ProtectedRoute from "./components/Authentication/requireAuth";
import Logout from "./components/Authentication/Logout";
import "./App.css";
import { auth } from "./pages/firebaseConfig";
import { ScoreContext } from "./components/score/ScoreContext";
import TimedGame from "./pages/TimedGame";
import Avatars from "./pages/Avatars";
import Level1 from "./pages/Level1";
import Level5 from "./pages/Level5";

export default function App() {
  const authed = auth;
  let context = useContext(ScoreContext);
  const navigate = useNavigate();
  const [profileHighlighted, setProfileHighlighted] = useState(false);
  const [progressHighlighted, setProgressHighlighted] = useState(false);
  const [gameHighlighted, setGameHighlighted] = useState(false);

  const navigateToProfile = () => {
    navigate("/profile");

    setProfileHighlighted(true);
    setProgressHighlighted(false);
    setGameHighlighted(false);
    context.update();
  };

  const navigateToProgress = () => {
    navigate("/progress");
    setProfileHighlighted(false);
    setProgressHighlighted(true);
    setGameHighlighted(false);
    context.update();
  };

  const navigateToGame = () => {
    navigate("/game");
    setProfileHighlighted(false);
    setProgressHighlighted(false);
    setGameHighlighted(true);
    context.update();
    console.log(navigate);
  };

  const navigateToTimedGame = () => {
    navigate("/timedGame");
  }

  const navigateToAvatars = () => {
    navigate("/avatars");
  }

  const navigateToLevel1 = () => {
    navigate("/level1");
  }

  const navigateToLevel5 = () => {
    navigate("/level5");
  }

  const navigateToLogin = () => {
    navigate("/");
  };

  const navigateToRegister = () => {
    navigate("/register");
  };
  console.log(authed.currentUser);

  return (
    <div className="App">
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
          <button onClick={navigateToTimedGame} className="navButtonTimedGame">TimedGame</button>
            <button onClick={navigateToAvatars} className="navButtonAvatars">Avatars</button>
            <button onClick={navigateToLevel1} className="navButtonLevel1">Level1</button>
            <button onClick={navigateToLevel5} className="navButtonLevel5">Level5</button>
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
        <Route
          path="/timedGame"
          element={
            <ProtectedRoute>
              <TimedGame />
            </ProtectedRoute>
          }
        />
        <Route
          path="/avatars"
          element={
            <ProtectedRoute>
              <Avatars />
            </ProtectedRoute>
          }
        />
        <Route
          path="/level1"
          element={
            <ProtectedRoute>  
              <Level1 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/level5"
          element={
            <ProtectedRoute>  
              <Level5 />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}
