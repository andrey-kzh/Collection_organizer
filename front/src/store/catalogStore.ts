import { makeAutoObservable, runInAction } from "mobx";
import { api } from "../api";

export interface ICatalogStore {
    catalog: { [index: string]: any },
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
    saveCatalogItem: Function,
    addCatalogItem: Function,
    updateCatalogItem: Function,
    delCatalogItem: Function,
    deleteId: number,
    setDeleteId: Function,
}

export const catalogStore = makeAutoObservable({

    catalog: null,
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
    saveCatalogItem() {
        if (!catalogStore.editWindow.catalogId) {
            catalogStore.addCatalogItem()
        }
        else catalogStore.updateCatalogItem()
    },
    async updateCatalogItem() {
        const res = await api.updCatalogItem(
            catalogStore.editWindow.catalogId,
            catalogStore.editWindow.title,
            catalogStore.editWindow.anons,
            catalogStore.editWindow.img,
            catalogStore.editWindow.relatedCategories
        )
        if (res.status === 200) {
            catalogStore.setEditWindow({ isOpen: false })
            const catalogItem = await api.getCatalogItem(res.data.id)
            if (catalogItem.status === 200) {
                runInAction(() => {
                    catalogStore.catalog.items[catalogItem.data.id] = catalogItem.data
                })
            }
        }
    },
    async addCatalogItem() {
        const res = await api.addCatalogItem(
            catalogStore.editWindow.title,
            catalogStore.editWindow.anons,
            catalogStore.editWindow.img,
            catalogStore.editWindow.relatedCategories
        )
        if (res.status === 200) {
            catalogStore.setEditWindow({ isOpen: false })
            const catalogItem = await api.getCatalogItem(res.data.id)
            if (catalogItem.status === 200) {
                runInAction(() => {
                    catalogStore.catalog.items[catalogItem.data.id] = catalogItem.data
                    catalogStore.catalog.list.unshift(catalogItem.data.id)
                })
            }
        }
    },
    deleteId: null,
    setDeleteId(id: number) {
        runInAction(() => {
            catalogStore.deleteId = id
        })
    },
    async delCatalogItem() {
        const res = await api.delCatalogItem(catalogStore.deleteId)
        if (res.status === 200 && res.data.id) {
            runInAction(() => {
                const i = catalogStore.catalog.list.indexOf(res.data.id);
                catalogStore.catalog.list.splice(i, 1)
                delete catalogStore.catalog.items[res.data.id]
                catalogStore.deleteId = null
            })
        }
    }

});