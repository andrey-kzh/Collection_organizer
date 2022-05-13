export function mapCatalog(catalog: Array<object>): {items: { [index: string]: any }, list: number[]} {

    let normalized: { items: { [index: string]: any }, list: number[] } = {
        items: {},
        list: [],
    };

    catalog.forEach((catalog: { [index: string]: any }) => {
        normalized.items[catalog.id] = {
            id: catalog.id,
            title: catalog.title,
            anons: catalog.anons,
            image: catalog.image,
            categories: catalog.categories,
        }
        normalized.list.push(catalog.id)
    })

    return normalized
}