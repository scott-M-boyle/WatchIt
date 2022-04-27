import React from 'react';
import './Home.css'
import HomeSection from './HomeSection';
import Layout from '../Global/Layout/Layout';
import Loader from '../Global/Loader/Loader';
import ImageCard from '../Global/ImageCard/ImageCard';

const axios = require('axios');


class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = { popularMovies: [], upcomingMovies: [], highestRated: [], popularSeries: [], airingTVSeries:[],  dataLoaded: false, }

    this.getData()
  }




 getData = async () => {
   const endpoints = [
     `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}`,
     `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`,
     `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`,
     `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}`,
     `https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
   ]
   axios.all(endpoints.map((promise) => axios.get(promise))).then(
     //destructure data.results from each endpoint
     axios.spread(({data: {results: popularMovies}}, {data: {results: upcomingMovies}},
        {data: {results: highestRated}}, {data: {results: popularSeries}}, {data: {results: airingTVSeries}}) => {
          this.setState({popularMovies, upcomingMovies, highestRated, popularSeries, airingTVSeries} , () =>{
              this.setState({dataLoaded: true})
          })
      })
    )
  }

  renderPosters(data, type) {
    return data.map((media, index) =>{
      if (index < 4) {
        return <ImageCard type={type} id={media.id}
        title={type==="movie" ? media.title : media.name} poster_path={media.poster_path} key={media.id} />
        }
        else {
          return null;
        }
    })
  }
  render() {
    if (this.state.dataLoaded === false){
      return <Loader />
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
          <HomeSection title ="Currently Airing TV Series" seeMore="AiringTVSeries" renderPosters={this.renderPosters}
          data ={this.state.airingTVSeries} type="tv"/>
        </main>
       </div>
       </Layout>
    )
  }
}

export default Home;
