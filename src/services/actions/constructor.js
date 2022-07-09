export const ADD_ITEM = 'ADD_ITEM';
export const ADD_BUN = 'ADD_BUN';
export const DELETE_ITEM = 'DELETE_ITEM';
export const SORT_ITEMS = 'SORT_ITEMS';

export function addIngredient(item, uuid) {
    return function(dispatch) {
        dispatch({
            type: ADD_ITEM,
            payload: {...item, uuid}
        })
    }
}

export function addBun(item, uuid) {
    return function(dispatch) {
        dispatch({
            type: ADD_BUN,
            payload: {...item, uuid}
        })
    }
}

export function removeIngredient(uuid) {
    return function(dispatch) {
        dispatch({
            type: DELETE_ITEM,
            payload: uuid,
        })
    }
}
