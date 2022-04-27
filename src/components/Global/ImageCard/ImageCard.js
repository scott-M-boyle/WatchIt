import React from 'react';
import {Link} from 'react-router-dom';

import './ImageCard.css';

  const ImageCard = (props) =>{
  return <div className = "section-poster" key={props.id}>
  <Link
    to={`/${props.type}/${props.id}`}> <img src={`https://image.tmdb.org/t/p/original/${props.poster_path}`} alt={props.title} /> </Link>
  </div>
}

export default ImageCard
