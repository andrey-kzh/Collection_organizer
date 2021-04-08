import {makeAutoObservable, runInAction} from "mobx";
import {mapCategories} from "../libs/mapCategories";
import {api} from "../api";

export interface ISetupStore {
    categoryTitle: string;
    setCategoryTitle: Function;
    categories: { [index: string]: any };
    addCategoryItem: Function;
    getAllCategories: Function;
    editWindow: { isOpen: boolean, title: string, id: number };
    setEditWindow: Function;
    updateCategoryItem: Function;
    deleteCategoryItem: Function;
}

export const setupStore = makeAutoObservable({
    categoryTitle: '',
    setCategoryTitle(title: string): void {
        runInAction(() => setupStore.categoryTitle = title);
    },
    categories: null,
    async getAllCategories() {
        const res = await api.getAllCategories();
        if (res.status === 200) {
            runInAction(() => setupStore.categories = mapCategories(res.data));
        }
    },
    async addCategoryItem() {
        const res = await api.addCategoryItem(setupStore.categoryTitle);
        if (res.status === 200) {
            runInAction(() => {
                setupStore.categories.items[res.data.id] = {id: res.data.id, title: setupStore.categoryTitle}
                setupStore.categories.list.push(res.data.id)
                setupStore.categoryTitle = '';
            })
        }
    },
    async updateCategoryItem() {
        const res = await api.updateCategoryItem(setupStore.editWindow.id, setupStore.editWindow.title);
        if (res.status === 200) {
            runInAction(() => {
                setupStore.categories.items[res.data.id].title = setupStore.editWindow.title
                setupStore.setEditWindow({isOpen: false, id: null, title: ''})
            })
        }
    },
    async deleteCategoryItem() {
        const res = await api.deleteCategoryItem(setupStore.editWindow.id)
        if (res.status === 200 && res.data.id !== null) {
            runInAction(() => {
                const i = setupStore.categories.list.indexOf(res.data.id);
                setupStore.categories.list.splice(i, 1)
                delete setupStore.categories.items[res.data.id]
                setupStore.setEditWindow({isOpen: false, id: null, title: ''})
            })
        }
    },
    editWindow: {
        isOpen: false,
        id: null,
        title: '',
    },
    setEditWindow({isOpen, id, title}: { [index: string]: any }) {
        if (isOpen === undefined) isOpen = setupStore.editWindow.isOpen;
        if (id === undefined) id = setupStore.editWindow.id;
        if (title === undefined) title = setupStore.editWindow.title;
        runInAction(() => {
            setupStore.editWindow = {
                isOpen: isOpen,
                id: id,
                title: title,
            }
        })
    }
});