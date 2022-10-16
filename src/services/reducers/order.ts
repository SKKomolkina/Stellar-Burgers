import {SEND_ORDER_FAILED, SEND_ORDER_REQUEST, SEND_ORDER_SUCCESS} from "../constants/order";
import {TOrderActions} from "../actions/order";

type TOrderState = {
    order: {};

    orderRequest: boolean;
    orderFailed: boolean;
}

const initialState: TOrderState = {
    order: {},

    orderRequest: false,
    orderFailed: false,
}

export const orderReducer = (state = initialState, action: TOrderActions): TOrderState => {
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
                order: action.order,
            }
        }

        case SEND_ORDER_FAILED: {
            return {
                orderRequest: false,
                orderFailed: true,
                order: state,
            }
        }

        default: {
            return state;
        }
    }
}
