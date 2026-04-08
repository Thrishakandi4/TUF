import React, { useState, useEffect } from 'react';
import '../styles/Notes.css';
import { eachDayOfInterval, format } from 'date-fns';

function Notes({ startdate, enddate }) {
  const [notes, setNotes] = useState({});
  const [currentnote, setCurrentnote] = useState('');

  useEffect(() => {
    // Load notes from localStorage when the component mounts
    try {
      const savednotes = localStorage.getItem('notes');
      if (savednotes) {
        setNotes(JSON.parse(savednotes));
      }
    } catch (error) {
      console.error("Failed to parse notes from localStorage", error);
      setNotes({}); 
    }
  }, []);

  useEffect(() => {
    // Save notes to localStorage whenever the notes state changes
    if (Object.keys(notes).length > 0) {
      localStorage.setItem('notes', JSON.stringify(notes));
    }
  }, [notes]);

  const handlenotechange = (e) => {
    setCurrentnote(e.target.value);
  };

  const handlesavenote = () => {
    if (startdate) {
      const newnotes = { ...notes };
      if (enddate && startdate !== enddate) {
        const dateRange = eachDayOfInterval({ start: startdate, end: enddate });
        dateRange.forEach(date => {
          const datekey = format(date, 'yyyy-MM-dd');
          newnotes[datekey] = currentnote;
        });
      } else {
        const datekey = format(startdate, 'yyyy-MM-dd');
        newnotes[datekey] = currentnote;
      }
      setNotes(newnotes);
    }
  };

  useEffect(() => {
    if (startdate) {
      const datekey = format(startdate, 'yyyy-MM-dd');
      setCurrentnote(notes[datekey] || '');
    } else {
      setCurrentnote('');
    }
  }, [startdate, notes]);

  return (
    <div className='notes-section'>
      <h3>Notes</h3>
      <textarea
        name='textarea'
        value={currentnote}
        placeholder='Select a date to add a note...'
        onChange={handlenotechange}
      />
      <button onClick={handlesavenote}>Save Note</button>
    </div>
  );
}

export default Notes;