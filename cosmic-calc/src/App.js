import React, { useState, useContext } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
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
import useSound from "use-sound";
import buttonFX from "./components/sound/FX/buttonFX.mp3";
import YearTwo from "./pages/YearTwoGames";
import logo from "../src/images/Logo.png";
import Leaderboard from "./pages/Leaderboard";
import YearTwoGames from "./pages/YearTwoGames";
import YearThreeGames from "./pages/YearThreeGames";
import YearFourGames from "./pages/YearFourGames";
// import { GoMute } from "react-icons/go";

export default function App() {
  const authed = auth;
  let context = useContext(ScoreContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [profileHighlighted, setProfileHighlighted] = useState(false);
  const [progressHighlighted, setProgressHighlighted] = useState(false);
  const [gameHighlighted, setGameHighlighted] = useState(false);
  const [playHover] = useSound(buttonFX, {
    volume: 0.3,
    playbackRate: Math.floor(Math.random() * (2 - 0.8) + 0.8),
  });
  const navigateToLogin = () => {
    navigate("/");
  };
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
    let year = context.year;
    console.log(year);
    if (year === 1) {
      navigate("/game");
    } else if (year === 2) {
      navigate("/year-two-games");
    } else if (year === 3) {
      navigate("/year-three-games");
    } else if (year === 4) {
      console.log("year 4");
      navigate("/year-four-games");
    }
    setProfileHighlighted(false);
    setProgressHighlighted(false);
    setGameHighlighted(true);
    context.update();
    console.log(navigate);
  };
  const navigateToRegister = () => {
    navigate("/register");
  };
  console.log(authed.currentUser);

  const navigateToLeaderboard = () => {
    navigate("/leaderboard");
  };

  // const mute = () => {
  //   context.muteSound();
  //   console.log("app mute");
  // };

  return (
    <div className="App">
      {authed.currentUser ? (
        <div className="navBarPageDiv">
          <img src={logo} alt="logo" className="logo" />
          {location.pathname !== "/game" && (
            <div className="progress-score">
              <h1>Score: {context.score}</h1>
            </div>
          )}
          {location.pathname !== "/profile" && (
            <button
              onClick={navigateToProfile}
              onMouseOver={playHover}
              className={
                profileHighlighted
                  ? "navButtonProfileHighlighted"
                  : "navButtonProfile"
              }
            ></button>
          )}
          {location.pathname !== "/progress" && (
            <button
              onClick={navigateToProgress}
              onMouseOver={playHover}
              className={
                progressHighlighted
                  ? "navButtonProgressHighlighted"
                  : "navButtonProgress"
              }
            ></button>
          )}
          {location.pathname !== "/game" && (
            <button
              onClick={navigateToGame}
              onMouseOver={playHover}
              className={
                gameHighlighted ? "navButtonGameHighlighted" : "navButtonGame"
              }
            ></button>
          )}
          <Logout />
          {authed.currentUser.email === "teacher@teacher.com" && (
            <button
              className="leaderboardButton"
              onClick={navigateToLeaderboard}
            >
              Leader board
            </button>
          )}
          {/* <button classname="muteButton" onClick={mute}>
            <GoMute size={50} />
          </button> */}
        </div>
      ) : (
        <div className="navBarLoginDiv">
          {location.pathname !== "/" && (
            <button
              className="navButtonLogin"
              onMouseOver={playHover}
              onClick={navigateToLogin}
            >
              Login
            </button>
          )}
          {location.pathname !== "/register" && (
            <button
              className="navButtonRegister"
              onMouseOver={playHover}
              onClick={navigateToRegister}
            >
              Register
            </button>
          )}
          {/* <button classname="muteButton" onClick={mute}>
            <GoMute size={50} />
          </button> */}
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
          path="/year-two-games"
          element={
            <ProtectedRoute>
              <YearTwo />
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
          path="/year-three-games"
          element={
            <ProtectedRoute>
              <YearThreeGames />
            </ProtectedRoute>
          }
        />
        <Route
          path="/year-four-games"
          element={
            <ProtectedRoute>
              <YearFourGames />
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
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/year-two-games"
          element={
            <ProtectedRoute>
              <YearTwoGames />
            </ProtectedRoute>
          }
        />
        <Route
          path="/year-three-games"
          element={
            <ProtectedRoute>
              <YearThreeGames />
            </ProtectedRoute>
          }
        />
        <Route
          path="/year-four-games"
          element={
            <ProtectedRoute>
              <YearFourGames />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}
