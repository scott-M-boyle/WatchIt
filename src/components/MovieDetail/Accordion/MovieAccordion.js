import React from 'react';
import Accordion from './Accordion';

//Accordion layout for details of movies
const MovieAccordion = (props) => {
  return <>
   <Accordion title="Runtime" content={`${props.activeMedia.runtime} minutes`}/>
   <Accordion title="Spoken Languages" content={props.activeMedia.spoken_languages}/>
   <Accordion title="Homepage" content={props.activeMedia.homepage}/>
   <Accordion title="Budget" content={props.activeMedia.budget}/>
   <Accordion title="Revenue" content={props.activeMedia.revenue}/>
 </>
}

export default MovieAccordion;
