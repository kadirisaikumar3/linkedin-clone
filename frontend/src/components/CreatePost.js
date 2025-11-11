import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function CreatePost({ user }) {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    if (!text.trim()) return setMsg('Please write something');
    try {
      const formData = new FormData();
      formData.append('text', text);
      if (file) formData.append('image', file);

      await api.post('/posts', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setText('');
      setFile(null);
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
          <div className="form-row">
            <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
            <button className="btn-primary" type="submit">Post</button>
          </div>
        </form>
        {msg && <p>{msg}</p>}
      </div>
    </div>
  );
}