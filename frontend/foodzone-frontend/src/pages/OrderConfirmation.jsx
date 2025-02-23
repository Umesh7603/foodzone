import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location || {};
  const { food, quantity } = state || {};

  const [cashOnDelivery, setCashOnDelivery] = useState(false);
  const deliveryCharge = 100; // Fixed delivery charge

  useEffect(() => {
    if (!food || !quantity) {
      navigate("/"); // Redirect if accessed without an order
    }
  }, [food, quantity, navigate]);

  if (!food || !quantity) {
    return null;
  }

  const foodTotal = quantity * parseFloat(food.price);
  const finalTotal = foodTotal + deliveryCharge; // Total price including delivery charge

  const handleConfirmOrder = () => {
    const token = localStorage.getItem("authToken");
    navigate("/order-success");

    axios
      .post(
        "http://localhost:8000/api/orders/",
        {
          food_item: food.id,
          quantity: quantity,
          payment_method: cashOnDelivery ? "COD" : "Online",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        navigate("/order-success");
      })
      .catch((err) => console.error("Order failed:", err));
  };

  return (
    <div className="p-8 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6">Order Confirmation</h2>
      <div className="bg-white shadow-md rounded-lg p-6 w-96">
        <h3 className="text-xl font-semibold">{food.name}</h3>
        <img
          src={food.image}
          alt={food.name}
          className="w-43 h-60 object-cover rounded-md my-4"
        />
        <p className="text-gray-600">Rs.{food.price}</p>
        <h4 className="text-lg font-bold my-2">Subtotal: Rs.{foodTotal.toFixed(2)}</h4>
        <h4 className="text-lg font-bold text-red-500">Delivery Charge: Rs.{deliveryCharge}</h4>
        <h3 className="text-xl font-bold mt-2">Total: Rs.{finalTotal.toFixed(2)}</h3>

        {/* Cash on Delivery Checkbox */}
        <label className="flex items-center space-x-2 my-2">
          <input
            type="checkbox"
            checked={cashOnDelivery}
            onChange={() => setCashOnDelivery(!cashOnDelivery)}
          />
          <span>Cash on Delivery</span>
        </label>

        <button
          onClick={handleConfirmOrder}
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
