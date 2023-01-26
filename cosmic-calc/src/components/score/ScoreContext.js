import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../pages/firebaseConfig";

export const ScoreContext = createContext();

function ScoreProvider({ children }) {
  const [score, setScore] = useState(0);
  const [user, setUser] = useState(null);
  const [year, setYear] = useState(0);
  const [data, setData] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      retrieveUserData(user);
      setUser(user);
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const retrieveUserData = async () => {
    console.log("retrieveUserData called");
    let email = await user.email;
    const response = await fetch(
      `https://cosmic-calculations-backend.onrender.com/api/users/email/${email}`
    );
    const data = await response.json();
    console.log(data.payload.total_score);
    setScore(data.payload.total_score);
    setYear(data.payload.year);
    setData(data.payload);
    setName(data.payload.name);
    setEmail(data.payload.email);
    return data.payload;
  };

  console.log(user);

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
        name: name,
        data: data,
        email: email,
        updateLevel: updateLevel,
        year: year,
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
}

export default ScoreProvider;
