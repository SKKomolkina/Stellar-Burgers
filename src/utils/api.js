const BASE_URL = 'https://norma.nomoreparties.space/api/ingredients';

export const getIngredients = () => {
    return fetch(`${BASE_URL}`, {
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

const checkResult = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}
