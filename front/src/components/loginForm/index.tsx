import * as React from "react";
import './style.sass'
import {observer} from "mobx-react";
import {store} from '../../store'
import {Button} from "../button";
import {useHistory, useLocation} from "react-router-dom";
import {useEffect} from "react";

export const LoginForm: React.FC = observer(() => {

    const {authStore: {isAuth, login, setLogin, password, setPassword, loginRequest}} = React.useContext(store)

    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        if (isAuth) {
            let {from}: { [key: string]: any } = location.state || {from: {pathname: "/"}};
            history.replace(from);
        }
    }, [isAuth])

    return (
        <div className="login-form-wrap">

            <h1>Авторизация</h1>

            <form onSubmit={(e) => e.preventDefault()} className="login-form">

                <input
                    onChange={(e) => setLogin(e.target.value)}
                    value={login}
                    className="login-form__input" type="text" name="login" placeholder="Логин"/>

                <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className="login-form__input" type="password" name="password" placeholder="Пароль"/>

                <Button
                    callback={loginRequest}
                    name={'Войти'}
                    className={'login-form__button'}/>

            </form>
        </div>
    )
})