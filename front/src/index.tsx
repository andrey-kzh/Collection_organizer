import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {MobXProvider} from "./store";
import {Routes} from "./routes";

import './css/style.sass';

const App: React.FC = () => {

    return (
        <div className="content">
            <MobXProvider>
                <Routes/>
            </MobXProvider>
        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById("app"));
