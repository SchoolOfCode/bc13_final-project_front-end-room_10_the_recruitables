import React from "react";
import "./levelButtons.css";

function LevelButtons({ ButtonNumber, clickToGame, text }) {
  return (
    <div className="levelButton">
      <button
        className={"levelButtons"}
        onClick={clickToGame}
        id={`levelButton-${ButtonNumber}`}
      >
        <span>{text}</span>
      </button>
    </div>
  );
}

export default LevelButtons;
