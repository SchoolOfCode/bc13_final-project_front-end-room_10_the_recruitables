import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
// import NavBar from "../components/navBar/NavBar";
import React from "react";
import "./profile.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Game from "./Game";
import profileImage from "../images/Background_Buttons/MonsterRed.png";

function Profile() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      retrieveUserData(user);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const retrieveUserData = async (user) => {
    let email = user.email;
    const response = await fetch(
      `http://localhost:3001/api/users/email/${email}`
    );
    const data = await response.json();
    console.log(data.payload);
    setUserData(data.payload);
    console.log(userData);
    this.forceUpdate();
    return data.payload;
  };
  const navigate = useNavigate();
  const handleGame = () => {
    navigate("/game");
  };

  return (
    <div>
      {/* <NavBar /> */}
      <div className="profilePageDiv">
        <img className="profileImage" src={profileImage} alt="profileImage" />
        <div className="profileDiv">
          <h3 className="welcome">Welcome</h3>
          <h4 className="name">{userData.name}</h4>
          <h4 className="username">{userData.email}</h4>
          <h4 className="score">Total score: {userData.total_score} </h4>
          <button className="gameButton" onClick={handleGame}>
            Let's play!
          </button>
        </div>
        <Routes>
          <Route path="/game" element={<Game />} />
        </Routes>
      </div>
    </div>
  );
}

export default Profile;
