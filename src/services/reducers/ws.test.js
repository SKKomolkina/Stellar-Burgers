import {feedReducer, feedInitialState} from "./ws";
import * as types from '../constants/ws';

describe('feed reducer', () => {
    it('should return the initial state', () => {
        expect(feedReducer(undefined, {})).toEqual(feedInitialState)
    })

    it('should get feed-data from websocket', () => {
        expect(feedReducer(feedInitialState, {
            type: types.WS_GET_MESSAGE,
            payload: {
                orders: [], total: 123456789, totalToday: 123456789
            },
        })
        ).toEqual({
            ...feedInitialState,
            total: 123456789,
            totalToday: 123456789
        })
    })
})
