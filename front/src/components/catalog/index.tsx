import * as React from "react";
import './style.sass'
import { useEffect } from "react";
import { observer } from "mobx-react";
import { store } from '../../store'
import { CatalogItem } from '../catalogItem'
import useConfirmationDialog from '../../hooks/useConfirmationDialog'

interface IProps { }

export const Catalog: React.FC<IProps> = observer(() => {

    const { authStore: { isAuth },
        catalogStore: { catalog, currentPage, getCatalogList, delCatalogItem, setEditWindow, setDeleteId } } = React.useContext(store)

    const { ConfirmationDialog, onOpen } = useConfirmationDialog({
        header: 'Удалить?',
        confirmTitle: 'Да',
        cancelTitle: 'Нет',
        onConfirmClick: () => confirmDelete()
    })

    useEffect(() => {
        if (catalog === null) {
            getCatalogList(currentPage)
        }
    }, [])

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
                {renderCatalogItems()}
            </div>,
            <ConfirmationDialog />
        </>
    )
})