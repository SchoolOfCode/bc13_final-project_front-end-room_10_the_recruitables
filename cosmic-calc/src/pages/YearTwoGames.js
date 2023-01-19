import React, { useState } from "react";
import tenPenny from "../images/coins/10p.webp";
import onePenny from "../images/coins/1p.png";
import "./yearTwoGames.css";

export default function YearTwoGames() {
  // 1. COINS GAME - year two, planet 4
  // const [tenPence, setTenPence] = useState(Math.floor(Math.random() * 10) + 1);
  // const [onePence, setOnePence] = useState(Math.floor(Math.random() * 10) + 1);
  //const [answer, setAnswer] = useState(0);

  // function giveRandomCoin() {
  //   setTenPence(Math.floor(Math.random() * 10) + 1);
  //   setOnePence(Math.floor(Math.random() * 10) + 1);
  // }

  // let tenPenceTotal = tenPence * 10;
  // let onePenceTotal = onePence * 1;
  // let total = tenPenceTotal + onePenceTotal;

  // function checkAnswer() {
  //   console.log("answer", answer);
  //   if (String(answer) === String(total)) {
  //     console.log("correct");
  //   } else {
  //     console.log("wrong");
  //   }
  // }

  // 2. SHAPE GAME - planet
  const [shape, setShape] = useState("square");

  const shapes = [
    "square",
    "rectangle",
    "circle",
    "triangle",
    "pentagon",
    "hexagon",
    "heptagon",
    "octagon",
  ];

  function giveRandomShape() {
    setShape(shapes[Math.floor(Math.random() * shapes.length)]);
  }

  function checkAnswer(answer) {
    if (answer === shape) {
      console.log("correct");
    } else {
      console.log("wrong");
    }
  }

  // 3. ADDING AND SUBTRACTING 1 COINS
  // const [num1, setNum1] = useState(Math.floor(Math.random() * 10) + 1);
  // const [num2, setNum2] = useState(Math.floor(Math.random() * 10) + 1);
  // const [operation, setOperation] = useState();
  // const [answer, setAnswer] = useState(0);
  // const [total, setTotal] = useState(0);

  return (
    <div className="bigdaddy">
      {/* 1. THESE ARE THE BUTTONS FOR THE COINS GAME */}
      {/* <button onClick={giveRandomCoin}>Give me a coin</button>
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
        {/* 2. THESE ARE THE BUTTONS FOR THE SHAPES GAME - NEED TO ADD SHAPES IMAGE */}

      <h1>Click on the {shape}?</h1>
      <div className="shapes-div">
        <button onClick={giveRandomShape} className="new-shape-button">
          Give me a shape
        </button>
        <button
          className="square-shape"
          onClick={() => checkAnswer("square")}
        ></button>
        <button
          className="rectangle-shape"
          onClick={() => checkAnswer("rectangle")}
        ></button>
        <button
          className="circle-shape"
          onClick={() => checkAnswer("circle")}
        ></button>
        <button
          className="triangle-shape"
          onClick={() => checkAnswer("triangle")}
        ></button>
        <button
          className="pentagon-shape"
          onClick={() => checkAnswer("pentagon")}
        ></button>
        <button
          className="hexagon-shape"
          onClick={() => checkAnswer("hexagon")}
        ></button>
        {/* <button
          className="heptagon-shape"
          onClick={() => checkAnswer("heptagon")}
        >
          heptagon
        </button> */}
        <button
          className="octagon-shape"
          onClick={() => checkAnswer("octagon")}
        ></button>
      </div>

      {/* 3. Adding and Subtracting 1 coins */}
      {/* <button onClick={giveQuestion}>BUTTTTON</button>
      <h1>
        {num1} {operation} {num2}
      </h1> */}
      {/* <div className="images-div">
        {Array.from({ length: num1 }, (_, i) => (
          <img key={i} src={onePenny} alt="random" className="one-pence-pic" />
        ))}
        <h1>{operation}</h1>
        {Array.from({ length: num2 }, (_, i) => (
          <img key={i} src={onePenny} alt="random" className="one-pence-pic" />
        ))}
        {"="}
      </div> */}
      {/* <input
        className="input"
        onChange={(e) => setAnswer(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            checkAnswer();
            giveQuestion();
            setAnswer("");
          }
        }}
      /> */}
    </div>
  );
}
