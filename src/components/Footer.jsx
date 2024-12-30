import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer__info">
          <div className="row">
            <div className="nav__logo footer__logo">
              <div className="footer__logo--img">
                <a href="#" className="backToTop">
                  <b className="gold nav__logo--img">FR</b>
                  <span className="nav__logo--text">TV</span>
                </a>
              </div>
              <ul className="footer__links">
                <li className="footer__link">About</li>
                <Link to="/watchlist">
                  <li className="footer__link">Watchlist</li>
                </Link>
                <Link to="/browse">
                  <li className="footer__link footer__link--primary">
                    More Movies
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
