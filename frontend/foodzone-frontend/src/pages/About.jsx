import React from "react";

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-3xl text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">About Foodzone</h2>
        <p className="text-lg text-gray-600 mb-4">
          Foodzone started in <span className="font-semibold text-red-500">2024</span> with a mission to serve 
          delicious and high-quality food. Our restaurant is committed to providing an 
          excellent dining experience with a variety of dishes that cater to every taste. 
          Whether you're craving traditional flavors or contemporary cuisine, Foodzone is the place to be!
        </p>
        <p className="text-lg text-gray-600">
          We take pride in our fresh ingredients, skilled chefs, and warm ambiance. Our goal 
          is to bring people together through food, offering both dine-in and online ordering services.
        </p>
      </div>
    </div>
  );
};

export default About;
