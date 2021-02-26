const { db } = require('../libs/connection');

module.exports = {

  selectAllCategories(userId) {
    return db.manyOrNone(
      'SELECT id, title FROM category WHERE user_id = $1', userId,
    )
      .then((data) => data)
      .catch((error) => {
        throw error;
      });
  },

  insertCategory(title, userId) {
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

  deleteCategory(id) {
    return db.oneOrNone(
      'DELETE FROM category WHERE id = $1 RETURNING id', id,
    )
      .then((data) => data)
      .catch((error) => {
        // throw error;
      });
  },

};
