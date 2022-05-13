let Post = require('../../db/models/Post');

exports.postsCreate = async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.postsDelete = async (req, res, next) => {
  try {
    await req.post.destroy();
    res.status(204).end();
  } catch (err) {
    next(error);
  }
};

exports.postsUpdate = async (req, res, next) => {
  try {
    await req.post.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.postsGet = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.fetchPost = async (postId, next) => {
  try {
    const post = await Post.findByPk(postId);
    return post;
  } catch (error) {
    next(error);
  }
};
