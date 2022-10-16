import {IIngredient} from "./interface/interface";

//
export const getArray = (arr: string[]): {name: string, count: number}[] => {
    const newArr = arr.reduce((newArr: { [key: string]: number }, el) => {
        newArr[el] = (newArr[el] || 0) + 1;
        return newArr;
    }, {});

    return Object.entries(newArr).map(i => {
        return {name: i[0], count: i[1]};
    })
}

export const getDetails = (initialArr: IIngredient[], idArr: string[]) => {
    const filter: IIngredient[] = [];

    getArray(idArr).forEach(id => {
        const ingredient = initialArr.find(ingredient => ingredient._id === id.name);
        ingredient && filter.push({...ingredient, count: id.count});
    })

    return filter;
}

//
export const getTime = (orderTime: number) => {
    const time = orderTime.toString();
    return time.length === 1 ? `0${time}` : time;
}

export const getDate = (orderDate: string): string => {
    const date = new Date(orderDate);
    return `${date.getDate()}.${date.getMonth()}, ${getTime(date.getHours())}:${getTime(date.getMinutes())}`;
}

//
export const getPrice = (arr: IIngredient[]): number => {
    return arr.reduce((sum, item) => {
        // @ts-ignore
        return sum + item.price * item.count;
    }, 0)
}
