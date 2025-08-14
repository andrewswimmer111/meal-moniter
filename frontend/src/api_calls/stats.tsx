import type { FormattedStatsData } from "../types/stats";
import type { Meal } from "../types/table";

export async function getMealHistory(userId: number): Promise<{ success: boolean; message: string; meals?: Meal[]}> {
    const url = `${import.meta.env.VITE_API_URL}/users/meals/${userId}`;

    try {
        const response = await fetch(url)
        const json = await response.json();
        if (!response.ok) {
            return {success: false, message: json.error || "Sorry, website down."};
        }
        return {success: true, message: "Meal history retrieved successfully", meals: json};
    } catch {
        return { success: false, message: "Network error: Could not connect to server."};
    }

}

export async function deleteMeal(mealId: number): Promise<{ success: boolean; message: string;}> {
    const url = `${import.meta.env.VITE_API_URL}/meals/${mealId}`;

    try {
        const response = await fetch(url, {
            method: 'DELETE'
        })
        const json = await response.json();
        if (!response.ok) {
            return {success: false, message: json.error || "Sorry, website down."};
        }
        return {success: true, message: "Meal deleted successfully"};
    } catch {
        return { success: false, message: "Network error: Could not connect to server."};
    }

}


export async function getStats(userId: number): Promise<{ success: boolean; message: string; stats?: FormattedStatsData}> {
    const url = `${import.meta.env.VITE_API_URL}/users/stats/${userId}`;

    try {
        const response = await fetch(url)
        const json = await response.json();
        if (!response.ok) {
            return {success: false, message: json.error || "Sorry, website down."};
        }
        return {success: true, message: "Stats retrieved successfully", stats: json};
    } catch {
        return { success: false, message: "Network error: Could not connect to server."};
    }

}