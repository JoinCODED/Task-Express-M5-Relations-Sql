const express = require('express');
const router = express.Router();
const slugify = require('slugify');
const {
  postsGet,
  postsUpdate,
  postsDelete,
  postsCreate,
  fetchPost,
} = require('./posts.controllers');

router.param('postId', async (req, res, next, postId) => {
  const post = await fetchPost(+postId, next);
  if (post) {
    req.post = post;
    next();
  } else {
    const err = new Error('Post Not Found');
    err.status = 404;
    next(err);
  }
});

router.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.slug = slugify(req.body.title);
  }
  next();
});

router.get('/', postsGet);
router.post('/', postsCreate);

router.delete('/:postId', postsDelete);

router.put('/:postId', postsUpdate);

module.exports = router;
