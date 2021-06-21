import * as React from "react";
import './style.sass'
import {observer} from "mobx-react";
import {store} from "../../store";


export const AddNewCategoryForm: React.FC = observer(() => {

    const {setupStore: {categoryTitle, setCategoryTitle, addCategoryItem}} = React.useContext(store)

    return (
        <div className="add-category-form-wrap">
            <form onSubmit={(e) => e.preventDefault()} className="add-category-form">
                {/*
                <div className="add-category-form__header">Добавить категорию</div>
                */}
                <div className="add-category-form__input-wrap">

                    <input
                        onChange={(e) => setCategoryTitle(e.target.value)}
                        value={categoryTitle} className="add-category-form__input"
                        type="text" name="title" placeholder="Название"/>

                    <button
                        onClick={()=>addCategoryItem()}
                        className="add-category-form__button" type="submit">
                        Добавить
                    </button>

                </div>
            </form>
        </div>
    )

})