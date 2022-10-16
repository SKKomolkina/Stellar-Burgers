export interface IIngredient {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    uuid?: string;
    count?: number;
}

export interface IOrder {
    ingredients: string[];
    _id: string;
    number: number;
    createdAt: string;
    updateAt: string;
    name: string;
    details?: IIngredient[];
    status: 'created' | 'pending' | 'done';
}

export interface IUser {
    password: string;
    email: string;
    name?: string;
}

//
