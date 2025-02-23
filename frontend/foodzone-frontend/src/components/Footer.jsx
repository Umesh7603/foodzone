import React from "react";
import { FaFacebook, FaYoutube, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-8 mt-10">
      {/* Main Footer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Left Section - Quick Links */}
        <div className="space-y-3 ps-5 ms-8">
          <h3 className="text-lg font-semibold border-b-2 border-red-500 inline-block pb-2">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-gray-400">Home</a></li>
            <li><a href="/menu" className="hover:text-gray-400">Menu</a></li>
            <li><a href="/reservations" className="hover:text-gray-400">Reservations</a></li>
          </ul>
        </div>

        {/* Center Section - Social Media */}
        <div className="space-y-3 flex flex-col items-center">
          <h3 className="text-xl font-bold border-b-2 border-red-500 inline-block pb-2">
            Follow Us
          </h3>
          <div className="flex justify-center gap-6 mt-3">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
              className="text-blue-500 text-3xl hover:text-blue-600 transition">
              <FaFacebook />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
              className="text-red-500 text-3xl hover:text-red-600 transition">
              <FaYoutube />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
              className="text-pink-500 text-3xl hover:text-pink-600 transition">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
              className="text-blue-400 text-3xl hover:text-blue-500 transition">
              <FaTwitter />
            </a>
          </div>
          {/* Additional Text Below Social Icons */}
          <h3 className="mt-4 text-black-400 text-center px-6 max-w-md">
            Stay connected with us for the latest updates, exclusive deals, and mouth-watering offers!  
            Follow us on social media and be the first to know about our special discounts and new arrivals.  
            Your favorite dishes are just a click away!
          </h3>
        </div>

        {/* Right Section - Contact Info */}
        <div className="space-y-3 text-center md:text-left ms-36">
          <h3 className="text-lg font-semibold border-b-2 border-red-500 inline-block pb-2">
            Contact Us
          </h3>
          <p>📞 +91 7603864202</p>
          <p>✉️ support@foodzone.com</p>
          <p>📍 172, Main Street, Kumbakonam, Tamilnadu, India</p>
          <h3 className="text-lg font-semibold border-b-2 border-red-500 inline-block pb-2 mt-3">
            Opening Hours
          </h3>
          <p>🕒 10:00 AM - 10:00 PM</p>
        </div>
      </div>

      {/* Horizontal Line & Copyright */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center">
        <p className="text-lg font-bold">© 2024 Foodzone. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
