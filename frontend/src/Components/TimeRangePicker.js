import React, { useState } from 'react';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

const TimeRangePicker = () => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <TimePicker
          onChange={setStartTime}
          value={startTime}
          disableClock={true}
          className="border border-gray-300 p-2 rounded-md"
          clearIcon={null}
        />
        <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm-.707 4.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L9 7.586l.293-.293z" clipRule="evenodd" />
          </svg>
        </span>
      </div>
      <span>-</span>
      <div className="relative">
        <TimePicker
          onChange={setEndTime}
          value={endTime}
          disableClock={true}
          className="border border-gray-300 p-2 rounded-md"
          clearIcon={null}
        />
        <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm-.707 4.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L9 7.586l.293-.293z" clipRule="evenodd" />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default TimeRangePicker;
