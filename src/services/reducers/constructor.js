import { ADD_ITEM, DELETE_ITEM, ADD_BUN, SORT_ITEMS, RESET_CONSTRUCTOR } from "../actions/constructor";

const initialState = {
    ingredients: [],
    bun: {},
}

export const constructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_ITEM: {
            return {
                ...state,
                ingredients: [...state.ingredients].filter(item =>
                    item.uuid !== action.payload)
            }
        }

        case ADD_ITEM: {
            return {
                ...state,
                ingredients: [action.payload, ...state.ingredients]
            }
        }

        case ADD_BUN: {
            return {
                ...state,
                bun: {...action.payload}
            }
        }

        case SORT_ITEMS: {
            const ingredients = [...state.ingredients];
            ingredients.splice(
                action.payload.to,
                0,
                ingredients.splice(action.payload.from, 1)[0]
            );
            return {
                ...state,
                ingredients,
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
