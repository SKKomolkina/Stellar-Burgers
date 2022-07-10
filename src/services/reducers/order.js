import {SEND_ORDER_REQUEST, SEND_ORDER_FAILED, SEND_ORDER_SUCCESS} from "../actions/order";

const initialState = {
    order: {},

    orderRequest: false,
    orderFailed: false,
}

export const orderReducer = (state = initialState, action) => {
    switch(action.type) {
        case SEND_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true,
            }
        }

        case SEND_ORDER_SUCCESS: {
            return {
                orderRequest: false,
                orderFailed: false,
                order: action.payload,
            }
        }

        case SEND_ORDER_FAILED: {
            return {
                orderRequest: false,
                orderFailed: true,
            }
        }

        default: {
            return state;
        }
    }
}
