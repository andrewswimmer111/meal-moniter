import type { Location, MenuItem, Restaurant, LogMealInfo} from "../types/mealLogs";


export async function getAllLocations(): Promise<{ success: boolean; message: string; locations?: Location[]}> {
    const url = `${import.meta.env.VITE_API_URL}/locations`;

    try {
        const response = await fetch(url);
        const json = await response.json()
        if (!response.ok) {
            return {success: false, message: json.error || "Sorry, website down."};
        }
        return {success: true, message: "Locations fetched successfully", locations: json};
    } catch {
         return { success: false, message: "Network error: Could not connect to server."}
    }
}

export async function getRestaurants(location: number): Promise<{ success: boolean; message: string; restaurants?: Restaurant[]}> {
    const url = `${import.meta.env.VITE_API_URL}/restaurants/${encodeURIComponent(location)}`;

    try {
        const response = await fetch(url);
        const json = await response.json();
        if (!response.ok) {
            return {success: false, message: json.error || "Sorry, website down."};
        }
        return {success: true, message: "Restaurants fetched successfully", restaurants: json};
    } catch {
         return { success: false, message: "Network error: Could not connect to server."}
    }
}

export async function getMenuItems(restaurant: number): Promise<{ success: boolean; message: string; menuItems?: MenuItem[]}> {
    const url = `${import.meta.env.VITE_API_URL}/menuItems/${encodeURIComponent(restaurant)}`;

    try {
        const response = await fetch(url);
        const json = await response.json();
        if (!response.ok) {
            return {success: false, message: json.error || "Sorry, website down."};
        }
        return {success: true, message: "MenuItems fetched successfully", menuItems: json};
    } catch {
        return { success: false, message: "Network error: Could not connect to server."}
    }
}

export async function logMeal(data: LogMealInfo): Promise<{ success: boolean; message: string;}> {
    const url = `${import.meta.env.VITE_API_URL}/meals`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
        const json = await response.json();
        if (!response.ok) {
            return {success: false, message: json.error || "Sorry, website down."};
        }
        return {success: true, message: "Meal logged successfully"};
    } catch {
        return { success: false, message: "Network error: Could not connect to server."};
    }
}