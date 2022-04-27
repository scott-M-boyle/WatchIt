import React, {useState, useEffect, useRef} from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

import Layout from '../Global/Layout/Layout';
import Loader from '../Global/Loader/Loader';
import ImageCard from '../Global/ImageCard/ImageCard';

const axios = require('axios');



const SeeSimilar = (props) =>{

  const [titles, setTitles] = useState([])

  const location = useLocation();
  const id = useParams().id;


  const mediaType = useLocation().pathname.split("/")[2];

  useEffect(() =>{
    async function fetchData(){
      const response = await axios.get(
        `https://api.themoviedb.org/3/${mediaType}/${id}/similar?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`);
      setTitles(response.data.results);


    }
    fetchData();
  }, [])

  const renderPosters = () => {
    return titles.map((movie) => {
      return  <ImageCard type={mediaType} id={movie.id} poster_path={movie.poster_path}
      title={ mediaType === "movie" ? movie.title : movie.name} key={movie.id} />
    })
  }

    return (
      <Layout>
        <div className = "SeeMoreSection">
          <h1> {} </h1>
          <section  className = "SeeMoreSection-posters"> {renderPosters()} </section>
        </div>
        </Layout>
    )
}

export default SeeSimilar;
