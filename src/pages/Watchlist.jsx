import React from "react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import NoMovieImg from "../no movies.jpeg";

const Watchlist = ({ useWatchlist }) => {
  const { watchlist, removeItem } = useWatchlist();
  
  const navigate = useNavigate();
  return (
    <>
      <div className="watchlist">
        <div className="container">
          <div className="row">
            <div className="watchlist__top">
              <button
                className="btn__go-back"
                onClick={() => navigate(-1)}
              >
                &#60;-- Go back
              </button>
              <h1 className="watchlist__title">Watchlist</h1>
              {watchlist.length > 0 ? (
                <ul className="movie__list">
                  {watchlist.map((movie, index) => (
                    <li className="watchlist__movie" key={index}>
                      <div className="watchlist-item__details">
                        <figure className="watchlist-item__img--wrapper">
                          <img src={movie.Poster} alt=""/>
                        </figure>
                        <div className="watchlist-item-description">
                          <h1 className="watchlist-item__title">
                            {movie.Title}
                          </h1>
                          <p className="watchlist-item__year">{movie.Year}</p>
                          <p className="watchlist-item__type">
                            {movie.Type.toUpperCase()}
                          </p>
                        </div>
                      </div>
                      <button
                        className="btn__watchlist--remove"
                        onClick={() => removeItem(index)}
                      >
                        Remove from Watchlist
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="no-watchlist--wrapper">
                  <h1 className="no-watchlist__title section__title">
                    No movies or shows added to watchlist
                  </h1>
                  <figure className="no-watchlist__img--wrapper">
                    <img src={NoMovieImg} className="no-watchlist__img" alt=""/>
                    <button
                      className="btn__no-watchlist"
                      onClick={() => navigate(`/browse`)}
                    >
                      Browse Movies
                    </button>
                  </figure>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Watchlist;
