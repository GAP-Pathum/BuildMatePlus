import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.render(
  <BrowserRouter basename="/BuildMate_Plus/Build_Mate_fe">
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
