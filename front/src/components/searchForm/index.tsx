import * as React from "react";
import './style.sass'
import { useEffect } from "react";
import { observer } from "mobx-react";
import { store } from '../../store'
import { Categories } from "../categories";
import { useHistory, useLocation } from "react-router-dom";

export const SearchForm: React.FC = observer(() => {

    const { searchStore: { find, setTotalPages, setRequestParams,
        form: { searchString, setSearchString, selectdedCategories, addSelectdedCategories, delSelectdedCategories } },
        catalogStore: { catalog } } = React.useContext(store)

    const history = useHistory()
    const location = useLocation()

    const onClickFind = () => {
        const query = encodeURIComponent(searchString)
        const url = encodeURI(`/?search=${query}&categories=${selectdedCategories}`)
        history.push(url)
        setRequestParams()
        setTotalPages()
        find()
    }

    /* useEffect если catalog === null
    1) получить параметры из адресной строки
    2) Обновить соответствующие свойства в сторе
    3) Вызвать метод для обновления пэйджинга
    3) Вызвать метод поиска
    4) Если параметров нет, то искать все
    */

    useEffect(() => {
        if (catalog === null) {
            const searchString = location.search;
            const params = new URLSearchParams(searchString);
            //console.log(decodeURIComponent(params.get('search')))
            //console.log(decodeURIComponent(params.get('categories')))
            //setRequestParamsFromBowserSearchString()
            setTotalPages()
            find()
        }
    }, [])

    return (
        <div className="search-form-wrap">
            <form onSubmit={(e) => e.preventDefault()} className="search-form">
                <div className="search-form__input-wrap">
                    <input onChange={(e) => setSearchString(e.target.value)} value={searchString}
                        className="search-form__input" type="text" name="title" placeholder="Название" />
                    <button onClick={() => onClickFind()} className="search-form__button" type="submit">Найти</button>

                    <Categories
                        selectdedCategories={selectdedCategories}
                        addSelectdedCategories={addSelectdedCategories}
                        delSelectdedCategories={delSelectdedCategories} />

                </div>
            </form>
        </div>
    )
})