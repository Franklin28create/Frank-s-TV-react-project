import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const MovieInfo = ({ useWatchlist }) => {
  const { watchlist, addItem } = useWatchlist();
  const { movieID } = useParams();
  const [movieInfo, setMovieInfo] = useState([]);
  const [addedToWatchist, setAddedToWatchlist] = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState([]);
  const [buttonLoading, setButtonLoading] = useState();

  async function fetchMovie() {
    setLoading(true);
    const { data } = await axios.get(
      `https://omdbapi.com/?apikey=3608d43&i=${movieID}`
    );
    setMovieInfo(data);
    setAddedToWatchlist(
      watchlist.some((movie) => movie.imdbID === data.imdbID)
    );
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }

  useEffect(() => {
    fetchMovie();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setButtonLoading(false);
    }, 500);
  }, [addedToWatchist]);

  return (
    <>
      <div className="movie__info">
        <div className="container">
          <div className="row movieInfo__row">
            <div className="movieInfo__wrapper">
              {loading ? (
                <div className="movieInfo__skeleton--wrapper">
                  <div className="skeleton__img--wrapper skeleton">
                    <div className="skeleton__img skeleton"></div>
                  </div>
                  <div className="skeleton__description skeleton">
                    <div className="skeleton__description--text skeleton__description--text--primary skeleton gold__background"></div>
                    <div className="skeleton__description--text skeleton"></div>
                    <div className="skeleton__description--text skeleton description__text--little gold__background"></div>
                    <div className="skeleton__description--text skeleton description__text--little gold__background"></div>
                    <div className="skeleton__description--text skeleton"></div>
                    <div className="skeleton__description--button--wrapper">
                      <div className="skeleton__description--button skeleton"></div>
                      <div className="skeleton__description--button skeleton"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <figure className="movie__poster--wrapper">
                    <img src={movieInfo.Poster} alt=""/>
                  </figure>
                  <div className="movieInfo__description">
                    <div className="movie__description--top">
                      <h1 className="movieInfo__title">{movieInfo.Title}</h1>
                      <p className="movie__type movie__detail">
                        {movieInfo.Type}{" "}
                        {movieInfo.totalSeasons &&
                          `(${movieInfo.totalSeasons} Seasons)`}
                      </p>
                    </div>
                    <p className="movie__description--para">{movieInfo.Plot}</p>
                    <h2 className="movieInfo__rating">
                      {movieInfo.imdbRating}/10 &#60;
                    </h2>
                    <h2 className="movieInfo__year">{movieInfo.Year} &#60;</h2>
                    <p className="movie__release movie__detail">
                      <b className="movie__detail--title">&gt; Released</b>:{" "}
                      {movieInfo.Released}
                    </p>
                    <p className="movie__release movie__detail">
                      <b className="movie__detail--title">&gt; Duration</b>:{" "}
                      {movieInfo.Runtime}
                    </p>
                    {movieInfo.Director !== "N/A" && (
                      <p className="movie__director movie__detail">
                        <b className="movie__detail--title">&gt; Director</b>:{" "}
                        {movieInfo.Director}
                      </p>
                    )}
                    <p className="movie__actors movie__detail">
                      <b className="movie__detail--title">&gt; Actors</b>:{" "}
                      {movieInfo.Actors}
                    </p>
                    <p className="movie__genre movie__detail">
                      <b className="movie__detail--title">&gt; Genre</b>:{" "}
                      {movieInfo.Genre}
                    </p>
                    {buttonLoading ? (
                      <div className="spinner__container">
                        <FontAwesomeIcon icon={faSpinner} />
                      </div>
                    ) : (
                      <>
                    {addedToWatchist ? (
                      <button
                        className="btn__watchlist--add green__background"
                        onClick={() => navigate(`/watchlist`)}
                      >
                        Go to Watchlist
                      </button>
                    ) : (
                      <button
                        className="btn__watchlist--add"
                        onClick={() => {
                          addItem(movieInfo);
                          setAddedToWatchlist(!addedToWatchist);
                          setButtonLoading(true);
                        }}
                      >
                        Add to Watchlist +
                      </button>
                    )}
                      </>
                    )}
                    <button
                      className="btn__go-back"
                      onClick={() => navigate(-1)}
                    >
                      &#60;-- Back
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MovieInfo;
