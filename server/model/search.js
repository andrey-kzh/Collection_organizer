const { db } = require('../libs/connection');

module.exports = {

  findCatalogBySearchString(search, categories) {
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
            + 'GROUP BY catalog.id', [search, categoriesQuery],
    )
      .then((data) => data)
      .catch((error) => {
        // throw error;
      });
  },
};
