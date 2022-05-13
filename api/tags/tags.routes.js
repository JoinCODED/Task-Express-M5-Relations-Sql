const express = require('express');
const router = express.Router();
const slugify = require('slugify');
const {
  tagsGet,
  tagsUpdate,
  tagsDelete,
  tagsCreate,
  fetchTag,
} = require('./tags.controllers');

router.param('tagId', async (req, res, next, tagId) => {
  const tag = await fetchTag(+tagId, next);
  if (tag) {
    req.tag = tag;
    next();
  } else {
    const err = new Error('Tag Not Found');
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

router.get('/', tagsGet);
router.post('/', tagsCreate);

router.delete('/:tagId', tagsDelete);

router.put('/:tagId', tagsUpdate);

module.exports = router;
