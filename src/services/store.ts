import {createStore, compose, applyMiddleware} from "redux";
import {rootReducer} from "./reducers";
import thunk from "redux-thunk";
import {socketMiddleware} from "./middleware";
import {wsActions} from "./actions/ws";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsActions)));

export const store = createStore(rootReducer, enhancer);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
