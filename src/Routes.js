import React, { Component } from 'react';
import { BrowserRouter as Route } from "react-router-dom";
import App from './App.js';
import Home from './Home.js';

//React-router routes for having pages at different endpoints
const Routes = props => {
  return
  (
    <div>
      <Route exact path = '/' component={App}/>
      <Route path='/home' component={Home}/>
    </div>
  );
}

export default Routes;
