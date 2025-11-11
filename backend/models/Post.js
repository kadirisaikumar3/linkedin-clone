const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  authorName: String,
  text: String,
  createdAt: { type: Date, default: Date.now }
});

const postSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  authorName: { type: String, required: true },
  text: { type: String, required: true },
  imageUrl: { type: String },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [commentSchema]
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
