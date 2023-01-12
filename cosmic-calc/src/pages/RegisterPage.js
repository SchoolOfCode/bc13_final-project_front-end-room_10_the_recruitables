import React from "react";
import { auth, createUserDocument } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./registerPage.css";
import logo from "../images/Logo/cosmic_calcs_logo.png";
// import { ScoreContext } from "../context/ScoreContext";

function Register() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  let navigate = useNavigate();

  const createUser = async (user) => {
    const response = await fetch(`http://localhost:3001/api/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        name: registerName,
        total_score: 0,
      }),
    });
    const data = await response.json();
    console.log(data);
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      await createUserDocument(user, { displayName: registerName });
      setRegisterEmail("");
      setRegisterPassword("");
      setRegisterName("");
      await createUser(user);

      // setTimeout(() => {
      navigate("/profile");
      // }, 2000);
    } catch (error) {
      console.log(error);
    }
  };
  //create useContext to store user score and name
  //example

  return (
    <div className="register">
      <div>
        {/* <NavBarLogin /> */}
        <div className="registerLogoDiv">
          <img className="registerLogo" src={logo} alt="logo" />
        </div>
        <form onSubmit={handleRegister}>
          <div className="inputRegisterDiv">
            <input
              className="registerNameInput"
              type="text"
              placeholder="Name"
              value={registerName}
              onChange={(e) => setRegisterName(e.target.value)}
            />
            <input
              className="registerEmailInput"
              type="email"
              placeholder="email"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
            />
            <input
              className="registerPasswordInput"
              type="password"
              placeholder="password"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
            />
          </div>
          <div className="registerButtonDiv">
            <button className="registerButton" type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
