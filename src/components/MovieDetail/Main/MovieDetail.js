import React, {useState, useEffect, useRef} from 'react';
import {useParams, useLocation, Link} from "react-router-dom";

import './MovieDetail.css'
import Layout from '../../Global/Layout/Layout';
import MovieAccordion from '../Accordion/MovieAccordion';
import TVAccordion from '../Accordion/TVAccordion';
import Thumbnail from '../../Youtube/Thumbnail/Thumbnail';

import Video from '../../Youtube/Video/Video';
import {useOnClickOutside} from '../../../Utils';
const axios = require('axios');




const MovieDetail =() => {
  const id = useParams();
  const location = useLocation();



  //Returns movie or tv from url path
  const mediaType = useLocation().pathname.split("/")[1];


  const videoRef = useRef();

  useOnClickOutside(videoRef, () => {
    setDisplayVideo(false);
  })

  const [activeMedia, setActiveMedia] = useState({})
  const [displayVideo, setDisplayVideo] = useState(false);
  const [activeVideoID, setactiveVideoID] = useState(null)
  const [displayThumbnails, setDisplayThumbnails] = useState({max: null, current: [0,1,2]})

  //Retrieve and save data
  useEffect(() =>{
    async function fetchData(){
      const response = await axios.get
      (`https://api.themoviedb.org/3/${mediaType}/${id.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&append_to_response=videos`)
        setActiveMedia(response.data)
        setDisplayThumbnails({max: response.data.videos.results.length, current: [...displayThumbnails.current] })
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

    return displayThumbnails.current.map((num) => {
      return <Thumbnail video={activeMedia.videos.results[num]} handleThumbnailClick={handleThumbnailClick} key={activeMedia.videos.results[num].id} />
    })
    // return activeMedia.videos.results.map((video, index) =>{
    //   if (index >= 3){
    //     return null;
    //   }
    //     return <Thumbnail video={video} handleThumbnailClick={handleThumbnailClick} key={video.id} />
    //       //<img src="https://img.icons8.com/ios-glyphs/30/000000/play--v1.png"/>
    // })
  }


  const scrollThumbnails = (direction) => {
    if (direction === "left") {
      const newCurrent = displayThumbnails.current.map((num) =>{
        if (num === 0){
          return displayThumbnails.max-1
        }
        return num-=1;
      })
      setDisplayThumbnails(prevState =>{
        return {max: prevState.max, current: newCurrent}
      }, () =>{
      })
    }
    else {
      const newCurrent = displayThumbnails.current.map((num) => {
        if (num === displayThumbnails.max-1){
          return 0;
        }
        return num+=1;
      })
      setDisplayThumbnails(prevState =>{
        return {max: prevState.max, current: newCurrent}
      }, () =>{
        console.log(displayThumbnails)
      })

    }

  }

  const renderGenres = () =>{
    if (Object.keys(activeMedia).length > 0) {
      return activeMedia.genres.map((genre) =>{
        return <div className="genre" key={genre.id}> {genre.name} </div>
      })
    }
  }

  const renderAccordion = () =>{
    return (mediaType === "movie") ?
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
          <div className = "movieDetail-similar">
            <h4> Like this movie? </h4>
            <Link className = "movieDetail-similar-button" to=""> See Similar </Link>
          </div>
          <div className = "youtube-videos-container">
          <div className = "horizontal-scroll" onClick = {() => scrollThumbnails("left")}> <img src="https://img.icons8.com/material-outlined/24/000000/double-left.png"/> </div>
          <div className = "youtube-thumbnails">{displayThumnbails()} </div>
          <div className = "horizontal-scroll" onClick = {() => scrollThumbnails("right")}> <img src="https://img.icons8.com/ios-glyphs/30/000000/double-right--v2.png"/> </div>
          </div>
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
