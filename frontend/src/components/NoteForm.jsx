import { useState } from 'react';
import axios from 'axios';

const NoteForm = ({ onNoteAdded }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/notes', { title, content });
      setTitle('');
      setContent('');
      onNoteAdded();
    } catch (err) {
      console.error("Error creating note", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" required />
      <button type="submit">Save Note</button>
    </form>
  );
};

export default NoteForm;