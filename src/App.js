import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from './components/Home/Home';
import SeeMoreSection from './components/SeeMore/SeeMoreSection';
import MovieDetail from './components/MovieDetail/Main/MovieDetail';

export default function App(){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home  />} />
        <Route path="/SeeMore/:section" element = {<SeeMoreSection />} />
        <Route path="/movie/:id" element = {<MovieDetail />} />
        <Route path="/tv/:id" element = {<MovieDetail />} />
      </Routes>
    </Router>
  )

}
