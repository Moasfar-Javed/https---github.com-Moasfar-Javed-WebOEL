import logo from './logo.svg';
import './App.css';

import { React, useState, useEffect } from 'react';
import { Route } from "react-router-dom";
import { Routes } from './routes/index.js';
import Login from './components/login';

window.onbeforeunload = function () {
  localStorage.removeItem("data");
};

function App() {
  return (
    <div className="App">
      <div id="content" className="p-4 p-md-5">
        <Route path="/App" exact component={Login} />
        <Routes />
      </div>
    </div>
  );
}

export default App;
