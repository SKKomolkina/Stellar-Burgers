import {combineReducers} from "redux";

import {ingredientsReducer} from "./ingredients";
import {constructorReducer} from "./constructor";
import {ingredientDetailsModalReducer} from './ingredient-detail-modal';
import {orderReducer} from "./order";

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    orderConstructor: constructorReducer,
    ingredientDetailsModal: ingredientDetailsModalReducer,
    order: orderReducer,
})
