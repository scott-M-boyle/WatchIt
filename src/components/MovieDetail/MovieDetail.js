import React, {useState, useEffect} from 'react';
import {useParams, useLocation} from "react-router-dom";

import './MovieDetail.css';
import Layout from '../Global/Layout/Layout';
import Accordion from './Accordion/Accordion';
import Video from '../Youtube/video/Video';
const axios = require('axios');




const MovieDetail =() => {
  const id = useParams();
  const location = useLocation();

  const [activeMovie, setActiveMovie] = useState({})
  const [displayVideo, setDisplayVideo] = useState(false);
  const [activeVideoID, setactiveVideoID] = useState(null)

  useEffect(() =>{
    async function fetchData(){
      const response = await axios.get
      (`https://api.themoviedb.org/3/${location.state.mediaType}/${id.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&append_to_response=videos`)
        setActiveMovie(response.data);
    }
    fetchData();
  }, [])

  //Disables scroll when video modal is open
  useEffect(() => {
    const body = document.querySelector('body');
    body.style.overflow = displayVideo ? 'hidden' : 'auto';
  }, [displayVideo])

  const handleThumbnailClick = (key) => {
    setDisplayVideo(true);
    setactiveVideoID(key);
  }

  const displayThumnbails = () => {
    if (activeMovie.videos === undefined) {
      return
    }
    return activeMovie.videos.results.map((movie, index) =>{
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
    if (Object.keys(activeMovie).length > 0) {
      return activeMovie.genres.map((genre) =>{
        return <div className="genre"> {genre.name} </div>
      })
    }
  }

  return (
    <Layout>
      <div className = "movie-detail">
        <h2> {activeMovie.title} </h2>
        <div className = "title-details"> <p> {activeMovie.release_date}</p>
        <div className = "rating-container">
          <p className = "vote-rating">
            <img src="https://img.icons8.com/emoji/48/000000/star-emoji.png" alt="star" />{activeMovie.vote_average}/10
          </p>
          <p className = "vote-count"> {activeMovie.vote_count} </p>
        </div>
      </div>
        <div className = "movie-detail-box">
          <img className = "main-poster" src={`https://image.tmdb.org/t/p/original/${activeMovie.poster_path}`} alt={activeMovie.title} />
          <div className = "youtube-thumbnails">{displayThumnbails()} </div>
          <div className = "genres-container">
            {renderGenres()}
          </div>
          <div className = "movie-detail-section">
            <h3> {activeMovie.overview} </h3>
          </div>
          <div className = "accordion">
            <Accordion title="Runtime" content={`${activeMovie.runtime} minutes`}/>
            <Accordion title="Spoken Languages" content={activeMovie.spoken_languages}/>
            <Accordion title="Homepage" content={activeMovie.homepage}/>
          </div>
          <Video videoKey={activeVideoID} open={displayVideo}/>
        </div>

      </div>
    </Layout>
  )
}

export default MovieDetail
