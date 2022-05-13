# Blog Author ✍️

## Instructions

- Fork and clone [this repository](https://github.com/JoinCODED/Task-Express-M5-Relations-Sql) to your `Development` folder.

### One To Many

1. Create a model for an author, with a `name` field.
2. Define the relationships in `models/index.js` at the bottom, right before exporting db. An author has many posts.
3. Create `routes` and `controllers` for the `author` model.
4. Move the `post` create route and controller to the `author` routes and controllers.
5. In `models/index` change the `foreignKey` to `authorId`.
6. In the post create function, add the `author` id to the request body.
7. In the `author`s get route, use the `include` method so that fetching teachers will fetch the list of `posts` he has.
8. Change the `Posts` field name to `posts` using an `alias`.
9. Create the relation ship from the other side, a `post` belongs to an `author`.
10. In the `post` get route, make sure when fetching `posts`, we get the `author` object with each `post`.

### Many To Many

1. Create a model for a `tag` with a `name` field.
2. Define the relationships in `models/index.js` at the bottom, right before exporting db. A `post` has many `tags` and `tags` belongs to many `posts`.
3. As a second argument, pass the through table and name it `post_tag` or anything that makes sense for you.
4. Define an `alias` and a `foreignKey` for each side of the relationship.
5. Create a route for adding a `tag` for a `post` in the `posts` routes file.
6. Create the `tagAdd` function and get the `tag` id from the req params.
7. Use the `addTag` method that sequelize generated for you, add the `tag` id to the `req.post` object.
8. In the `posts` get route, use `include` so that fetching posts will get us the `tags` added to this `post`.
9. In the `tags` get route, do the same so fetching a `tag` will get us the `posts` related to this `post`.

### 🍋 Cascade Delete

Make it that deleting an `author` will delete all `posts` created by this `author`!
