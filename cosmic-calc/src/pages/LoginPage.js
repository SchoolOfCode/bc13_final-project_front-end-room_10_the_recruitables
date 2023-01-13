import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { createUserDocument } from "./firebaseConfig";
import { auth } from "./firebaseConfig";
import { useNavigate } from "react-router-dom";
import "./loginPage.css";
import logo from "../images/Logo/logo.png";

function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      await createUserDocument(user);
      setLoginEmail("");
      setLoginPassword("");
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Login">
      <div>
        <div className="loginLogoDiv">
          <img className="loginLogo" src={logo} alt="logo" />
        </div>
        <form onSubmit={handleLogin}>
          <div className="inputLoginDiv">
            <input
              className="loginInput"
              type="text"
              placeholder="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <input
              className="passwordInput"
              type="password"
              placeholder="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>
          <div className="loginButtonDiv">
            <button className="loginButton" type="submit"></button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
