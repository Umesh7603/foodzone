import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Reservations from "./pages/Reservations";
import Order from "./pages/Order";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CategoryPage from "./pages/CategoryPage";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderSuccess from "./pages/OrderSuccess";
import FoodDetails from "./pages/FoodDetails";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar /> {/* Navbar at the top */}
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/food/:id" element={<FoodDetails />} />
          <Route path="/category/:id" element={<CategoryPage />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/order" element={<Order />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/order-success" element={<OrderSuccess />} />
        </Routes>

        <Footer /> {/* Footer at the bottom */}
      </div>
    </Router>
  );
};

export default App;
