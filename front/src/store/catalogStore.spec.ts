import { catalogStore } from "./catalogStore";
import { api } from "../api";

const spyApi = (methodName: any) => jest.spyOn(api, methodName);


describe('setEditWindow', () => {
    const params = {
        isOpen: true,
        catalogId: 86,
        img: '/img/testFull.jpg',
        previewImg: '/img/testPrev.jpg',
        title: 'testTitle',
        anons: 'testAnons',
        relatedCategories: [12, 13]
    }
    it('Should set edit window params', () => {
        catalogStore.setEditWindow(params)
        expect(catalogStore.editWindow).toEqual(params)
    })

    it('Should reset edit window params', () => {
        params.isOpen = false
        const paramsEmpty: {} = {
            isOpen: false,
            catalogId: null,
            img: '',
            previewImg: '',
            title: '',
            anons: '',
            relatedCategories: []
        }
        catalogStore.setEditWindow(params)
        expect(catalogStore.editWindow).toEqual(paramsEmpty)
    })
})

describe('addRelatedCategories', () => {
    it('Should add category id to array', () => {
        catalogStore.editWindow.relatedCategories = [84, 85]
        catalogStore.addRelatedCategories(86)
        expect(catalogStore.editWindow.relatedCategories).toEqual([84, 85, 86])
    })
})

describe('delRelatedCategories', () => {
    it('Should del category id from array', () => {
        catalogStore.editWindow.relatedCategories = [84, 85, 86]
        catalogStore.delRelatedCategories(85)
        expect(catalogStore.editWindow.relatedCategories).toEqual([84, 86])
    })
})

describe('updateCatalogItem', () => {
    it('Should update item', async () => {
        spyApi('updCatalogItem').mockResolvedValueOnce({ status: 200, data: { id: 86 } })
        spyApi('getCatalogItem').mockResolvedValueOnce({ status: 200, data: { id: 86, title: 'testTitle' } })
        catalogStore.catalog = {}
        catalogStore.catalog.items = { 86: { id: null, title: '' } }
        await catalogStore.updateCatalogItem()
        expect(catalogStore.catalog.items).toEqual({ 86: { id: 86, title: 'testTitle' } })
    })
})

describe('addCatalogItem', () => {
    it('Should add new item', async () => {
        spyApi('addCatalogItem').mockResolvedValueOnce({ status: 200, data: { id: 86 } })
        spyApi('getCatalogItem').mockResolvedValueOnce({ status: 200, data: { id: 86, title: 'testTitle_1' } })
        catalogStore.catalog = {}
        catalogStore.catalog.items = { 87: { id: 87, title: 'testTitle_2' } }
        catalogStore.catalog.list = [87]
        await catalogStore.addCatalogItem()
        expect(catalogStore.catalog.items).toEqual({ 86: { id: 86, title: 'testTitle_1' }, 87: { id: 87, title: 'testTitle_2' } })
        expect(catalogStore.catalog.list).toEqual([86, 87])
    })
})

describe('setDeleteId', () => {
    it('Should set id for delete', () => {
        catalogStore.setDeleteId(86)
        expect(catalogStore.deleteId).toEqual(86)
    })
})

describe('delCatalogItem', () => {
    it('Should delete item', async () => {
        spyApi('delCatalogItem').mockResolvedValueOnce({ status: 200, data: { id: 86 } })
        catalogStore.catalog = {}
        catalogStore.catalog.items = { 86: { id: 86, title: 'testTitle_1' }, 87: { id: 87, title: 'testTitle_2' } }
        catalogStore.catalog.list = [86, 87]
        await catalogStore.delCatalogItem()
        expect(catalogStore.catalog.items).toEqual({ 87: { id: 87, title: 'testTitle_2' } })
        expect(catalogStore.catalog.list).toEqual([87])
    })
})