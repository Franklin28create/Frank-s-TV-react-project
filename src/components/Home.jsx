import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Logo from "../TV__logo.jpeg";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";

const Home = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState();

  return (
    <>
      <main className="landing">
        <div className="row">
          <Nav type={`HomeNav`} />
          <hr />
          <div className="landing__description">
            <h1 className="section__title home__title">
              Welcome to Frank's <span className="gold">TV</span>!
            </h1>
            <br />
            <h2 className="section__para home__sub-title">
              North America's #1{" "}
              <span className="gold">Streaming Platform</span>
            </h2>
            <br />
            <p className="section__para home__para">
              We stream movies all over the country!{" "}
              <span className="gold">Search for one:</span>
            </p>
          </div>
          <div className="search-bar">
            <input
              type="text"
              className="search"
              placeholder="Search by Movie Title..."
              onChange={(event) => setSearch(event.target.value)}
              onKeyPress={(event) => event.key === "Enter" && navigate(`/search/${event.target.value}`)}
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              onClick={() => search && navigate(`/search/${search}`)}
            />
          </div>
          <figure className="TV__logo--wrapper">
            <img src={Logo} className="TV__logo" alt=""/>
          </figure>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
