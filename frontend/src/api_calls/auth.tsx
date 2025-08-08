import type { RegisterInfo } from "../types/auth";


export async function registerUser(data: RegisterInfo): Promise<string> {
    const url = `${import.meta.env.VITE_API_URL}/users/create`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const errorMsg = await response.json();
            return errorMsg.error || "Registration failed.";
        }
        return "User created successfully";
    } catch (err) {
        return "Network error: Could not connect to server.";
    }
}
