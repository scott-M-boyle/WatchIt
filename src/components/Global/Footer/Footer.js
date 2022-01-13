import React from 'react';
import { useLocation } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const location = useLocation().pathname.split("/")[1]
  return (
    <div  className = "footer" style={{background: location === "movie" || location === "tv"  ? "rgba(100,100,105,1)" : "white"}}>
      <a target="_blank" href="https://icons8.com/icon/qdQpy48X3Rjv/star">Star</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
   </div>
  )
}

export default Footer;
