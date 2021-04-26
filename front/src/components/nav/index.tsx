import * as React from "react";
import './style.sass'
import { observer } from "mobx-react";
import { store } from "../../store";
import { NavLink } from "react-router-dom";
import { NavButton } from "../navButton";
import { NavButtonSearch } from "../navButtonSearch";
import { useLocation } from "react-router-dom";

export const Nav: React.FC = observer(() => {

    const { authStore: { isAuth, logoutRequest }, catalogStore: { setEditWindow } } = React.useContext(store);
    const location = useLocation().pathname;

    const renderMenu = () => {
        if (isAuth) {
            return <>
                {location === '/' && <NavButton callback={() => setEditWindow({ isOpen: true })} name={'Добавить'} />}
                <NavLink activeClassName="nav-link_active" className="nav-link" to={'/setup/'}>Настройки</NavLink>
                <NavButton callback={logoutRequest} name={'Выход'} />
            </>
        }
        return <NavLink activeClassName="nav-link_active" className="nav-link" to={'/auth/'}>Войти</NavLink>
    }


    return (
        <nav className="nav">
            {
                location === '/'
                    ? <NavButtonSearch />
                    : <NavLink className="nav-link-search" to={'/'}>Поиск</NavLink>
            }

            <div className="nav-wrap">
                {renderMenu()}
            </div>
        </nav>
    )

}
)