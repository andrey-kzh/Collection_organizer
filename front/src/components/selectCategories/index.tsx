import * as React from "react";
import { useEffect } from "react"
import './style.sass'
import { observer } from "mobx-react";
import { store } from '../../store';
import { SelectCategoriesItem } from '../selectCategoriesItem'
import { Popup } from '../popup'

export const SelectCategories: React.FC = observer(() => {

    const {
        categoriesStore: { categories, getAllCategories },
        searchStore: { isOpenCategory, setIsOpenCategory, selectdedCategories, addSelectdedCategories, delSelectdedCategories }
    } = React.useContext(store)

    useEffect(() => {
        if (categories === null) {
            getAllCategories()
        }
    })

    if (categories === null) {
        return <div>Loading</div>
    }


    const renderCategories = () => {
        let active
        return categories.list.map((id: number) => {
            (selectdedCategories.indexOf(id) !== -1) ? active = true : active = false
            return <SelectCategoriesItem
                key={id}
                isActive = {active}
                title={`${categories.items[id].title}`}
                addCallback={() => addSelectdedCategories(id)}
                delCallback={() => delSelectdedCategories(id)} />
        })
    }

    return (
        isOpenCategory &&
        <Popup className='' closeCallback={() => setIsOpenCategory(false)}>
            <div className="select-category-header">Категории</div>
            <div className="select-category select-category_none">
                {renderCategories()}
            </div>
        </Popup>
    )
})