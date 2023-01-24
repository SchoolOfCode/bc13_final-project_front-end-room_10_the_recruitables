import React from "react";
import "./score.css";

export default function Score(props) {
  return (
    <div className="scoreDiv" data-testid="scoreDiv">
      <h2 className="h2ScoreGame" data-testid="h2ScoreGame">
        Score: {props.score}
      </h2>
    </div>
  );
}
