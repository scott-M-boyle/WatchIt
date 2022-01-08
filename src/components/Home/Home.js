import React from 'react';
import './Home.css'
import HomeSection from './HomeSection';
import { Link } from 'react-router-dom';
import Layout from '../Global/Layout/Layout';


const axios = require('axios');


class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = { popularMovies: [], popularSeries: [], upcoming: [], highestRated: []}

    this.getData()
  }




 getData = () => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
      .then(res => {
          this.setState({popularMovies: res.data.results} ,() =>{
            this.state.popularMovies.forEach((movie) =>{
            })
          })
      })

    axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`)
    .then(res =>{
      this.setState({upcoming: res.data.results})
    })
    axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`)
    .then(res => {
      this.setState({highestRated: res.data.results})
    })
    axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
    .then(res => {
      this.setState({popularSeries: res.data.results})
    })

  }





  renderPosters(data, type) {
    return data.map((media, index) =>{

      if (index < 4) {
        return <div className = "section-poster" key={media.id}>
        <Link
          to={`/${type}/${media.id}`}
          state={{mediaType: type}}> <img src={`https://image.tmdb.org/t/p/original/${media.poster_path}`} alt={media.title} /> </Link>
            <div className = "poster-hidden">
              <h3 style={{color: "white"}}> Like this film? </h3>
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
          data ={this.state.upcoming} type="movie" />
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
