import { makeAutoObservable, runInAction } from "mobx";
import { mapCategories } from "../libs/mapCategories";
import { api } from "../api";

export interface ICategoriesStore {
    categories: { [index: string]: any };
    getAllCategories: Function;
    isOpenCategoriesSelector: boolean;
    setIsOpenCategoriesSelector: Function;
}

export const categoriesStore = makeAutoObservable({
    categories: null,
    async getAllCategories() {
        const res = await api.getAllCategories();
        if (res.status === 200) {
            runInAction(() => categoriesStore.categories = mapCategories(res.data));
        } else {
            runInAction(() => categoriesStore.categories = { items: {}, list: [] })
        }
    },
    isOpenCategoriesSelector: false,
    setIsOpenCategoriesSelector(isOpen: boolean) {
        runInAction(() => categoriesStore.isOpenCategoriesSelector = isOpen)
    },
});