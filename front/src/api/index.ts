import axios, {AxiosResponse, AxiosRequestConfig} from "axios";
import { getTokenFromStorage } from "../libs/localStorage";

interface IApi {
    urlRoot: String,
    optionsDefault: {},
    requestWithToken: (options: AxiosRequestConfig) => Promise<AxiosResponse<any> | Error>,
    login: (login:string, password: string) => Promise<AxiosResponse<any> | Error>,
    logout: () => Promise<AxiosResponse<any> | Error>,
    userCheckAuth: () => Promise<AxiosResponse<any> | Error | false>,
    findCatalogItems: (query: string, categories: number[], page: number) => Promise<AxiosResponse<any> | Error>,
    findTotalPages: (query: string, categories: number[]) => Promise<AxiosResponse<any> | Error>,
    addCategoryItem: (title: string) => Promise<AxiosResponse<any> | Error>,
    getAllCategories: () => Promise<AxiosResponse<any> | Error>,
    updateCategoryItem: (id: number, title: string) => Promise<AxiosResponse<any> | Error>,
    deleteCategoryItem: (id: number) => Promise<AxiosResponse<any> | Error>,
    addCatalogItem: (title: string, anons: string, img: File | string, relatedCategories: number[]) => Promise<AxiosResponse<any> | Error>,
    updCatalogItem: (id: number, title: string, anons: string, img: File | string, relatedCategories: number[]) => Promise<AxiosResponse<any> | Error>,
    delCatalogItem: (id: number) => Promise<AxiosResponse<any> | Error>,
    uploadOneFile: (file: File, field: string, url: string) => Promise<AxiosResponse<any> | Error>,
    getCatalogItem: (id: number) => Promise<AxiosResponse<any> | Error>,
}


class Api implements IApi {

    constructor(backendHost: string) {
        axios.interceptors.response.use((response) => response, (error) => {
            return Promise.reject(error.response)
        });

        //set api url root for dev and prod
        this.urlRoot = `${backendHost}/api`;
    }

    urlRoot;
    optionsDefault = {};

    async requestWithToken(options: AxiosRequestConfig) {
        try {
            options.url = `${this.urlRoot}${options.url}`;
            let accessToken = getTokenFromStorage();

            if (!options.headers) {
                options.headers = {};
                options.headers = { 'Content-Type': 'application/json' };
            }
            if (accessToken) options.headers.Authorization = `Bearer ${accessToken}`;

            return await axios({ ...this.optionsDefault, ...options })
                .catch((error: Error) => error);
        } catch (e) {
            if (e instanceof Error) console.log(e.message)
        }
    }


    async login(login: string, password: string) {
        const options: AxiosRequestConfig = {
            url: `${this.urlRoot}/users/login/`,
            method: 'POST',
            data: {
                login: login,
                password: password
            }
        };
        const res = await axios({ ...this.optionsDefault, ...options })
            .catch((error: Error) => error);
        return res;
    }

    async logout() {
        const options: AxiosRequestConfig = {
            url: `/users/logout/`,
            method: 'POST',
            data: {}
        };
        const res = await this.requestWithToken(options)
        return res;
    }

    async userCheckAuth() {
        const options: AxiosRequestConfig = {
            url: `/users/auth/`,
            method: 'GET',
        };
        const res = await this.requestWithToken(options)
        if (res !== undefined) {
            return res
        }
        return false
    }

    async findCatalogItems(query: string, categories: number[], page: number) {

        const options: AxiosRequestConfig = {
            url: `/search?search=${query}&categories=${categories}&page=${page}`,
            method: 'GET',
        };
        const res = await this.requestWithToken(options);
        return res
    }

    async findTotalPages(query: string, categories: number[]) {

        const options: AxiosRequestConfig = {
            url: `/search/total-pages/?search=${query}&categories=${categories}`,
            method: 'GET',
        };
        const res = await this.requestWithToken(options);
        return res
    }

    async addCategoryItem(title: string) {
        const options: AxiosRequestConfig = {
            url: `/category/`,
            method: 'POST',
            data: {
                title: title
            }
        };
        const res = await this.requestWithToken(options)
        return res;
    }

    async getAllCategories() {
        const options: AxiosRequestConfig = {
            url: `/category/`,
            method: 'GET',
        };
        const res = await this.requestWithToken(options);
        return res
    }

    async updateCategoryItem(id: number, title: string) {
        const options: AxiosRequestConfig = {
            url: `/category/`,
            method: 'PUT',
            data: {
                id: id,
                title: title
            }
        };
        const res = await this.requestWithToken(options)
        return res;
    }

    async deleteCategoryItem(id: number) {
        const options: AxiosRequestConfig = {
            url: `/category/`,
            method: 'DELETE',
            data: {
                id: id,
            }
        };
        const res = await this.requestWithToken(options)
        return res;
    }

    async addCatalogItem(title: string, anons: string, img: File | string, relatedCategories: number[]) {
        let url = ''
        if ((typeof (img) !== 'string') && img.type) {
            const resFile = await this.uploadOneFile(img, `catalog-image`, `/catalog/upload/`)
            if (!(resFile instanceof Error)) url = resFile.data.url
        }
        if ((typeof (img) === 'string')) url = img

        const options: AxiosRequestConfig = {
            url: `/catalog/`,
            method: 'POST',
            data: {
                title: title,
                anons: anons,
                image: url,
                categoriesId: relatedCategories,
            }
        };
        const res = await this.requestWithToken(options)
        return res;
    }

    async updCatalogItem(id: number, title: string, anons: string, img: File | string, relatedCategories: number[]) {
        let url = ''
        if ((typeof (img) !== 'string') && img.type) {

            const resFile = await this.uploadOneFile(img, `catalog-image`, `/catalog/upload/`)
            if (!(resFile instanceof Error)) url = resFile.data.url
        }
        if ((typeof (img) === 'string')) url = img

        const options: AxiosRequestConfig = {
            url: `/catalog/`,
            method: 'PUT',
            data: {
                id: id,
                title: title,
                anons: anons,
                image: url,
                categoriesId: relatedCategories,
            }
        };
        const res = await this.requestWithToken(options)
        return res;
    }

    async delCatalogItem(id: number) {
        const options: AxiosRequestConfig = {
            url: `/catalog/`,
            method: 'DELETE',
            data: {
                id: id,
            }
        };
        const res = await this.requestWithToken(options)
        return res;
    }

    async uploadOneFile(file: File, field: string, url: string) {

        let data = new FormData();
        data.append(field, file)

        const options: AxiosRequestConfig = {
            url: url,
            method: 'POST',
            headers: { 'Content-Type': 'multipart/form-data' },
            data: data
        };
        const res = await this.requestWithToken(options)
        return res;
    }

    async getCatalogItem(id: number) {
        const options: AxiosRequestConfig = {
            url: `/catalog/?id=${id}`,
            method: 'GET',
        };
        const res = await this.requestWithToken(options)
        return res;
    }

}

export const api = new Api(process.env.BACKEND_HOST);