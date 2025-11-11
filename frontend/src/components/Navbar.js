import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ user, onLogout }) {
  return (
    <div className="navbar">
      <div>
        <Link to="/" style={{ textDecoration: 'none', color: '#0a66c2', fontWeight: '700' }}>LinkedIn-Clone</Link>
      </div>
      <div>
        {user ? (
          <>
            <Link to="/profile" style={{ marginRight: 12 }}>{user.name}</Link>
            <Link to="/create" style={{ marginRight: 8 }}>Create</Link>
            <button onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ marginRight: 8 }}>Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </div>
  );
}