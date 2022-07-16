export function mapCategories(categories: Array<object>): {items: { [index: string]: any }, list: number[]} {

    let normalized: { items: { [index: string]: any }, list: number[] } = {
        items: {},
        list: []
    };

    categories.forEach((category: { [index: string]: any }) => {
        normalized.items[category.id] = {id: category.id, title: category.title}
        normalized.list.push(category.id)
    })

    return normalized
}