// src/pages/Notes.jsx

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { FaSearch, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import Modal from "react-modal";

const TAG_COLORS = [
  { name: "Work", color: "#007bff" },
  { name: "Personal", color: "#28a745" },
  { name: "Urgent", color: "#dc3545" },
  { name: "Idea", color: "#ffc107" },
];

Modal.setAppElement("#root");

function Notes({ darkMode }) {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes-data");
    return saved ? JSON.parse(saved) : [];
  });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTag, setSelectedTag] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchApplied, setSearchApplied] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalNote, setModalNote] = useState(null);
  const [modalEdit, setModalEdit] = useState(false);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("notes-data", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const addNote = () => {
    if (title.trim() === "" && content.trim() === "") return;
    const newNote = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
      date: selectedDate.toISOString(),
      tag: selectedTag
    };
    setNotes([newNote, ...notes]);
    setTitle("");
    setContent("");
    setSelectedDate(new Date());
    setSelectedTag("");
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
    closeModal();
  };

  const openModal = (note) => {
    setModalNote(note);
    setModalEdit(false);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalNote(null);
    setModalEdit(false);
  };

  const saveModalEdit = () => {
    setNotes(notes.map(note =>
      note.id === modalNote.id ? modalNote : note
    ));
    setModalEdit(false);
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(notes));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "notes-data.json");
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
        setNotes(imported);
      } catch {
        alert("Invalid JSON file.");
      }
    };
    reader.readAsText(file);
  };

  const filteredNotes = notes.filter(note =>
    (note.title && note.title.toLowerCase().includes(searchApplied.toLowerCase())) ||
    (note.content && note.content.toLowerCase().includes(searchApplied.toLowerCase())) ||
    (note.tag && note.tag.toLowerCase().includes(searchApplied.toLowerCase()))
  );

  const applySearch = () => {
    setSearchApplied(searchQuery);
  };

  return (
    <div
      className="container py-5"
      style={{
        minHeight: "100vh",
        backgroundColor: darkMode ? "#121212" : "#f9f4e7",
        color: darkMode ? "#f9f4e7" : "#1e1b18",
        transition: "background-color 0.4s, color 0.4s",
        fontFamily: "'Segoe UI', sans-serif"
      }}
    >
      <motion.h2 className="text-center mb-2 fw-bold"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        📝 Your Notes
      </motion.h2>

      <motion.p className="text-center mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Create, search, and view notes in a clean modal view.
      </motion.p>

      {/* Search */}
      <div className="mb-4 d-flex justify-content-center align-items-center gap-2">
        <input
          type="text"
          className="form-control shadow-sm rounded-pill px-4 py-2"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && applySearch()}
          style={{
            maxWidth: "400px",
            backgroundColor: darkMode ? "#1f1f1f" : "#ffffff",
            color: darkMode ? "#f9f4e7" : "#1e1b18",
            border: "none"
          }}
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center"
          style={{ width: "40px", height: "40px" }}
          onClick={applySearch}
        >
          <FaSearch />
        </motion.button>
      </div>

      {/* Note Creation */}
      <div className="mb-4 d-flex flex-column align-items-center gap-3">
        <input
          type="text"
          ref={inputRef}
          className="form-control shadow-sm rounded-pill px-4 py-2"
          placeholder="Note Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            maxWidth: "400px",
            backgroundColor: darkMode ? "#1f1f1f" : "#ffffff",
            color: darkMode ? "#f9f4e7" : "#1e1b18",
            border: "none"
          }}
        />
        <textarea
          className="form-control shadow-sm rounded px-4 py-2"
          placeholder="Note Content..."
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{
            maxWidth: "400px",
            backgroundColor: darkMode ? "#1f1f1f" : "#ffffff",
            color: darkMode ? "#f9f4e7" : "#1e1b18",
            border: "none",
            resize: "none"
          }}
        />
        <div className="d-flex gap-2 align-items-center flex-wrap justify-content-center">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="form-control shadow-sm rounded-pill px-3 py-2"
          />
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="form-select shadow-sm rounded-pill px-3 py-2"
            style={{
              maxWidth: "150px",
              backgroundColor: darkMode ? "#1f1f1f" : "#ffffff",
              color: darkMode ? "#f9f4e7" : "#1e1b18"
            }}
          >
            <option value="">No Tag</option>
            {TAG_COLORS.map(tag => (
              <option key={tag.name} value={tag.name}>{tag.name}</option>
            ))}
          </select>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary rounded-pill px-4 py-2 shadow-sm"
            onClick={addNote}
          >
            Add Note
          </motion.button>
        </div>
      </div>

      {/* Export / Import */}
      <div className="mb-4 text-center">
        <button className="btn btn-outline-secondary btn-sm mx-2" onClick={handleExport}>💾 Export</button>
        <button className="btn btn-outline-secondary btn-sm mx-2" onClick={() => fileInputRef.current.click()}>📂 Import</button>
        <input type="file" accept=".json" ref={fileInputRef} style={{ display: "none" }} onChange={handleImport} />
      </div>

      {/* Notes */}
      {filteredNotes.length === 0 ? (
        <p className="text-center">No notes found. Add or search notes.</p>
      ) : (
        <div className="d-flex flex-wrap justify-content-center gap-3">
          {filteredNotes.map(note => {
            const tagColor = TAG_COLORS.find(t => t.name === note.tag)?.color || "#6c757d";
            return (
              <motion.div
                key={note.id}
                whileHover={{ scale: 1.02 }}
                className="shadow rounded p-3"
                onClick={() => openModal(note)}
                style={{
                  background: darkMode ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.9)",
                  border: `2px solid ${tagColor}`,
                  cursor: "pointer",
                  maxWidth: "300px",
                  minWidth: "250px",
                  wordWrap: "break-word",
                }}
              >
                <h5 className="fw-bold mb-1">{note.title}</h5>
                <p className="mb-1" style={{ whiteSpace: "pre-wrap" }}>{note.content.slice(0, 100)}...</p>
                <div className="small" style={{ color: tagColor }}>🏷️ {note.tag}</div>
                <div className="small">📅 {format(new Date(note.date), "dd MMM yyyy")}</div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Modal for view/edit */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            background: darkMode ? "#1e1e1e" : "#ffffff",
            color: darkMode ? "#f9f4e7" : "#1e1b18",
            maxWidth: "600px",
            margin: "auto",
            borderRadius: "12px",
            padding: "20px",
          }
        }}
      >
        {modalNote && (
          <>
            {modalEdit ? (
              <>
                <input
                  type="text"
                  className="form-control mb-2"
                  value={modalNote.title}
                  onChange={(e) => setModalNote({ ...modalNote, title: e.target.value })}
                />
                <textarea
                  className="form-control mb-2"
                  rows={6}
                  value={modalNote.content}
                  onChange={(e) => setModalNote({ ...modalNote, content: e.target.value })}
                />
                <div className="d-flex justify-content-end gap-2">
                  <button className="btn btn-success" onClick={saveModalEdit}><FaSave /> Save</button>
                  <button className="btn btn-secondary" onClick={() => setModalEdit(false)}><FaTimes /> Cancel</button>
                </div>
              </>
            ) : (
              <>
                <h4>{modalNote.title}</h4>
                <p style={{ whiteSpace: "pre-wrap" }}>{modalNote.content}</p>
                <div className="small" style={{ color: TAG_COLORS.find(t => t.name === modalNote.tag)?.color || "#6c757d" }}>
                  🏷️ {modalNote.tag}
                </div>
                <div className="small">📅 {format(new Date(modalNote.date), "dd MMM yyyy")}</div>
                <div className="d-flex justify-content-end gap-2 mt-3">
                  <button className="btn btn-primary" onClick={() => setModalEdit(true)}><FaEdit /> Edit</button>
                  <button className="btn btn-danger" onClick={() => deleteNote(modalNote.id)}><FaTimes /> Delete</button>
                </div>
              </>
            )}
          </>
        )}
      </Modal>
    </div>
  );
}

export default Notes;
