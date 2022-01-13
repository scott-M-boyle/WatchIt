import React from 'react';
import Accordion from './Accordion';

//Accordion layout for details of TV series
const MovieAccordion = (props) => {
  return <>
  <Accordion title="Number of seasons" content={props.activeMedia.number_of_seasons}/>
  <Accordion title="Number of episodes" content={props.activeMedia.number_of_episodes}/>
  <Accordion title="First air date" content={props.activeMedia.first_air_date}/>
  <Accordion title="Last air date" content={props.activeMedia.last_air_date}/>
 </>
}

export default MovieAccordion;
