import { makeAutoObservable, runInAction } from "mobx";
import { mapCategories } from "../libs/mapCategories";
import { api } from "../api";

export interface ICategoriesStore {
    categories: { [index: string]: any };
    getAllCategories: () => void;
}

export const categoriesStore = makeAutoObservable({
    categories: null,
    async getAllCategories() {
        const res = await api.getAllCategories();
        if (!(res instanceof Error)) {
            if (res.status === 200) {
                runInAction(() => categoriesStore.categories = mapCategories(res.data));
            } else {
                runInAction(() => categoriesStore.categories = { items: {}, list: [] })
            }
        }
    },
});