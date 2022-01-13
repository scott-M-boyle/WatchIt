import React from 'react';
import {Link} from 'react-router-dom';

import './ImageCard.css';

  const ImageCard = (props) =>{
    console.log(props)
  return <div className = "section-poster" key={props.id}>
  <Link
    to={`/${props.type}/${props.id}`}> <img src={`https://image.tmdb.org/t/p/original/${props.poster_path}`} alt={props.title} /> </Link>
      <div className = "poster-hidden">
        <h3> {props.title} </h3>
        <div className = "poster-buttons">
          <button className = "see-similar"> See similar </button>
          <button className = "see-similar"> See similar </button>
        </div>
      </div>
  </div>
}

export default ImageCard
