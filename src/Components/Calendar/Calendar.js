import React, { Component } from 'react';
import './Calendar.css';
import '../helpers/getMonthy';
import getDates from '../helpers/getMonthy';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: []
    }
  }

  componentDidMount() {
    const dates = getDates(new Date(2019, 1, 1), new Date(2019, 1, 31));

    this.setState({
      days: dates
    })
  }

  render() {
    return (
      <div className='calendar-container'>
        <h2>date</h2>
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Silent Room</th>
              <th>Small</th>
              <th>Medium</th>
              <th>Large</th>
              <th>Event Space</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>8.00-9.00</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>9.00-10.00</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>10.00-11.00</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>11.00-12.00</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>12.00-13.00</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>14.00-15.00</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>16.00-17.00</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>18.00-19.00</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>19.00-20.00</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>20.00-21.00</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>21.00-22.00</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

}

export default Calendar;

