import React from 'react';
import { useLocation } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <div  className = "footer" style={{background: useLocation().pathname.split("/")[1] === "movie"  ? "rgba(100,100,105,1)" : "white"}}>
      <a target="_blank" href="https://icons8.com/icon/qdQpy48X3Rjv/star">Star</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
   </div>
  )
}

export default Footer;
