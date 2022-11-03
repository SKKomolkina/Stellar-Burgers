export const baseUrl: string = 'https://norma.nomoreparties.space/api';

export const wsOrders = new WebSocket('wss://norma.nomoreparties.space/orders');
export const wsAll = new WebSocket('wss://norma.nomoreparties.space/orders/all');
// export const wsAll = `${wsOrders.url}/all`;
