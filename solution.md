### One To Many

1. Create a model for an author, with a `name` field.

```js
const AuthorModel = (sequelize, DataTypes) => {
  const Author = sequelize.define('Author', {
    name: {
      type: DataTypes.STRING,
    },
  });
  return Author;
};

module.exports = AuthorModel;
```

2. Define the relationships in `models/index.js` at the bottom, right before exporting db. An author has many posts.

```js
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Relations
db.Author.hasMany(db.Post);

module.exports = db;
```

3. Create `routes` and `controllers` for the `author` model.
4. Move the `post` create route and controller to the `author` routes and controllers.
5. In `models/index` change the `foreignKey` to `authorId`.

```js
db.Author.hasMany(db.Post, {
  foreignKey: 'authorId',
});
```

6. In the post create function, add the `author` id to the request body.

```js
try {
    [...]
    req.body.authorId = req.author.id;
    const newPost = await Post.create(req.body);
    [...]
  }
```

7. In the `author`s get route, use the `include` method so that fetching teachers will fetch the list of `posts` he has.

```js
Author.findAll({
  attributes: ['id', 'name'],
  include: {
    model: Post,
    as: 'posts',
    attributes: ['id', 'name'],
  },
});
```

8. Change the `Posts` field name to `posts` using an `alias`.

```js
db.Author.hasMany(db.Post, {
  foreignKey: 'teacherId',
  as: 'posts',
  allowNull: false,
});
```

9. Create the relation ship from the other side, a `post` belongs to an `author`.

```js
db.Post.belongsTo(db.Author, {
  as: 'author',
  foreignKey: 'authorId',
});
```

10. In the `post` get route, make sure when fetching `posts`, we get the `author` object with each `post`.

```js
Post.findAll({
  attributes: { exclude: ['authorId', 'createdAt', 'updatedAt'] },
  include: {
    model: Author,
    as: 'author',
    attributes: ['name'],
  },
});
```

### Many To Many

1. Create a model for a `tag` with a `name` field.

```js
const TagModel = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    name: {
      type: DataTypes.STRING,
    },
  });
  return Tag;
};

module.exports = TagModel;
```

2. Define the relationships in `models/index.js` at the bottom, right before exporting db. A `post` has many `tags` and `tags` belongs to many `posts`.

```js
db.Tag.belongsToMany(db.Post);
db.Post.belongsToMany(db.Tag);
```

3. As a second argument, pass the through table and name it `post_tag` or anything that makes sense for you.

```js
db.Tag.belongsToMany(db.Post, { through: 'post_tag' });
db.Post.belongsToMany(db.Tag, { through: 'post_tag' });
```

4. Define an `alias` and a `foreignKey` for each side of the relationship.

```js
db.Tag.belongsToMany(db.Post, {
  through: 'post_tag',
  as: 'posts',
  foreignKey: 'postId',
});
db.Post.belongsToMany(db.Tag, {
  through: 'post_tag',
  as: 'tags',
  foreignKey: 'tagId',
});
```

5. Create a route for adding a `tag` for a `post` in the `posts` routes file.

```js
router.post('/:postId/:tagId', tagAdd);
```

6. Create the `tagAdd` function and get the `tag` id from the req params.

```js
exports.tagAdd = async (req, res, next) => {
  try {
    const { tagId } = req.params;
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
```

7. Use the `addTag` method that sequelize generated for you, add the `tag` id to the `req.post` object.

```js
exports.tagAdd = async (req, res, next) => {
  try {
    const { tagId } = req.params;
    await req.post.addTag(tagId);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
```

8. In the `posts` get route, use `include` so that fetching posts will get us the `tags` added to this `post`.

```js
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
```

9. In the `tags` get route, do the same so fetching a `tag` will get us the `posts` related to this `post`.

```js
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
```

### 🍋 Cascade Delete

Make it that deleting an `author` will delete all `posts` created by this `author`!

In `models/index.js`:

```js
db.Author.hasMany(db.Post, {
  foreignKey: 'teacherId',
  as: 'posts',
  onDelete: 'CASCADE',
  allowNull: false,
});
```
