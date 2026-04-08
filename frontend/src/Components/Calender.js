import React, { useState } from 'react';
import '../styles/Calender.css';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addMonths,
  isSameMonth,
  isToday,
  isSameDay,
  isWithinInterval,
} from 'date-fns';

function Calender({ setStartdate, setEnddate }) {
  const [currentdate, setCurrentdate]=useState(new Date());
  const [localstartdate, setLocalstartdate]=useState(null);
  const [localenddate, setLocalenddate]=useState(null);
  const [isflipping, setIsflipping]=useState(false);
  const monthstart=startOfMonth(currentdate);
  const monthend=endOfMonth(monthstart);
  const firstday=startOfWeek(monthstart);
  const lastday=endOfWeek(monthend);
  const days=eachDayOfInterval({ start: firstday, end: lastday });

  const nextmonth=() => {
    setIsflipping(true);
    setTimeout(() => {
      setCurrentdate(addMonths(currentdate, 1));
      setIsflipping(false);
    }, 300);
  };

  const prevmonth=() => {
    setIsflipping(true);
    setTimeout(() => {
      setCurrentdate(addMonths(currentdate, -1));
      setIsflipping(false);
    }, 300);
  };

  const handledateclick=(day) => {
    if (localstartdate && localenddate) {
      
      setLocalstartdate(null);
      setLocalenddate(null);
      setStartdate(null);
      setEnddate(null);
    } else if (localstartdate && !localenddate) {
      
      if (day < localstartdate) {
        setLocalstartdate(day);
        setStartdate(day);
      } else {
        setLocalenddate(day);
        setEnddate(day);
      }
    } else {
      
      setLocalstartdate(day);
      setLocalenddate(null);
      setStartdate(day);
      setEnddate(null);
    }
  };

  const getdayclassname=(day) => {
    let className='day';
    if (!isSameMonth(day, monthstart)) {
      className +=' not-in-month';
    }
    if (isToday(day)) {
      className +=' today';
    }

    if (localstartdate && localenddate && isWithinInterval(day, { start: localstartdate, end: localenddate })) {
      className +=' in-range';
    }

    if (localstartdate && isSameDay(day, localstartdate)) {
      className +=' start-date';
    }
    if (localenddate && isSameDay(day, localenddate)) {
      className +=' end-date';
    }
    
    if (localstartdate && localenddate && isSameDay(localstartdate, localenddate) && isSameDay(day, localstartdate)) {
        className +=' single-date';
    }

    return className;
  };

  return (
    <div className="calendar">
      <div className="header">
        <button onClick={prevmonth}>&lt;</button>
        <h2>{format(currentdate, 'MMMM yyyy')}</h2>
        <button onClick={nextmonth}>&gt;</button>
      </div>
      <div className="days-of-week">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      <div className={`days-grid ${isflipping ? 'flipping' : ''}`}>
        {days.map((day) => (
          <div
            key={day.toString()}
            className={getdayclassname(day)}
            onClick={() => handledateclick(day)}
          >
            {format(day, 'd')}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calender;