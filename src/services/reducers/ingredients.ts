import {TIngredientsActions} from "../actions/ingredients";
import {IIngredient} from "../../utils/interface/interface";
import {GET_ITEMS_FAILED, GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS, GET_SELECTED} from "../constants/ingredients";

type TIngredientsState = {
    ingredients: IIngredient[] | [];

    selectedIngredient: IIngredient | undefined;

    order: {};

    itemsRequest: boolean;
    itemsFailed: boolean;
}

export const initialState: TIngredientsState = {
    ingredients: [],

    selectedIngredient: undefined,

    order: {},

    itemsRequest: false,
    itemsFailed: false,
}

export const ingredientsReducer = (state = initialState, action: TIngredientsActions): TIngredientsState => {
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
                ingredients: [...action.ingredients],
            }
        }

        case GET_ITEMS_FAILED: {
            return {
                ...state,
                itemsRequest: false,
                itemsFailed: true,
            }
        }

        case GET_SELECTED: {
            return {
                ...state,
                selectedIngredient: {...action.ingredient}
            }
        }

        default: {
            return state;
        }
    }
}
