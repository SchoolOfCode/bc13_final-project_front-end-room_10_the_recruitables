import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";

// import starBackground from "./images/Background2.png";



import Background from "./images/Background_Buttons/Background2.png";
import ScoreProvider from "./components/score/ScoreContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

document.body.style.backgroundImage = `url(${Background})`;
document.body.style.backgroundRepeat = "no-repeat";
document.body.style.backgroundSize = "cover";
document.body.style.backgroundAttachment = "fixed";

root.render(
  <React.StrictMode>
    <ScoreProvider>
      <Router>
        <App />
      </Router>
    </ScoreProvider>
  </React.StrictMode>
);
