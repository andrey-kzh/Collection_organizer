import * as React from "react";
import './style.sass'
import { observer } from "mobx-react";
import { store } from '../../store'
import { Categories } from "../categories";

export const SearchForm: React.FC = observer(() => {

    const { searchStore: { query, setQuery, find,
            selectdedCategories, addSelectdedCategories, delSelectdedCategories, } } = React.useContext(store)

    return (
        <div className="search-form-wrap">
            <form onSubmit={(e) => e.preventDefault()} className="search-form">
                <div className="search-form__input-wrap">
                    <input onChange={(e) => setQuery(e.target.value)} value={query}
                        className="search-form__input" type="text" name="title" placeholder="Название" />
                    <button onClick={() => find()} className="search-form__button" type="submit">Найти</button>

                    <Categories
                        selectdedCategories={selectdedCategories}
                        addSelectdedCategories={addSelectdedCategories}
                        delSelectdedCategories={delSelectdedCategories} />

                    {console.log(query)}

                </div>
            </form>
        </div>
    )
})