import React, { useState, useEffect } from "react";
import DSATracker from "./Dsatracker";
import Header from "./Header";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Notes from "./Notes";

function App() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("dark-mode") === "true");

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("dark-mode", !darkMode);
    document.body.classList.toggle("bg-dark", !darkMode);
    document.body.classList.toggle("text-light", !darkMode);
  };

  useEffect(() => {
    document.body.classList.toggle("bg-dark", darkMode);
    document.body.classList.toggle("text-light", darkMode);
  }, [darkMode]);

  return (
    <>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dsa" element={<DSATracker darkMode={darkMode}/>} />
        <Route path="/notes" element={<Notes darkMode={darkMode} />} />
      </Routes>
    </>
  );
}

export default App;
