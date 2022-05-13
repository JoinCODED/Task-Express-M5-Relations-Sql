const AuthorModel = (sequelize, DataTypes) => {
  const Author = sequelize.define('Author', {
    name: {
      type: DataTypes.STRING,
    },
  });
  return Author;
};

module.exports = AuthorModel;
