import { makeAutoObservable, runInAction } from "mobx";
import { api } from "../api";

export interface ICatalogStore {
    editWindow: {
        isOpen: boolean,
        catalogId: number,
        img: File | string,
        previewImg: string,
        title: string,
        anons: string,
        relatedCategories: number[]
    },
    setEditWindow: Function,
    addRelatedCategories: Function,
    delRelatedCategories: Function,
    addCatalogItem: Function
}

export const catalogStore = makeAutoObservable({
    editWindow: {
        isOpen: false,
        catalogId: null,
        img: '',
        previewImg: '',
        title: '',
        anons: '',
        relatedCategories: []
    },
    setEditWindow({ isOpen, catalogId, img, previewImg, title, anons, relatedCategories }: { [index: string]: any }) {

        if (isOpen === undefined) isOpen = catalogStore.editWindow.isOpen
        if (catalogId === undefined) catalogId = catalogStore.editWindow.catalogId
        if (img === undefined) img = catalogStore.editWindow.img
        if (previewImg === undefined) previewImg = catalogStore.editWindow.previewImg
        if (title === undefined) title = catalogStore.editWindow.title
        if (anons === undefined) anons = catalogStore.editWindow.anons
        if (relatedCategories === undefined) relatedCategories = catalogStore.editWindow.relatedCategories

        if (isOpen === false) {
            catalogId = null
            img = ''
            previewImg = ''
            title = ''
            anons = ''
            relatedCategories = []
        }

        runInAction(() => {
            catalogStore.editWindow.isOpen = isOpen
            catalogStore.editWindow.catalogId = catalogId
            catalogStore.editWindow.img = img
            catalogStore.editWindow.previewImg = previewImg
            catalogStore.editWindow.title = title
            catalogStore.editWindow.anons = anons
            catalogStore.editWindow.relatedCategories = relatedCategories
        })
    },
    addRelatedCategories(categoryId: number) {
        runInAction(() => catalogStore.editWindow.relatedCategories.push(categoryId))
    },
    delRelatedCategories(categoryId: number) {
        runInAction(() => catalogStore.editWindow.relatedCategories.splice(
            catalogStore.editWindow.relatedCategories.indexOf(categoryId), 1))
    },
    async addCatalogItem() {
        const res = await api.addCatalogItem(
            catalogStore.editWindow.title,
            catalogStore.editWindow.anons,
            catalogStore.editWindow.img,
            catalogStore.editWindow.relatedCategories
        )
        if (res) {
            catalogStore.setEditWindow({ isOpen: false })
            console.log(res)
        }
    },
});