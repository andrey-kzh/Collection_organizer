const err = require('../libs/exception').errorCreator;
const Search = require('../model/search');

module.exports = {

  async returnSearchResult(req, res, next) {
    try {
      if (!('search' in req.body) || !('categories' in req.body)) {
        throw { status: 400, message: 'Incorrect request data' };
      }

      const { search, categories } = req.body;
      let categoriesString;
      (categories.length > 0) ? categoriesString = categories.join(', ') : categoriesString = '';

      let result = await Search.findCatalogBySearchString(search, categoriesString);
      if (!result) result = [];
      res.status(200).json(result);
    } catch (e) {
      next(err(e));
    }
    next();
  },

};
