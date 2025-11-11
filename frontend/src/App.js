import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Feed from './components/Feed';
import Navbar from './components/Navbar';
import CreatePost from './components/CreatePost';
import { setAuthToken } from './api';

function App(){
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('linkedin_user');
    const token = localStorage.getItem('linkedin_token');
    if (stored && token) {
      setUser(JSON.parse(stored));
      setAuthToken(token);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('linkedin_token');
    localStorage.removeItem('linkedin_user');
    setAuthToken(null);
    setUser(null);
  }

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Feed user={user} />} />
          <Route path="/signup" element={<Signup onAuth={u => setUser(u)} />} />
          <Route path="/login" element={<Login onAuth={u => setUser(u)} />} />
          <Route path="/create" element={user ? <CreatePost user={user} /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
