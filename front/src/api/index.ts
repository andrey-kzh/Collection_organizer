const axios = require('axios');

interface IApi {
    urlRoot: String,
    optionsDefault: {},
    requestWithToken: Function,
    findCatalogItems: Function
}

interface IOptions {
    method: string,
    url: string,
    data?: object
    responseType?:string,
    headers: {
        Authorization?: string,
        'Content-Type': string,
    }
}

class Api implements IApi {

    urlRoot = 'http://localhost:3000/api';
    optionsDefault = {};

    async requestWithToken(options:{[key:string]:any}) {
        try {

            options.url = `${this.urlRoot}${options.url}`;
            let accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQxLCJpYXQiOjE2MTQxNjk2OTV9.0KUq0bEAdNsK2qVj8xGVWH0PbQODpPDtP4w9pduQIe4';

            if (!options.headers) options.headers = {};
            options.headers = {'Content-Type': 'application/json'};
            if (accessToken) options.headers.Authorization = `Bearer ${accessToken}`;

            return await axios(<IOptions>{...this.optionsDefault, ...options});
        } catch (e) {
            console.log(e.message)
        }
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