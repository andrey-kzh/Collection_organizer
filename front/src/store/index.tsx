import * as React from "react";
import {searchStore} from "./searchStore";
import {SearchStoreInterface} from "./searchStore"

interface State {
    searchStore: SearchStoreInterface;
}

interface Props {
    children: React.ReactNode;
}

const state = {
    searchStore: searchStore
};

export const store = React.createContext<State>(state);

export const MobXProvider = ({children}: Props): JSX.Element => {
    return <store.Provider value={state}> {children} </store.Provider>
};