import {sendOrder} from "../../utils/api";

export const SEND_ORDER_REQUEST = 'SEND_ORDER_REQUEST';
export const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS';
export const SEND_ORDER_FAILED = 'SEND_ORDER_FAILED';

export function sendItems(ingredients) {
    return function (dispatch) {
        dispatch({
            type: SEND_ORDER_REQUEST,
        })
        sendOrder(ingredients)
            .then(res => {
                if (res) {
                    dispatch({
                        type: SEND_ORDER_SUCCESS,
                        payload: res,
                    })
                } else {
                    dispatch({
                        type: SEND_ORDER_FAILED,
                    })
                }
            })
    }
}


