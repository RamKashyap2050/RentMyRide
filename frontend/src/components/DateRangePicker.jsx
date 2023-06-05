import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateRangePicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
console.log(startDate, endDate)
  return (
    <div>
      <div style={{display:'inline-block'}}>
      <label htmlFor="startDate">Start:</label>
      <DatePicker
        id="startDate"
        selected={startDate}
        onChange={date => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
      />
      </div>
      <div style={{display:"inline-block"}}>
      <label htmlFor="endDate">End:</label>
      <DatePicker
        id="endDate"
        selected={endDate}
        onChange={date => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
      />
      </div>  
    </div>
  );
};

export default DateRangePicker;
