//when user is logged into firebase display data from the users firestore collection

import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
// import { getFirestore, collection, getDocs } from "firebase/firestore";
import NavBar from "../components/navBar/NavBar";
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

  //match user.email from firebase to users email in the database using a GET request to the backend and display the score parameter and display name parameter

  //check firebase email against GET request email and display data from score parameter, if not post new user information to backgroundBlendMode:

  const retrieveUserData = async (user) => {
    let email = user.email;
    const response = await fetch(
      `https://cosmic-calculations-backend.onrender.com/api/users/email/${email}`
    );
    const data = await response.json();
    console.log(data.payload);
    setUserData(data.payload);
    console.log(userData);
    return data.payload;
  };

  const navigate = useNavigate();

  const handleGame = () => {
    navigate("/game");
  };

  return (
    <div>
      {/* <NavBar /> */}
      {/* <h3>Profile</h3>
      <h4>{userData.email}</h4>
      {/* <h4>{userData.displayName}</h4> */}
      {/* <h4>{userData.total_score} </h4> */} 

      <div className="profilePageDiv">
        <img className="profileImage" src={profileImage} alt="profileImage" />

        <div className="profileDiv">
          {/* <h3 className="welcome">Welcome</h3> */}
          {/* <h4 className="name">Lucy McHugh</h4> */}
          <h4 className="username">Welcome {userData.name}</h4>
          <h4 className="score">Total score: {userData.total_score} </h4>
          <button className="gameButton" onClick={handleGame}>
            Let's play!
          </button>
        </div>
        {/* <Routes>
          <Route path="/game" element={<Game />} />
        </Routes> */}
      </div>
    </div>
  );
}

export default Profile;
