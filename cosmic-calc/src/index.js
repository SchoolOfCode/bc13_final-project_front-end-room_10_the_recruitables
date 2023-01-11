import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";
import starBackground from "./images/Background_Buttons/Background.png";
import { UserContextProvider } from "./Context/useUser";

const root = ReactDOM.createRoot(document.getElementById("root"));

document.body.style.backgroundImage = `url(${starBackground})`;
document.body.style.backgroundRepeat = "no-repeat";
document.body.style.backgroundSize = "cover";
document.body.style.backgroundAttachment = "fixed";

root.render(
  <React.StrictMode>
    <UserContextProvider>
      <Router>
        <App />
      </Router>
    </UserContextProvider>
  </React.StrictMode>
);
