const { db } = require('../libs/connection');

module.exports = {

  selectAllCategorys(userId) {
    return db.manyOrNone(
      'SELECT id, title FROM category WHERE user_id = $1', userId,
    )
      .then((data) => data)
      .catch((error) => {
        throw error;
      });
  },

  addNewCategory(title, userId) {
    return db.oneOrNone(
      'INSERT INTO category (title, user_id) VALUES ($1, $2) RETURNING id',
      [title, userId],
    )
      .then((data) => data)
      .catch((error) => {
        throw error;
      });
  },

  updateCategory(title, id) {
    return db.oneOrNone(
      'UPDATE category SET title = $1 WHERE id = $2 RETURNING id',
      [title, id],
    )
      .then((data) => data)
      .catch((error) => {
        throw error;
      });
  },

};
