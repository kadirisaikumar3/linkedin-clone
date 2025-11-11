const express = require('express');
const auth = require('../middleware/auth');
const Post = require('../models/Post');
const User = require('../models/User');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const router = express.Router();

// Cloudinary setup
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'linkedin_clone_posts',
    allowed_formats: ['jpg', 'png', 'jpeg']
  }
});

const upload = multer({ storage });

// Get all posts
router.get('/', async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

// Create post (with image)
router.post('/', [auth, upload.single('image')], async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const post = new Post({
      author: user._id,
      authorName: user.name,
      text: req.body.text,
      imageUrl: req.file ? req.file.path : ''
    });
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Like / Unlike post
router.post('/:id/like', auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });

  const index = post.likes.indexOf(req.user.id);
  if (index === -1) post.likes.push(req.user.id);
  else post.likes.splice(index, 1);

  await post.save();
  res.json({ likes: post.likes.length });
});

// Comment on post
router.post('/:id/comment', auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });

  post.comments.push({ authorName: req.user.name, text: req.body.text });
  await post.save();
  res.json(post.comments);
});

// Edit post
router.put('/:id', auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  if (post.author.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });

  post.text = req.body.text || post.text;
  await post.save();
  res.json(post);
});

// Delete post
router.delete('/:id', auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  if (post.author.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });

  await post.deleteOne();
  res.json({ message: 'Post deleted' });
});

module.exports = router;
