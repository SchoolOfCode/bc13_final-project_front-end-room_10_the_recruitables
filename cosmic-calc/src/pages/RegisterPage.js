import React from "react";
import { auth, createUserDocument } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./registerPage.css";
import logo from "../images/Logo.png";
import { ScoreContext } from "../components/score/ScoreContext";

function Register() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [year, setYear] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  //console.log(user);

  let navigate = useNavigate();

  const createUser = async (user) => {
    const response = await fetch(
      `https://cosmic-calculations-backend.onrender.com/api/users/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          name: registerName,
          total_score: 0,
          year: year,
        }),
      }
    );
    const data = await response.json();
    //console.log(data);
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
      setTimeout(() => {
        navigate("/avatars");
      }, 1000);
      //console.log(scores);
    } catch (error) {
      console.log(error);
    }
  };

  const scores = useContext(ScoreContext);

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
            <div>
              <input
                className="registerPasswordInput"
                type="password"
                placeholder="password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
              <select
                className="registerYearInput"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="What year are you in?"
              >
                <option value="1">Year 1</option>
                <option value="2">Year 2</option>
                <option value="3">Year 3</option>
                <option value="4">Year 4</option>
              </select>
            </div>
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
