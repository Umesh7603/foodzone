import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Menu = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/categories/").then((res) => setCategories(res.data));
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-4xl font-bold text-center mb-8">Our Menu</h2>
      <div className="grid grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link to={`/category/${category.id}`} key={category.id} className="bg-white shadow-lg rounded-lg p-4 text-center">
            <img src={category.image} alt={category.name} className="w-full h-60 object-cover rounded-md" />
            <h3 className="text-lg font-semibold mt-2">{category.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Menu;
