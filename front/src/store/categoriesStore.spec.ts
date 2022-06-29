import { categoriesStore } from "./categoriesStore";
import { api } from "../api";

const spyApi = (methodName: any) => jest.spyOn(api, methodName);

describe('getAllCategories', () => {
    it('Should get and map categories', async () => {
        const res = { status: 200, data: [{ id: 86, title: 'testTitle_1' }, { id: 87, title: 'testTitle_2' }] }
        spyApi('getAllCategories').mockResolvedValueOnce(res)
        await categoriesStore.getAllCategories()
        expect(categoriesStore.categories).toEqual({
            items: {
                86: { id: 86, title: 'testTitle_1' },
                87: { id: 87, title: 'testTitle_2' },
            },
            list: [86, 87]
        })
    })
})