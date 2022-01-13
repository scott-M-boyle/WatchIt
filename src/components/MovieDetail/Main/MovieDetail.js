import React, {useState, useEffect, useRef} from 'react';
import {useParams, useLocation} from "react-router-dom";

import './MovieDetail.css'
import Layout from '../../Global/Layout/Layout';
import MovieAccordion from '../Accordion/MovieAccordion';
import TVAccordion from '../Accordion/TVAccordion';

import Video from '../../Youtube/video/Video';
import {useOnClickOutside} from '../../../Utils';
const axios = require('axios');




const MovieDetail =() => {
  const id = useParams();
  const location = useLocation();

  const videoRef = useRef();

  useOnClickOutside(videoRef, () => {
    setDisplayVideo(false);
  })

  const [activeMedia, setActiveMedia] = useState({})
  const [displayVideo, setDisplayVideo] = useState(false);
  const [activeVideoID, setactiveVideoID] = useState(null)

  useEffect(() =>{
    async function fetchData(){
      const response = await axios.get
      (`https://api.themoviedb.org/3/${location.state.mediaType}/${id.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&append_to_response=videos`)
        setActiveMedia(response.data);
        console.log(response.data)
    }
    fetchData();
  }, [])

  //Disables scroll when video modal is open
  useEffect(() => {
    const body = document.querySelector('body');
    body.style.overflow = displayVideo ? 'hidden' : 'auto';
  }, [displayVideo])

  //Allow scroll when we leave component with modal still open
  useEffect(() =>{
  	 		 return () =>{
   	  		 const body = document.querySelector('body');
   	 		  body.style.overflow = "auto";
   	 		}
  			}, [])




  const handleThumbnailClick = (key) => {
    setDisplayVideo(true);
    setactiveVideoID(key);
  }




  const displayThumnbails = () => {
    if (activeMedia.videos === undefined) {
      return
    }
    return activeMedia.videos.results.map((movie, index) =>{
      if (index >= 3){
        return null;
      }
        return <div className = "thumbnail">
        <img src={`https://img.youtube.com/vi/${movie.key}/0.jpg`} alt={movie.name} onClick={() => handleThumbnailClick(movie.key)}  />
          <div className = "play-video">
            <img src="https://img.icons8.com/flat-round/50/000000/play--v1.png" alt="play"/> <
          /div>
          </div>
          //<img src="https://img.icons8.com/ios-glyphs/30/000000/play--v1.png"/>
    })
  }

  const renderGenres = () =>{
    if (Object.keys(activeMedia).length > 0) {
      return activeMedia.genres.map((genre) =>{
        return <div className="genre"> {genre.name} </div>
      })
    }
  }

  const renderAccordion = () =>{
    return (location.state.mediaType === "movie") ?
     <MovieAccordion activeMedia = {activeMedia}/>
    :
      <TVAccordion activeMedia = {activeMedia}/>
  }

  return (
    <Layout>
      <div className = "movie-detail">
        <h2> {activeMedia.title} </h2>
        <div className = "title-details"> <p> {activeMedia.release_date}</p>
        <div className = "rating-container">
          <p className = "vote-rating">
            <img src="https://img.icons8.com/emoji/48/000000/star-emoji.png" alt="star" />{activeMedia.vote_average}/10
          </p>
          <p className = "vote-count"> {activeMedia.vote_count} </p>
        </div>
      </div>
        <div className = "movie-detail-box">
          <img className = "main-poster" src={`https://image.tmdb.org/t/p/original/${activeMedia.poster_path}`} alt={activeMedia.title} />
          <div className = "youtube-thumbnails">{displayThumnbails()} </div>
          <div className = "genres-container">
            {renderGenres()}
          </div>
          <div className = "movie-detail-section">
            <h3> {activeMedia.overview} </h3>
          </div>
          <div className = "accordion">
            {renderAccordion()}
          </div>

          { (displayVideo) ? <div ref={videoRef} ><Video videoKey={activeVideoID}/> </div> : null }
        </div>

      </div>
    </Layout>
  )
}

export default MovieDetail
