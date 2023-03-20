import axios from "axios";

import React, { useRef, useState, useReducer, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, Scrollbar, A11y } from "swiper";
import { Link } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Main = () => {
  const [dataTrend, setDataTrend] = useState([]);
  const [dataPopular, setDataPopular] = useState([]);
  const [dataBest, setDataBest] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/trending/all/day?api_key=c3fc32ee6b872288e925c8b8d9afedea"
      )
      .then((res) => {
        console.log(res);
        setDataTrend(res.data.results);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/popular?api_key=c3fc32ee6b872288e925c8b8d9afedea&language=en-US&page=1"
      )
      .then((res) => {
        setDataPopular(res.data.results);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/top_rated?api_key=c3fc32ee6b872288e925c8b8d9afedea&language=en-US&page=1"
      )
      .then((res) => {
        setDataBest(res.data.results);
      });
  }, []);

  return (
    // <Link to="" state={{code:1111,url:'list'}}
    <div>
      <div className="mainVisual">
        <h1>다양한 주제로 영화를 추천해드리겠습니다</h1>
      </div>
      <div className="mainContainer">
        <h2>오늘의 인기목록</h2>

        <div className="listBox">
          <ul>
            <Swiper
              slidesPerView={8}
              spaceBetween={10}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {dataTrend &&
                dataTrend.map((obj, k) => {
                  return (
                    <SwiperSlide key={k}>
                      <li>
                        <div className="smallImgbox">
                          {obj.poster_path == null ? (
                            <img src="./img/sry.png"></img>
                          ) : (
                            <img
                              src={`https://image.tmdb.org/t/p/w500${obj.poster_path}`}
                            ></img>
                          )}
                        </div>
                        <div class="Title">
                          <Link to="/detail" state={{ id: obj.id }}>
                            {obj.title ||
                              obj.name ||
                              obj.original_name ||
                              obj.original_title}
                          </Link>
                          <div className="notTitle">
                            <div className="date">
                              <p>{obj.release_date || obj.first_air_date}</p>
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
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </ul>
        </div>

        <h2>최근 유명한 영화</h2>

        <div className="popularBox">
          <ul>
            <Swiper
              slidesPerView={8}
              spaceBetween={10}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {dataPopular &&
                dataPopular.map((obj, k) => {
                  return (
                    <SwiperSlide key={k}>
                      <li>
                        <div className="smallImgbox">
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
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </ul>
        </div>

        <h2>가장 평점이 좋은 20개</h2>

        <div className="bestBox">
          <ul>
            {dataBest &&
              dataBest.map((obj, k) => {
                return (
                  <li key={k}>
                    <div className="bigImgbox">
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

export default Main;
