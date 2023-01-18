import React, { useState } from "react";
import tenPenny from "../images/coins/10p.webp";
import onePenny from "../images/coins/1p.png";
import "./yearTwoGames.css";

export default function YearTwoGames() {
  const [tenPence, setTenPence] = useState(Math.floor(Math.random() * 10) + 1);
  const [onePence, setOnePence] = useState(Math.floor(Math.random() * 10) + 1);
  const [answer, setAnswer] = useState(0);

  function giveRandomCoin() {
    setTenPence(Math.floor(Math.random() * 10) + 1);
    setOnePence(Math.floor(Math.random() * 10) + 1);
  }

  let tenPenceTotal = tenPence * 10;
  let onePenceTotal = onePence * 1;
  let total = tenPenceTotal + onePenceTotal;

  function checkAnswer() {
    console.log("answer", answer);
    if (String(answer) === String(total)) {
      console.log("correct");
    } else {
      console.log("wrong");
    }
  }

  return (
    <div className="bigdaddy">
      <button onClick={giveRandomCoin}>Give me a coin</button>
      <div className="images-div">
        {Array.from({ length: tenPence }, (_, i) => (
          <img key={i} src={tenPenny} alt="random" className="ten-pence-pic" />
        ))}
        {Array.from({ length: onePence }, (_, i) => (
          <img key={i} src={onePenny} alt="random" className="one-pence-pic" />
        ))}
      </div>
      <input
        className="input"
        onChange={(e) => setAnswer(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            checkAnswer();
            setAnswer("");
          }
        }}
      />
    </div>
  );
}
