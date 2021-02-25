const err = require('../libs/exception').errorCreator;
const { localStorage } = require('../libs/asyncLocalStorage');
const Catalog = require('../model/catalog');

module.exports = {

  async getCatalogItem(req, res, next) {
    try {
      const { id } = req.body;

      if (!id) throw { status: 400, message: 'Incorrect request data' };
      const catalogItem = await Catalog.selectCatalogItem(id);
      res.status(200).json(catalogItem);
    } catch (e) {
      next(err(e));
    }
    next();
  },

  async addCatalogItem(req, res, next) {
    try {
      const {
        title, anons, image, categoriesId,
      } = req.body;

      const userId = await localStorage.getStore().get('session').userId;
      if (!title || !userId) throw { status: 400, message: 'Incorrect request data' };
      const catalogId = await Catalog.insertCatalogItem(title, anons, image, userId);
      const relatedCategoriesId = await addRelatedCategories(catalogId, categoriesId);
      res.status(200).json({ ...catalogId, ...{ relatedCategories: relatedCategoriesId } });
    } catch (e) {
      next(err(e));
    }
    next();
  },

  async updateCatalogItem(req, res, next) {
    try {
      const {
        id, title, anons, image, categoriesId,
      } = req.body;

      if (!id) throw { status: 400, message: 'Incorrect request data' };
      const catalogId = await Catalog.updateCatalogItem(title, anons, image, id);
      await Catalog.deleteRelatedCategories(catalogId.id);
      const relatedCategoriesId = await addRelatedCategories(catalogId, categoriesId);
      res.status(200).json({ ...catalogId, ...{ relatedCategories: relatedCategoriesId } });
    } catch (e) {
      next(err(e));
    }
    next();
  },

  async deleteCatalogItem(req, res, next) {
    try {
      const { id } = req.body;

      if (!id) throw { status: 400, message: 'Incorrect request data' };
      const catalogId = await Catalog.deleteCatalogItem(id);
      const relatedCategoriesId = await Catalog.deleteRelatedCategories(catalogId.id);
      res.status(200).json({ ...catalogId, ...{ relatedCategories: relatedCategoriesId } });
    } catch (e) {
      next(err(e));
    }
    next();
  },

};

function addRelatedCategories(catalogId, categoriesId) {
  return new Promise((resolve, reject) => {
    if (catalogId && (categoriesId.length > 0)) {
      const dataFields = categoriesId.map((id) => ({ catalog_id: catalogId.id, category_id: id }));
      resolve(Catalog.insertRelatedCategories(dataFields));
    }
    resolve([]);
  });
}
