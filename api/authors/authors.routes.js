const express = require('express');
const router = express.Router();
const slugify = require('slugify');
const {
  authorsGet,
  authorsUpdate,
  authorsDelete,
  authorsCreate,
  fetchAuthor,
  postsCreate,
} = require('./authors.controllers');

router.param('authorId', async (req, res, next, authorId) => {
  const author = await fetchAuthor(+authorId, next);
  if (author) {
    req.author = author;
    next();
  } else {
    const err = new Error('Author Not Found');
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

router.get('/', authorsGet);
router.post('/', authorsCreate);

router.post('/:authorId/posts', postsCreate);

router.delete('/:authorId', authorsDelete);

router.put('/:authorId', authorsUpdate);

module.exports = router;
