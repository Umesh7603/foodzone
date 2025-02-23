import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const FoodDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const food = location.state?.food;
  const [quantity, setQuantity] = useState(1);

  
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <img src={food.image} alt={food.name} className="w-96 h-96 object-cover rounded-lg shadow-lg mb-6" />
      <h2 className="text-3xl font-bold">{food.name}</h2>
      <p className="text-lg text-gray-600 mt-2">{food.description}</p>
      <p className="text-xl font-semibold mt-4">Rs. {food.price}</p>

      {/* Quantity Buttons */}
      <div className="flex items-center mt-4">
        <button
          className="px-4 py-2 bg-red-500 text-white text-lg rounded-l-lg hover:bg-red-600"
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
        >
          -
        </button>
        <span className="px-6 py-2 border border-gray-300 text-lg">{quantity}</span>
        <button
          className="px-4 py-2 bg-green-500 text-white text-lg rounded-r-lg hover:bg-green-600"
          onClick={() => setQuantity(quantity + 1)}
        >
          +
        </button>
      </div>

      {/* Order Now Button */}
      <button
        className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition"
        onClick={() => navigate("/order-confirmation", { state: { food, quantity } })}
      >
        Order Now
      </button>
    </div>
  );
};

export default FoodDetails;
