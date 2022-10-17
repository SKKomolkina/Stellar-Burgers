import {
    WS_CONNECTION_CLOSE,
    WS_CONNECTION_FAILED,
    WS_CONNECTION_START,
    WS_CONNECTION_STOP,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE,
} from '../constants/ws';
import {TOrderRes, TWsActions} from "../types";

//actions
export interface IWsConnectionStartAction {
    readonly type: typeof WS_CONNECTION_START,
    readonly payload: string,
}

export const wsConnectionStartAction = (payload: string): IWsConnectionStartAction => ({
    type: WS_CONNECTION_START,
    payload,
})

export interface IWsConnectionOpenAction {
    readonly type: typeof WS_CONNECTION_SUCCESS,
}

export const wsConnectionOpenAction = (): IWsConnectionOpenAction => ({
    type: WS_CONNECTION_SUCCESS,
})

export  interface IWsConnectionStopAction {
    readonly type: typeof WS_CONNECTION_STOP,
}

export const wsConnectionStopAction = (): IWsConnectionStopAction => ({
    type: WS_CONNECTION_STOP,
})

export interface IWsConnectionFailedAction {
    readonly type: typeof WS_CONNECTION_FAILED,
}

export const wsConnectionFailedAction = (): IWsConnectionFailedAction => ({
    type: WS_CONNECTION_FAILED,
})

export interface IWsConnectionClosedAction {
    readonly type: typeof WS_CONNECTION_CLOSE,
}

export const wsConnectionClosedAction = (): IWsConnectionClosedAction => ({
    type: WS_CONNECTION_CLOSE,
})

export interface IWsConnectionGetMessageAction {
    readonly type: typeof WS_GET_MESSAGE,
    payload: TOrderRes,
}

export const wsConnectionGetMessageAction = (payload: TOrderRes): IWsConnectionGetMessageAction => ({
    type: WS_GET_MESSAGE,
    payload,
})

//union
export type TFeedActions =
    | IWsConnectionStartAction
    | IWsConnectionOpenAction
    | IWsConnectionStopAction
    | IWsConnectionFailedAction
    | IWsConnectionClosedAction
    | IWsConnectionGetMessageAction;

export const wsActions: TWsActions = {
    wsStart: WS_CONNECTION_START,
    wsStop: WS_CONNECTION_STOP,
    wsClose: WS_CONNECTION_CLOSE,
    wsFailed: WS_CONNECTION_FAILED,
    wsMessage: WS_GET_MESSAGE,
    wsSuccess: WS_CONNECTION_SUCCESS,
}
