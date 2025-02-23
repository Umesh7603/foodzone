import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const updateAuthStatus = () => {
    const authStatus = localStorage.getItem("isAuthenticated");
    const storedUsername = localStorage.getItem("username");

    if (authStatus === "true" && storedUsername) {
      setIsAuthenticated(true);
      setUsername(storedUsername);
    } else {
      setIsAuthenticated(false);
      setUsername("");
    }
  };

  useEffect(() => {
    updateAuthStatus(); // Run on initial load

    // Listen for authentication status changes (triggered from login/logout)
    window.addEventListener("authChange", updateAuthStatus);

    // Cleanup event listener when component unmounts
    return () => window.removeEventListener("authChange", updateAuthStatus);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");

    // Notify other components that the user has logged out
    window.dispatchEvent(new Event("authChange"));

    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-900 text-white shadow-lg">
  <h1 className="text-2xl font-bold">Foodzone</h1>
  <div className="flex items-center gap-4">  {/* Fix applied here */}
    <Link to="/" className="hover:bg-red-600 px-3 py-2 rounded-md">
      Home
    </Link>
    <Link to="/menu" className="hover:bg-red-600 px-3 py-2 rounded-md">
      Menu
    </Link>
    <Link to="/reservations" className="hover:bg-red-600 px-3 py-2 rounded-md">
      Reservations
    </Link>

    {isAuthenticated ? (
      <div className="flex items-center gap-4">  {/* Fix applied here */}
        <span className="font-bold text-green-400">{username}</span>
        <button
          onClick={handleLogout}
          className="hover:bg-red-600 px-3 py-2 rounded-md"
        >
          Logout
        </button>
      </div>
    ) : (
      <div className="flex items-center gap-4">  {/* Fix applied here */}
        <Link to="/signup" className="hover:bg-green-600 px-3 py-2 rounded-md">
          Sign Up
        </Link>
        <Link to="/login" className="hover:bg-blue-600 px-3 py-2 rounded-md">
          Login
        </Link>
      </div>
    )}
  </div>
</nav>

  );
};

export default Navbar;
