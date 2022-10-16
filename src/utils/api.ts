import {baseUrl} from "./urls";
import {IIngredient} from "./interface/interface";
import {getCookie} from "./utils";

export const getIngredients = () => {
    return fetch(`${baseUrl}/ingredients`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then((data) => checkResult(data))
        .then(res => {
            return res.data
        })
}

export const sendOrder = (ingredients: IIngredient[]) => {
    // @ts-ignore
    return fetch(`${baseUrl}/orders?token=${getCookie('accessToken').split(' ')[1]}`, {
        method: 'POST',
        headers: {
            authorization: `${getCookie('accessToken')}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ingredients})
    })
        .then(data => checkResult(data));
}

export const checkResult = (res: Response) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}
