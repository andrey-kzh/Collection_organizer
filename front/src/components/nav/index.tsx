import * as React from "react";
import './style.sass'
import {getAuthFromStorage} from "../../libs/localStorage";

import {NavButtonSearch} from "../navButtonSearch";
import {NavLink} from "../navLink";
import {NavButton} from "../navButton";

export const Nav: React.FC = () => {

    const isAuth = getAuthFromStorage();

    const returnMenu = () => {
        if (isAuth) {
            return <>
                <NavButton name={'Добавить'}/>
                <NavLink name={'Настройки'} link={'/setup/'}/>
                <NavButton name={'Выход'}/>
            </>
        }
        return <>
            <NavLink name={'Войти'} link={'/auth/'}/>
        </>
    }


    return (
        <div className="nav">
            <NavButtonSearch/>
            <div className="nav-wrap">
                {returnMenu()}
            </div>
        </div>
    )
}