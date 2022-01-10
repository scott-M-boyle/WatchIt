import React from 'react';
import './Home.css'
import HomeSection from './HomeSection';
import { Link } from 'react-router-dom';
import Layout from '../Global/Layout/Layout';


const axios = require('axios');


class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = { popularMovies: [], upcomingMovies: [], highestRated: [], popularSeries: [],  dataLoaded: false, }

    this.getData()
  }




 getData = async () => {

   const endpoints = [
     `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}`,
     `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`,
     `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`,
     `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
   ]

   axios.all(endpoints.map((promise) => axios.get(promise))).then(
     //destructure data.results from each endpoint
     axios.spread(({data: {results: popularMovies}}, {data: {results: upcomingMovies}},
        {data: {results: highestRated}}, {data: {results: popularSeries}}) => {
          this.setState({popularMovies, upcomingMovies, highestRated, popularSeries} , () =>{
              this.setState({dataLoaded: true})
          })
      })
    )
  }





  renderPosters(data, type) {
    return data.map((media, index) =>{
      if (index < 4) {
        return <div className = "section-poster" key={media.id}>
        <Link
          to={`/${type}/${media.id}`}
          state={{mediaType: type}}> <img src={`https://image.tmdb.org/t/p/original/${media.poster_path}`} alt={media.title} /> </Link>
            <div className = "poster-hidden">
              <h3> Like this film? </h3>
              <button className = "see-similar"> See similar </button>
            </div>
        </div>
        }
        else {
          return null;
        }
    })
  }
  render() {
    if (this.state.dataLoaded === false){
      return <div className = "loader-container">
        <div class = "loader">  </div>
      </div>
    }
    return (
      <Layout>
      <div className = "home-container">
        <div className = "home-title">
          <h1> WatchIt </h1>
          <h3> Need help finding what to watch? </h3>
        </div>
        <main className = "home-main">
          <HomeSection title ="Popular Movies" seeMore="PopularMovies "renderPosters={this.renderPosters}
          data={this.state.popularMovies} type="movie" />
          <HomeSection title ="Upcoming Movies" seeMore = "UpcomingMovies" renderPosters={this.renderPosters}
          data ={this.state.upcomingMovies} type="movie" />
          <HomeSection title ="Highest Rated Movies" seeMore="HighestRatedMovies" renderPosters={this.renderPosters}
          data ={this.state.highestRated} type="movie" />
          <HomeSection title ="Popular TV Series" seeMore="PopularTVSeries" renderPosters={this.renderPosters}
          data ={this.state.popularSeries} type="tv"/>



        </main>
       </div>
       </Layout>
    )
  }
}

export default Home;
