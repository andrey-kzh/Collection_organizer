import * as React from "react";
import './style.sass'

import {NavLinkSearch} from "../navLinkSearch";
import {NavButtonSearch} from "../navButtonSearch";
import {NavLink} from "../navLink";
import {NavButton} from "../navButton";

export const Nav:React.FC = () => {

    return(
        <div className="nav">
            <NavButtonSearch/>
            <div className="nav-wrap">
                <NavButton name={'Добавить'}/>
                <NavLink name={'Настройки'}/>
                <NavButton name={'Выход'}/>
            </div>
        </div>
    )
}