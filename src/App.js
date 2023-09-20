import React from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieList from './MovieList';
import MovieEdit from './MovieEdit';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path='/movies' exact={true} element={<MovieList/>}/>
        <Route path='/movie/:id' exact={true} element={<MovieEdit/>}/>
      </Routes>
    </Router>
  )
}

export default App;