const err = require('../libs/exception').errorCreator;
const Search = require('../model/search');
const config = require('../config');

module.exports = {

    async returnTotalPages(req, res, next) {
        try {
            if (!('search' in req.query) || !('categories' in req.query)) {
                throw { status: 400, message: 'Incorrect request data' };
            }

            let { search, categories } = req.query;
            if (categories.length <= 0) categories = '';

            if ((search.length <= 0) && (categories.length <= 0)) { // Кол-во страниц всего каталога, поисковый запрос пуст
                const totalItems = await Search.selectAllCatalogCount();
                const totalPages = Math.ceil(totalItems.count / config.catalogPerPage);
                res.status(200).json({ totalPages });
            } else { // Кол-во страниц соответствующих поисковому запросу
                let totalItems = await Search.findCatalogBySearchString(search, categories, 'ALL', 0);
                totalItems = totalItems.filter((catalogItem) => catalogItem.categories.length >= categories.split(',').length);
                if (totalItems) {
                    totalItemsCount = totalItems.length;
                    const totalPages = Math.ceil(totalItemsCount / config.catalogPerPage);
                    res.status(200).json({ totalPages });
                } else res.status(200).json({ totalPages: 1 });
            }
        } catch (e) {
            next(err(e));
        }
        next();
    },

    async returnSearchResult(req, res, next) {
        try {
            if (!('search' in req.query) || !('categories' in req.query)) {
                throw { status: 400, message: 'Incorrect request data' };
            }

            let { page, search, categories } = req.query;
            if (categories.length <= 0) categories = '';
            if (!page) page = 1;

            let pageOffset = page - 1;
            if (pageOffset < 0) pageOffset = 0;
            const offset = pageOffset * config.catalogPerPage;

            if ((search.length <= 0) && (categories.length <= 0)) { // Весь каталог, поисковый запрос пуст
                const result = await Search.selectAllCatalogItems(config.catalogPerPage, offset);
                res.status(200).json({ result });
            } else { // Страницы соответствующие поисковому запросу
                let result = await Search.findCatalogBySearchString(search, categories, config.catalogPerPage, offset);
                result = result.filter((catalogItem) => catalogItem.categories.length >= categories.split(',').length);
                res.status(200).json({ result });
            }
        } catch (e) {
            next(err(e));
        }
        next();
    },

};