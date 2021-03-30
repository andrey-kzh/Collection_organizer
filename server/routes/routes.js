const router = require('express').Router();
const users = require('../controller/users');
const catalog = require('../controller/catalog');
const category = require('../controller/category');
const search = require('../controller/search');
const guard = require('../controller/guard');

router.use(users.authorization);

router.post('/users/register', users.register);
router.post('/users/login', users.login);
router.post('/users/logout', guard.mustBeAuthenticated, users.logout);
router.get('/users/auth', users.checkAuth);

router.get('/catalog-list', catalog.getCatalogList);

router.get('/catalog', guard.mustBeAuthenticated, catalog.getCatalogItem);
router.post('/catalog', guard.mustBeAuthenticated, catalog.addCatalogItem);
router.put('/catalog', guard.mustBeAuthenticated, catalog.updateCatalogItem);
router.delete('/catalog', guard.mustBeAuthenticated, catalog.deleteCatalogItem);

router.get('/category', guard.mustBeAuthenticated, category.getAllCategories);
router.post('/category', guard.mustBeAuthenticated, category.addCategoryItem);
router.put('/category', guard.mustBeAuthenticated, category.updateCategoryItem);
router.delete('/category', guard.mustBeAuthenticated, category.deleteCategoryItem);

router.get('/search', search.returnSearchResult);

module.exports = router;
