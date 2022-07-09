import {GET_ITEMS_FAILED, GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS, GET_SELECTED} from "../actions/ingredients";

const initialState = {
    items: [],

    selectedIngredient: {},

    order: {},

    itemsRequest: false,
    itemsFailed: false,
}

export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ITEMS_REQUEST: {
            return {
                ...state,
                itemsRequest: true,
            }
        }

        case GET_ITEMS_SUCCESS: {
            return {
                ...state,
                itemsRequest: false,
                itemsFailed: false,
                items: action.items,
            }
        }

        case GET_ITEMS_FAILED: {
            return {
                itemsRequest: false,
                itemsFailed: true,
            }
        }

        case GET_SELECTED: {
            return {
                ...state,
                selectedIngredient: {...action.payload}
            }
        }

        default: {
            return state;
        }
    }
}
