
import { setupStore } from "./setupStore";
import { categoriesStore } from "./categoriesStore";
import { api } from "../api";

const spyApi = (methodName: any) => jest.spyOn(api, methodName);


describe('setCategoryTitle', () => {
    it('Should set category title', () => {
        setupStore.setCategoryTitle('testTitle')
        expect(setupStore.categoryTitle).toBe('testTitle')
    })
})


describe('setEditWindow', () => {
    it('Should set params for edit window', () => {
        setupStore.editWindow = { isOpen: false, id: null, title: '' }
        const editWindowParams = { isOpen: true, id: 85, title: 'testTitle' }
        setupStore.setEditWindow(editWindowParams)
        expect(setupStore.editWindow).toEqual(editWindowParams)
    })
})


describe('CRUD-functions of categories ', () => {

    const categoriesValue: { items: {}, list: number[] } = {
        items: { 84: { id: 84, title: 'testTitle_01' }, 85: { id: 85, title: 'testTitle_02' } },
        list: [84, 85]
    }

    beforeEach(() => {
        categoriesStore.categories = categoriesValue
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('addCategoryItem', () => {
        it('Should add category item', async () => {
            const response = { status: 200, data: { id: 86 } }
            spyApi('addCategoryItem').mockResolvedValueOnce(response)
            setupStore.categoryTitle = 'testTitle_03'
            const itemsEqual = { ...categoriesValue.items, ...{ [response.data.id]: { id: response.data.id, title: setupStore.categoryTitle } } }
            await setupStore.addCategoryItem()
            expect(categoriesStore.categories).toEqual({ list: [84, 85, 86], items: itemsEqual })
            expect(setupStore.categoryTitle).toBe('')
        })
    })

    describe('updateCategoryItem', () => {
        it('Should update category item', async () => {
            const response = { status: 200, data: { id: 85 } }
            spyApi('updateCategoryItem').mockResolvedValueOnce(response)
            setupStore.editWindow.id = 85
            setupStore.editWindow.title = 'newTestTitle'
            await setupStore.updateCategoryItem()
            expect(categoriesStore.categories.items).toEqual({ 84: { id: 84, title: 'testTitle_01' }, 85: { id: 85, title: 'newTestTitle' } })
        })
    })


    describe('deleteCategoryItem', () => {
        it('Should delete category item', async () => {
            const response = { status: 200, data: { id: 85 } }
            spyApi('deleteCategoryItem').mockResolvedValueOnce(response)
            await setupStore.deleteCategoryItem()
            expect(categoriesStore.categories).toEqual({ list: [84], items: { 84: { id: 84, title: 'testTitle_01' } } })
        })
    })
})