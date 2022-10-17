import {combineReducers} from "redux";

import {ingredientsReducer} from "./ingredients";
import {constructorReducer} from "./constructor";
import {orderReducer} from "./order";
import {userReducer} from "./user";
import {feedReducer} from "./ws";

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    orderConstructor: constructorReducer,
    order: orderReducer,
    user: userReducer,
    feed: feedReducer
});
