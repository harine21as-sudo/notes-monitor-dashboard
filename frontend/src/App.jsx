import { useState, useEffect } from 'react';
import axios from 'axios';
import NoteForm from './components/NoteForm.jsx';
import NoteList from './components/NoteList.jsx';
import ImpactDashboard from './components/ImpactDashboard.jsx';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/notes');
      setNotes(res.data);
    } catch (err) {
      console.error("Backend connection failed.", err);
    }
  };

  const updateNote = async (id, updatedData) => {
    try {
      await axios.put(`http://localhost:5001/api/notes/${id}`, updatedData);
      fetchNotes(); 
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/notes/${id}`);
      fetchNotes();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // frontend/src/App.jsx

return (
  <div className="dashboard-layout">
    {/* Sidebar remains on the left */}
    <aside className="sidebar">
      <h2>Create Note</h2>
      <NoteForm onNoteAdded={fetchNotes} />
    </aside>
    
    <main className="main-content">
      <div className="top-section">
        <h1>My Notes</h1>
        <NoteList notes={notes} onDelete={deleteNote} onUpdate={updateNote} />
      </div>

      {/* Moved Dashboard here to take full width of main area */}
      <div className="bottom-section">
        <ImpactDashboard />
      </div>
    </main>
  </div>
);
}

export default App;