// src/components/Header.jsx

import React from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

function Header({ darkMode, toggleDarkMode }) {
  const location = useLocation();

  return (
    <header
      className={`d-flex flex-wrap justify-content-between align-items-center p-3 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'} border-bottom`}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000
      }}
    >
      <motion.h1
        className="mb-2 mb-sm-0 px-2 fs-5 fw-bold text-center text-sm-start w-100 w-sm-auto"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          fontSize: "clamp(1rem, 4vw, 1.5rem)",
          flex: "1"
        }}
      >
        🚀 Productivity Hub
      </motion.h1>

      <div className="d-flex flex-wrap justify-content-center align-items-center gap-2 mt-2 mt-sm-0 px-2">
        <Link
          to="/"
          className={`btn btn-sm ${location.pathname === "/" ? "btn-primary" : "btn-outline-primary"}`}
          style={{ flex: "1 1 auto", minWidth: "80px" }}
        >
          🏠 Home
        </Link>
        <Link
          to="/dsa"
          className={`btn btn-sm ${location.pathname === "/dsa" ? "btn-primary" : "btn-outline-primary"}`}
          style={{ flex: "1 1 auto", minWidth: "100px" }}
        >
          📚 DSA Tracker
        </Link>
        <button
          className={`btn btn-sm ${darkMode ? 'btn-warning' : 'btn-dark'}`}
          onClick={toggleDarkMode}
          style={{ flex: "1 1 auto", minWidth: "80px" }}
        >
          {darkMode ? "🌞 Light" : "🌙 Dark"}
        </button>
      </div>
    </header>
  );
}

export default Header;
