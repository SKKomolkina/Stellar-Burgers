export const ADD_ITEM = 'ADD_ITEM';
export const ADD_BUN = 'ADD_BUN';
export const DELETE_ITEM = 'DELETE_ITEM';
export const SORT_ITEMS = 'SORT_ITEMS';
export const RESET_CONSTRUCTOR = 'RESET_CONSTRUCTOR';

export function addIngredient(item, uuid) {
    return {
        type: ADD_ITEM,
        payload: {...item, uuid}
    }
}

export function addBun(item, uuid) {
    return {
        type: ADD_BUN,
        payload: {...item, uuid}
    }
}

export function removeIngredient(uuid) {
    return {
        type: DELETE_ITEM,
        payload: uuid,
    }
}

export function resetConstructor() {
    return {
        type: RESET_CONSTRUCTOR,
    }
}
