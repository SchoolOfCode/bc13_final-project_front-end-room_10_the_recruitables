import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../pages/firebaseConfig";

export const ScoreContext = createContext();

function ScoreProvider({ children }) {
  const [score, setScore] = useState(0);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      retrieveUserData(user);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const retrieveUserData = async (user) => {
    let email = user.email;
    const response = await fetch(
      `http://localhost:3001/api/users/email/${email}`
    );
    const data = await response.json();
    console.log(data.payload);
    setScore(data.payload.total_score);
    return data.payload;
  };

  console.log(score);

  return (
    <ScoreContext.Provider value={[score]}>{children}</ScoreContext.Provider>
  );
}

export default ScoreProvider;
