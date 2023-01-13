import { useState, useEffect, createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../pages/firebaseConfig";
// import NavBar from "../components/navBar/NavBar";
import React from "react";

export const UserContext = createContext({});

export function UserContextProvider(props) {
  const [userData, setUserData] = useState({});
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const retrieveUserData = async (user) => {
      let email = user.email;
      const response = await fetch(
        `http://localhost:3001/api/users/email/${email}`
      );
      const data = await response.json();
      console.log(data)
      setUserData(data.payload);
      console.log(userData, "user data");


      // setIsLoading(false);
      return data.payload;
    };
    onAuthStateChanged(auth, (user) => {
      if (user) {
        retrieveUserData(user);
        console.log("hello")
       
      }
    });
  }, []);

  console.log(userData);
  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  // else{
  return (
    <UserContext.Provider value={userData}>
      {props.children}
    </UserContext.Provider>
  );
  }




// export { UserContext, UserContextProvider };
