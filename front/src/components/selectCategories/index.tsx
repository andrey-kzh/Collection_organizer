import * as React from "react";
import './style.sass'
import { observer } from "mobx-react";
import { store } from '../../store';
import { SelectCategoriesItem } from '../selectCategoriesItem'
import { Popup } from '../popup'

interface IProps {
    selectdedCategories: number[],
    delSelectdedCategories: (id: number) => void,
    addSelectdedCategories: (id: number) => void,
    setIsOpen: (n: boolean) => void
}

export const SelectCategories: React.FC<IProps> = observer(({ selectdedCategories, delSelectdedCategories, addSelectdedCategories, setIsOpen }) => {

    const {
        categoriesStore: { categories } } = React.useContext(store)

    const renderCategories = () => {
        let isActive
        return categories.list.map((id: number) => {
            if (categories.list.indexOf(id) !== -1) {
                (selectdedCategories.indexOf(id) !== -1) ? isActive = true : isActive = false
                return <SelectCategoriesItem
                    key={id}
                    isActive={isActive}
                    title={`${categories.items[id].title}`}
                    addCallback={() => addSelectdedCategories(id)}
                    delCallback={() => delSelectdedCategories(id)} />
            }
        })
    }

    return (
        <Popup className='popup-wrap_categories-selector' closeCallback={() => setIsOpen(false)}>
            <div className="select-category-header">Категории</div>
            <div className="select-category select-category_none">
                {renderCategories()}
            </div>
        </Popup>
    )
})