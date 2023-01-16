import React, { useState, useContext } from "react";
import "./Avatars.css";
import { ScoreContext } from "../components/score/ScoreContext";

// let headParts = [1, 2, 3];
// let bodyParts = [1, 2, 3, 4];
// let antParts = [1, 2, 3, 4];
// let teethParts = [1, 2, 3, 4, 5];

const AvatarBuilder = () => {
  // initialize state for the selected head, body, and legs options
  const [selectedHead, setSelectedHead] = useState(1);
  const [selectedBody, setSelectedBody] = useState(1);
  const [selectedAnt, setSelectedAnt] = useState(1);
  const [selectedTeeth, setSelectedTeeth] = useState(1);
  const [avatarColor, setAvatarColor] = useState("#000000");

  // body part amounts
  let bodyPartAmounts = {
    Heads: 3,
    Bodies: 4,
    Ants: 4,
    Teeth: 1,
  };

  // import the context
  let context = useContext(ScoreContext);

  function handleHeadClick(bodypart, direction) {
    if (bodypart === "head" && direction === "left" && selectedHead !== 1) {
      setSelectedHead(selectedHead - 1);
    } else if (
      bodypart === "head" &&
      direction === "right" &&
      selectedHead !== bodyPartAmounts.Heads
    ) {
      setSelectedHead(selectedHead + 1);
      console.log(selectedHead);
    }

    if (bodypart === "body" && direction === "left" && selectedBody !== 1) {
      setSelectedBody(selectedBody - 1);
    } else if (
      bodypart === "body" &&
      direction === "right" &&
      selectedBody !== bodyPartAmounts.Bodies
    ) {
      setSelectedBody(selectedBody + 1);
    }

    if (bodypart === "ant" && direction === "left" && selectedAnt !== 1) {
      setSelectedAnt(selectedAnt - 1);
    } else if (
      bodypart === "ant" &&
      direction === "right" &&
      selectedBody !== bodyPartAmounts.Ants
    ) {
      setSelectedAnt(selectedAnt + 1);
    }

    if (bodypart === "teeth" && direction === "left" && selectedTeeth !== 1) {
      setSelectedTeeth(selectedTeeth - 1);
    } else if (
      bodypart === "teeth" &&
      direction === "right" &&
      selectedBody !== bodyPartAmounts.Teeth
    ) {
      setSelectedTeeth(selectedTeeth + 1);
    }
    console.log("This is user Context", context.user.email);
  }

  //   onclick change body colour to red
  const changeBodyColor = (e) => {
    console.log(e);
    //setAvatarColor(e);
    document.documentElement.style.setProperty(
      "--avatar-body-color",
      avatarColor
    );
    console.log("hhellloo");
  };
  // const changeBodyColor = (e) => {
  //   console.log(e.target.value);
  //   // setAvatarColor(e.target.value);
  // };

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
  }

  async function patchAvatars(email, bodyNum, antNum, headNum) {
    console.log("hello");
    const response = await fetch(
      `http://localhost:3001/api/users/avatars/${email}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bodyId: bodyNum,
          antId: antNum,
          headId: headNum,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
  }

  return (
    <div>
      <br />
      <br />
      <button
        onClick={() =>
          patchAvatars(
            context.user.email,
            selectedBody,
            selectedAnt,
            selectedHead
          )
        }
      >
        Submit
      </button>
      <button onClick={changeBodyColor()}>Change Colour</button>
      <div className="head-selector">
        <button onClick={() => handleHeadClick("head", "left")}>⬅</button>
        Head
        <button onClick={() => handleHeadClick("head", "right")}>➡</button>
      </div>
      <div className="body-selector">
        <button onClick={() => handleHeadClick("body", "left")}>⬅</button>
        Body
        <button onClick={() => handleHeadClick("body", "right")}>➡</button>
      </div>
      <div className="legs-selector">
        <button onClick={() => handleHeadClick("legs", "left")}>⬅</button>
        legs
        <button onClick={() => handleHeadClick("legs", "right")}>➡</button>
      </div>
      <div className="ants-selector">
        <button onClick={() => handleHeadClick("ant", "left")}>⬅</button>
        Antenna
        <button onClick={() => handleHeadClick("ant", "right")}>➡</button>
        <button onClick={() => getAvatars(context.user.email)}>TEST</button>
      </div>
      <div className="avatar-color-selector">
        <input type="color" value={avatarColor} onChange={changeBodyColor} />
      </div>

      <div class="container">
        <div class="avatarWrap">
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
                <div class="arms_leftSleeve"></div>
                <div class="arms_rightSleeve"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarBuilder;
