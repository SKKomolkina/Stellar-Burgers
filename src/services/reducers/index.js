import {combineReducers} from "redux";

import {ingredientsReducer} from "./ingredients";
import {constructorReducer} from "./constructor";
import {ingredientDetailsModalReducer} from './ingredient-detail-modal';
import {orderReducer} from "./order";
import {userReducer} from "./user";

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    orderConstructor: constructorReducer,
    ingredientDetailsModal: ingredientDetailsModalReducer,
    order: orderReducer,
    user: userReducer,
})
