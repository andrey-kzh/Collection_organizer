const err = require('../libs/exception').errorCreator;
const Search = require('../model/search');

module.exports = {

  async returnSearchResult(req, res, next) {
    try {
      if (!('search' in req.query) || !('categories' in req.query)) {
        throw { status: 400, message: 'Incorrect request data' };
      }

      const { search, categories } = req.query;
      let categoriesString;
      // (categories.length > 0) ? categoriesString = categories.join(', ') : categoriesString = '';
      (categories.length > 0) ? categoriesString = categories : categoriesString = '';

      let result = await Search.findCatalogBySearchString(search, categoriesString);
      if (!result) result = [];
      res.status(200).json(result);
    } catch (e) {
      next(err(e));
    }
    next();
  },

};
