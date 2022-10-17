import React from 'react';
import ReactDOM from 'react-dom/client';
// @ts-ignore
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';

import {Provider} from "react-redux";
import {store} from "./services/store";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <BrowserRouter>
        {/*<React.StrictMode>*/}
            <Provider store={store}>
                <App/>
            </Provider>
        {/*</React.StrictMode>*/}
    </BrowserRouter>
);

reportWebVitals();
