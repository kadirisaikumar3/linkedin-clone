import React, { useState } from 'react';
import api, { setAuthToken } from '../api';
import { useNavigate } from 'react-router-dom';

export default function Signup({ onAuth }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      const res = await api.post('/auth/signup', form);
      localStorage.setItem('linkedin_token', res.data.token);
      localStorage.setItem('linkedin_user', JSON.stringify(res.data.user));
      setAuthToken(res.data.token);
      onAuth(res.data.user);
      navigate('/');
    } catch (error) {
      setErr(error.response?.data?.message || 'Signup failed');
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input name="name" value={form.name} onChange={handleChange} required />
          <label>Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} required />
          <label>Password</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} required />
          <button type="submit" className="btn-primary">Sign up</button>
          {err && <p style={{ color: 'red' }}>{err}</p>}
        </form>
      </div>
    </div>
  );
}
