import * as React from "react"
import './style.sass'
import { observer } from "mobx-react"
import { store } from '../../store'
import { CatalogItem } from '../catalogItem'
import { Button } from "../button"
import useConfirmationDialog from '../../hooks/useConfirmationDialog'

export const Catalog: React.FC = observer(() => {

    const { authStore: { isAuth },
        catalogStore: { catalog, delCatalogItem, setEditWindow, setDeleteId },
        searchStore: { currentPage, totalPages, findNextPage } } = React.useContext(store)

    const { ConfirmationDialog, onOpen } = useConfirmationDialog({
        header: 'Удалить?',
        confirmTitle: 'Да',
        cancelTitle: 'Нет',
        onConfirmClick: () => confirmDelete()
    })

    if (catalog === null) return <div>Loading</div>

    const handleDelete = (id: number) => {
        setDeleteId(id)
        onOpen()
    }

    const confirmDelete = () => {
        onOpen()
        delCatalogItem()
    }

    const renderCatalogItems = () => {
        return catalog.list.map((id: number) => {
            return <CatalogItem
                key={id}
                isAuth={isAuth}
                title={catalog.items[id].title}
                anons={catalog.items[id].anons}
                image={catalog.items[id].image}
                categories={catalog.items[id].categories}
                editCallback={() => setEditWindow({
                    isOpen: true,
                    catalogId: id,
                    title: catalog.items[id].title,
                    anons: catalog.items[id].anons,
                    img: catalog.items[id].image,
                    previewImg: catalog.items[id].image,
                    relatedCategories: catalog.items[id].categories.map((category: { [index: string]: any }) => category.id)
                })}
                delCallback={() => handleDelete(id)}
            />
        })
    }

    return (
        <>
            <div className="catalog">
                {(catalog.list.length > 0) ? renderCatalogItems() : <div>Ничего не найдено</div>}
                {((totalPages > 1) && (currentPage < totalPages)) &&
                    <Button
                        name="Далее"
                        className="button_paging"
                        callback={() => findNextPage()} /> }
            </div>
            <ConfirmationDialog />
        </>
    )
})