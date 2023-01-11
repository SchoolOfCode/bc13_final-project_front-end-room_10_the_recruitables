import React from "react";
import { auth, createUserDocument } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBarLogin from "../components/navBar/NavBarLogin";
import "./registerPage.css";
import logo from "../images/Logo/cosmic_calcs_logo.png";

function Register() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [score, setScore] = useState(0);
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
    const response = await fetch(`https://cosmic-calculations-backend.onrender.com/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
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
      createUser(user);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

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
          type="text"
          placeholder="Email"
          value={registerEmail}
          onChange={(e) => setRegisterEmail(e.target.value)}
        />
        <input
          className="registerPasswordInput"
          type="password"
          placeholder="Password"
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        </div>
        <div className="registerButtonDiv">
        <button className="registerButton" type="submit">Register</button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default Register;
