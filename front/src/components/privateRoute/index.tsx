import * as React from "react";
import {Route, Redirect} from 'react-router-dom';
import {store} from "../../store";
import {observer} from "mobx-react";

interface IProps {
    exact?: boolean;
    path: string;
  }

export const PrivateRoute: React.FC<IProps> = observer(({children, ...rest}) => {

    const {authStore: {isAuth}} = React.useContext(store);

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