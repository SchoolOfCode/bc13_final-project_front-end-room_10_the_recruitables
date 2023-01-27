import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";
import * as serviceWorker from "./serviceWorkerRegistration";
import Background from "./images/Background_Buttons/Background.png";
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
