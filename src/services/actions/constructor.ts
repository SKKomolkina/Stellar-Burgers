import {ADD_BUN, ADD_ITEM, DELETE_ITEM, RESET_CONSTRUCTOR, SORT_ITEMS} from "../constants/constructor";
import {IIngredient} from "../../utils/interface/interface";

//TYPES
export interface IAddIngredient {
    readonly type: typeof ADD_ITEM;
    readonly ingredient: IIngredient;
}

export interface IAddBun {
    readonly type: typeof ADD_BUN;
    readonly bun: IIngredient;
}

export interface IRemoveIngredient {
    readonly type: typeof DELETE_ITEM;
    readonly index: string;
}

export interface IResetConstructor {
    readonly type: typeof RESET_CONSTRUCTOR;
}

export interface ISortIngredients {
    readonly type: typeof SORT_ITEMS;
    readonly hoverIndex: number;
    readonly dragIndex: number;
}

//UNION
export type TConstructorActions =
    | IResetConstructor
    | IRemoveIngredient
    | IAddBun
    | IAddIngredient
    | ISortIngredients;

//FUNCTIONS
export const addIngredient = (item: IIngredient, uuid: string): IAddIngredient => {
    return {
        type: ADD_ITEM,
        ingredient: {...item, uuid},
    }
}

export function addBun(item: IIngredient, uuid: string): IAddBun {
    return {
        type: ADD_BUN,
        bun: {...item, uuid}
    }
}

export function removeIngredient(uuid: string): IRemoveIngredient {
    return {
        type: DELETE_ITEM,
        index: uuid,
    }
}

export function sortIngredients(from: number, to: number): ISortIngredients {
    return {
        type: SORT_ITEMS,
        dragIndex: from,
        hoverIndex: to,
    }
}

export function resetConstructor(): IResetConstructor {
    return {
        type: RESET_CONSTRUCTOR,
    }
}
