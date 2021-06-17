import { catalogStore } from './catalogStore';
import { makeAutoObservable, runInAction } from "mobx";
import { api } from "../api";
import { mapCatalog } from "../libs/mapCatalog"

export interface ISearchStore {
    form: {
        searchString: string;
        setSearchString: Function;
        selectdedCategories: number[];
        addSelectdedCategories: Function;
        delSelectdedCategories: Function;
    }
    request: {
        searchString: string;
        selectdedCategories: number[];
    },
    setRequestParams: Function;
    setRequestParamsFromBowserSearchString: Function,
    totalPages: number,
    setTotalPages: Function;
    currentPage: number,
    find: Function;
    findNextPage: Function;
}

export const searchStore = makeAutoObservable({
    form: {
        searchString: '',
        setSearchString(searchString: string): void {
            searchStore.form.searchString = searchString;
        },
        selectdedCategories: [],
        addSelectdedCategories(categoryId: number) {
            runInAction(() => searchStore.form.selectdedCategories.push(categoryId))
        },
        delSelectdedCategories(categoryId: number) {
            runInAction(() => searchStore.form.selectdedCategories.splice(searchStore.form.selectdedCategories.indexOf(categoryId), 1))
        },
    },
    request: {
        searchString: '',
        selectdedCategories: []
    },
    setRequestParams() {
        runInAction(() => {
            searchStore.request.searchString = searchStore.form.searchString
            searchStore.request.selectdedCategories = searchStore.form.selectdedCategories
        })
    },
    setRequestParamsFromBowserSearchString(searchString: string | null, categories: number[] | null) {
            searchStore.request.searchString = searchString
            searchStore.request.selectdedCategories = categories
    },
    totalPages: null,
    async setTotalPages() {
        const res = await api.findTotalPages(searchStore.form.searchString, searchStore.form.selectdedCategories)
        if (res.status === 200) {
            runInAction(() => {
                searchStore.totalPages = res.data.totalPages
            })
        }
    },
    currentPage: 1,
    async find(currentPage = 1) {
        const res = await api.findCatalogItems(searchStore.request.searchString, searchStore.request.selectdedCategories, currentPage)
        if (res.status === 200 && res.data.result) {
            runInAction(() => {
                catalogStore.catalog = mapCatalog(res.data.result)
                searchStore.currentPage = currentPage
            })
        } else {
            runInAction(() => catalogStore.catalog = { items: {}, list: [] })
        }
    },
    async findNextPage() {
        const nextPage = searchStore.currentPage + 1
        const res = await api.findCatalogItems(searchStore.request.searchString, searchStore.request.selectdedCategories, nextPage)
        if (res.status === 200 && res.data.result) {
            const mapedCatalog = mapCatalog(res.data.result)
            runInAction(() => {
                catalogStore.catalog.items = { ...catalogStore.catalog.items, ...mapedCatalog.items }
                catalogStore.catalog.list.push(mapedCatalog.list)
                searchStore.currentPage = nextPage
            })
        } else {
            runInAction(() => catalogStore.catalog = { items: {}, list: [] })
        }
    }

});
