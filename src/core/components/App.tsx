import React from "react";
import { createStore, StoreEnhancer } from "redux";
import { Provider } from "react-redux";

import { Home } from "./../../home";
import { rootReducer } from "../rootReducer";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION__?: () => StoreEnhancer;
    }
}

const store = createStore(
    rootReducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const App = () => (
    <Provider store={store}>
        <Home/>
    </Provider>
);
