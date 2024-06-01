import React, { useState,useEffect } from 'react';
import './Bottom.css';

const apiUrl = process.env.REACT_APP_API_URL;

const Bottom = () => {
  
  const[userCount,setUserCount]=useState(0);
  const[mantraCount,setMantraCount]=useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/user/count`);
        if (!response.ok) {
          throw new Error('Network Response Was Not Okay.');
        }

        const data = await response.json();
        setUserCount(data.data.count);
      } catch (error) {
        console.error('Error Fetching User Count :', error);
      }

      try {
        const response = await fetch(`${apiUrl}/mantralekhan/count`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMantraCount(data.data.count);
      } catch (error) {
        console.error('Error Fetching Mantra Count:', error);
      }
    };

    fetchData();
  }, []);
  
  return (
      <div className="bottom-parent">
       <div className='bottom-child1'>
        <p className='bottom-text'>Total <span>{mantraCount}</span> Mantralekhan
        By <span>{userCount}</span> Registered Users On This Site And Counting ...</p>
       </div>
      </div>
  );
};

export default Bottom;
