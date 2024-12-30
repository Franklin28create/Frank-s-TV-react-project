import "./App.css";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Movies from "./pages/Movies";
import MovieInfo from "./pages/MovieInfo";
import Browse from "./pages/Browse";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Watchlist from "./pages/Watchlist";
import useWatchlistList from "./Hooks/useWatchlistList";

function App() {
  const [browseMovies, setBrowseMovies] = useState([]);
  const { watchlist, addItem, removeItem } = useWatchlistList();

  async function fetchChristmasMovies() {
    const { data } = await axios.get(
      `https://www.omdbapi.com/?apikey=3608d43&s=Christmas`
    );
    setBrowseMovies(data.Search.map((movie) => {
      const ids = watchlist.map((movie) => movie.imdbID);
      if (ids.includes(movie.imdbID)) {
        return { ...movie, inWatchlist: true, buttonHTML: `` };
      }
      return { ...movie, inWatchlist: false, buttonHTML: `Add to Watchlist+`};
    }))
  }


  useEffect(() => {
    fetchChristmasMovies();
  }, []);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/search/:search" element={<Movies />}></Route>
          <Route
            path="/movie/:movieID"
            exact
            element={<MovieInfo useWatchlist={useWatchlistList} addItem={addItem}/>}
          ></Route>
          <Route
            path="/browse"
            element={
              <Browse movies={browseMovies} useWatchlist={useWatchlistList} addItem={addItem}/>
            }
          />
          <Route
            path="/watchlist"
            element={
              <Watchlist useWatchlist={useWatchlistList} removeItem={removeItem}/>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
