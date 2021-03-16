import {makeAutoObservable} from "mobx";

export interface SearchStoreInterface {
    query: string;
    computedQuery: Function;
    setQuery: Function;
    find: Function;
}

export const searchStore = makeAutoObservable({
    query: '',
    get computedQuery(): any {
        return searchStore.query + '123'
    },
    setQuery(query: string): void {
        searchStore.query = query;
    },
    async find() {
        const result = await fetch(
            `http://localhost:3000/api/search?search=${searchStore.query}&categories=${[8]}`,
            {
                method: 'GET',
                headers: {
                    'Authentication': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQxLCJpYXQiOjE2MTQxNjk2OTV9.0KUq0bEAdNsK2qVj8xGVWH0PbQODpPDtP4w9pduQIe4',
                    'Content-Type': 'application/json;charset=utf-8'
                },
            }
        ).then(res => res.json())

        console.log(result)
    }
});