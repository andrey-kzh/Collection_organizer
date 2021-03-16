import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {MobXProvider} from "./store";

import {IndexPage} from './pages/index/';
import './css/style.sass';

const App: React.FC = () => {
    return (
        <div className="content">
            <MobXProvider>
                <IndexPage/>
            </MobXProvider>
        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById("app"));
