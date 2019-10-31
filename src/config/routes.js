/* eslint-disable react/jsx-key */
import React from 'react'
import {Route} from 'react-router-dom';
import MovieLibrary from '../pages/MovieLibrary';
import Channels from '../pages/Channels';

const routes = [
  <Route type="private" path="/" exact component={() => <Channels source="tv"/>} />,
  <Route type="private" path="/cartoon" exact component={() => <MovieLibrary source="cartoon"/>} />,
  <Route type="private" path="/movie" exact component={() => <MovieLibrary source="movie"/>} />,
  <Route type="private" path="/sport" exact component={() => <Channels source="sport"/>} />,
  <Route type="private" path="/tv" exact component={() => <Channels source="tv"/>} />
]

export default routes;
