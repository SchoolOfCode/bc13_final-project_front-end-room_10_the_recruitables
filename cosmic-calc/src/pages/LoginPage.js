import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { createUserDocument } from "./firebaseConfig";
import { auth } from "./firebaseConfig";
import { useNavigate } from "react-router-dom";
import NavBarLogin from "../components/navBar/NavBarLogin";
import "./loginPage.css";

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
        {/* <NavBarLogin /> */}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
