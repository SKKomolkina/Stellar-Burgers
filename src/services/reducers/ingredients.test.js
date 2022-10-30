import {ingredientsReducer, initialState} from "./ingredients";
import * as types from '../constants/ingredients';

describe('ingredients reducer', () => {
    test('should get ingredients success', () => {
        expect(ingredientsReducer(initialState, {
            type: types.GET_ITEMS_SUCCESS,
            ingredients: ['1', '2'],
        })).toEqual({
            ...initialState,
            itemsRequest: false,
            itemsFailed: false,
            ingredients: ['1', '2']
        })
    })
})
