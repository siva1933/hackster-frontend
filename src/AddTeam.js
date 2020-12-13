import React, { useState } from "react";
import { API_URL } from "./constants";

export const AddTeam = (props) => {
  const [team_name, setTeamName] = useState("");
  const [loading, setLoading] = useState(false);
  const postTeam = (team_name) => {
    setLoading(true);
    fetch(`${API_URL}/teams`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ team_name: team_name }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTeamName("");
        setLoading(false);
        props.callTeams(1, 10);
        alert("Team added!");
      })
      .catch((err) => {
        setLoading(false);
        alert("Failed to add team.");
      });
  };
  return (
    <div className="add-team">
      <input
        value={team_name}
        placeholder="Enter Team Name"
        onChange={(e) => setTeamName(e.target.value)}
      />
      <button
        disabled={team_name.trim() === "" || loading}
        onClick={() => postTeam(team_name)}
      >
        {loading ? "Submiting..." : "Submit"}
      </button>
    </div>
  );
};
