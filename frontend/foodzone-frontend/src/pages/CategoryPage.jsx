import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CategoryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/food/?category=${id}`)
      .then((res) => setFoodItems(res.data))
      .catch((err) => console.error("Error fetching food items:", err));
  }, [id]);

  return (
    <div className="p-8">
      <h2 className="text-4xl font-bold text-center mb-8">Food Items</h2>
      <div className="grid grid-cols-4 gap-6">
        {foodItems.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-lg rounded-lg p-4 text-center cursor-pointer"
            onClick={() => navigate(`/food/${item.id}`, { state: { food: item } })}  // Navigate with state
          >
            <img src={item.image} alt={item.name} className="w-full h-60 object-cover rounded-md" />
            <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
            <h4 className="text-gray-600">Rs.{item.price}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
