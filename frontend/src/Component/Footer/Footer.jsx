/* eslint-disable no-unused-vars */
import React from "react";
import "./Footer.css";

import logo from "../../assets/yui.jpeg";
import fb from "../../assets/facebook_icon.png";
import twitter from "../../assets/twitter_icon.png";
import linkdin from "../../assets/linkedin_icon.png";

function Footer() {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={logo} alt="" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
            voluptatum quaerat minima voluptatem, maiores commodi culpa
            mollitia? Sapiente numquam facilis molestiae, doloribus voluptatum
            sequi quidem obcaecati minus, eos, dolorem corporis!
          </p>
          <div className="footer-social-icon">
            <img src={fb} alt="" />
            <img src={twitter} alt="" />
            <img src={linkdin} alt="" />
          </div>
        </div>

        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+880-1784-138319</li>
            <li>contact@cardeal.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 @ Cardeal.com - All Right Reserved.
      </p>
    </div>
  );
}

export default Footer;
