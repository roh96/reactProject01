import axios from "axios";
import React, { useRef, useState, useReducer, useEffect } from "react";
import "./Detail.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, Scrollbar, A11y } from "swiper";

// Import Swiper styles
import "swiper/css";

const Detail = () => {
  const [dataDetail, setDataDetail] = useState([]);
  const [dataCast, setDataCast] = useState();

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/11932?api_key=c3fc32ee6b872288e925c8b8d9afedea&language=en-US"
      )
      .then((res) => {
        // console.log(res);
        setDataDetail(res.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/11931/casts?api_key=c3fc32ee6b872288e925c8b8d9afedea&language=en-US"
      )
      .then((res) => {
        console.log(res);
        setDataCast(res.data.cast);
      });
  }, []);

  if (!dataCast) return <>loading...</>;

  return (
    <div>
      <div className="detail-container">
        <div className="detailVisual-container">
          <img src="https://image.tmdb.org/t/p/w500/aWLxBxRtQP5a6oKkXqGkGYEPmNX.jpg" />
        </div>
        <div className="detail-content">
          <div className="detail-detailbox">
            <div className="detail-leftbox">
              <img src="https://image.tmdb.org/t/p/w500/mAGviFp1ufYM3EaZBSrjPiKPBt6.jpg"></img>
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
                              <img
                                src={`https://image.tmdb.org/t/p/w500${obj.profile_path}`}
                              ></img>
                            </div>
                            <div class="Title">
                              <p>{obj.name || obj.original_name}</p>
                              <div className="notTitle"></div>
                            </div>
                          </li>
                        </SwiperSlide>
                      );
                    })}
                </Swiper>
              </ul>
            </div>
          </div>
          <div className="detail-reviewbox"></div>
          <div className="detail-recobox"></div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
