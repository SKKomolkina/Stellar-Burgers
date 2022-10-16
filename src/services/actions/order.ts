import {sendOrder} from "../../utils/api";
import {SEND_ORDER_FAILED, SEND_ORDER_REQUEST, SEND_ORDER_SUCCESS} from "../constants/order";
import {IIngredient, IOrder} from "../../utils/interface/interface";
import {Dispatch, SetStateAction} from "react";
import {AppDispatch, AppThunk} from "../types";

//actions
export interface ISendOrderRequest {
    readonly type: typeof SEND_ORDER_REQUEST;
}

export const sendOrderRequestAction = (): ISendOrderRequest => ({
    type: SEND_ORDER_REQUEST,
})

export interface ISendOrderSuccess {
    readonly type: typeof SEND_ORDER_SUCCESS;
    readonly order: IOrder;
}

export const sendOrderSuccessAction = (order: IOrder): ISendOrderSuccess => ({
    type: SEND_ORDER_SUCCESS,
    order,
})

export interface ISendOrderFailed {
    readonly type: typeof SEND_ORDER_FAILED;
}

export const sendOrderFailedAction = (): ISendOrderFailed => ({
    type: SEND_ORDER_FAILED,
})

//union
export type TOrderActions =
    | ISendOrderRequest
    | ISendOrderSuccess
    | ISendOrderFailed

//functions
export const sendItems = (ingredients: IIngredient[], setOpenModal: Dispatch<SetStateAction<boolean>>): AppThunk =>
    (dispatch: AppDispatch) => {
    dispatch(sendOrderRequestAction())

    sendOrder(ingredients)
        .then(res => {
            if (res) {
                dispatch(sendOrderSuccessAction(res))
                // setOpenModal(true);
            } else {
                dispatch(sendOrderFailedAction())
            }
        })
        .then(() => setOpenModal(true))
        .catch(() => {
            dispatch(sendOrderFailedAction())
        })
}



