import {Middleware, MiddlewareAPI} from "redux";
import {AppDispatch, RootState, TWsActions} from "../types";

export const socketMiddleware = (wsActions: TWsActions): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => action => {
            const {dispatch} = store;
            const {type, payload} = action;
            const {wsStart, wsStop, wsMessage, wsFailed, wsClose, wsSuccess } = wsActions;

            if (type === wsStart) {
                socket = new WebSocket(payload);
            }
            if (socket) {
                if (type === wsStop) {
                    socket.close();
                }

                socket.onopen = () => {
                    dispatch({type: wsSuccess});
                }

                socket.onerror = () => {
                    dispatch({type: wsFailed});
                }

                socket.onclose = () => {
                    dispatch({type: wsClose});
                }

                socket.onmessage = event => {
                    const parsed = JSON.parse(event.data);
                    parsed && parsed.success && dispatch({type: wsMessage, payload: parsed});
                }
            }

            next(action);
        }
    }) as Middleware;
}
