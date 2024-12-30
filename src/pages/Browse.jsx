import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import React, { useReducer, useEffect, useState } from "react";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

const Browse = ({ movies, useWatchlist }) => {
  const { watchlist, addItem } = useWatchlist();
  const [loading, setLoading] = useState(true);
  const [browseMovies] = useState(
    movies.map((movie) => {
      const ids = watchlist.map((movie) => movie.imdbID);
      if (ids.includes(movie.imdbID)) {
        return { ...movie, inWatchlist: true };
      }
      return { ...movie, inWatchlist: false };
    })
  );
  const navigate = useNavigate();

  const reducer = (state, action) => {
    switch (action.type) {
      case `UPDATE_MOVIE`:
        return state.map((movie) =>
          movie.imdbID === action.payload.id
            ? { ...movie, inWatchlist: action.payload.inWatchlist }
            : movie
        );
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, browseMovies);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  let arrayToMap = state.length > 0 ? state : movies;

  const handleClick = (movie) => {
    dispatch({
      type: `UPDATE_MOVIE`,
      payload: { id: movie.imdbID, inWatchlist: true },
    });
  };

  return (
    <>
      <div className="browse">
        <div className="container browse-movies__container">
          <div className="row">
            <Nav type="MoviesNav" />
            <hr className="browse__line-break" />
            <div className="browse-movies__top">
              <h1 className="browse-movies__title">Movies for the Holidays!</h1>
              <div className="separator">
                <div className="search--wrapper">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="magnifying-glass"
                  onClick={() => navigate(`/`)}
                />
                <span className="go-back__title">Back To Search</span>
                </div>
              </div>
            </div>
            <div className="browse-movies__bottom">
              <div className="movies__wrapper">
                {loading
                  ? new Array(10).fill(0).map((_, i) => (
                      <div className="film" key={i}>
                        <div className="skeleton__img--wrapper skeleton">
                          <div className="skeleton__img skeleton"></div>
                        </div>
                        <div className="skeleton__description skeleton">
                          <div className="skeleton__description--text skeleton skeleton__description--text--primary"></div>
                          <div className="skeleton__description--text skeleton"></div>
                          <div className="skeleton__description--text skeleton"></div>
                          <div className="skeleton__description--button skeleton"></div>
                        </div>
                      </div>
                    ))
                  : arrayToMap.map((movie, _, array) => (
                      <div className="film" key={movie.imdbID}>
                        <figure
                          className="movie__poster--wrapper"
                        >
                          <img src={movie.Poster} className="film__poster" alt=""/>
                          <FontAwesomeIcon icon={faPlay} onClick={() => navigate(`/movie/${movie.imdbID}`)}/>
                        </figure>
                        <div className="film__info">
                          <h1 className="film__title link__hover-effect">
                            {movie.Title}
                            {array.Title}
                          </h1>
                          <p className="film__type">{movie.Type}</p>
                          <p className="film__year">{movie.Year}</p>
                          {arrayToMap === movies ? (
                            <button
                              className="btn__watchlist--add"
                              onClick={() => {
                                if (
                                  !watchlist.some((item) => {
                                    return item.imdbID === movie.imdbID;
                                  })
                                ) {
                                  addItem(movie);
                                }
                                movie.buttonHTML = `Added To Watchlist✔`;
                              }}
                            >
                              {movie.buttonHTML}
                            </button>
                          ) : (
                            <>
                              {movie.inWatchlist ? (
                                <h1 className="section__title">
                                  Added To Watchlist{" "}
                                  <span className="green">✔</span>
                                </h1>
                              ) : (
                                <button
                                  className="btn__watchlist--add"
                                  onClick={() => {
                                    addItem(movie);
                                    handleClick(movie);
                                  }}
                                >
                                  Add To Watchlist+
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Browse;
