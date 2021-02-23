const router = require('express').Router();
const users = require('../controller/users');
const catalog = require('../controller/catalog');
const category = require('../controller/category');
const search = require('../controller/search');
const guard = require('../controller/guard');

router.use(users.authorization);

router.post('/users/register', users.register);
router.post('/users/login', users.login);
router.post('/users/logout', users.logout);

router.get('/catalog', guard.mustBeAuthenticated, catalog.getCatalogItem);
router.post('/catalog', catalog.addCatalogItem);
router.put('/catalog', catalog.updateCatalogItem);
router.delete('/catalog', catalog.deleteCatalogItem);

router.get('/category', category.getAllCategorys);
router.post('/category', category.addCategoryItem);
router.put('/category', category.updateCategoryItem);
router.delete('/category', category.deleteCategoryItem);

router.get('/search', search.returnSearchResult);

module.exports = router;
