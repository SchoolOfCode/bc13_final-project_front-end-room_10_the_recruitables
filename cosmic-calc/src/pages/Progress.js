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
const captions1 = [
  "Number Lines",
  "Shapes and Names",
  "Adding and Subtracting",
  "Number Bonds to 10",
  "Advanced Adding and Subtracting",
  "Reading Numbers",
  "Number Bonds to 20",
  "Halves and Quarters",
  "Lucky Dip",
];

const captions2 = [
  "Counting in 2s, 5s, and 10s",
  "Adding and Subtracting Using Counters",
  "Reading and Writing Numbers",
  "Counting Money",
  "Adding Three Numbers Together",
  "Finding Fractions of Whole Numbers",
  "Putting Numbers in Order",
  "Comparing Values",
  "Lucky Dip",
];

const captions3 = [
  "Adding and Subtracting 1, 10 and 100",
  "Putting Large Numbers in Order",
  "Adding Three-Digit Numbers",
  "Adding and Subtracting Larger Numbers",
  "Practicing Times Tables",
  "Units of Measurement",
  "Adding Fractions",
  "Times Tables- Timed!",
  "Lucky Dip",
];

const captions4 = [
  "Multiples of 6, 7 and 9",
  "Adding and Subtracting using 10, 100 and 1000",
  "Negative Numbers",
  "Putting Large Numbers in Order",
  "Rouding Up and Down",
  "Converting Units of Measurement",
  "Times Tables Skills",
  "Multiplying Three Numbers",
  "Times Tables- Timed!",
];

export const Progress = () => {
  // state for score count of player
  const context = useContext(ScoreContext);

  // count for array of levels. New level pushed into array ever X amount of points. Then mapped below to return a new button each time score level reached.
  const [levels, setLevels] = useState([1]);
  //?does this need to be a useState? Can it be a const?
  const [lockLevels, setLockLevels] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [completedLevels, setCompletedLevels] = useState([0]);
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
      console.log(levels);
    } else setLevels([1]);
  }, [payload.total_score]);

  useEffect(() => {
    let newLevelArray = levels.slice(0, -1);
    setCompletedLevels(newLevelArray);
  }, [levels]);

  function handleGotoLevel() {
    stop();
    playWoosh();
    navigateToGame();
  }
  // every 100 points or more new planet
  // set up the navigation variables and function
  const navigate = useNavigate();

  const navigateToGame = () => {
    let year = context.year;
    console.log(year);
    if (year === 1) {
      navigate("/game", { state: { totalScore: totalScore } });
    } else if (year === 2) {
      navigate("/year-two-games", { state: { totalScore: totalScore } });
    } else if (year === 3) {
      navigate("/year-three-games", { state: { totalScore: totalScore } });
    } else if (year === 4) {
      console.log("year 4");
      navigate("/year-four-games", { state: { totalScore: totalScore } });
    }
  };

  // onClick event handler to pass to buttons. If need to go depending on levels can add conditions based on button index 1-10

  // JSX below returns a grid container.
  // then maps over the levels array which returns a button for each new item in the array. Array increases depending on score. New item every 5 points = new button returned.

  let yearGroup = context.year;
  let captions = [];
  if (yearGroup === 1) {
    captions = captions1;
  } else if (yearGroup === 2) {
    captions = captions2;
  } else if (yearGroup === 3) {
    captions = captions3;
  } else if (yearGroup === 4) {
    captions = captions4;
  }

  return (
    <div className="progress-container">
      <div className="progress-page">
        {levels.map((levels, index) => (
          <LevelButtons
            clickToGame={handleGotoLevel}
            key={levels.level}
            ButtonNumber={index + 1 + "-unlock"}
            text={captions[index]}
          />
        ))}
        {lockLevels.map((level, index) => (
          <LevelButtons
            key={levels.level}
            ButtonNumber={index + 1 + "-lock"}
            text={captions[index]}
          />
        ))}
        {completedLevels.map((levels, index) => (
          <LevelButtons
            key={levels.level}
            ButtonNumber={index + 1 + "-complete"}
            text={captions[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default Progress;
