import * as React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {observer} from "mobx-react";
import {store} from "./store";
import {useEffect} from "react";

import {IndexPage} from "./pages/index";
import {SetupPage} from "./pages/setup";
import {LoginPage} from "./pages/login";
import {PageNotFound} from "./pages/404";
import {PrivateRoute} from "./components/privateRoute";

export const Routes: React.FC = observer(() => {

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
        <Router>
            <Switch>
                <Route exact path="/">
                    <IndexPage/>
                </Route>
                <PrivateRoute exact path="/setup">
                    <SetupPage/>
                </PrivateRoute>
                <Route exact path="/auth">
                    <LoginPage/>
                </Route>
                <Route path="*">
                    <PageNotFound/>
                </Route>
            </Switch>
        </Router>
    )
});
