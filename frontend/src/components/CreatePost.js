import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function CreatePost({ user }) {
  const [text, setText] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      await api.post('/posts', { text });
      setText('');
      setMsg('Post created!');
      navigate('/');
    } catch (err) {
      setMsg('Failed to create post');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h3>Create Post</h3>
        <form onSubmit={handleSubmit}>
          <textarea value={text} onChange={e => setText(e.target.value)} rows={4} placeholder="What's on your mind?" />
          <button className="btn-primary" type="submit">Post</button>
        </form>
        {msg && <p>{msg}</p>}
      </div>
    </div>
  );
}
