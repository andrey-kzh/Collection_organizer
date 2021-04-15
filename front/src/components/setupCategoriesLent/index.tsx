import * as React from "react";
import './style.sass'
import {observer} from "mobx-react";
import {SetupCategoriesItem} from "../setupCategoriesItem";
import {SetupCategoriesEditWin} from "../setupCategoriesEditWin";
import {useEffect} from "react";
import {store} from "../../store";

export const SetupCategoriesLent: React.FC = observer(() => {

    const { categoriesStore: { categories, getAllCategories }, setupStore: { setEditWindow }} = React.useContext(store)

    useEffect(() => {
        if (categories === null) {
            getAllCategories();
        }
    }, []);

    const renderCategories = () => {
        return categories.list.slice().reverse().map((categoryId: number) => {
            return (
                <SetupCategoriesItem
                    key={categoryId}
                    id={categoryId}
                    openEditWindow={() => setEditWindow(
                        {isOpen: true, id: categoryId, title: categories.items[categoryId].title}
                    )}
                    title={categories.items[categoryId].title}/>
            )
        })
    };

    if (categories === null) {
        return <div>Loading</div>
    }

    return <>
        <div className="setup-categorys">
            {renderCategories()}
        </div>
        <SetupCategoriesEditWin/>
    </>
})