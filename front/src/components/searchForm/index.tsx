import * as React from "react";
import './style.sass'
import { useEffect } from "react";
import { observer } from "mobx-react";
import { store } from '../../store'
import { Categories } from "../categories";
import { useHistory, useLocation } from "react-router-dom";
import { SearchInput } from "../searchInput";

export const SearchForm: React.FC = observer(() => {

    const { searchStore: { find, setTotalPages, setRequestParams, setRequestParamsFromBowserSearchString,
        form: { selectdedCategories, addSelectdedCategories, delSelectdedCategories },
        request: { searchString } } } = React.useContext(store)

    const history = useHistory()
    const location = useLocation()

    const onClickFind = () => {
        setRequestParams()
        const query = encodeURIComponent(searchString)
        const url = encodeURI(`/?search=${query}&categories=${selectdedCategories}`)
        history.push(url)
        setTotalPages()
        find()
    }

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        let searchString = '', categories = ''
        if (params.has('search')) searchString = decodeURIComponent(params.get('search'))
        if (params.has('categories')) categories = decodeURIComponent(params.get('categories'))
        setRequestParamsFromBowserSearchString(searchString, categories)
        setTotalPages()
        find()
    }, [])

    return (
        <div className="search-form-wrap">
            <form onSubmit={(e) => e.preventDefault()} className="search-form">
                <div className="search-form__input-wrap">
                    <SearchInput />
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