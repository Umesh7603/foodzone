import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/food/") // Fetch all food items
      .then((res) => {
        if (res.data.length > 16) {
          setFoods(getRandomUniqueItems(res.data, 16)); // Get 16 unique random items
        } else {
          setFoods(res.data); // If fewer than 16 items, show all
        }
      })
      .catch((err) => console.error("Error fetching food items:", err));
  }, []);

  // Function to get N unique random items
  const getRandomUniqueItems = (array, n) => {
    const shuffled = [...array]; // Copy array to prevent mutation
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, n);
  };

  return (
    <div className="p-8">
      <h2 className="text-4xl font-bold text-center mb-8">Trending Offers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {foods.length > 0 ? (
          foods.map((food) => (
            <div 
              key={food.id} 
              className="bg-white shadow-lg rounded-lg p-4 text-center cursor-pointer hover:scale-105 transition"
              onClick={() => navigate(`/food/${food.id}`, { state: { food } })}  // Navigate with state
            >
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-60 object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold mt-2">{food.name}</h3>
              <p className="text-gray-600 text-md font-medium">Rs. {food.price}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-4">No food items available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
