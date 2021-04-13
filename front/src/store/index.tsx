import * as React from "react";
import {searchStore} from "./searchStore";
import {ISearchStore} from "./searchStore"
import {authStore} from "./authStore"
import {IAuthStore} from "./authStore"
import {setupStore} from "./setupStore"
import {ISetupStore} from "./setupStore"
import {categoriesStore} from "./categoriesStore"
import {ICategoriesStore} from "./categoriesStore"

interface State {
    searchStore: ISearchStore;
    authStore: IAuthStore;
    setupStore: ISetupStore;
    categoriesStore: ICategoriesStore;
}

interface Props {
    children: React.ReactNode
}

const state = {
    searchStore: searchStore,
    authStore: authStore,
    setupStore: setupStore,
    categoriesStore: categoriesStore,
};

export const store = React.createContext<State>(state);

export const MobXProvider = ({children}: Props): JSX.Element => {
    return <store.Provider value={state}> {children} </store.Provider>
};