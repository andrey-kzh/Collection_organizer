import * as React from "react";
import './style.sass'
import { observer } from "mobx-react";
import { store } from '../../store'
import { CategoriesAddButton } from "../categoriesAddButton";
import { CategoriesItem } from "../categoriesItem";
import { SelectCategories } from "../selectCategories"

export const Categories: React.FC = observer(() => {

  const {
    categoriesStore: { categories },
    searchStore: { setIsOpenCategoriesSelector, selectdedCategories, delSelectdedCategories } } = React.useContext(store)

  const renderCategories = () => {
    return selectdedCategories.map((categoryId: number) => {
      if (categories.list.indexOf(categoryId) !== -1) {
        return <CategoriesItem
          key={categories.items[categoryId].id}
          title={categories.items[categoryId].title}
          delCallback={() => delSelectdedCategories(categoryId)} />
      }
    })
  }

  return (
    <>
      <div className="categorys">
        <CategoriesAddButton callback={() => setIsOpenCategoriesSelector(true)} />
        <div className="categorys-items-wrap">
          {renderCategories()}
        </div>
      </div>

      <SelectCategories />
    </>
  )
})