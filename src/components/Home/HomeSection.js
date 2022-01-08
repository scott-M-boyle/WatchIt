import React from 'react';
import { Link } from 'react-router-dom';

const HomeSection = (props) => {
  return (
      <section className = "popular-movies-section home-section">
        <div className = "section-toolbar"><h2 className = "section-header"> {props.title} </h2>
          <Link to = {`/SeeMore/${props.seeMore}`} className = "see-more-button"> See more... </Link>
        </div>
        <div className = "section-posters"> {props.renderPosters(props.data, props.type)} </div>
      </section>
  )
}

export default HomeSection;
