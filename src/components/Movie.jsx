import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Movie = ({ movie }) => {
  const navigate = useNavigate();
  function movieInfoRef() {
    navigate(`/movie/${movie.imdbID}`)
  }
  return (
    <div className="movie">
      <div className="movie__description">
        <h1 className="movie__title">{movie.Title}</h1>
        <p className="movie__year">{movie.Year}</p>
      </div>
      <div className="movie__img--wrapper">
        <img
          src={
            movie.Poster !== ("N/A" || `Not Found`)
              ? movie.Poster
              : `https://static.wikia.nocookie.net/ideas/images/6/66/FoxAndroidTM2%27s_No_Poster.jpg/revision/latest?cb=20230213155127`
          }
          className="movie__img"
          alt=""
        />
        <div className="movie__CTA--para">WATCH NOW</div>
        <FontAwesomeIcon icon={faPlay} onClick={() => movieInfoRef()}/>
      </div>
    </div>
  );
};

export default Movie;
