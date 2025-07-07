// src/components/Header.jsx

import React from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

function Header({ darkMode, toggleDarkMode }) {
  const location = useLocation();

  return (
    <header className={`d-flex justify-content-between align-items-center py-3 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'} border-bottom`}>
      <motion.h1
        className="mb-0 px-3 fs-4 fw-bold"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        🚀 Productivity Hub
      </motion.h1>

      <div className="d-flex align-items-center">
        <Link
          to="/"
          className={`btn btn-sm ${location.pathname === "/" ? "btn-primary" : "btn-outline-primary"} me-2`}
        >
          🏠 Home
        </Link>
        <Link
          to="/dsa"
          className={`btn btn-sm ${location.pathname === "/dsa" ? "btn-primary" : "btn-outline-primary"} me-3`}
        >
          📚 DSA Tracker
        </Link>
        <button
          className={`btn btn-sm ${darkMode ? 'btn-warning' : 'btn-dark'}`}
          onClick={toggleDarkMode}
        >
          {darkMode ? "🌞 Light" : "🌙 Dark"}
        </button>
      </div>
    </header>
  );
}

export default Header;
