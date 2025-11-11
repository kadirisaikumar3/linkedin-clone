import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

export default function Feed({ user }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await api.get('/posts');
      setPosts(res.data);
    } catch (err) {
      console.error('Failed to fetch posts', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete post?')) return;
    try {
      await api.delete(`/posts/${id}`);
      setPosts(posts.filter(p => p._id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete');
    }
  };

  return (
    <div className="container">
      <div style={{ marginBottom: 10 }}>
        {user ? <Link to="/create"><button className="btn-primary">Create Post</button></Link> : <Link to="/login"><button>Login to post</button></Link>}
      </div>

      {posts.map(post => (
        <div key={post._id} className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <strong>{post.authorName}</strong>
              <div className="post-meta">{new Date(post.createdAt).toLocaleString()}</div>
            </div>
            {user && post.author === user.id && (
              <div>
                <button onClick={() => handleDelete(post._id)} style={{ marginLeft: 8 }}>Delete</button>
              </div>
            )}
          </div>
          <p style={{ marginTop: 10 }}>{post.text}</p>
        </div>
      ))}
    </div>
  );
}
