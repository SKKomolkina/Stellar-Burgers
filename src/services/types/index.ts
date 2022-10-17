import {rootReducer} from "../reducers";
import {TUserActions} from "../actions/user";
import {TConstructorActions} from "../actions/constructor";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {TIngredientsActions} from "../actions/ingredients";
import {TOrderActions} from "../actions/order";

import {
    WS_CONNECTION_CLOSE,
    WS_CONNECTION_FAILED,
    WS_CONNECTION_START,
    WS_CONNECTION_STOP,
    WS_CONNECTION_SUCCESS, WS_GET_MESSAGE
} from "../constants/ws";
import {IOrder} from "../../utils/interface/interface";
import {TFeedActions} from "../actions/ws";

export type RootState = ReturnType<typeof rootReducer>;

export type TWsActions = {
    wsStart: typeof WS_CONNECTION_START;
    wsSuccess: typeof WS_CONNECTION_SUCCESS;
    wsFailed: typeof WS_CONNECTION_FAILED;
    wsStop: typeof WS_CONNECTION_STOP;
    wsClose: typeof WS_CONNECTION_CLOSE;
    wsMessage: typeof WS_GET_MESSAGE;
}

export type TOrderRes = {
    success: boolean;
    orders: IOrder[];
    total: number;
    totalToday: number;
}

type TAppActions =
    | TUserActions
    | TConstructorActions
    | TIngredientsActions
    | TOrderActions
    | TFeedActions;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType, // return value type
    RootState, // app state type
    never, // extra argument type
    TAppActions // action type
    >;

export type AppDispatch = ThunkDispatch<RootState, never, TAppActions>;
