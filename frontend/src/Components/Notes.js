import React, { useState, useEffect } from 'react';
import '../styles/Notes.css';

function Notes({ startdate, enddate }) {
  const [notes, setNotes]=useState({});
  const [currentnote, setCurrentnote]=useState('');

  useEffect(() => {
    const savednotes=localStorage.getItem('notes');
    if (savednotes) {
      setNotes(JSON.parse(savednotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handlenotechange=(e) => {
    setCurrentnote(e.target.value);
  };

  const handlesavenote=() => {
    if (startdate) {
      const datekey=startdate.toISOString().split('T')[0];
      const newnotes={ ...notes, [datekey]: currentnote };
      setNotes(newnotes);
    }
  };

  useEffect(() => {
    if (startdate) {
      const datekey=startdate.toISOString().split('T')[0];
      setCurrentnote(notes[datekey] || '');
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