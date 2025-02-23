import React from "react";
import { FaFacebook, FaYoutube, FaInstagram, FaTwitter } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="contact">
      <h2>Contact Us</h2>
      <p><strong>Address:</strong> Foodzone, 172, Kumbeswarar North Street, Kumbakonam, Tamil Nadu, 612001</p>
      <p><strong>Mobile:</strong> 7603864202</p>
      <p><strong>Email:</strong> contact@foodzone.com</p>

      <div className="social-icons">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook size={30} color="#1877F2"/></a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube size={30} color="#FF0000" /></a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram size={30} color="#C13584" /></a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter size={30} color="#1DA1F2"  /></a>
      </div>
    </div>
  );
};

export default Contact;
