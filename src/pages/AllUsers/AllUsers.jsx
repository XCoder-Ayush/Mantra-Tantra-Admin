
import React, { useState,useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './AllUsers.css';
import Bottom from '../../components/Bottom/Bottom';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const AllUsers = () => {
    const[userData,setUserData]=useState(null);
    const [usersData,setUsersData]=useState([]);

    useEffect(() => {

      const getUserData = async () => {
        try {
          axios.defaults.withCredentials = true;
          let response = await axios(`${apiUrl}/admin/login/success`, {
            method: 'GET',
            withCredentials: true
          })

          setUserData(response.data.data);
          getUsersData();

        } catch (error) {
          console.log("Error Fetching User Data.", error);
          window.location.href = "/login";
        }
      };
  
      
      const getUsersData = async () => {
        try {
          const response = await fetch(`${apiUrl}/admin/users`, {
            method: 'GET',
            credentials: 'include'
          });
          const data = await response.json();

          // console.log(response);
          setUsersData(data.data);

          if (!response.ok) {
            throw new Error('Network Response Was Not Okay.');
          }

          // console.log(data);
         
        } catch (error) {
          console.log("Error fetching user data:", error);
        }
      };
      getUserData();
    }, []);

  return (
    <div className='allusers-main'>
      <div>
        <Navbar/>
      </div>
      <div className='table-container'>
        <table>
          <caption>All Users</caption>
          <thead>
            <tr>
              <th>Email</th>
              <th>Full Name</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Mantra Counted</th>
              <th>Last Active</th>
            </tr>
          </thead>
          <tbody>
            {
              usersData.map((user,index)=>{
                return <tr key={index}>
                  <td>{user.email}</td>
                  <td>{user.fullName}</td>
                  <td>{user.address}</td>
                  <td>{user.phone}</td>
                  <td>{user.mantraChanted}</td>
                  <td>{user.updatedAt}</td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
      <div>
        <Bottom/>
      </div>
    </div>
  )
}

export default AllUsers