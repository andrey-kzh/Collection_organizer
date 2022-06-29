import axios, { AxiosRequestConfig } from "axios";
import { api } from "./index";
import tokensStorage from "../libs/localStorage";


const urlRoot = '/root'
api.urlRoot = urlRoot
jest.mock('axios')


describe('requestWithToken', () => {

    const options: AxiosRequestConfig = {
        url: `/test/url/`,
        method: 'POST',
        data: {}
    };

    // подмена метода getTokenFromStorage в модуле tokensStorage
    const token = 'test_token_gh3as437gfd'
    const spy = jest.spyOn(tokensStorage, 'getTokenFromStorage');
    spy.mockReturnValue(token);

    it('Should contain correct access token and params in request', async () => {
        (axios as undefined as jest.Mock).mockResolvedValueOnce(true)
        await api.requestWithToken(options)
        expect(axios as undefined as jest.Mock).toHaveBeenCalledWith({
            data: {},
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            url: `${urlRoot}/test/url/`
        })
    })
})


describe('login', () => {
    it('Should contain login and password in request', async () => {
        (axios as undefined as jest.Mock).mockImplementationOnce((options) => {
            return Promise.resolve(options.data)
        });
        const res = await api.login('testLogin', 'testPassword')
        expect(res).toEqual({ login: 'testLogin', password: 'testPassword' });
    })
})


describe('Api functions for authorized user', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    const spyRequestWithToken = jest.spyOn(api, 'requestWithToken')

    describe('userCheckAuth', () => {
        it('Request should contain correct params', async () => {
            spyRequestWithToken.mockResolvedValueOnce(<any>true)
            await api.userCheckAuth()
            expect(spyRequestWithToken).toHaveBeenCalledWith(
                {
                    url: `/users/auth/`,
                    method: 'GET'
                })
        })

        it('Should return value', async () => {
            spyRequestWithToken.mockResolvedValueOnce(<any>'testValue')
            const res = await api.userCheckAuth()
            expect(res).toEqual('testValue')
        })

        it('Should return false', async () => {
            spyRequestWithToken.mockResolvedValueOnce(<any>undefined)
            const res = await api.userCheckAuth()
            expect(res).toEqual(false)
        })
    })


    describe('findCatalogItems', () => {
        it('Request should contain correct params', async () => {
            spyRequestWithToken.mockResolvedValueOnce(<any>true)
            await api.findCatalogItems('testQuery', [12, 13], 2)
            expect(spyRequestWithToken).toHaveBeenCalledWith(
                {
                    url: '/search?search=testQuery&categories=12,13&page=2',
                    method: 'GET'
                })
        })
    })


    describe('findTotalPages', () => {
        it('Request should contain correct params', async () => {
            spyRequestWithToken.mockResolvedValueOnce(<any>true)
            await api.findTotalPages('testQuery', [12, 13])
            expect(spyRequestWithToken).toHaveBeenCalledWith(
                {
                    url: '/search/total-pages/?search=testQuery&categories=12,13',
                    method: 'GET'
                })
        })
    })


    describe('addCategoryItem', () => {
        it('Request should contain correct params', async () => {
            spyRequestWithToken.mockResolvedValueOnce(<any>true)
            await api.addCategoryItem('testTitle')
            expect(spyRequestWithToken).toHaveBeenCalledWith(
                {
                    url: '/category/',
                    method: 'POST',
                    data: { title: 'testTitle' }
                })
        })
    })

    describe('getAllCategories', () => {
        it('Request should contain correct params', async () => {
            spyRequestWithToken.mockResolvedValueOnce(<any>true)
            await api.getAllCategories()
            expect(spyRequestWithToken).toHaveBeenCalledWith(
                {
                    url: '/category/',
                    method: 'GET',
                })
        })
    })


    describe('updateCategoryItem', () => {
        it('Request should contain correct params', async () => {
            spyRequestWithToken.mockResolvedValueOnce(<any>true)
            await api.updateCategoryItem(86, 'testTitle')
            expect(spyRequestWithToken).toHaveBeenCalledWith(
                {
                    url: '/category/',
                    method: 'PUT',
                    data: { id: 86, title: "testTitle" }
                })
        })
    })


    describe('deleteCategoryItem', () => {
        it('Request should contain correct params', async () => {
            spyRequestWithToken.mockResolvedValueOnce(<any>true)
            await api.deleteCategoryItem(86)
            expect(spyRequestWithToken).toHaveBeenCalledWith(
                {
                    url: '/category/',
                    method: 'DELETE',
                    data: { id: 86 }
                })
        })
    })


    describe('addCatalogItem', () => {
        it('Request should contain correct params', async () => {
            spyRequestWithToken.mockResolvedValueOnce(<any>true)
            await api.addCatalogItem('testTitle', 'testAnons', '/img/test.jpg', [12, 13])
            expect(spyRequestWithToken).toHaveBeenCalledWith(
                {
                    url: '/catalog/',
                    method: 'POST',
                    data: {
                        title: 'testTitle',
                        anons: 'testAnons',
                        image: '/img/test.jpg',
                        categoriesId: [12, 13]
                    }
                })
        })
    })


    describe('updCatalogItem', () => {
        it('Request should contain correct params', async () => {
            spyRequestWithToken.mockResolvedValueOnce(<any>true)
            await api.updCatalogItem(86, 'testTitle', 'testAnons', '/img/test.jpg', [12, 13])
            expect(spyRequestWithToken).toHaveBeenCalledWith(
                {
                    url: '/catalog/',
                    method: 'PUT',
                    data: {
                        id: 86,
                        title: 'testTitle',
                        anons: 'testAnons',
                        image: '/img/test.jpg',
                        categoriesId: [12, 13]
                    }
                })
        })
    })


    describe('delCatalogItem', () => {
        it('Request should contain correct params', async () => {
            spyRequestWithToken.mockResolvedValueOnce(<any>true)
            await api.delCatalogItem(86)
            expect(spyRequestWithToken).toHaveBeenCalledWith(
                {
                    url: '/catalog/',
                    method: 'DELETE',
                    data: {id: 86}
                })
        })
    })


    describe('getCatalogItem', () => {
        const id = 86
        const component = () => api.getCatalogItem(id)

        it('Request should contain url and method', async () => {
            spyRequestWithToken.mockReturnValueOnce(<any>true)
            await component()
            expect(spyRequestWithToken).toHaveBeenCalledWith(
                expect.objectContaining({
                    url: `/catalog/?id=${id}`,
                    method: 'GET'
                }))
        })
    })


    describe('uploadOneFile', () => {

        const file = new File(["foo"], "test.txt", { type: "text/plain", });
        let formDataForTest = new FormData()
        formDataForTest.append('file', file)
        const component = () => api.uploadOneFile(file, 'file', '/test/url/')

        it('Request should contain correct params', async () => {
            spyRequestWithToken.mockReturnValueOnce(<any>true)
            await component()
            expect(spyRequestWithToken).toHaveBeenCalledWith({
                data: formDataForTest,
                headers: { "Content-Type": "multipart/form-data" },
                url: `/test/url/`,
                method: 'POST'
            })
        })
    })

})


