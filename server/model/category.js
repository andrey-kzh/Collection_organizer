const { db } = require('../libs/connection');

module.exports = {

  selectAllCategorys(userId) {
    return db.manyOrNone(
      'SELECT id_category, title FROM category WHERE id_user = $1', userId,
    )
      .then((data) => data)
      .catch((error) => {
        throw error;
      });
  },

  addNewCategory(title, userId) {
    return db.oneOrNone(
      'INSERT INTO category (title, id_user) VALUES ($1, $2) RETURNING id_category',
      [title, userId],
    )
      .then((data) => data)
      .catch((error) => {
        throw error;
      });
  },

  updateCategory(title, id) {
    return db.oneOrNone(
      'UPDATE category SET title = $1 WHERE id_category = $2 RETURNING id_category',
      [title, id],
    )
      .then((data) => data)
      .catch((error) => {
        throw error;
      });
  },

};
