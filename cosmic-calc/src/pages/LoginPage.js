import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { createUserDocument } from "./firebaseConfig";
import { auth } from "./firebaseConfig";
import { useNavigate } from "react-router-dom";
import "./loginPage.css";
import logo from "../images/Logo.png";
import useSound from "use-sound";
import buttonFX from "../components/sound/FX/buttonFX.mp3";
import intro from "../components/sound/FX/intro.mp3";
import open from "../components/sound/FX/open.mp3";

function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [, setUser] = useState(null);
  const [play, { stop }] = useSound(intro, { volume: 0.3 });
  const [playHover] = useSound(buttonFX, {
    volume: 0.3,
    playbackRate: Math.random() * (2 - 0.8) + 0.8,
  });
  const [playOpen] = useSound(open, { volume: 0.4 });

  useEffect(() => {
    play();
  }, [play]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        navigate("/profile");
      } else {
        setUser(null);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <div className="loginLogoDiv">
          <img className="loginLogo" src={logo} alt="logo" />
        </div>
        <form onSubmit={handleLogin}>
          <div className="inputLoginDiv">
            <input
              type="email"
              placeholder="email"
              // data-testid="emailInput"
              className="loginInput"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              // data-testid="passwordInput"
              className="passwordInput"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>
          <div className="loginButtonDiv">
            <button
              className="loginButton"
              data-testid="loginButton"
              onMouseOver={playHover}
              onClick={() => {
                playOpen();
                stop();
              }}
              type="submit"
            ></button>
          </div>
        </form>
      </div>
      {/* <button className="playMusicButton" onClick={handleClick}>
        Play Music
      </button> */}
    </div>
  );
}

export default Login;
