import React from 'react';
import DayPicker from 'react-day-picker';


const Modal = ({ onChange, onClick, onSubmit, handleDayClick, selectedDay }) => {

  return (
    <div className='modal-form'>
      <div className='day-selector'>

        <DayPicker onDayClick={handleDayClick} />
        {selectedDay ? (
          <h2>{selectedDay.toLocaleDateString()}</h2>
        ) : (
            <h2>Please select a day.</h2>
          )}
      </div>
      <form onSubmit={onSubmit}>
        <label>
          Select room
        <select id='room' name='room' onChange={onChange}>
            <option value="Silent Room"></option>
            <option value="Silent Room">Silent Room</option>
            <option value="S Room">S Room</option>
            <option value="M Room">M Room</option>
            <option value="L Room">L Room</option>
            <option value="Event Space">Event Space</option>
          </select>
        </label>
        <label>
          Select time between (8am - 9pm)
        <input id='time' name='time' type='number' onChange={onChange} />
        </label>
        <div className='btn-container'>
          <button className='button' type='submit'>
            OK
          </button>
          <button className='button' onClick={onClick}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Modal;