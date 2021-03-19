import * as React from "react";
import {searchStore} from "./searchStore";
import {ISearchStore} from "./searchStore"
import {authStore} from "./authStore"
import {IAuthStore} from "./authStore"

interface State {
    searchStore: ISearchStore;
    authStore: IAuthStore;
}

interface Props {
    children: React.ReactNode
}

const state = {
    searchStore: searchStore,
    authStore: authStore,
};

export const store = React.createContext<State>(state);

export const MobXProvider = ({children}: Props): JSX.Element => {
    return <store.Provider value={state}> {children} </store.Provider>
};