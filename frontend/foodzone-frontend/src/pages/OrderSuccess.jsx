import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-purple-600">
      <motion.div
        className="bg-white shadow-lg rounded-xl p-8 text-center w-96"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Success Icon */}
        <motion.div
          className="text-green-500 text-6xl mb-4"
          initial={{ rotate: -180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          ✅
        </motion.div>

        {/* Success Message */}
        <h2 className="text-3xl font-bold text-gray-800">Order Placed Successfully!</h2>
        <p className="text-gray-600 mt-2">
          Thank you for ordering from <span className="text-blue-500 font-semibold">Foodzone</span>. Our delivery agent will contact you soon.
        </p>

        {/* Estimated Time */}
        <div className="mt-4 text-gray-700">
          <p>Estimated Delivery Time:</p>
          <p className="text-lg font-semibold text-red-500">30 - 45 minutes</p>
        </div>

        {/* Back to Home Button */}
        <button
          onClick={() => navigate("/")}
          className="mt-3 block text-gray-600 hover:text-gray-800 underline"
        >
          Back to Home
        </button>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
