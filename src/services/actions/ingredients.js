import {getIngredients} from "../../utils/api";

export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';
export const GET_SELECTED = 'GET_SELECTED';
export const RESET_SELECTED = 'RESET_SELECTED';

// export const UPDATE_TYPE = 'UPDATE_TYPE';

export function getItems() {
    return function(dispatch) {
        dispatch({
            type: GET_ITEMS_REQUEST
        })
        getIngredients().then(res => {
            if (res) {
                dispatch({
                    type: GET_ITEMS_SUCCESS,
                    items: res,
                })
            } else {
                dispatch({
                    type: GET_ITEMS_FAILED,
                })
            }
        })
    }
}

export function getSelectedItem(item) {
    return function(dispatch) {
        dispatch({
            type: GET_SELECTED,
            payload: {...item},
        })
    }
}
