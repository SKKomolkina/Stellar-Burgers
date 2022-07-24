import {SET_MODAL, RESET_MODAL} from "../actions/ingredient-details-modal";

const initialState = {
    info: {},
}

export const ingredientDetailsModalReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MODAL: {
            return {
                ...state,
                info: action.payload,
            }
        }

        case RESET_MODAL: {
            return state;
        }

        default: {
            return state;
        }
    }
}
