import React from 'react';
import './WeeklyCalendar.css';

const WeeklyCalendar = ({ selectedDate, onDateSelect }) => {
  const getWeekDays = () => {
    const today = new Date();
    const days = [];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - today.getDay() + i);
      days.push(date);
    }
    
    return days;
  };

  const formatDayName = (date) => {
    const options = { weekday: 'short' };
    return date.toLocaleDateString('es-ES', options);
  };

  const formatDayNumber = (date) => {
    return date.getDate();
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date) => {
    return selectedDate.toDateString() === date.toDateString();
  };

  const getDayStatus = (date) => {
    // Simular diferentes estados de los días
    const random = Math.random();
    if (random > 0.7) return 'completed';
    if (random > 0.4) return 'planned';
    return 'empty';
  };

  const weekDays = getWeekDays();

  return (
    <div className="weekly-calendar">
      <h3 className="calendar-title">📅 Esta Semana</h3>
      <div className="calendar-grid">
        {weekDays.map((date, index) => {
          const status = getDayStatus(date);
          const isTodayDate = isToday(date);
          const isSelectedDate = isSelected(date);
          
          return (
            <button
              key={index}
              className={`calendar-day ${status} ${isTodayDate ? 'today' : ''} ${isSelectedDate ? 'selected' : ''}`}
              onClick={() => onDateSelect(date)}
            >
              <span className="day-name">{formatDayName(date)}</span>
              <span className="day-number">{formatDayNumber(date)}</span>
              {status === 'completed' && <span className="status-icon">✅</span>}
              {status === 'planned' && <span className="status-icon">📋</span>}
              {isTodayDate && <span className="today-indicator">Hoy</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyCalendar; 