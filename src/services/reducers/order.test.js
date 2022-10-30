import {orderReducer, initialState} from "./order";
import {sendOrderSuccessAction} from "../actions/order";

describe('order reducer', () => {
    test('shound get the initial state', () => {
        expect(orderReducer(undefined, {})).toEqual(initialState)
    })

    test('should get success order', () => {
        expect(orderReducer(initialState, sendOrderSuccessAction({
                ingredients: ['1', '2', '3'],
                _id: '1',
                number: 1,
                createdAt: 'today',
                updateAt: 'today',
                name: 'name',
        }))).toEqual({
            ...initialState,
            order: {
                ingredients: ['1', '2', '3'],
                _id: '1',
                number: 1,
                createdAt: 'today',
                updateAt: 'today',
                name: 'name',
            }
        })
    })
})
