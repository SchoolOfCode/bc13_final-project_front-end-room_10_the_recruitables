import { useState, useEffect, createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../pages/firebaseConfig";
// import NavBar from "../components/navBar/NavBar";
import React from "react";

export const UserContext = createContext();

export function UserContextProvider(props) {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      retrieveUserData(user);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const retrieveUserData = async (user) => {
    let email = user.email;
    const response = await fetch(
      `http://localhost:4000/api/users/email/${email}`
    );
    const data = await response.json();

    setUserData(data.payload);

    return data.payload;
  };

  return (
    <div>
      <UserContextProvider.Provider value={userData}>
        {props.children}
      </UserContextProvider.Provider>
    </div>
  );
}

// export { UserContext, UserContextProvider };
