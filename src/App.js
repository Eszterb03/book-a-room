import React, { Component } from 'react';
import Calendar from './components/Calendar/Calendar'
import Header from './components/Header/Header';
import ModalForm from './components/ModalForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formModalOn: false,
      selectedDay: undefined
    }
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
      time,
      room,
      selectedDay
    };

    console.log(obj)

    // this.triggerFormModal();
  }

  render() {
    return (
      <div className="App">

        {this.state.formModalOn ? (
          <ModalForm
            selectedDay={this.state.selectedDay}
            handleDayClick={this.handleDayClick}
            onSubmit={this.handleFormSubmit}
            onClick={this.triggerFormModal}
            onChange={this.handleChange}
          />
        ) : null}

        <Header />
        <Calendar />
        <button className='button' onClick={this.triggerFormModal}>
          New Reservation
          </button>

      </div>
    );
  }
}

export default App;
