import React, { useState } from 'react';
import Notes from '../Components/Notes';
import Calender from '../Components/Calender';
import Image from '../Components/Image';
import '../styles/page.css';

function MainPage() {
  const [startdate, setStartdate]=useState(null);
  const [enddate, setEnddate]=useState(null);

  return (
    <div className="main-page-container">
      <Image />
      <div className='bottom-part'>
        <Notes startdate={startdate} enddate={enddate} />
        <Calender setStartdate={setStartdate} setEnddate={setEnddate} />
      </div>
    </div>
  );
}

export default MainPage;