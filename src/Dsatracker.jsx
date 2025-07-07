// src/pages/DSATracker.jsx

import React, { useEffect, useRef, useState } from 'react';
import { motion } from "framer-motion";
import { supabase } from "./supabaseClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { data } from './data/dsaProblem';
import { useDebounce } from 'use-debounce'; 
import './parchment-table.css'; 
const badgeColor = (difficulty) => {
  switch (difficulty) {
    case "Easy":
      return "badge bg-success";
    case "Medium":
      return "badge bg-warning text-dark";
    case "Hard":
      return "badge bg-danger";
    default:
      return "badge bg-secondary";
  }
};

function DSATracker({darkMode}) {
  const [selectedSection, setSelectedSection] = useState("Arrays");
  const [progress, setProgress] = useState({});
  const [user, setUser] = useState(null);
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [debouncedProgress] = useDebounce(progress, 1500);

useEffect(() => {
  if (user) {
    saveProgress();
  }
}, [debouncedProgress]);
  

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      if (session?.user) fetchProgress(session.user.id);
      else loadLocal();
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchProgress(session.user.id);
      else loadLocal();
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const loadLocal = () => {
    const saved = JSON.parse(localStorage.getItem("dsa-progress") || "{}");
    setProgress(saved);
  };

  const fetchProgress = async (user_id) => {
    const { data: existing } = await supabase
      .from("progress")
      .select("*")
      .eq("user_id", user_id)
      .single();
    if (existing) {
      setProgress(existing.data);
      localStorage.setItem("dsa-progress", JSON.stringify(existing.data));
    } else {
      setProgress({});
    }
  };

  const saveProgress = async () => {
    if (!user) {
      toast.error("Login to save online.");
      return;
    }
    const { data: existing } = await supabase
      .from("progress")
      .select("*")
      .eq("user_id", user.id)
      .single();
    if (existing) {
      await supabase.from("progress").update({ data: progress }).eq("user_id", user.id);
    } else {
      await supabase.from("progress").insert({ user_id: user.id, data: progress });
    }
    toast.success("Progress saved online!");
  };

  const handleCheckboxChange = (section, idx) => {
    const updated = { ...progress, [`${section}-${idx}`]: !progress[`${section}-${idx}`] };
    setProgress(updated);
    localStorage.setItem("dsa-progress", JSON.stringify(updated));
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(progress));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "dsa-progress.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        setProgress(imported);
        localStorage.setItem("dsa-progress", JSON.stringify(imported));
        toast.success("Progress imported!");
      } catch {
        toast.error("Invalid JSON file.");
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset progress?")) {
      setProgress({});
      localStorage.removeItem("dsa-progress");
      toast.info("Progress reset.");
    }
  };

  const signInWithEmail = async () => {
    const email = prompt("Enter your email for login/signup:");
    if (!email) return;
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) {
        toast.error("Error sending login link.");
      } else {
        setShowModal(true);
        toast.success("Login link sent! Check your email.");
      }
    } catch {
      toast.error("Unexpected error during login.");
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    loadLocal();
    toast.info("Logged out.");
  };

  const sectionTotal = data[selectedSection].length;
  const sectionCompleted = data[selectedSection].filter((_, idx) => progress[`${selectedSection}-${idx}`]).length;
  const sectionProgress = ((sectionCompleted / sectionTotal) * 100).toFixed(0);

  const allKeys = Object.keys(data).flatMap(section => data[section].map((_, idx) => `${section}-${idx}`));
  const allCompleted = allKeys.filter(key => progress[key]).length;
  const allProgress = ((allCompleted / allKeys.length) * 100).toFixed(0);

  return (
    <div className={`container py-4 position-relative`}>
      <ToastContainer position="top-center" autoClose={3000} />
  
      {/* Progress Bars */}
      <div className="mb-4 text-center">
        <motion.p
          className="fw-semibold mb-3"
          style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)" }}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          📊 Overall Progress: {allCompleted}/{allKeys.length} ({allProgress}%)
        </motion.p>
        <div
          className="position-relative shadow rounded-pill mx-auto"
          style={{
            height: "20px",
            backgroundColor: "#e0e0e0",
            overflow: "hidden",
            maxWidth: "90%",
          }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${allProgress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              background: "linear-gradient(90deg, rgb(254,96,79) 0%, rgb(254,97,0) 100%)",
              height: "100%",
              borderRadius: "50px",
            }}
          />
          <div
            className="position-absolute top-50 start-50 translate-middle fw-bold"
            style={{ fontSize: "0.85rem" }}
          >
            {allProgress}%
          </div>
        </div>
      </div>
  
      {/* Auth Buttons */}
      <div className="text-center mb-3 d-flex flex-wrap justify-content-center gap-2">
        {user ? (
          <>
            <span className="me-2">👋 {user.email}</span>
            <button className="btn btn-sm btn-danger" onClick={signOut}>
              Logout
            </button>
          </>
        ) : (
          <button
            className="btn btn-sm btn-success"
            onClick={signInWithEmail}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Sending...
              </>
            ) : (
              "Login / Signup"
            )}
          </button>
        )}
      </div>
  
      {/* Modal */}
      {showModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Check Your Email</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                A login link has been sent to your email. Click it to complete login.
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setShowModal(false)}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
  
      {/* Save / Reset Controls */}
      <div className="text-center mb-4 d-flex flex-wrap justify-content-center gap-2">
        <button className="btn btn-outline-primary btn-sm" onClick={saveProgress}>
          ☁️ Save Online
        </button>
        <button className="btn btn-outline-danger btn-sm" onClick={handleReset}>
          🔄 Reset
        </button>
        <button className="btn btn-outline-secondary btn-sm" onClick={handleExport}>
          💾 Export
        </button>
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={() => inputRef.current.click()}
        >
          📂 Import
        </button>
        <input
          type="file"
          accept=".json"
          ref={inputRef}
          style={{ display: "none" }}
          onChange={handleImport}
        />
      </div>
  
      {/* Section Selector */}
      <div className="text-center mb-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <label className="fw-bold d-block mb-2">
            📂 Select Section
          </label>
          <div className="dropdown d-inline-block">
            <button
              className="btn btn-outline-primary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
            >
              {selectedSection}
            </button>
            <ul className="dropdown-menu shadow">
              {Object.keys(data).map((section) => (
                <li key={section}>
                  <button
                    className={`dropdown-item ${section === selectedSection ? "active fw-bold" : ""}`}
                    onClick={() => setSelectedSection(section)}
                  >
                    {section}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
  
      {/* Problems Table */}
      <div className="table-responsive">
        <motion.table
          key={selectedSection}
          className={`table table-striped table-bordered align-middle ${darkMode ? "table-dark" : "parchment-table"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <thead className={darkMode ? "table-dark" : ""}>
            <tr>
              <th>✅</th>
              <th>📝 Problem</th>
              <th>🏢 Company</th>
              <th>🔗 Link</th>
              <th>💡 Intuition</th>
              <th>⭐ Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {data[selectedSection].map((problem, idx) => (
              <motion.tr key={idx} whileHover={{ scale: 1.01 }}>
                <td>
                  <input
                    type="checkbox"
                    checked={progress[`${selectedSection}-${idx}`] || false}
                    onChange={() => handleCheckboxChange(selectedSection, idx)}
                  />
                </td>
                <td>{problem.name}</td>
                <td>{problem.company}</td>
                <td>
                  <a
                    href={problem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-outline-primary"
                  >
                    LeetCode
                  </a>
                </td>
                <td>{problem.intuition}</td>
                <td>
                  <motion.span whileHover={{ scale: 1.1 }} className={badgeColor(problem.difficulty)}>
                    {problem.difficulty}
                  </motion.span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      </div>
    </div>
  );
  
}

export default DSATracker;
