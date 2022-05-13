let Tag = require('../../db/models/Tag');

exports.tagsCreate = async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.tagsDelete = async (req, res, next) => {
  try {
    await req.author.destroy();
    res.status(204).end();
  } catch (err) {
    next(error);
  }
};

exports.tagsUpdate = async (req, res, next) => {
  try {
    await req.author.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.tagsGet = async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [
        {
          model: Post,
          as: 'posts',
          through: { attributes: [] },
        },
      ],
    });
    res.json(tags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.fetchTag = async (authorId, next) => {
  try {
    const author = await Tag.findByPk(authorId);
    return author;
  } catch (error) {
    next(error);
  }
};
