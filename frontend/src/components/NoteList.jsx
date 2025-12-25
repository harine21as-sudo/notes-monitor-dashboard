import React, { useState } from 'react';

const NoteList = ({ notes, onDelete, onUpdate }) => {
  // State to track which note is being edited
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  // Function to enter Edit Mode
  const startEdit = (note) => {
    setEditId(note._id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  // Function to save the updated note
  const saveEdit = (id) => {
    onUpdate(id, { title: editTitle, content: editContent });
    setEditId(null); // Exit Edit Mode
  };

  return (
    <div className="note-grid">
      {notes.length === 0 ? (
        <p>No notes available. Start creating some!</p>
      ) : (
        notes.map((note, index) => (
          <div 
            key={note._id} 
            /* Cycles through pastel-0 to pastel-5 based on index */
            className={`note-card pastel-${index % 6}`}
          >
            {editId === note._id ? (
              /* --- EDIT MODE UI --- */
              <div className="edit-mode">
                <input 
                  type="text"
                  value={editTitle} 
                  onChange={(e) => setEditTitle(e.target.value)} 
                  placeholder="Edit Title"
                />
                <textarea 
                  value={editContent} 
                  onChange={(e) => setEditContent(e.target.value)} 
                  placeholder="Edit Content"
                />
                <div className="card-actions">
                  <button className="save-btn" onClick={() => saveEdit(note._id)}>
                    Save
                  </button>
                  <button onClick={() => setEditId(null)}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              /* --- DISPLAY MODE UI --- */
              <>
                <div className="note-content">
                  <h3>{note.title}</h3>
                  <p>{note.content}</p>
                </div>
                <div className="card-actions">
                  <button className="edit-btn" onClick={() => startEdit(note)}>
                    Edit
                  </button>
                  <button className="delete-btn" onClick={() => onDelete(note._id)}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default NoteList;