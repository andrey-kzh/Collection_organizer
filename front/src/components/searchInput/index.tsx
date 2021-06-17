import * as React from "react";
import './style.sass'
import { observer } from "mobx-react";
import { store } from '../../store'

export const SearchInput: React.FC = observer(() => {

    const { searchStore: { form: { searchString, setSearchString } } } = React.useContext(store)

    return (
        <input onChange={(e) => setSearchString(e.target.value)} value={searchString}
            className="search-form__input" type="text" name="title" placeholder="Название" />
    )
})