import React from 'react';
import { Button } from '../Button/Button'

export default class Header extends React.Component {
  render() {
    return (
      <nav className="navbar">
        Book-a-Room
        <div className="container">
          <Button name="Silent Room" />
          <Button name="Small" />
          <Button name="Medium" />
          <Button name="Large" />
          <Button name="Meeting Room" />
          <Button name="Meeting Room" />

        </div>
        <div>
          Sign out
      </div>
      </nav>
    )
  }
}