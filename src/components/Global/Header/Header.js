import React from 'react';
import './Header.css';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {

  //Will return "tv" or movie if we are on a movieDetail route
  const location = useLocation().pathname.split("/")[1]
  return (
    <div className = "header" style={{background: location === "movie" || location === "tv"   ? "rgba(100,100,105,1)" : "white"}}>
      <Link to ="/"> home </Link>
      <Link to = "/SeeMore/PopularMovies"> movies </Link>
      <Link to = "/SeeMore/PopularTVSeries"> tv shows </Link>
      </div>
  )
}

export default Header;
