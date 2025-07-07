import React from "react";
import { motion } from "framer-motion";

function Header({ darkMode, toggleDarkMode }) {
  return (
    <header className={`d-flex justify-content-between align-items-center py-3 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'} border-bottom`}>
      <motion.h1
        className="mb-0 px-3 fs-3 fw-bold"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        🚀 DSA Tracker
      </motion.h1>

      <div className="d-flex align-items-center">
        <motion.span
          className="me-3 fw-semibold"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          📚 DSA Problems
        </motion.span>
        <button
          className={`btn btn-sm ${darkMode ? 'btn-warning' : 'btn-dark'} me-3`}
          onClick={toggleDarkMode}
        >
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
    </header>
  );
}

export default Header;
