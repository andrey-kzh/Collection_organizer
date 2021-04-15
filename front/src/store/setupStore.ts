import { makeAutoObservable, runInAction } from "mobx";
import { api } from "../api";
import { categoriesStore } from "../store/categoriesStore"

export interface ISetupStore {
    categoryTitle: string;
    setCategoryTitle: Function;
    addCategoryItem: Function;
    updateCategoryItem: Function;
    deleteCategoryItem: Function;
    editWindow: { isOpen: boolean, title: string, id: number };
    setEditWindow: Function;
}

export const setupStore = makeAutoObservable({
    categoryTitle: '',
    setCategoryTitle(title: string): void {
        runInAction(() => setupStore.categoryTitle = title);
    },
    async addCategoryItem() {
        const res = await api.addCategoryItem(setupStore.categoryTitle);
        if (res.status === 200) {
            runInAction(() => {
                categoriesStore.categories.items[res.data.id] = { id: res.data.id, title: setupStore.categoryTitle }
                categoriesStore.categories.list.push(res.data.id)
                setupStore.categoryTitle = '';
            })
        }
    },
    async updateCategoryItem() {
        const res = await api.updateCategoryItem(setupStore.editWindow.id, setupStore.editWindow.title);
        if (res.status === 200) {
            runInAction(() => {
                categoriesStore.categories.items[res.data.id].title = setupStore.editWindow.title
                setupStore.setEditWindow({ isOpen: false, id: null, title: '' })
            })
        }
    },
    async deleteCategoryItem() {
        const res = await api.deleteCategoryItem(setupStore.editWindow.id)
        if (res.status === 200 && res.data.id !== null) {
            runInAction(() => {
                const i = categoriesStore.categories.list.indexOf(res.data.id);
                categoriesStore.categories.list.splice(i, 1)
                delete categoriesStore.categories.items[res.data.id]
                setupStore.setEditWindow({ isOpen: false, id: null, title: '' })
            })
        }
    },
    editWindow: {
        isOpen: false,
        id: null,
        title: '',
    },
    setEditWindow({ isOpen, id, title }: { [index: string]: any }) {
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