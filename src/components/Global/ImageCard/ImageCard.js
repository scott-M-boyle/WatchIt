import React from 'react';
import {Link} from 'react-router-dom';

  const ImageCard = (props) =>{
  return <div className = "section-poster" key={props.id}>
  <Link
    to={`/${props.type}/${props.id}`}
    state={{mediaType: props.type}}> <img src={`https://image.tmdb.org/t/p/original/${props.poster_path}`} alt={props.title} /> </Link>
      <div className = "poster-hidden">
        <h3> Like this film? </h3>
        <button className = "see-similar"> See similar </button>
      </div>
  </div>
}

export default ImageCard
