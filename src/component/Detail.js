import axios from "axios";
import React, { useRef, useState, useReducer, useEffect } from "react";
import "./Detail.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, Scrollbar, A11y } from "swiper";
// Import Swiper styles
import "swiper/css";
import { useLocation } from "react-router-dom";

const Detail = () => {
  const [dataDetail, setDetail] = useState([]);
  const [dataCast, setCast] = useState();
  const [dataReview, setReview] = useState();
  const [dataReco, setReco] = useState();

  const [b, setB] = useState(true);
  const location = useLocation();
  console.log(location);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${location.state.id}?api_key=c3fc32ee6b872288e925c8b8d9afedea&language=en-US`
        // "https://api.themoviedb.org/3/movie/11932?api_key=c3fc32ee6b872288e925c8b8d9afedea&language=en-US"
      )
      .then((res) => {
        //console.log(res.data);
        setDetail(res.data);
      });
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${location.state.id}/casts?api_key=c3fc32ee6b872288e925c8b8d9afedea&language=en-US`
      )
      .then((res) => {
        //console.log(res);
        setCast(res.data.cast);
      });
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${location.state.id}/reviews?api_key=c3fc32ee6b872288e925c8b8d9afedea&language=en-US`
      )
      .then((res) => {
        //console.log(res.data.results[0].content);
        setReview(res.data.results[0].content);
      });
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${location.state.id}/recommendations?api_key=c3fc32ee6b872288e925c8b8d9afedea&language=en-US`
      )
      .then((res) => {
        // console.log(res.data.results);
        setReco(res.data.results);
      });
  }, [location.state.id]);

  // useEffect(() => {}, []);

  // useEffect(() => {}, []);

  // useEffect(() => {}, []);

  function ccc(id) {
    setB(true);
    location.state.id = id;
  }
  setTimeout(aa, 5000);
  function aa() {
    setB(false);
  }
  console.log(location.state.id);

  if (b) return <>loading...</>;
  // if (!dataCast) return <>loading...</>;

  return (
    <div>
      <div className="detail-container">
        <div
          className="detailVisual-container"
          style={{
            background: `url(
              https://image.tmdb.org/t/p/w500${dataDetail.backdrop_path}
            ) 0 0 / cover no-repeat`,
          }}

          // {background-image: url:(`
          //     https://image.tmdb.org/t/p/w500${dataDetail.backdrop_path}`
          //   );}
        >
          {/* <img
            src={`https://image.tmdb.org/t/p/w500${dataDetail.backdrop_path}`}
          /> */}
        </div>
        <div className="detail-content">
          <div className="detail-detailbox">
            <div className="detail-leftbox">
              <img
                src={`https://image.tmdb.org/t/p/w500${dataDetail.poster_path}`}
              ></img>
            </div>
            <div className="detail-rightbox">
              <div className="detail-rightmovie">
                <h2>
                  {dataDetail.title ||
                    dataDetail.name ||
                    dataDetail.original_name ||
                    dataDetail.original_title}
                  &nbsp; ({dataDetail.release_date.substr(0, 4)})
                </h2>
              </div>
              <div className="detail-rightinfo">
                <p>
                  평점 &nbsp;: &nbsp;
                  {Number(dataDetail.vote_average).toFixed(1)}
                </p>
              </div>
              <div className="detail-rightstory">
                <p>{dataDetail.overview}</p>
              </div>
            </div>
          </div>
          <div className="detail-actorbox">
            <div>
              <h3>배우</h3>
              <ul>
                <Swiper
                  slidesPerView={8}
                  spaceBetween={10}
                  className="mySwiper"
                >
                  {dataCast &&
                    dataCast.map((obj, k) => {
                      return (
                        <SwiperSlide key={k}>
                          <li>
                            <div className="smallImgbox">
                              {obj.profile_path == null ? (
                                <img src="./img/sry.png"></img>
                              ) : (
                                <img
                                  src={`https://image.tmdb.org/t/p/w500${obj.profile_path}`}
                                ></img>
                              )}
                            </div>
                            <div className="Title">
                              <p>{obj.name || obj.original_name}</p>
                              <div className="notTitle">({obj.character})</div>
                            </div>
                          </li>
                        </SwiperSlide>
                      );
                    })}
                </Swiper>
              </ul>
            </div>
          </div>
          <div className="detail-reviewbox">
            <div>
              <h3>리뷰</h3>
              <div>
                <p>{dataReview}</p>
              </div>
            </div>
          </div>
          <div className="detail-recobox">
            <div>
              <h3>추천 영화</h3>
              <div>
                <ul>
                  <Swiper
                    slidesPerView={8}
                    spaceBetween={10}
                    className="mySwiper"
                  >
                    {dataReco &&
                      dataReco.map((obj, k) => {
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
                              <div
                                className="Title"
                                onClick={() => ccc(obj.id)}
                              >
                                <p>{obj.titlte || obj.original_title}</p>
                                {/* <Link to="/detail" state={{ id: obj.id }}>
                                  {obj.titlte || obj.original_title}
                                </Link> */}
                              </div>
                            </li>
                          </SwiperSlide>
                        );
                      })}
                  </Swiper>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
