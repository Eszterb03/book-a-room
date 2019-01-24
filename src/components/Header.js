import React from 'react';
import './Header.css';

export default class Header extends React.Component {
  render() {
    return (
      <nav className="navbar">
      Book-a-Room
        <div className="container">
          <button className="button">Room 1</button>
          <button className="button">Room 2</button>
          <button className="button">Room 3</button>
          <button className="button">Room 4</button>
          <button className="button">Room 5</button>
          <button className="button">Room 6</button>
        </div>
      <div>
        Sign out
      </div>
      </nav>
    )
  }
}