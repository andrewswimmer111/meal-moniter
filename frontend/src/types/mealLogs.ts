
export type Location = {
    id: number,
    name: string,
}

export type Restaurant = {
    id: number,
    name: string,
    locationId: number,
}

export type MenuItem = {
    id: number,
    name: string,
    price: number,
}

export type LogMealInfo = {
    userId: number,
    menuItemId: number,
    date?: Date
}