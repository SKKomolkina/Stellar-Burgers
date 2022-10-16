import {getIngredients} from "../../utils/api";

import {GET_ITEMS_FAILED, GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS, GET_SELECTED} from "../constants/ingredients";
import {IIngredient} from "../../utils/interface/interface";

import {AppDispatch, AppThunk} from "../types";

//actions
export interface IGetItemsRequest {
    readonly type: typeof GET_ITEMS_REQUEST;
}

export interface IGetItemsSuccess {
    readonly type: typeof GET_ITEMS_SUCCESS;
    readonly ingredients: IIngredient[];
}

export interface IGetItemsFailed {
    readonly type: typeof GET_ITEMS_FAILED;
}

export interface IGetSelectedItem {
    readonly type: typeof GET_SELECTED;
    readonly ingredient: IIngredient;
}

//union
export type TIngredientsActions =
    | IGetItemsRequest
    | IGetItemsSuccess
    | IGetItemsFailed
    | IGetSelectedItem;

//functions
export const getItemsRequestAction = (): IGetItemsRequest => ({
    type: GET_ITEMS_REQUEST,
})

export const getItemsSuccessAction = (ingredients: IIngredient[]): IGetItemsSuccess => ({
    type: GET_ITEMS_SUCCESS,
    ingredients,
})

export const getItemsFailedAction = (): IGetItemsFailed => ({
    type: GET_ITEMS_FAILED,
})

export const getSelectedItemAction = (ingredient: IIngredient): IGetSelectedItem => ({
    type: GET_SELECTED,
    ingredient,
})

export const getItems = (): AppThunk => (dispatch: AppDispatch) => {
        dispatch(getItemsRequestAction())

        getIngredients().then(res => {
            if (res) {
                dispatch(getItemsSuccessAction(res))
            } else {
                dispatch(getItemsFailedAction())
            }
        })
            .catch(() => {
                dispatch(getItemsFailedAction())
            })
    }


export const getSelectedItem = (item: IIngredient): AppThunk => (dispatch: AppDispatch) => {
    dispatch(getSelectedItemAction(item))
}
