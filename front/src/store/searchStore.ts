import {makeAutoObservable} from "mobx";
import {api} from "../api";

export interface ISearchStore {
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
        const res = await api.findCatalogItems(searchStore.query, [8])
        console.log(res)
    }
});