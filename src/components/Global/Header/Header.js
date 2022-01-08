import React from 'react';
import './Header.css';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  return (
    <div className = "header" style={{background: useLocation().pathname.split("/")[1] === "movie" ? "rgba(100,100,105,1)" : "white"}}>
      <Link to ="/"> home </Link>
      <Link to = "/SeeMore/PopularMovies"> movies </Link>
      <Link to = "/SeeMore/PopularTVSeries"> tv shows </Link>
      </div>
  )
}

export default Header;
