// src/pages/Notes.jsx

import React, { useState, useEffect } from "react";

function Notes({ darkMode }) {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes-data");
    return saved ? JSON.parse(saved) : [];
  });
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    localStorage.setItem("notes-data", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (newNote.trim() === "") return;
    setNotes([{ text: newNote.trim(), id: Date.now() }, ...notes]);
    setNewNote("");
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className={`container py-4 ${darkMode ? "bg-dark text-light" : ""}`}>
      <h2 className="text-center mb-4">📝 Your Notes</h2>

      <div className="mb-3 d-flex">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Type your note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addNote()}
        />
        <button className="btn btn-primary" onClick={addNote}>Add</button>
      </div>

      {notes.length === 0 ? (
        <p className="text-center">No notes yet. Start adding!</p>
      ) : (
        <ul className="list-group">
          {notes.map(note => (
            <li
              key={note.id}
              className={`list-group-item d-flex justify-content-between align-items-center ${darkMode ? "bg-secondary text-light" : ""}`}
            >
              <span>{note.text}</span>
              <button className="btn btn-sm btn-danger" onClick={() => deleteNote(note.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Notes;
