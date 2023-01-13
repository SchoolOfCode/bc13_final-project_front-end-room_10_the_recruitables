//logout button for the user to sign out firebase

import { signOut } from "firebase/auth";
import { auth } from "../../pages/firebaseConfig";
import { useNavigate } from "react-router-dom";

import "./Logout.css";

import ScoreProvider from "../score/ScoreContext";
import { useContext } from "react";


function Logout() {
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
    <div>
      <button className="navButtonLogout" onClick={handleLogout}></button>
    </div>
  );
}

export default Logout;
