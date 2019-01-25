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
      events: []
    };
    this.triggerFormModal = this.triggerFormModal.bind(this);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }


  componentWillMount() {

    fetch('http://localhost:3001/rooms')
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data)
      });

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
    let day = selectedDay.toString();
    day = day.substring(0, day.length - 50);
    const endDate = parseInt(time) + 1;

    const obj = {
      title: room,
      allDay: false,
      start: new Date(day + time.toString() + ':00:00'),
      end: new Date(day + endDate.toString() + ':00:00')
    };

    console.log(obj);
    this.setState({
      events: [...this.state.events, obj]
    });
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
