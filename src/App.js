import "./App.css";
import axios from "axios";
import { useState, useReducer, useEffect } from "react";
//import ReducerContext, { RContext } from "./ReducerContext";

// {/* <link rel="preconnect" href="https://fonts.googleapis.com">
// <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
// <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300&display=swap" rel="stylesheet"></link> */}

const initData = {
  totalCount: 0,
  list: [{ name: "", year: "", point: " " }],
};

//fetchMovies();

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/trending/all/day?api_key=c3fc32ee6b872288e925c8b8d9afedea"
      )
      .then((res) => {
        setData(res.data.results);
      });
  }, []);

  function fetchMovies(state, action) {
    // return {
    //   list: [
    //     ...state.list,
    //     { id: 0, name: action.name, msg: action.msg, day: action.day },
    //   ],
    // };
  }

  console.log(data);

  return (
    <div className="App">
      <h2>7일간 인기목록</h2>

      <div className="listBox">
        <ul>
          {data &&
            data.map((obj, k) => {
              return (
                <li key={k}>
                  <img
                    src="`https://image.tmdb.org/t/p/w500
                  {obj.poster_path}`"
                  ></img>
                  <div>
                    {obj.title}
                    <div>
                      {obj.release_date}
                      <div>ㅇ</div>
                      {obj.vote_average}
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}

export default App;
