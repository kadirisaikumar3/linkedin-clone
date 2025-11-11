import React, { useEffect, useState } from 'react';
import api from '../api';

export default function Feed({ user }) {
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState({});
  const [editing, setEditing] = useState({}); // {postId: text}

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await api.get('/posts');
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete post?')) return;
    try {
      await api.delete(`/posts/${id}`);
      setPosts(posts.filter(p => p._id !== id));
    } catch (err) {
      alert('Delete failed');
    }
  };

  const toggleLike = async id => {
    try {
      const res = await api.post(`/posts/${id}/like`);
      setPosts(posts.map(p => p._id === id ? { ...p, likes: Array(res.data.likes).fill(null).map((_,i)=>i) } : p));
      // simpler: refetch
      fetchPosts();
    } catch (err) { console.error(err); }
  };

  const addComment = async (id) => {
    if (!commentText[id] || !commentText[id].trim()) return;
    try {
      await api.post(`/posts/${id}/comment`, { text: commentText[id] });
      setCommentText({ ...commentText, [id]: '' });
      fetchPosts();
    } catch (err) { console.error(err); }
  };

  const startEdit = (post) => {
    setEditing({ [post._id]: post.text });
  };

  const saveEdit = async (id) => {
    try {
      await api.put(`/posts/${id}`, { text: editing[id] });
      setEditing({});
      fetchPosts();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="container">
      <div style={{ marginBottom: 10 }}>
        {/* optional create link is in navbar */}
      </div>

      {posts.map(post => (
        <div key={post._id} className="card">
          <div className="flex-between">
            <div style={{ display:'flex', alignItems:'center' }}>
              <img src={post.authorProfileImage || 'https://via.placeholder.com/48'} alt="" className="profile-img" />
              <div>
                <strong>{post.authorName}</strong>
                <div className="post-meta">{new Date(post.createdAt).toLocaleString()}</div>
              </div>
            </div>
            {user && post.author === user.id && (
              <div>
                <button onClick={() => startEdit(post)} style={{ marginRight: 8 }}>Edit</button>
                <button onClick={() => handleDelete(post._id)}>Delete</button>
              </div>
            )}
          </div>

          {editing[post._id] ? (
            <div>
              <textarea value={editing[post._id]} onChange={e => setEditing({ ...editing, [post._id]: e.target.value })} rows={3} />
              <div style={{ marginTop:8 }}>
                <button className="btn-primary" onClick={() => saveEdit(post._id)}>Save</button>
                <button onClick={() => setEditing({})} style={{ marginLeft:8 }}>Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <p style={{ marginTop: 10 }}>{post.text}</p>
              {post.imageUrl && <img src={post.imageUrl} alt="post" className="post-image" />}
            </>
          )}

          <div className="post-actions">
            <div className="small">👍 {post.likes?.length || 0} · 💬 {post.comments?.length || 0}</div>
            <div style={{ marginLeft: 'auto' }}>
              <button onClick={() => toggleLike(post._id)}>{/* label based on whether user liked */}
                Like
              </button>
            </div>
          </div>

          <div style={{ marginTop: 8 }}>
            <div>
              {post.comments?.map((c, i) => (
                <div key={i} className="small" style={{ padding: '6px 0' }}>
                  <strong>{c.authorName}:</strong> {c.text}
                </div>
              ))}
            </div>

            {user && (
              <div style={{ marginTop: 8 }}>
                <input placeholder="Write a comment..." value={commentText[post._id] || ''} onChange={e => setCommentText({ ...commentText, [post._id]: e.target.value })} />
                <button onClick={() => addComment(post._id)} style={{ marginLeft: 8 }}>Comment</button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}