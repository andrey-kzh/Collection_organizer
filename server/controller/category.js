const err = require('../libs/exception').errorCreator;
const { localStorage } = require('../libs/asyncLocalStorage');
const Category = require('../model/category');

module.exports = {

  async getAllCategories(req, res, next) {
    try {
      const session = await localStorage.getStore().get('session');
      const categorys = await Category.selectAllCategories(session.userId);
      res.status(200).json(categorys);
    } catch (e) {
      next(err(e));
    }
  },

  async addCategoryItem(req, res, next) {
    try {
      const { title } = req.body;
      const session = await localStorage.getStore().get('session');
      if (!title || !session) throw { status: 400, message: 'Incorrect request data' };
      const categoryId = await Category.insertCategory(title, session.userId);
      res.status(200).json(categoryId);
    } catch (e) {
      next(err(e));
    }
  },

  async updateCategoryItem(req, res, next) {
    try {
      const { title, id } = req.body;
      if (!title || !id) throw { status: 400, message: 'Incorrect request data' };
      const categoryId = await Category.updateCategory(title, id);
      res.status(200).json(categoryId);
    } catch (e) {
      next(err(e));
    }
  },

  async deleteCategoryItem(req, res, next) {
  },

};
