const { db } = require('../libs/connection');

module.exports = {

  selectCatalogCount() {
    return db.oneOrNone(
      'SELECT count(id) FROM catalog',
    )
      .then((data) => data)
      .catch((error) => {
        throw error;
      });
  },

  selectCatalogList(limit, offset) {
    return db.manyOrNone(
      'SELECT catalog.id, catalog.title, catalog.anons, catalog.image, '
        + 'json_agg(json_strip_nulls(json_build_object(\'id\', category.id, \'title\', category.title))) '
        + 'as categories '
        + 'FROM catalog '
        + 'LEFT JOIN related_category ON (catalog.id = related_category.catalog_id) '
        + 'LEFT JOIN category ON (category.id = related_category.category_id) '
        + 'GROUP BY catalog.id ORDER BY catalog.id LIMIT $1 OFFSET $2 ', [limit, offset],

    )
      .then((data) => data)
      .catch((error) => {
        throw error;
      });
  },

  selectCatalogItem(id) {
    return db.oneOrNone(
      'SELECT catalog.id, catalog.title, catalog.anons, catalog.image, '
         + 'json_agg(json_strip_nulls(json_build_object(\'id\', category.id, \'title\', category.title))) '
         + 'as categories '
         + 'FROM catalog '
         + 'LEFT JOIN related_category ON (catalog.id = related_category.catalog_id) '
         + 'LEFT JOIN category ON (category.id = related_category.category_id) '
         + 'WHERE catalog.id = $1 GROUP BY catalog.id', id,
    )
      .then((data) => data)
      .catch((error) => {
        throw error;
      });
  },

  insertCatalogItem(title, anons, image, userId) {
    return db.oneOrNone(
      'INSERT INTO catalog (title, title_idx, anons, anons_idx, image, user_id) '
            + 'VALUES ($1, to_tsvector($1), $2, to_tsvector($2), $3, $4) RETURNING id',
      [title, anons, image, userId],
    )
      .then((data) => data)
      .catch((error) => {
        throw error;
      });
  },

  updateCatalogItem(title, anons, image, id) {
    return db.oneOrNone(
      'UPDATE catalog SET '
            + 'title = $1, title_idx = to_tsvector($1), anons = $2, anons_idx = to_tsvector($2), image = $3 '
            + 'WHERE id = $4 RETURNING id',
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
