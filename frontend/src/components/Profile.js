import React, { useEffect, useState } from 'react';
import api from '../api';

export default function Profile({ user }) {
  const [data, setData] = useState({ user: null, posts: [] });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get('/user/me');
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!data.user) return <div className="container"><div className="card">Loading...</div></div>;

  return (
    <div className="container">
      <div className="card">
        <div style={{ display:'flex', alignItems:'center' }}>
          <img src={data.user.profileImage || 'https://via.placeholder.com/72'} alt="" style={{ width:72, height:72, borderRadius:8, marginRight:12 }} />
          <div>
            <h2>{data.user.name}</h2>
            <div className="small">{data.user.email}</div>
            <div className="small">Joined: {new Date(data.user.createdAt).toLocaleDateString()}</div>
            <div className="small">Total posts: {data.posts.length}</div>
          </div>
        </div>
      </div>

      <h3>Your posts</h3>
      {data.posts.map(p => (
        <div key={p._id} className="card">
          <div className="post-meta">{new Date(p.createdAt).toLocaleString()}</div>
          <p>{p.text}</p>
          {p.imageUrl && <img src={p.imageUrl} alt="" className="post-image" />}
          <div className="small">👍 {p.likes?.length || 0} · 💬 {p.comments?.length || 0}</div>
        </div>
      ))}
    </div>
  );
}