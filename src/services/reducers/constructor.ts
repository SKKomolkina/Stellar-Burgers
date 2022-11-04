import {TConstructorActions} from "../actions/constructor";
import {IIngredient} from "../../utils/interface/interface";
import {ADD_ITEM, DELETE_ITEM, ADD_BUN, SORT_ITEMS, RESET_CONSTRUCTOR} from "../constants/constructor";

type TConstructorState = {
    ingredients: IIngredient[] | [];
    bun: IIngredient | {};
}

export const initialState: TConstructorState = {
    ingredients: [],
    bun: {},
}

export const constructorReducer = (state = initialState, action: TConstructorActions): TConstructorState => {
    switch (action.type) {
        case DELETE_ITEM: {
            return {
                ...state,
                ingredients: [...state.ingredients].filter(item =>
                    item.uuid !== action.index)
            }
        }

        case ADD_ITEM: {
            return {
                ...state,
                ingredients: [action.ingredient, ...state.ingredients]
            }
        }

        case ADD_BUN: {
            return {
                ...state, bun: action.bun,
            }
        }

        case SORT_ITEMS: {
            let items = [...state.ingredients];
            items.splice(
                action.hoverIndex,
                0,
                items.splice(action.dragIndex, 1)[0]
            );
            return {
                ...state,
                ingredients: items,
            }
        }

        case RESET_CONSTRUCTOR: {
            return initialState;
        }

        default: {
            return state;
        }
    }
}
