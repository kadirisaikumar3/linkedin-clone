const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');
const Post = require('../models/Post');

const router = express.Router();

// Get profile
router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  const posts = await Post.find({ author: user._id }).sort({ createdAt: -1 });
  res.json({ user, posts });
});

module.exports = router;
