import {BASE_URL} from "./urls";

export const getIngredients = () => {
    return fetch(`${BASE_URL}/ingredients`, {
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

export const sendOrder = (ingredients) => {
    return fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ingredients})
    })
        .then(data => checkResult(data));
}

export const checkResult = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}
