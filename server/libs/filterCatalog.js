module.exports = {
    filterCatalogByCategories(catalog, categoriesString) {
        const categories = categoriesString.split(',').map(Number)
        return catalog.filter((catalogItem) => {
            let isAcceptItem = true
            let catalogItemCategoryIdsArr = catalogItem.categories.map(category => category.id)
            categories.forEach(categoryId => {
                if (catalogItemCategoryIdsArr.indexOf(categoryId) === -1) {
                    isAcceptItem = false
                }
            });
            return isAcceptItem
        });
    },
};