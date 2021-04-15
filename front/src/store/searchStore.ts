import { makeAutoObservable, runInAction } from "mobx";
import { api } from "../api";

export interface ISearchStore {
    query: string;
    setQuery: Function;
    isOpenCategory: boolean;
    setIsOpenCategory: Function;
    selectdedCategories: [number];
    addSelectdedCategories: Function;
    delSelectdedCategories: Function;
    find: Function;
    computedQuery: Function;
}

export const searchStore = makeAutoObservable({
    query: '',
    setQuery(query: string): void {
        searchStore.query = query;
    },
    isOpenCategory: false,
    setIsOpenCategory(isOpen: boolean) {
        runInAction(() => searchStore.isOpenCategory = isOpen)
    },
    selectdedCategories: [],
    addSelectdedCategories(categoryId: number) {
        runInAction(() => searchStore.selectdedCategories.push(categoryId))
    },
    delSelectdedCategories(categoryId: number) {
        runInAction(() => searchStore.selectdedCategories.splice(searchStore.selectdedCategories.indexOf(categoryId), 1))
    },
    async find() {
        const res = await api.findCatalogItems(searchStore.query, searchStore.selectdedCategories)
        console.log(res)
    },
    /*
    get computedQuery(): any {
        return searchStore.query + '123'
    },
    */
});
