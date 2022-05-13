import * as React from "react";
import { useState, useEffect } from "react";
import './style.sass'
import { observer } from "mobx-react";
import { store } from '../../store'
import { CategoriesAddButton } from "../categoriesAddButton";
import { CategoriesItem } from "../categoriesItem";
import { SelectCategories } from "../selectCategories"

interface IProps {
  selectdedCategories: number[],
  delSelectdedCategories: (categoryId: number) => void,
  addSelectdedCategories: (categoryId: number) => void
}

export const Categories: React.FC<IProps> = observer(({ selectdedCategories, delSelectdedCategories, addSelectdedCategories }) => {

  const { categoriesStore: { categories, getAllCategories } } = React.useContext(store)
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (categories === null) getAllCategories()
  }, [])

  if (categories === null) return <div>Loading</div>

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
        <CategoriesAddButton callback={() => setIsOpen(true)} />
        <div className="categorys-items-wrap">
          {renderCategories()}
        </div>
      </div>

      {isOpen && <SelectCategories
        selectdedCategories={selectdedCategories}
        addSelectdedCategories={addSelectdedCategories}
        delSelectdedCategories={delSelectdedCategories}
        setIsOpen={setIsOpen} />}
    </>
  )
})