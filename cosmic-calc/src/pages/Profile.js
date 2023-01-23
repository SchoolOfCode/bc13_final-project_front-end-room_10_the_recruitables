import { useState, useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import React from "react";
import "./profile.css";
import profileImage from "../images/Background_Buttons/MonsterRed.png";
import { useNavigate } from "react-router-dom";
import { ScoreContext } from "../components/score/ScoreContext";
import useSound from "use-sound";
import alien from ".././components/sound/FX/alien.mp3";
import ship from ".././components/sound/FX/ship.mp3";

function Profile() {
  const [userData, setUserData] = useState({});
  const [selectedHead, setSelectedHead] = useState(1);
  const [selectedBody, setSelectedBody] = useState(1);
  const [selectedAnt, setSelectedAnt] = useState(1);
  const [avatarColor, setAvatarColor] = useState("#000000");
  const [play, { stop }] = useSound(alien, { interrupt: true, volume: 0.3 });
  const [playShip] = useSound(ship, { interrupt: true, volume: 0.3 });

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
    navigate("/progress");
  };

  console.log(useContext(ScoreContext));

  useEffect(() => {
    async function getAvatars(email) {
      const response = await fetch(
        `http://localhost:3001/api/users/avatars/${email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log("data", data);
      setSelectedAnt(data.payload.antid);
      setSelectedBody(data.payload.bodyid);
      setSelectedHead(data.payload.headid);
      setAvatarColor(data.payload.avcolour);
    }
    getAvatars(context.user.email);
  }, []);

  return (
    <div>
      <div className="profilePageDiv" data-testid="profilePageDiv">
        {/* <img className="profileImage" src={profileImage} alt="profileImage" /> */}
        <div class="container">
          <button
            className="avatarButton"
            onClick={() => navigate("/avatars")}
            data-testid="avatarButton"
          >
            Customise
          </button>
          <div class="avatarWrapProfile" onMouseOver={play}>
            <div class="avatar">
              <div class="headWrap">
                <div class="antenna">
                  <div class="curlyHair"></div>
                  <div class="antenna_line"></div>
                  <div class={"antenna_circle_" + selectedAnt}></div>
                </div>
                <div class="ears">
                  <div class="ear"></div>
                  <div class="ear"></div>
                </div>
                <div class={"face_" + selectedHead} git>
                  <div class="eyebrows">
                    <div class="eyebrows_brow1"></div>
                    <div class="eyebrows_brow2"></div>
                  </div>
                  <div class="eyes"></div>

                  <div class="nose"></div>
                  <div class="mouth">
                    <div class="tooth_1"></div>
                    <div class="tooth_2"></div>
                    <div class="tooth_3"></div>
                    <div class="tooth_4"></div>
                    <div class="tooth_5"> </div>
                    <div class="tongue"></div>
                  </div>
                </div>
                <div class="neck"></div>
              </div>
              <div class="bodyWrap">
                <div class={"bodyWrap_body_" + selectedBody}>
                  <div class="bodyWrap_bottom"></div>
                  <div class="legs">
                    <div class="legs_leftLeg"></div>
                    <div class="legs_rightLeg"></div>
                    <div class="legs_leftShoe"></div>
                    <div class="legs_rightShoe"></div>
                  </div>
                </div>
                <div class="arms">
                  <div class="arms_leftArm"></div>
                  <div class="arms_rightArm"></div>
                  <div class={"arms_leftSleeve_" + selectedBody}></div>
                  <div class={"arms_rightSleeve_" + selectedBody}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="profileDiv">
          <h3 className="welcome">Welcome</h3>
          <h4 className="name">{userData.name}</h4>
          <h4 className="score">Total score: {context.score} </h4>

          <button
            className="gameButton"
            onClick={() => {
              handleGame();
              stop();
              playShip();
            }}
          >
            Let's play!
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
