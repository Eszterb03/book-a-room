import React from 'react';
import { Button } from '../Button/Button'

export default class Header extends React.Component {
  render() {
    return (
      <nav className="navbar">
        <span className='navbar-element'>Book-a-Room</span>
        <div className="container">
          <Button name="Silent Room" />
          <Button name="Small" />
          <Button name="Medium" />
          <Button name="Large" />
          <Button name="Meeting Room" />
          <Button name="Meeting Room" />

        </div>
        <div>
          <span className='navbar-element'>Sign out</span>
        </div>
      </nav>
    )
  }
}