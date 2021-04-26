import * as React from "react";
import './style.sass'
import { observer } from "mobx-react";
import { store } from '../../store'
import { CategoriesAddButton } from "../categoriesAddButton";
import { CategoriesItem } from "../categoriesItem";
import { SelectCategories } from "../selectCategories"

interface IProps {
  selectdedCategories: number[],
  delSelectdedCategories: Function
  addSelectdedCategories: Function
}

export const Categories: React.FC<IProps> = observer(({ selectdedCategories, delSelectdedCategories, addSelectdedCategories }) => {

  const {categoriesStore: { categories, setIsOpenCategoriesSelector }} = React.useContext(store)

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

      <SelectCategories
          selectdedCategories = {selectdedCategories}
          addSelectdedCategories ={addSelectdedCategories}
          delSelectdedCategories={delSelectdedCategories} />
      
    </>
  )
})