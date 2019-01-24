import React, { Component } from 'react';
import Header from './components/Header/Header';
import ModalForm from './components/ModalForm';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formModalOn: false,
      selectedDay: undefined,
      events: [
        {
          title: 'ROOM L',
          allDay: false,
          start: new Date('Thu Jan 24 2019 20:00:00'),
          end: new Date('Febr 24, 2019 21:00:00')
        },
        {
          title: 'Silent Room',
          allDay: false,
          start: new Date(
            'Fri Jan 18 2019 12:00:00 GMT+0100 (Central European Standard Time)'
          ),
          end: new Date('January 26, 2019 11:00:00')
        }
      ]
    };
    this.triggerFormModal = this.triggerFormModal.bind(this);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  triggerFormModal() {
    this.setState({
      formModalOn: !this.state.formModalOn
    });
  }

  handleDayClick(day) {
    this.setState({ selectedDay: day });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.id;
    this.setState({ [name]: value });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    let { time, room, selectedDay } = this.state;

    const obj = {
      title: room,
      allDay: false,
      start: selectedDay.toString(),
      end: selectedDay.toString()
    };

    console.log(selectedDay.toString());
    this.triggerFormModal();
  }

  render() {
    const localizer = BigCalendar.momentLocalizer(moment);
    return (
      <div className='App'>
        {this.state.formModalOn && (
          <ModalForm
            selectedDay={this.state.selectedDay}
            handleDayClick={this.handleDayClick}
            onSubmit={this.handleFormSubmit}
            onClick={this.triggerFormModal}
            onChange={this.handleChange}
          />
        )}

        <Header />
        <div className='big-calendar-container'>
          <BigCalendar
            events={this.state.events}
            localizer={localizer}
            step={30}
            defaultView='week'
            views={['month', 'week', 'day']}
            defaultDate={new Date()}
          />
        </div>
        <button className='button' onClick={this.triggerFormModal}>
          New Reservation
        </button>
      </div>
    );
  }
}

export default App;
