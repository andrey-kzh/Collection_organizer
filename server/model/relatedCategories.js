const { db, pgp } = require('../libs/connection');

module.exports = {

  insertRelatedCategories(dataFields) {
    const cs = new pgp.helpers.ColumnSet(['catalog_id', 'category_id'], { table: 'related_category' });
    return db.manyOrNone(`${pgp.helpers.insert(dataFields, cs)} RETURNING category_id`)
      .then((data) => data)
      .catch((error) => {
        throw error;
      });
  },

  deleteRelationByCatalogId(catalogId) {
    return db.manyOrNone('DELETE FROM related_category WHERE catalog_id = $1 RETURNING category_id', catalogId)
      .then((data) => data)
      .catch((error) => {
        // throw error;
      });
  },

  deleteRelationByCategoryId(categoryId) {
    return db.manyOrNone('DELETE FROM related_category WHERE category_id = $1 RETURNING category_id', categoryId)
      .then((data) => data)
      .catch((error) => {
        // throw error;
      });
  },

};
