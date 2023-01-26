//logout button for the user to sign out firebase

import { signOut } from "firebase/auth";
import { auth } from "../../pages/firebaseConfig";
import { useNavigate } from "react-router-dom";
import buttonFX from "../sound/FX/buttonFX.mp3";
import useSound from "use-sound";

import "./Logout.css";

import ScoreProvider from "../score/ScoreContext";
import { useContext } from "react";

function Logout() {
  const [playHover] = useSound(buttonFX, {
    volume: 0.3,
    playbackRate: Math.random() * (2 - 0.8) + 0.8,
  });
  let navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  useContext(ScoreProvider);

  return (
    <button
      data-testid="logoutButton"
      className="navButtonLogout"
      onMouseOver={playHover}
      onClick={handleLogout}
    ></button>
  );
}

export default Logout;
