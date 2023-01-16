import { useState, useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import React from "react";
import "./profile.css";
import profileImage from "../images/Background_Buttons/MonsterRed.png";
import { useNavigate } from "react-router-dom";
import { ScoreContext } from "../components/score/ScoreContext";

function Profile() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      retrieveUserData(user);
    });
  }, []);

  let context = useContext(ScoreContext);

  const retrieveUserData = async (user) => {
    let email = await user.email;
    const response = await fetch(
      `http://localhost:3001/api/users/email/${email}`
    );
    const data = await response.json();
    console.log(data.payload);
    setUserData(data.payload);
    return data.payload;
  };
  const navigate = useNavigate();
  const handleGame = () => {
    navigate("/game");
  };

  console.log(useContext(ScoreContext));

  return (
    <div>
      <div className="profilePageDiv">
        <img className="profileImage" src={profileImage} alt="profileImage" />
        <div className="profileDiv">
          <h3 className="welcome">Welcome</h3>
          <h4 className="name">{userData.name}</h4>
          <h4 className="username">{userData.email}</h4>
          <h4 className="score">Total score: {context.score} </h4>

          <button className="gameButton" onClick={handleGame}>
            Let's play!
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
