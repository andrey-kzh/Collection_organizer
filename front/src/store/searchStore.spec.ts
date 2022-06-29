import { searchStore } from './searchStore';
import { catalogStore } from './catalogStore';
import { mapCatalog } from '../libs/mapCatalog';
import { api } from "../api";

const spyApi = (methodName: any) => jest.spyOn(api, methodName);

describe('form', () => {

    it('Should set search string', () => {
        searchStore.form.setSearchString('testSearchString')
        expect(searchStore.form.searchString).toBe('testSearchString')
    })

    it('Shoul add category id in array', () => {
        searchStore.form.selectdedCategories = [1, 54]
        searchStore.form.addSelectdedCategories(86)
        expect(searchStore.form.selectdedCategories).toEqual([1, 54, 86])
    })

    it('Shoul delete category id from array', () => {
        searchStore.form.selectdedCategories = [1, 54, 86]
        searchStore.form.delSelectdedCategories(54)
        expect(searchStore.form.selectdedCategories).toEqual([1, 86])
    })

})

describe('setRequestParams', () => {
    it('Should set request params from form fields', () => {
        searchStore.form.searchString = 'testSearchString'
        searchStore.form.selectdedCategories = [1, 54]
        searchStore.request.searchString = ''
        searchStore.request.selectdedCategories = []
        searchStore.setRequestParams()
        expect(searchStore.request).toEqual(
            {
                searchString: 'testSearchString',
                selectdedCategories: [1, 54]
            })
    })
})

describe('setRequestParamsFromBowserSearchString', () => {
    it('Should set request params from browser string', () => {
        searchStore.request.searchString = ''
        searchStore.request.selectdedCategories = []
        searchStore.setRequestParamsFromBowserSearchString('testSearchString', [1, 54])
        expect(searchStore.request).toEqual(
            {
                searchString: 'testSearchString',
                selectdedCategories: [1, 54]
            })
    })
})

describe('setTotalPages', () => {
    it('Should set number of total pages', async () => {
        spyApi('findTotalPages').mockResolvedValueOnce({ status: 200, data: { totalPages: 4 } })
        await searchStore.setTotalPages()
        expect(searchStore.totalPages).toBe(4)
    })
})

describe('Search functions', () => {
    const response = [{
        id: 86,
        title: 'testTitle_01',
        anons: 'testAnons_01',
        image: '/test/img_01.jpg',
        categories: [{ id: 23, title: 'testCategoriesTitle_011' }, { id: 24, title: 'testCategoriesTitle_012' }]
    },
    {
        id: 87,
        title: 'testTitle_02',
        anons: 'testAnons_02',
        image: '/test/img_02.jpg',
        categories: [{ id: 23, title: 'testCategoriesTitle_011' }, { id: 25, title: 'testCategoriesTitle_021' }]
    }]

    const mapedResponse = mapCatalog(response)

    const catalogValue: { items: {}, list: number[] } = {
        items: {
            85: {
                id: 85,
                title: 'testTitle_00',
                anons: 'testAnons_00',
                image: '/test/img_00.jpg',
                categories: [{ id: 20, title: 'testCategoriesTitle_001' }]
            }
        }, list: [85]
    }

    beforeEach(() => {
        catalogStore.catalog = catalogValue
        searchStore.currentPage = null
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('find', () => {
        it('Get and set catalog items', async () => {
            spyApi('findCatalogItems').mockResolvedValueOnce({ status: 200, data: { result: response } })
            await searchStore.find(2)
            expect(catalogStore.catalog).toEqual(mapedResponse)
            expect(searchStore.currentPage).toBe(2)
        })
        it('Result object should be empty', async () => {
            spyApi('findCatalogItems').mockResolvedValueOnce({ status: 200, data: {} })
            searchStore.currentPage = 5
            await searchStore.find(1)
            expect(catalogStore.catalog).toEqual({ items: {}, list: [] })
            expect(searchStore.currentPage).toBe(5)
        })
    })

    describe('findNextPage', () => {
        it('Get and add catalog items to result object', async () => {
            spyApi('findCatalogItems').mockResolvedValueOnce({ status: 200, data: { result: response } })
            searchStore.currentPage = 2
            await searchStore.findNextPage()
            expect(catalogStore.catalog.items).toEqual({ ...catalogStore.catalog.items, ...mapedResponse.items })
            expect(catalogStore.catalog.list).toEqual(catalogValue.list.concat(mapedResponse.list))
            expect(searchStore.currentPage).toBe(3)
        })

        it('Result object should be empty', async () => {
            spyApi('findCatalogItems').mockResolvedValueOnce({ status: 200, data: {} })
            searchStore.currentPage = 3
            await searchStore.findNextPage()
            expect(catalogStore.catalog).toEqual({ items: {}, list: [] })
            expect(searchStore.currentPage).toBe(3)
        })
    })
})

