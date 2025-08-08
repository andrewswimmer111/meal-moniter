import type { RegisterInfo, LoginInfo } from "../types/auth";

export async function registerUser(data: RegisterInfo): Promise<{ success: boolean; message: string; user?: any}> {
    const url = `${import.meta.env.VITE_API_URL}/users/create`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            credentials: 'include',
        });
        const json = await response.json();
        if (!response.ok) {
            return {success: false, message: json.error || "Registration failed."};
        }
        return {success: true, message: "User created successfully", user: json};
    } catch (err) {
        return { success: false, message: "Network error: Could not connect to server."}
    }
}

export async function loginUser(data: LoginInfo): Promise<{ success: boolean; message: string; user?: any}> {
    const url = `${import.meta.env.VITE_API_URL}/users/login`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            credentials: 'include',
        })
        const json = await response.json();
        if (!response.ok) {
            return {success: false, message: json.error || "Login failed."};
        }
        return {success: true, message: "Logging in...", user: json};
    } catch (err) {
        return { success: false, message: "Network error: Could not connect to server"}
    }
}