import React, {useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import {useParams} from "react-router-dom";
import './SeeMoreSection.css';
import Layout from '../../Global/Layout/Layout';
const axios = require('axios');


let nextPage = 2;

const PopularMovies = () =>{
  const [popularMovies, setPopularMovies] = useState([])
  const [endpoint, _setEndpoint] = useState("");
  const [mediaType, setMediaType] = useState("")
  const category = useParams().section;

  //create a ref to allow eventListener to access updated state
  const endpointRef = useRef(endpoint);

  //create new setEndPoint function that updates the ref
  const setEndpoint = data => {
    endpointRef.current = data;
    _setEndpoint(data);
  }



  useEffect((props) =>{
    setCategory();
    category.includes("Movie") ? setMediaType("movie") : setMediaType("tv")
    async function fetchData(){
      const response = await axios.get(endpoint);
      setPopularMovies(response.data.results)
    }
    fetchData();
  }, [endpoint])


  useEffect(() => {
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
}
  }

  /*retrieves more data if we scroll to the bottom*/
  const handleScroll = async () => {

    const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight
    if (bottom) {
      const response = await axios.get(`${endpointRef.current}&page=${nextPage}`);
      nextPage +=1;
      setPopularMovies(popularMovies => [...popularMovies, ...response.data.results])
    }
  };

  const renderPosters = () => {
    return popularMovies.map((movie) => {
      return <div className = "section-poster" alt={movie.id}>
      <Link
        to={`/${mediaType}/${movie.id}`}
        state={{mediaType}}>
          <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} />
      </Link>
       </div>
    })
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
