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
  const [mute, setMute] = useState(true);
  console.log("mute", mute);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      retrieveUserData(user);
      setUser(user);
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const retrieveUserData = async () => {
    let email = await user.email;
    const response = await fetch(
      `http://localhost:3001/api/users/email/${email}`
    );
    const data = await response.json();
    setScore(data.payload.total_score);
    setYear(data.payload.year);
    setData(data.payload);
    setName(data.payload.name);
    setEmail(data.payload.email);
    return data.payload;
  };

  const muteSound = () => {
    setMute(!mute);
  };

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
        year: year,
        muteSound: muteSound,
        mute: mute,
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
}

export default ScoreProvider;
