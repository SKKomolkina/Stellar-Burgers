import {constructorReducer, initialState} from "./constructor";
import {removeIngredient, addIngredient, addBun} from "../actions/constructor";
import {ingredientItem} from "../constants/tests";

describe('constructor reducer', () => {
    test('should return initital state', () => {
        expect(constructorReducer(undefined, {})).toEqual(initialState)
    })

    test('should delete ingredient', () => {
        expect(constructorReducer(initialState, removeIngredient(0))).toEqual(initialState)
    })

    test('should add ingredient', () => {
        expect(constructorReducer(initialState, addIngredient(ingredientItem, 0))).toEqual({
            ...initialState,
            ingredients: [{
                _id: '123',
                name: '123',
                type: '123',
                proteins: 1,
                fat: 1,
                carbohydrates: 1,
                calories: 1,
                price: 1,
                image: '123',
                image_mobile: '123',
                image_large: '123',
                uuid: 0,
            }]
        })
    })

    test('should add bun', () => {
        expect(constructorReducer(initialState, addBun(ingredientItem, 0))).toEqual({
            ...initialState,
            bun: {
                _id: '123',
                name: '123',
                type: '123',
                proteins: 1,
                fat: 1,
                carbohydrates: 1,
                calories: 1,
                price: 1,
                image: '123',
                image_mobile: '123',
                image_large: '123',
                uuid: 0,
            }
        })
    })
})
