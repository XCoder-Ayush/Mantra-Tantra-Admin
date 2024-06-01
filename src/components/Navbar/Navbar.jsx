import React, { useState,useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { HamburgetMenuClose, HamburgetMenuOpen } from "../Icons";

const apiUrl = process.env.REACT_APP_API_URL;

function Navbar() {
  const [userData, setUserData] = useState(null);
  const [click, setClick] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        axios.defaults.withCredentials = true;
        let response = await axios(`${apiUrl}/api/v1/admin/login/success`, {
          method: 'GET',
          withCredentials: true
        })
        setUserData(response.data.data);

      } catch (error) {
        console.error("Error Fetching User Data ", error);
      }
    };
    getUserData();
  }, []);

  
  const logout = async () => {
    
    try {
      await axios.get(`${apiUrl}/api/v1/admin/logout`, {
        withCredentials: true,
      });
      setUserData(null);
      window.location.href = "/login";
    } catch (error) {
      console.error("Error Logging Out, Please Refresh.", error);
    }

  };
  
  const handleClick = () => setClick(!click);

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink  to="/" className="nav-logo" exact="true">
            <span className="mb-4">Swaminarayan Mantralekhan</span>
          </NavLink>
          
          <ul className={click ? "nav-menu active" : "nav-menu"}>
          {userData?(
              <>
          <li 
            exact="true"
            className="nav-item"
            >
              Jay Swaminarayan 
            </li>
           
        
            <li className="nav-item">
              <NavLink
                to="/topusers"
                activeclassname="active"
                className="nav-links"
                onClick={handleClick}
                exact="true"
              >
                Top Users
              </NavLink>
            </li>
            
            <li className="nav-item">
              <NavLink
                to="/"
                activeclassname="active"
                className="nav-links"
                onClick={handleClick}
                exact="true"
              >
                Dashboard
              </NavLink>
            </li>
           
            
            <li className="nav-item">
              <NavLink
                to="/logout"
                activeclassname="active"
                className="nav-links"
                onClick={logout}
                exact="true"
              >
                Log Out
              </NavLink>
            </li>
            </>
           ) :(
           <>
            <li 
            exact="true"
            className="nav-links"
            >
              Welcome Admin
            </li>
           
          
            <li  className="nav-item">
              <NavLink
                to="/login"
                activeclassname="active"
                className="nav-links"
                onClick={handleClick}
                exact="true"
              >
                Log In
              </NavLink>
            </li>
           </>
           )
           
}
          </ul>
        

          <div className="nav-icon" onClick={handleClick}>
            {/* <i className={click ? "fas fa-times" : "fas fa-bars"}></i> */}
            {click ? (
              <span className="icon">
                 <HamburgetMenuClose />
              </span>
            ) : (
              <span className="icon">
                <HamburgetMenuOpen />{" "}
              </span>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar