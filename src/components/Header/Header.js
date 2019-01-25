import React from 'react';
import { Button } from '../Button/Button'

export default class Header extends React.Component {
  render() {
    return (
      <nav className="navbar">
        <span className='navbar-element'><i className="icofont-fox"></i>Book-a-Room</span>
        <div className="container">
          <Button name="Silent Room" />
          <Button name="S Room" />
          <Button name="M Room" />
          <Button name="L Room" />
          <Button name="Meeting Room" />
        </div>
        <div>
          <span className='navbar-element'>Sign out</span>
        </div>
      </nav>
    )
  }
}