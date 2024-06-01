import React, { useState,useEffect } from 'react';
import './TopUsers.css'; 
import Navbar from '../../components/Navbar/Navbar';
import Bottom from '../../components/Bottom/Bottom';

const apiUrl = process.env.REACT_APP_API_URL;

const TopUsersPage = () => {
  const [topUsersWeek,setTopUsersWeek]=useState([]);
  const [topUsersToday,setTopUsersToday]=useState([]);
  const [topUsersMonth,setTopUsersMonth]=useState([]);
  const [topUsersAllTime,setTopUsersAllTime]=useState([]);
  const [activeTab, setActiveTab] = useState('today');

  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    try {

      const weekResponse = await fetch(`${apiUrl}/api/v1/mantralekhan/week`);
      const allTimeResponse = await fetch(`${apiUrl}/api/v1/mantralekhan/alltime`);
      const monthResponse = await fetch(`${apiUrl}/api/v1/mantralekhan/month`);
      const todayResponse = await fetch(`${apiUrl}/api/v1/mantralekhan/today`);

      if (!weekResponse.ok ||!allTimeResponse.ok ) {
        throw new Error('Failed to fetch data');
      }

      if(!monthResponse.ok){
        throw new Error('Failed to fetch data');
      }

      const todayJsonData = await todayResponse.json();
      const weekjsonData = await weekResponse.json();
      const monthjsonData = await monthResponse.json();
      const allTimejsonData = await allTimeResponse.json();
      
      setTopUsersWeek(weekjsonData.data);
      setTopUsersToday(todayJsonData.data);
      setTopUsersMonth(monthjsonData.data);
      setTopUsersAllTime(allTimejsonData.data);
      
    } catch (error) {
      console.error('Error Fetching Top Users Data.', error);
    }
  };

  const topUsersData = {
    today: topUsersToday,
    week: topUsersWeek,
    month: topUsersMonth,
    allTime:topUsersAllTime
  };

  function Separator({ color = "black", height = 1 }) {
    return (
      <hr
        style={{
          backgroundColor: color,
          height: height,
          border: "none"
        }}
      />
    );
  }

  const handleTabClick = tab => {
    setActiveTab(tab);
  };

  return (
    <div className='topusers-main'>
      <div>
        <Navbar></Navbar>
      </div>
    <div className='top-header'>
      <h1 >Top Users</h1>
    </div>
    <div className="top-users-page">
      
      <div className="top-users-container">
     
        <div className="top-users-content">
         
          <div className="tabs">
            <button className={activeTab === 'today' ? 'active' : ''} onClick={() => handleTabClick('today')}>Today</button>
            <button className={activeTab === 'week' ? 'active' : ''} onClick={() => handleTabClick('week')}>This Week</button>
            <button className={activeTab === 'month' ? 'active' : ''} onClick={() => handleTabClick('month')}>This Month</button>
            <button className={activeTab === 'allTime' ? 'active' : ''} onClick={() => handleTabClick('allTime')}>All Time</button>
          </div>
          <div className="top-users-list">
          <Separator color="yellow" height="1px" />
            {topUsersData[activeTab].slice(0,9).map((user, index) => (
              <div key={index} className="user-card">
                <div className="user-info">
                  <div className="serial-number">{index + 1}.</div> {/* Serial number */}
                  <div>
                 
                    <img src={user.avatar} alt="User" className="user-image" />
                  </div>
                  <div>
                    <h3 className='user-name'>{user.fullName}</h3>
                    
                    <p>Total Mantralekhan: {user.totalCount}</p>
                  </div>
                </div>
                <Separator color="yellow" height="1px" />
              </div>
              
            ))}
          </div>
          
        </div>
      </div>
      
      <div className='middle-stump'>
        <button className='button'>Start Mantralekhan</button>
      </div>
    </div>
    
     <div className='topusers-bottom'>
      <Bottom/>
     </div>
   </div>
  );
};

export default TopUsersPage;