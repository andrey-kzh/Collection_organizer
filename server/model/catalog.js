const { db, pgp } = require('../libs/connection');

module.exports = {

  selectCatalogItem(id) {
    return db.oneOrNone(
      'SELECT catalog.id, catalog.title, catalog.anons, catalog.image, '
              + 'json_agg(json_build_object(\'id\', category.id, \'title\', category.title)) as categories '
              + 'FROM catalog '
              + 'JOIN related_category ON (catalog.id = related_category.catalog_id) '
              + 'JOIN category ON (category.id = related_category.category_id) '
              + 'WHERE catalog.id = $1 GROUP BY catalog.id', id,
    )
      .then((data) => data)
      .catch((error) => {
        throw error;
      });
  },

  insertCatalogItem(title, anons, image, userId) {
    return db.oneOrNone(
      'INSERT INTO catalog (title, anons, image, user_id) VALUES ($1, $2, $3, $4) RETURNING id',
      [title, anons, image, userId],
    )
      .then((data) => data)
      .catch((error) => {
        throw error;
      });
  },

  updateCatalogItem(title, anons, image, id) {
    return db.oneOrNone(
      'UPDATE catalog SET title = $1, anons = $2, image = $3 WHERE id = $4 RETURNING id',
      [title, anons, image, id],
    )
      .then((data) => data)
      .catch((error) => {
        throw error;
      });
  },

  deleteCatalogItem(id) {
    return db.oneOrNone(
      'DELETE FROM catalog WHERE id = $1 RETURNING id', id,
    )
      .then((data) => data)
      .catch((error) => {
        // throw error;
      });
  },
};
