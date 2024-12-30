import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Movie from "../components/Movie";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const Movies = () => {
  const { search } = useParams();
  const [movies, setMovies] = useState([]);
  const [movieSearch] = useState(search);
  const [userSearch, setUserSearch] = useState();
  const [loading, setLoading] = useState();
  const [results, setResults] = useState("");
  const [filterValue, setFilterValue] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();

  async function fetchMovies(search) {
    setLoading(true);
    const { data } = await axios.get(
      `https://www.omdbapi.com/?apikey=3608d43&s=${search || movieSearch}`
    );
    if (data.Error) {
      setLoading(false);
      return setError(data.Error);
    }
    setMovies(data.Search.slice(0, 6));
    setTimeout(() => {
      setLoading(false);
    }, 1800);
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  function renderMovies() {
    if (error) {
      return (
        <div className="error__wrapper">
          <h1 className="error__para">{error}</h1>
        </div>
      );
    }
    if (filterValue === `NEW_TO_OLD`) {
      return movies
        .slice()
        .sort(
          (a, b) =>
            b.Year.toString(``).slice(0, 4) - a.Year.toString(``).slice(0, 4)
        )
        .map((movie) => <Movie movie={movie} key={movie.imdbID} />);
    }
    if (filterValue === `OLD_TO_NEW`) {
      return movies
        .slice()
        .sort(
          (a, b) =>
            a.Year.toString(``).slice(0, 4) - b.Year.toString(``).slice(0, 4)
        )
        .map((movie) => <Movie movie={movie} key={movie.imdbID} />);
    }
    return movies.map((movie) => <Movie movie={movie} key={movie.imdbID} />);
  }

  function searchMovies(search) {
    fetchMovies(search);
    setResults(search);
    navigate(`/search/${search}`);
  }

  return (
    <>
      <nav>
        <div className="row">
          <Nav type="MoviesNav" />
          <div className="search-bar">
            <input
              type="text"
              className="search"
              placeholder="Search by Movie Title..."
              onChange={(event) => setUserSearch(event.target.value)}
              onKeyPress={(event) =>
                event.key === "Enter" && searchMovies(userSearch)
              }
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              onClick={() =>
                userSearch !== undefined && searchMovies(userSearch)
              }
            />
          </div>
        </div>
      </nav>
      <section id="movies">
        <div className="container">
          <div className="row all__movies--wrapper">
            <div className="movies--wrapper">
              {loading ? (
                <div className="loading__screen--wrapper">
                  <div className="movies__loading--spinner">
                    <span className="spinner__little"></span>
                    <span className="spinner__little"></span>
                    <span className="spinner__little"></span>
                    <span className="spinner__little"></span>
                  </div>
                </div>
              ) : (
                <>
                  {!error && (
                    <div className="movies__results">
                      <h1 className="movies__results--title">
                        Here are some results for
                        <br />"<b className="gold">{results || search}</b>"
                      </h1>
                      <select
                        id="filter"
                        defaultValue=""
                        onChange={(event) => setFilterValue(event.target.value)}
                      >
                        <option value="" disabled>
                          Filter By year
                        </option>
                        <option value="NEW_TO_OLD">New to Old</option>
                        <option value="OLD_TO_NEW">Old to New</option>
                      </select>
                    </div>
                  )}
                  {renderMovies()}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Movies;
