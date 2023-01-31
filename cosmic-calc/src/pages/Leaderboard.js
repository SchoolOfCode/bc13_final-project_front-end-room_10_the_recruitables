import React, { useEffect } from "react";
import { useState } from "react";
import "./leaderboard.css";

const Leaderboard = () => {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      const response = await fetch(
        "https://cosmic-calculations-backend.onrender.com/api/users",
        {
          method: "GET",
        }
      );
      const data = await response.json();
      //console.log(data.payload);
      setAllUsers(data.payload);
    };
    getAllUsers();
  }, []);

  return (
    <div className="leaderboard">
      <h1 className="leaderboardTitle">Leaderboard</h1>
      <table>
        <tr>
          <th>Ranking</th>
          <th>Name</th>
          <th>Score</th>
        </tr>

        {allUsers.map((user, i) => {
          return (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{user.name}</td>
              <td>{user.total_score}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default Leaderboard;
