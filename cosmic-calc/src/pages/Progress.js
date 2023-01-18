import React from "react";
import { useState, useContext, useEffect } from "react";
import LevelButtons from "../components/buttons/LevelButtons";
import "./progress.css";
import { useNavigate } from "react-router-dom";
import { ScoreContext } from "../../src/components/score/ScoreContext";
import useSound from "use-sound";
import progressFX from ".././components/sound/FX/progressFX.mp3";
import woosh from ".././components/sound/FX/woosh.mp3";

// icon/image array to be used instead/aswell as buttons. Passed as a prop to levelButtons.
// const icons = ["😀", "😁", "😂", "🤣", "😃", "😆", "😎", "👽", "👾", "🤖"];

export const Progress = () => {
  // state for score count of player
  const context = useContext(ScoreContext);

  // count for array of levels. New level pushed into array ever X amount of points. Then mapped below to return a new button each time score level reached.
  const [levels, setLevels] = useState([1]);
  const [lockLevels, setLockLevels] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [payload, setPayload] = useState([]);
  const [totalScore, setTotalScore] = useState();

  const [playProgress, { stop }] = useSound(progressFX, {
    volume: 0.1,
  });
  const [playWoosh] = useSound(woosh, { playbackRate: 1.8, volume: 0.3 });

  playProgress();

  // handles bringing in new buttons when the score increases. Set to new button every 5 points. Added button to manually increase score in the mean time - will remove later.

  // function handleScoreIncrease() {
  // get request to get total_score
  useEffect(() => {
    const getScore = async () => {
      const response = await fetch(
        `http://localhost:3001/api/users/email/${context.user.email}`
      );
      const data = await response.json();
      setPayload(data.payload);
      setTotalScore(data.payload.total_score);
      console.log(data.payload);
      return data.payload.total_score;
    };
    getScore(1);
    if (payload.total_score >= 50) {
      let unlockedLevels = [
        ...lockLevels.slice(0, Math.floor(payload.total_score / 50)),
      ];
      setLevels(unlockedLevels);
    } else setLevels([1]);
  }, [totalScore]);

  // every 100 points or more new planet
  // set up the navigation variables and function
  const navigate = useNavigate();
  const navigateToGame = () => {
    navigate("/game", { state: { totalScore: totalScore } });
  };

  // onClick event handler to pass to buttons. If need to go depending on levels can add conditions based on button index 1-10
  function handleGotoLevel(level) {
    stop();
    playWoosh();
    navigateToGame();
  }

  // JSX below returns a grid container.
  // then maps over the levels array which returns a button for each new item in the array. Array increases depending on score. New item every 5 points = new button returned.
  return (
    <div className="progress-page">
      <div className="grid-container">
        {levels.map((levels, index) => (
          <LevelButtons
            clickToGame={handleGotoLevel}
            key={levels.level}
            ButtonNumber={index + 1 + "-unlock"}
          />
        ))}
        {lockLevels.map((level, index) => (
          <LevelButtons key={levels.level} ButtonNumber={index + 1 + "-lock"} />
        ))}
      </div>
      <div className="progress-score">
        <h1>Score: {context.score}</h1>
      </div>
    </div>
  );
};

export default Progress;
