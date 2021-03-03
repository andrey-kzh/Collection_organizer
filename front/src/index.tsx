import * as React from 'react';
import * as ReactDOM from 'react-dom';

//import { store } from './store';
import { IndexPage } from './pages/index/';

import './css/style.sass';

const App: React.FC = () => {
    return (
    <div className="content">
    <IndexPage/>
    </div>
    )
}

ReactDOM.render(<App/>, document.getElementById("app"));
