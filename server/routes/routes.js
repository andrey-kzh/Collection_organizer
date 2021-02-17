const router = require('express').Router()
const users = require('../controller/users')
const catalog = require('../controller/catalog')
const categories = require('../controller/categories')
const search = require('../controller/search')
//const sessions = require('../controller/sessions')

router.post('/users/register', (req, res, next) => users.register(req, res, next))
router.post('/users/login', (req, res, next) => users.login(req, res, next))
router.post('/users/logout', (req, res, next) => users.logout(req, res, next))

//router.post('/users/auth', (req, res, next) => users.authorization(req, res, next))

router.get('/catalog', (req, res, next) => catalog.getCatalogItem(req, res, next))
router.post('/catalog', (req, res, next) => catalog.addCatalogItem(req, res, next))
router.put('/catalog', (req, res, next) => catalog.updateCatalogItem(req, res, next))
router.delete('/catalog', (req, res, next) => catalog.deleteCatalogItem(req, res, next))

router.get('/categories', (req, res, next) => categories.getAllCategorys(req, res, next))
router.post('/categories', (req, res, next) => categories.addCategoryItem(req, res, next))
router.put('/categories', (req, res, next) => categories.updateCategoryItem(req, res, next))
router.delete('/categories', (req, res, next) => categories.deleteCategoryItem(req, res, next))

router.get('/search', (req, res, next) => search.returnSearchResult(req, res, next))

module.exports = router