import React, { useEffect, useState } from "react";
import { AddTeam } from "./AddTeam";
import { AddWinPage } from "./AddWinPage";
import "./App.css";
import { API_URL } from "./constants";

function App() {
  const [state, setState] = useState({
    page: 1,
    pageSize: 10,
  });

  const [search, setSearch] = useState("");

  const [team1, setTeam1] = useState(null);
  const [team2, setTeam2] = useState(null);

  const callTeams = (page, pageSize, search) => {
    setState({
      ...state,
      loading: true,
    });
    fetch(
      `${API_URL}/teams?page=${page}&pageSize=${pageSize}&search=${
        search ? search : ""
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        setState({
          ...state,
          data,
          searching: false,
          loading: false,
        });
        console.log(Math.floor(data?.totalItems / state.pageSize));
      })
      .catch((err) => {
        setState({
          ...state,
          err,
          searching: false,
          loading: false,
        });
        console.log(err);
      });
  };
  useEffect(() => {
    callTeams(state.page, state.pageSize, search);
  }, [state.page, state.pageSize]);
  console.log(team1, team2);
  return (
    <div className="App">
      <header className="App-header">HackSter</header>
      {team1?._id && team2?._id ? (
        <AddWinPage
          team1={team1}
          team2={team2}
          reset={() => {
            setTeam1(null);
            setTeam2(null);
          }}
          callTeams={callTeams}
        />
      ) : (
        <>
          <AddTeam callTeams={callTeams} />
          <div className="table-wrap">
            <div className="table-filter">
              <input
                value={search}
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                disabled={!search || state.searching}
                onClick={() => {
                  setState({
                    ...state,
                    page: 1,
                    pageSize: 10,
                    searching: true,
                  });
                  callTeams(1, 10, search);
                }}
              >
                {state.searching ? "Searching" : "Search"}
              </button>
              &nbsp;&nbsp;&nbsp;
              <button
                onClick={() => {
                  setSearch("");
                  callTeams(1, 10, "");
                }}
              >
                Clear
              </button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Select Team</th>
                  <th>Team Name</th>
                  <th>Wins</th>
                  <th>Losses</th>
                  <th>Ties</th>
                  <th>Scores</th>
                </tr>
              </thead>
              <tbody>
                {state.loading ? (
                  <tr>
                    <td colSpan={5}>Loading...!</td>
                  </tr>
                ) : (
                  state?.data?.teams?.map((ele) => {
                    return (
                      <tr key={ele._id}>
                        <td>
                          {team1 ? (
                            <button
                              disabled={team1?._id === ele?._id}
                              onClick={() => setTeam2(ele)}
                            >
                              Select as team2
                            </button>
                          ) : (
                            <button onClick={() => setTeam1(ele)}>
                              Select as team1
                            </button>
                          )}
                        </td>
                        <td>{ele.team_name}</td>
                        <td>{ele.wins}</td>
                        <td>{ele.losses}</td>
                        <td>{ele.ties}</td>
                        <td>{ele.score}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
            <div className="pagination">
              <button
                disabled={
                  state.page === 1 || state?.data?.totalItems <= state.pageSize
                }
                onClick={() => {
                  setState({
                    ...state,
                    page: state.page - 1,
                  });
                }}
              >
                Previous
              </button>
              {[-2, -1, 0, 1, 2, 3].map((item) => {
                let page = state.page + item;
                console.log(
                  Math.floor(state?.data?.totalItems / state.pageSize)
                );
                return Math.floor(state?.data?.totalItems / state.pageSize) >=
                  page && page > 0 ? (
                  <span
                    key={item}
                    className={`current-page ${
                      state.page === page ? "active" : ""
                    }`}
                    onClick={() => {
                      setState({
                        ...state,
                        page,
                      });
                    }}
                  >
                    {page}
                  </span>
                ) : null;
              })}
              <button
                disabled={
                  state.page ===
                    Math.floor(state?.data?.totalItems / state.pageSize) ||
                  state?.data?.totalItems <= state.pageSize
                }
                onClick={() => {
                  setState({
                    ...state,
                    page: state.page + 1,
                  });
                }}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
