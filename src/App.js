import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ScrollToTop from './ScrollToTop';

import Home from './components/Home/Home';
import SeeMoreSection from './components/SeeMore/SeeMoreSection';
import MovieDetail from './components/MovieDetail/Main/MovieDetail';
import SeeSimilar from './components/SeeSimilar/SeeSimilar';

export default function App(){
  return (
    <Router>
    <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home  />} />
        <Route path="/SeeMore/:section" element = {<SeeMoreSection />} />
        <Route path="/movie/:id" element = {<MovieDetail />} />
        <Route path="/tv/:id" element = {<MovieDetail />} />
        <Route path="/similar/tv/:id" element = {<SeeSimilar />} />
        <Route path="/similar/movie/:id" element = {<SeeSimilar />} />
      </Routes>
    </Router>
  )

}
