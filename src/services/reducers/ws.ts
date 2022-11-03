import {IOrder} from "../../utils/interface/interface";
import {TFeedActions} from "../actions/ws";
import {
    WS_CONNECTION_CLOSE,
    WS_CONNECTION_FAILED,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE
} from "../constants/ws";

export type TFeedState = {
    wsConnect: boolean;
    feed: IOrder[] | [];
    total: number;
    totalToday: number;
}

export const feedInitialState: TFeedState = {
    wsConnect: false,
    feed: [],
    total: 0,
    totalToday: 0,
}

export const feedReducer = (state = feedInitialState, action: TFeedActions): TFeedState => {
    switch (action.type) {
        case WS_CONNECTION_START: {
            return {
                ...state,
                wsConnect: true,
            }
        }

        case WS_CONNECTION_SUCCESS: {
            return {
                ...state,
                wsConnect: true,
            }
        }

        case WS_CONNECTION_FAILED: {
            return {
                ...state,
                wsConnect: false,
            }
        }

        case WS_CONNECTION_CLOSE: {
            return {
                ...state,
                wsConnect: false,
            }
        }

        case WS_GET_MESSAGE: {
            return {
                ...state,
                feed: action.payload.orders,
                total: action.payload.total,
                totalToday: action.payload.totalToday,
            }
        }

        default: return state;
    }
}
