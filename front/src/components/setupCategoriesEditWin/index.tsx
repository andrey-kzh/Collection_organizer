import * as React from "react";
import './style.sass'
import { Popup } from "../popup";
import { store } from "../../store";
import { observer } from "mobx-react";
import useConfirmationDialog from "../../hooks/useConfirmationDialog"

interface IProps {
    id: number,
    title: string,
}

export const SetupCategoriesEditWin: React.FC = observer(() => {

    const { setupStore: { editWindow: { id, isOpen, title }, setEditWindow, updateCategoryItem, deleteCategoryItem } } = React.useContext(store)

    const { ConfirmationDialog, onOpen } = useConfirmationDialog({
        header: 'Удалить?',
        confirmTitle: 'Да',
        cancelTitle: 'Нет',
        onConfirmClick: () => confirmDelete()
    })

    const confirmDelete = () => {
        onOpen()
        deleteCategoryItem()
    }

    return (<>
        {isOpen && <Popup
            closeCallback={() => setEditWindow({ isOpen: false, id: null, title: '' })}
            className="popup-wrap_setup-categorys">
            <div className="setup-category-edit">
                <input className="setup-category-edit__title-input"
                    type="text"
                    name="new_title"
                    value={title}
                    onChange={(e) => setEditWindow({ title: e.target.value })}
                    placeholder="Название" />
            </div>
            <div className="setup-category-edit__buttons-wrap">
                <button onClick={() => updateCategoryItem()} className="button button_catalog-item">Сохранить</button>
                <button onClick={() => onOpen()} className="button button_catalog-item">Удалить</button>
            </div>
        </Popup>},
        <ConfirmationDialog />
    </>
    )

})