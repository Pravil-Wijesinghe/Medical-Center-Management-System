// component to select days of the week
import React, { useState } from 'react';

// array of days of the week
const daysOfWeek = [
  { name: 'Sunday', abbr: 'Sun' },
  { name: 'Monday', abbr: 'Mon' },
  { name: 'Tuesday', abbr: 'Tue' },
  { name: 'Wednesday', abbr: 'Wed' },
  { name: 'Thursday', abbr: 'Thu' },
  { name: 'Friday', abbr: 'Fri' },
  { name: 'Saturday', abbr: 'Sat' },
];

const getDayIndex = (dayAbbr) => {
  return daysOfWeek.findIndex((day) => day.abbr === dayAbbr);
};

const formatSelectedDays = (selectedDays) => {
  if (selectedDays.length === 7) return 'Mon - Sun';

  const sortedDays = selectedDays
    .map((dayAbbr) => ({
      abbr: dayAbbr,
      index: getDayIndex(dayAbbr),
    }))
    .sort((a, b) => a.index - b.index);

  const dayAbbrs = sortedDays.map((day) => day.abbr);
  return dayAbbrs.join(', ');
};

const DaySelector = () => {
  const [selectedDays, setSelectedDays] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDay = (dayAbbr) => {
    setSelectedDays((prev) => {
      if (prev.includes(dayAbbr)) {
        return prev.filter((d) => d !== dayAbbr);
      } else {
        return [...prev, dayAbbr];
      }
    });
  };

  const isDaySelected = (dayAbbr) => selectedDays.includes(dayAbbr);

  return (
    <div className="relative w-60">
      <div
        className="border-2 bg-white text-black p-2 cursor-pointer rounded-md"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {selectedDays.length > 0
          ? formatSelectedDays(selectedDays)
          : 'Select days'}
      </div>
      {isDropdownOpen && (
        <div className="absolute bg-white text-black border-2 rounded-md mt-1 p-2 w-full z-10">
          {daysOfWeek.map((day) => (
            <div key={day.abbr} className="flex items-center">
              <input
                type="checkbox"
                checked={isDaySelected(day.abbr)}
                onChange={() => toggleDay(day.abbr)}
                className="mr-2"
              />
              <span>{day.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DaySelector;
