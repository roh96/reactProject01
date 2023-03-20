import React, { useRef, useState, useReducer, useEffect } from "react";
import "./Search.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Search = () => {
  const [dataResult, setDataResult] = useState([]);
  const [searchTitle, setDataSearchTitle] = useState([]);
  const elInput = useRef();

  // function searchStart(e) {}
  const sear = (e) => {
    e.preventDefault();
    let value = { gap: elInput.current.value };
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=c3fc32ee6b872288e925c8b8d9afedea&language=en-US&page=1&query=${value.gap}`
      )
      .then((res) => {
        setDataResult(res.data.results);
      });
    // setDataSearchTitle([...searchTitle, value]);
  };

  console.log(dataResult);
  // console.log(value.gap);
  return (
    <div>
      <div className="searchVisual-container">
        <div className="searchVisual-content">
          <h2>검색어를 입력해주세요</h2>
          <div className="searchBox">
            <form onSubmit={sear}>
              <input
                ref={elInput}
                type="text"
                name="keyword"
                placeholder="영어를 입력해주세요"
              />
              {/* <button onClick={() => dispatch({ value: searchTitle })}></button> */}
              <input
                type="submit"
                value="검색"
                // onClick={() => console.log("1")}
              />
            </form>
          </div>
        </div>
      </div>

      <div className="result-container">
        <div className="result-content">
          <h2> 검색결과 {dataResult.length}개 </h2>

          <ul>
            {dataResult &&
              dataResult.map((obj, k) => {
                return (
                  <li key={k}>
                    <div className="resultBox">
                      {obj.poster_path == null ? (
                        <img src="./img/sry.png"></img>
                      ) : (
                        <img
                          src={`https://image.tmdb.org/t/p/w500${obj.poster_path}`}
                        ></img>
                      )}
                    </div>
                    <div className="Title">
                      <Link to="/detail" state={{ id: obj.id }}>
                        {obj.title ||
                          obj.name ||
                          obj.original_name ||
                          obj.original_title}
                      </Link>
                      <div className="notTitle">
                        <div className="date">
                          {obj.release_date || obj.first_air_date}
                        </div>
                        <div className="point">
                          <div>
                            <span className="material-symbols-outlined">
                              favorite
                            </span>
                          </div>
                          <div>{Number(obj.vote_average).toFixed(1)}</div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Search;
