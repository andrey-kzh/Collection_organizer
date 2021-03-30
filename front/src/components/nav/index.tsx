import * as React from "react";
import './style.sass'
import {observer} from "mobx-react";
import {store} from "../../store";
import {NavButtonSearch} from "../navButtonSearch";
import {NavLink} from "../navLink";
import {NavButton} from "../navButton";

export const Nav: React.FC = observer(() => {

        const {authStore: {isAuth, logoutRequest}} = React.useContext(store);

        const renderMenu = () => {
            if (isAuth) {
                return <>
                    <NavButton name={'Добавить'}/>
                    <NavLink name={'Настройки'} link={'/setup/'}/>
                    <NavButton callback={logoutRequest} name={'Выход'}/>
                </>
            }
            return <NavLink name={'Войти'} link={'/auth/'}/>
        }


        return (
            <div className="nav">
                <NavButtonSearch/>
                <div className="nav-wrap">
                    {renderMenu()}
                </div>
            </div>
        )

    }
)