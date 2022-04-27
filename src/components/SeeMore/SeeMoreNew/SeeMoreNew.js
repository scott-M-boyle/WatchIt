import React, {useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import {useParams} from "react-router-dom";

import './SeeMoreSection.css';
import Layout from '../Global/Layout/Layout';
import Loader from '../Global/Loader/Loader';
import ImageCard from '../Global/ImageCard/ImageCard';

const axios = require('axios');


let nextPage = 2;

const PopularMovies = () =>{

  const [dataLoaded, setDataLoaded] = useState(false);
  const [popularMovies, setPopularMovies] = useState([]);
  const [endpoint, _setEndpoint] = useState("");
  const [mediaType, setMediaType] = useState("")
  const category = useParams().section;




  useEffect((props) =>{
    console.log(props.match.params)
    setCategory();
    category.includes("Movie") ? setMediaType("movie") : setMediaType("tv")
    async function fetchData(){
      const response = await axios.get(endpoint);
      setPopularMovies(response.data.results);
      setDataLoaded(true);
    }
    fetchData();
  }, [endpoint])


  //Sets the endpoint based on route;
  function setCategory() {
    switch(category) {
  case "PopularMovies":
      setEndpoint(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`);
    break;
  case "UpcomingMovies":
    setEndpoint(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`);
    break;
  case "HighestRatedMovies":
    setEndpoint(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`);
    break;
  case "PopularTVSeries":
    setEndpoint(`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
    break;
  case "AiringTVSeries":
    setEndpoint(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
    break;
}
  }


  if (dataLoaded === false) {
    return <Loader />
  }
  return (
    <Layout>
      <div className = "SeeMoreSection">
        <h1> {category} </h1>
        <section  className = "SeeMoreSection-posters"> {renderPosters()} </section>
      </div>
      </Layout>
  )
}

export default PopularMovies;
