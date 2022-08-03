module.exports = {
    filterCatalogByCategorys(catalog, categories) {
        return catalog.filter((catalogItem) => {
            let isAcceptItem = true
            let catalogItemCategoryIdsArr = catalogItem.categories.map(category => category.id)
            categories.split(',').map(Number).forEach(categoryId => {
                if (catalogItemCategoryIdsArr.indexOf(categoryId) === -1) {
                    isAcceptItem = false
                }
            });
            return isAcceptItem
        });
    },
};