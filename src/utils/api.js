import {baseUrl} from "./urls";

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

export const sendOrder = (ingredients) => {
    return fetch(`${baseUrl}/orders`, {
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
