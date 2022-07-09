import {SET_MODAL, RESET_MODAL} from "../actions/ingredient-details-modal";

const initialState = {
    info: null,
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
            return initialState;
        }

        default: {
            return state;
        }
    }
}
