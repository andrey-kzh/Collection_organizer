import * as React from "react";
import {searchStore} from "./searchStore";
import {ISearchStore} from "./searchStore"
import {authStore} from "./authStore"
import {IAuthStore} from "./authStore"
import {setupStore} from "./setupStore"
import {ISetupStore} from "./setupStore"
import {categoriesStore} from "./categoriesStore"
import {ICategoriesStore} from "./categoriesStore"
import {catalogStore} from "./catalogStore"
import {ICatalogStore} from "./catalogStore"

interface IState {
    searchStore: ISearchStore;
    authStore: IAuthStore;
    setupStore: ISetupStore;
    categoriesStore: ICategoriesStore;
    catalogStore: ICatalogStore;
}

interface IProps {
    children: React.ReactNode
}

const state = {
    searchStore: searchStore,
    authStore: authStore,
    setupStore: setupStore,
    categoriesStore: categoriesStore,
    catalogStore: catalogStore,
};

export const store = React.createContext(state as IState);

export const MobXProvider = ({children}: IProps): JSX.Element => {
    return <store.Provider value={state}> {children} </store.Provider>
};
