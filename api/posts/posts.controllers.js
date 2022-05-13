let Post = require('../../db/models/Post');

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
    const posts = await Post.findAll({
      attributes: { exclude: ['authorId', 'createdAt', 'updatedAt'] },
      include: [
        {
          model: Author,
          as: 'author',
          attributes: ['name'],
        },
        {
          model: Tag,
          as: 'tags',
          through: { attributes: [] },
        },
      ],
    });

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

exports.tagAdd = async (req, res, next) => {
  try {
    const { tagId } = req.params;
    await req.post.addTag(tagId);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
