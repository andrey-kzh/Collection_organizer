import * as React from "react";
import {Route, Redirect} from 'react-router-dom';
import {store} from "../../store";
import {useEffect} from "react";
import {observer} from "mobx-react";

export const PrivateRoute: React.FC<any> = observer(({children, ...rest}) => {

    const {authStore: {isAuth, authRequest}} = React.useContext(store);

    useEffect(() => {
        if ((isAuth !== true) && (isAuth !== false)) {
            authRequest()
        }
    }, [isAuth]);

    if ((isAuth !== true) && (isAuth !== false)) {
        return <div>Loading</div>
    }

    return (
        <Route {...rest} render={({location}) =>
            isAuth ? (children) : (
                <Redirect
                    to={{
                        pathname: "/auth",
                        state: {from: location}
                    }}
                />
            )
        }
        />
    );

})