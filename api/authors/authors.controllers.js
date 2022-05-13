let Author = require('../../db/models/Author');
let Post = require('../../db/models/Post');

exports.authorsCreate = async (req, res) => {
  try {
    const newAuthor = await Author.create(req.body);
    res.status(201).json(newAuthor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.authorsDelete = async (req, res, next) => {
  try {
    await req.author.destroy();
    res.status(204).end();
  } catch (err) {
    next(error);
  }
};

exports.authorsUpdate = async (req, res, next) => {
  try {
    await req.author.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.authorsGet = async (req, res) => {
  try {
    const authors = await Author.findAll({
      attributes: ['id', 'name'],
      include: {
        model: Post,
        attributes: ['id', 'name'],
      },
    });

    res.json(authors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.fetchAuthor = async (authorId, next) => {
  try {
    const author = await Author.findByPk(authorId);
    return author;
  } catch (error) {
    next(error);
  }
};

exports.postsCreate = async (req, res) => {
  try {
    req.body.teacherId = req.teacher.id;
    const newPost = await Post.create(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
