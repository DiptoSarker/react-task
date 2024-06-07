/* eslint-disable react/prop-types */
//import React from 'react'
import "./Navbar.css";
import logo from "../../assets/yui.jpeg";
import search_icon from "../../assets/search_icon.png";

function Navbar() {
  return (
    <div className="navbar">
      <img src={logo} alt="Logo" className="logo" />{" "}
      <ul className="navbar-menu">
        <li>Home</li>
        <li>Menu</li>

        <li>Mobile App</li>
        <li>Contact Us</li>
      </ul>
      <div className="navbar-right">
        <img src={search_icon} alt="search_icon" />
      </div>
    </div>
  );
}

export default Navbar;
