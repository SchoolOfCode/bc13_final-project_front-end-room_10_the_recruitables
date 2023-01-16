import React, { useState } from "react";

let headParts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let bodyParts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let legParts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const AvatarBuilder = () => {
  // initialize state for the selected head, body, and legs options
  const [selectedHead, setSelectedHead] = useState(1);
  const [selectedBody, setSelectedBody] = useState(1);
  const [selectedLegs, setSelectedLegs] = useState(1);

  // import the context

  function handleHeadClick(bodypart, direction) {
    if (bodypart === "head" && direction === "left") {
      setSelectedHead(selectedHead - 1);
    } else if (bodypart === "head" && direction === "right") {
      setSelectedHead(selectedHead + 1);
      console.log(selectedHead);
    }

    if (bodypart === "body" && direction === "left") {
      setSelectedBody(selectedBody - 1);
    } else if (bodypart === "body" && direction === "right") {
      setSelectedBody(selectedBody + 1);
    }

    if (bodypart === "legs" && direction === "left") {
      setSelectedLegs(selectedLegs - 1);
    } else if (bodypart === "legs" && direction === "right") {
      setSelectedLegs(selectedLegs + 1);
    }
  }

  // async function handleSubmit() {
  //   let email = await user.email;

  //   const response = await fetch(
  //     `http://localhost:3001/api/users/email/${email}`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ total_score: score }),
  //     }
  //   );
  //   const data = await response.json();
  //   console.log(data);
  // }

  return (
    <div>
      <div className="submit">Submit</div>
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
      <div>
        <p>{headParts[selectedHead]}</p>
        <br />
        <p>{bodyParts[selectedBody]}</p>
        <br />
        <p>{legParts[selectedLegs]}</p>
      </div>
    </div>
  );
};

export default AvatarBuilder;
