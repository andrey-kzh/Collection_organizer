const axios = require('axios');
import { getTokenFromStorage } from "../libs/localStorage";

interface IApi {
    urlRoot: String,
    optionsDefault: {},
    requestWithToken: Function,
    login: Function,
    userCheckAuth: Function,
    findCatalogItems: Function
}

interface IOptions {
    method: string,
    url: string,
    data?: object
    responseType?: string,
    headers: {
        Authorization?: string,
        'Content-Type': string,
    }
}

class Api implements IApi {

    constructor() {
        axios.interceptors.response.use((response: any) => response, (error: any) => {
            return Promise.reject(error.response)
        });
    }

    urlRoot = 'http://localhost:3000/api';
    optionsDefault = {};

    async requestWithToken(options: { [key: string]: any }) {
        try {
            options.url = `${this.urlRoot}${options.url}`;
            let accessToken = getTokenFromStorage();

            if (!options.headers) options.headers = {};
            options.headers = { 'Content-Type': 'application/json' };
            if (accessToken) options.headers.Authorization = `Bearer ${accessToken}`;

            return await axios(<IOptions>{ ...this.optionsDefault, ...options })
                .catch((error: any) => error);
        } catch (e) {
            console.log(e.message)
        }
    }


    async login(login: string, password: string) {
        const options = {
            url: `${this.urlRoot}/users/login/`,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: {
                login: login,
                password: password
            }
        };
        const res = await axios(<IOptions>{ ...this.optionsDefault, ...options })
            .catch((error: any) => error);
        return res;
    }

    async logout() {
        const options = {
            url: `/users/logout/`,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: {}
        };
        const res = await this.requestWithToken(options)
        return res;
    }

    async userCheckAuth() {
        const options = {
            url: `/users/auth/`,
            method: 'GET',
        };
        const res = await this.requestWithToken(options)
        if (res !== undefined) {
            return res
        }
        return false
    }

    async findCatalogItems(query: string, categories: number[]) {

        const options = {
            url: `/search?search=${query}&categories=${categories}`,
            method: 'GET',
        };
        const res = await this.requestWithToken(options);
        return res
    }

    async addCategoryItem(title: string) {
        const options = {
            url: `/category/`,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: {
                title: title
            }
        };
        const res = await this.requestWithToken(options)
        return res;
    }

    async getAllCategories() {
        const options = {
            url: `/category/`,
            method: 'GET',
        };
        const res = await this.requestWithToken(options);
        return res
    }

    async updateCategoryItem(id: number, title: string) {
        const options = {
            url: `/category/`,
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            data: {
                id: id,
                title: title
            }
        };
        const res = await this.requestWithToken(options)
        return res;
    }

    async deleteCategoryItem(id: number) {
        const options = {
            url: `/category/`,
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            data: {
                id: id,
            }
        };
        const res = await this.requestWithToken(options)
        return res;
    }

}

export const api = new Api();