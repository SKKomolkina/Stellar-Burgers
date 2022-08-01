import {sendOrder} from "../../utils/api";

export const SEND_ORDER_REQUEST = 'SEND_ORDER_REQUEST';
export const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS';
export const SEND_ORDER_FAILED = 'SEND_ORDER_FAILED';

export function sendItems(ingredients, setOpenModal) {
    return function (dispatch) {
        dispatch({
            type: SEND_ORDER_REQUEST,
        })
        sendOrder(ingredients, setOpenModal)
            .then(res => {
                if (res) {
                    dispatch({
                        type: SEND_ORDER_SUCCESS,
                        payload: res,
                    })
                    console.log(res);
                    // setOpenModal(true);
                } else {
                    dispatch({
                        type: SEND_ORDER_FAILED,
                    })
                }
            })
            .then(() => setOpenModal(true))
            .catch(() => {
                dispatch({
                    type: SEND_ORDER_FAILED,
                })
            })
    }
}


