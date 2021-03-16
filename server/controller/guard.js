const err = require('../libs/exception').errorCreator;
const { localStorage } = require('../libs/asyncLocalStorage');

module.exports = {
  async mustBeAuthenticated(req, res, next) {
    try {
      const session = await localStorage.getStore().get('session');
      if (!session) throw { status: 401, message: 'Unauthorized' };
    } catch (e) {
      next(err(e));
    }
    next();
  },

};
