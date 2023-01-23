import { createContext, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../pages/firebaseConfig";

export const ScoreContext = createContext({});

function ScoreProvider({ children }) {
  const [score, setScore] = useState(0);
  const [user, setUser] = useState(null);
  const [year, setYear] = useState(0);

  onAuthStateChanged(auth, (user) => {
    retrieveUserData(user);
    setUser(user);
  });

  const retrieveUserData = async () => {
    let email = await user.email;
    const response = await fetch(
      `http://localhost:3001/api/users/email/${email}`
    );
    const data = await response.json();
    // console.log(data.payload.total_score);
    setScore(data.payload.total_score);
    setYear(data.payload.year);
    return data.payload;
  };

  return (
    <ScoreContext.Provider
      value={{ score: score, update: retrieveUserData, user: user, year: year }}
    >
      {children}
    </ScoreContext.Provider>
  );
}

export default ScoreProvider;
