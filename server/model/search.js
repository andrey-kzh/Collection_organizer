const { db } = require('../libs/connection');

module.exports = {

  selectAllCatalogCount() {
    return db.oneOrNone(
      'SELECT count(*) FROM catalog',
    )
      .then((data) => data)
      .catch((error) => {
        throw error;
      });
  },

  selectAllCatalogItems(limit, offset) {
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

  findCatalogCount(search, categories) {
    let connector;
    let categoriesQuery;
    (!search) ? connector = 'OR' : connector = 'AND';
    (categories.length > 0) ? categoriesQuery = `${connector} category.id IN (${categories}) ` : categoriesQuery = '';

    return db.manyOrNone(
      'SELECT catalog.id '
      + 'FROM catalog '
      + 'LEFT JOIN related_category ON (catalog.id = related_category.catalog_id) '
      + 'LEFT JOIN category ON (category.id = related_category.category_id) '
      + 'WHERE catalog.title_idx || catalog.anons_idx @@ plainto_tsquery($1) '
      + '$2:raw'
      + 'GROUP BY catalog.id ', [search, categoriesQuery],
    )
      .then((data) => data)
      .catch((error) => {
        // throw error;
      });
  },

  findCatalogBySearchString(search, categories, limit, offset) {
    let connector;
    let categoriesQuery;
    (!search) ? connector = 'OR' : connector = 'AND';
    (categories.length > 0) ? categoriesQuery = `${connector} category.id IN (${categories}) ` : categoriesQuery = '';

    return db.manyOrNone(
      'SELECT catalog.id, catalog.title, catalog.anons, catalog.image, '
            + 'json_agg(json_strip_nulls(json_build_object(\'id\', category.id, \'title\', category.title))) '
            + 'as categories '
            + 'FROM catalog '
            + 'LEFT JOIN related_category ON (catalog.id = related_category.catalog_id) '
            + 'LEFT JOIN category ON (category.id = related_category.category_id) '
            + 'WHERE setweight(catalog.title_idx, \'A\') || setweight(catalog.anons_idx, \'B\') @@ plainto_tsquery($1) '
            + '$2:raw'
            + 'GROUP BY catalog.id LIMIT $3 OFFSET $4 ', [search, categoriesQuery, limit, offset],
    )
      .then((data) => data)
      .catch((error) => {
        // throw error;
      });
  },
};
