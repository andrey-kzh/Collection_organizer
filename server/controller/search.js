const err = require('../libs/exception').errorCreator;
const Search = require('../model/search');

module.exports = {

  async returnSearchResult(req, res, next) {
    try {
      const { search } = req.body;

      if (!search) throw { status: 400, message: 'Incorrect request data' };
      let result = await Search.findCatalogBySearchString(search);
      if (!result) result = []
      res.status(200).json(result);
    } catch (e) {
      next(err(e));
    }
    next();
  },

};
