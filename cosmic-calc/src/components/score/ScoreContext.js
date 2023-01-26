import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../pages/firebaseConfig";

export const ScoreContext = createContext();

function ScoreProvider({ children }) {
  const [score, setScore] = useState(0);
  const [user, setUser] = useState(null);
const [year, setYear] = useState(0)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      retrieveUserData(user);
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const retrieveUserData = async () => {
    console.log("retrieveUserData called");
    let email = await user.email;
    const response = await fetch(
      `http://localhost:3001/api/users/email/${email}`
    );
    const data = await response.json();
    console.log(data.payload.total_score);
    setScore(data.payload.total_score);
    setYear(data.payload.year);
    return data.payload;
  };


  const [level, setLevel] = useState(0);

  function updateLevel(i) {
    setLevel(i);
    console.log("hello world");
  }
  console.log(level);

  // const value = useMemo(() => {
  return (
    <ScoreContext.Provider
      value={{
        score: score,
        update: retrieveUserData,
        user: user,
        // level: level,
        updateLevel: updateLevel,
        year: year,
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
}

export default ScoreProvider;
//   return {
//     score: score,
//     update: retrieveUserData,
//     user: user,
//     level: level,
//     updateLevel: updateLevel,
//   };
// }, [score, user, level]);
