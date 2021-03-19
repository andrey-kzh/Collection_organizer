import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {MobXProvider} from "./store";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {PrivateRoute} from "./components/privateRoute";

import './css/style.sass';

import {IndexPage} from "./pages/index";
import {SetupPage} from "./pages/setup";
import {LoginPage} from "./pages/login";
import {PageNotFound} from "./pages/404";

const App: React.FC = () => {

    return (
        <div className="content">
            <MobXProvider>
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
            </MobXProvider>
        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById("app"));
