import React, { useState } from "react";
import { API_URL } from "./constants";
// import { API_URL } from "./constants";

export const AddWinPage = (props) => {
  const [wonId, setWonId] = useState("");
  const [lostId, setLostId] = useState("");
  const [isTie, setIsTie] = useState(false);

  const [loading, setLoading] = useState(false);
  const postWinTeam = () => {
    setLoading(true);
    fetch(`${API_URL}/teams/won`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wonId, lostId, isTie }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        props.callTeams(1, 10);
        props.reset();
        alert("Result added!");
      })
      .catch((err) => {
        setLoading(false);
        alert("Failed to add result.");
      });
  };
  return (
    <div className="add-win-page">
      <button onClick={() => props.reset()}>Back</button>
      <div className="teams">
        <div>
          <span>Team 1</span>
          <p>
            <span>Name:</span>&nbsp;&nbsp;
            {props.team1.team_name}
          </p>
          {isTie ? (
            "N/R"
          ) : !wonId ? (
            <button
              onClick={() => {
                setWonId(props.team1._id);
                setLostId(props.team2._id);
              }}
            >
              Won
            </button>
          ) : wonId === props.team1._id ? (
            "Congratulations...! You won."
          ) : (
            "Lost"
          )}
        </div>
        <div>
          <button
            className="inline-btn"
            onClick={() => {
              setIsTie(!isTie);
              if (!isTie) {
                setWonId(props.team1._id);
                setLostId(props.team2._id);
              } else {
                setWonId("");
                setLostId("");
              }
            }}
          >
            Tie
          </button>
          &nbsp;&nbsp;
          <button className="inline-btn" onClick={() => setWonId("")}>
            Reset
          </button>
          &nbsp;&nbsp;
          <button
            disabled={loading}
            className="inline-btn"
            onClick={postWinTeam}
          >
            {loading ? "Submitting" : "Submit"}
          </button>
        </div>
        <div>
          <span>Team 2</span>
          <p>
            <span>Name:</span>&nbsp;&nbsp;
            {props.team2.team_name}
          </p>
          {isTie ? (
            "N/R"
          ) : !wonId ? (
            <button
              onClick={() => {
                setWonId(props.team2._id);
                setLostId(props.team2._id);
              }}
            >
              Won
            </button>
          ) : wonId === props.team2._id ? (
            "Congratulations...! You won."
          ) : (
            "Lost"
          )}
        </div>
      </div>
    </div>
  );
};
