import { applyMiddleware, compose, createStore } from "redux";

import { rootReducer } from "./rootReducer";
import { saveGameMiddleware } from "../sudoku";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    rootReducer, 
    composeEnhancers(applyMiddleware(saveGameMiddleware)),
);
