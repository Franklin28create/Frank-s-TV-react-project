import React from "react";
import { useNavigate } from "react-router-dom";

const Nav = ({ type }) => {
  const navigate = useNavigate();

  if (type === "HomeNav") {
    return (
      <div className="nav--info">
        <div className="landing__nav">
          <ul className="landing__nav--links">
            <li className="landing__nav--link" onClick={() => navigate(`/watchlist`)}>Go to Watchlist</li>
            <li className="landing__nav--link">Contact information</li>
            <li className="landing__nav--link">Subscriptions</li>
          </ul>
        </div>
        <div className="nav__logo">
          <b className="gold nav__logo--img">FR</b>
          <span className="nav__logo--text">TV</span>
        </div>
      </div>
    );
  }
  if (type === "MoviesNav") {
    return (
      <div className="nav--info">
        <div className="nav__logo">
          <b className="gold nav__logo--img">FR</b>
          <span className="nav__logo--text">TV</span>
        </div>
        <ul className="nav__links--list">
          <li>
            <p href="#" className="nav__link link__hover-effect">
              About
            </p>
          </li>
          <li>
            <p href="#" className="nav__link link__hover-effect">
              Contact
            </p>
          </li>
          <li className="nav__link-list--primary">
            <p
              className="nav__link nav__link--primary"
              onClick={() => {
                navigate(`/watchlist`);
              }}
            >
              Watchlist
            </p>
          </li>
        </ul>
      </div>
    );
  }
};

export default Nav;
