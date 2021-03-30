const axios = require('axios');
import {getTokenFromStorage} from "../libs/localStorage";

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

    urlRoot = 'http://localhost:3000/api';
    optionsDefault = {};

    async requestWithToken(options: { [key: string]: any }) {
        try {

            options.url = `${this.urlRoot}${options.url}`;
            let accessToken = getTokenFromStorage();

            if (!options.headers) options.headers = {};
            options.headers = {'Content-Type': 'application/json'};
            if (accessToken) options.headers.Authorization = `Bearer ${accessToken}`;

            return await axios(<IOptions>{...this.optionsDefault, ...options});
        } catch (e) {
            console.log(e.message)
        }
    }


    async login(login: string, password: string) {
        const options = {
            url: `${this.urlRoot}/users/login/`,
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            data: {
                login: login,
                password: password
            }
        };
        const response = await axios(<IOptions>{...this.optionsDefault, ...options});
        return response.data;
    }

    async logout() {
        const options = {
            url: `/users/logout/`,
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            data: {}
        };
        const response = await this.requestWithToken(options);
        return response.data;
    }

    async userCheckAuth() {
        const options = {
            url: `/users/auth/`,
            method: 'GET',
        };
        const response = await this.requestWithToken(options);
        if (response !== undefined) {
            return response.data.result
        }
        return false
    }

    async findCatalogItems(query: string, categories: number[]) {

        const options = {
            url: `/search?search=${query}&categories=${categories}`,
            method: 'GET',
        };
        const response = await this.requestWithToken(options);
        return response.data
    }
}

export const api = new Api();