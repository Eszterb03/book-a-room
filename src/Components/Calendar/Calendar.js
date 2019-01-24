import React, { Component } from 'react';
import './Calendar.css';
import 'react-day-picker/lib/style.css';
import '../helpers/getMonthy';
import DayPicker from 'react-day-picker';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDay: undefined,
      headers: ['Time', 'Silent', 'Small', 'Medium', 'Large', 'Event'],
      rooms: ['Silent', 'Small', 'Medium', 'Large', 'Event'],
      time: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
      bookings: [{ time: 3, user: 'davidka', room: 'Silent' },
      { time: 5, user: 'milos', room: 'Large' }
      ]
    }
    this.handleDayClick = this.handleDayClick.bind(this);
  }

  handleDayClick(day) {
    this.setState({ selectedDay: day });
  }

  render() {
    return (
      <div className='calendar-container'>
        <DayPicker onDayClick={this.handleDayClick} />
        {this.state.selectedDay ? (
          <h2>{this.state.selectedDay.toLocaleDateString()}</h2>
        ) : (
            <h2>Please select a day.</h2>
          )}
        <table>
          <thead>
            <tr>
              {this.state.headers.map(room => {
                return <th>{room}</th>
              })}
            </tr>
          </thead>
          <tbody>
            {this.state.time.map((time, rowIndex) => {
              return <tr key={rowIndex}><td>{time}</td>
                {this.state.rooms.map((room, index) => {
                  console.log(index)
                  if (this.state.bookings[1].time === rowIndex && this.state.bookings[1].room === room) {
                    return <td>{this.state.bookings[1].user}</td>
                  } else {
                    return <td>{rowIndex}</td>
                  }

                })}
              </tr>
            })}
          </tbody>
        </table>
      </div>
    )
  }

}

export default Calendar;
