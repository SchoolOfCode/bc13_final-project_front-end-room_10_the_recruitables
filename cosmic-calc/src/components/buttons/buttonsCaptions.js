import React from "react";
import "./buttonsCaptions.css";

function ButtonsCaption({ ButtonNumber, clickToGame, text }) {
  return (
    <div className="levelButton">
      <button
        className={"levelButtons"}
        onClick={clickToGame}
        id={`levelButton-${ButtonNumber}`}
        text
      >
        {/* BUTTON {ButtonNumber} */}
      </button>
    </div>
  );
}

export default ButtonsCaption;
