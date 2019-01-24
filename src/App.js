import React, { Component } from 'react';

import Calendar from './Components/Calendar/Calendar'

import './App.css';
import Header from './components/Header/Header';

class App extends Component {
  render() {
    return (
      <div className="App">

       <Calendar />

        <Header />

      </div>
    );
  }
}

export default App;
