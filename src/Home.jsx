// src/pages/Home.jsx

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaCode, FaLaptopCode, FaBrain, FaTasks } from "react-icons/fa";
import { supabase } from "./supabaseClient";

function Home() {
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndProgress = async () => {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);

      if (session?.user) {
        const { data: existing } = await supabase
          .from("progress")
          .select("*")
          .eq("user_id", session.user.id)
          .single();

        if (existing && existing.data) {
          setProgress(existing.data);
        }
      }
      setLoading(false);
    };

    fetchUserAndProgress();
  }, []);

  const allKeys = Object.keys(progress);
  const completedKeys = allKeys.filter(key => progress[key]);
  const percent = allKeys.length > 0
    ? ((completedKeys.length / allKeys.length) * 100).toFixed(0)
    : 0;

  return (
    <div
      className="min-vh-100 d-flex flex-column justify-content-center align-items-center text-center px-3"
      style={{
        backgroundColor: "#f9f4e7",
        fontFamily: "'Old English Text MT', 'UnifrakturCook', serif",
        color: "#1e1b18"
      }}
    >
      <motion.h1
        className="fw-bold mb-4 display-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        🚀 Welcome to Your Productivity Hub
      </motion.h1>

      <motion.p
        className="lead mb-4 px-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{ maxWidth: "500px" }}
      >
        Track your progress, stay organized, and become consistent in your coding journey.
      </motion.p>

      {/* Animated DSA Icons */}
      <div className="d-flex justify-content-center flex-wrap gap-4 mb-4">
        {[FaCode, FaLaptopCode, FaBrain, FaTasks].map((Icon, idx) => (
          <motion.div
            key={idx}
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 + idx * 0.3, ease: "easeInOut" }}
            className="display-4 text-primary"
          >
            <Icon />
          </motion.div>
        ))}
      </div>

      {/* Call to Action Buttons */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="d-flex justify-content-center gap-3 flex-wrap"
      >
        <Link
          to="/dsa"
          className="btn btn-dark btn-lg shadow px-4 py-2"
          style={{ fontFamily: "'Old English Text MT', 'UnifrakturCook', serif" }}
        >
          🚀 Go to DSA Tracker
        </Link>
        <Link
          to="/notes"
          className="btn btn-outline-dark btn-lg shadow px-4 py-2"
          style={{ fontFamily: "'Old English Text MT', 'UnifrakturCook', serif" }}
        >
          📝 Open Notes
        </Link>
      </motion.div>

      {/* Motivational Tagline */}
      <motion.p
        className="mt-4 fw-semibold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        ⚡ Consistency + Tracking = Growth 🚀
      </motion.p>
    </div>
  );
}

export default Home;
