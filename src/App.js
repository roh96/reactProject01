import "./App.css";
import axios from "axios";
//import { useState, useReducer, useEffect } from "react";

import React, { useRef, useState, useReducer, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, Scrollbar, A11y } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Main from "./component/Main";
import Search from "./component/Search";
import Detail from "./component/Detail";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// import "./styles.css";

// import required modules

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
  function fetchMovies(state, action) {
    // return {
    //   list: [
    //     ...state.list,
    //     { id: 0, name: action.name, msg: action.msg, day: action.day },
    //   ],
    // };
  }

  // console.log(dataTrend);
  //console.log(dataPopular);
  //console.log(dataBest);

  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <div>
            <div>
              <h1>JustSearch</h1>
              <div>
                <Link to="/search">
                  <img src="./img/search.png"></img>
                </Link>
              </div>
            </div>
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/search" element={<Search />} />
            <Route path="/detail" element={<Detail />} />
          </Routes>
        </main>

        <footer>
          <div>
            <ul>
              <li>
                <a>
                  <img src="./img/instagram.png"></img>
                </a>
              </li>
              <li>
                <a>
                  <img src="./img/facebook.png"></img>
                </a>
              </li>
              <li>
                <a>
                  <img src="./img/kakao-talk.png"></img>
                </a>
              </li>
              <li>
                <a>
                  <img src="./img/twitter.png"></img>
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
