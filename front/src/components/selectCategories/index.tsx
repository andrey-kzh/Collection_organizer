import * as React from "react";
import { useEffect } from "react"
import './style.sass'
import { observer } from "mobx-react";
import { store } from '../../store';
import { SelectCategoriesItem } from '../selectCategoriesItem'
import { Popup } from '../popup'

interface IProps {
    selectdedCategories: number[],
    delSelectdedCategories: Function
    addSelectdedCategories: Function
  }

export const SelectCategories: React.FC<IProps> = observer(({ selectdedCategories, delSelectdedCategories, addSelectdedCategories }) => {

    const {
        categoriesStore: { categories, getAllCategories, isOpenCategoriesSelector, setIsOpenCategoriesSelector }} = React.useContext(store)

    useEffect(() => {
        if (categories === null) {
            getAllCategories()
        }
    },[])

    if (categories === null) {
        return <div>Loading</div>
    }


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
        isOpenCategoriesSelector &&
        <Popup className='' closeCallback={() => setIsOpenCategoriesSelector(false)}>
            <div className="select-category-header">Категории</div>
            <div className="select-category select-category_none">
                {renderCategories()}
            </div>
        </Popup>
    )
})