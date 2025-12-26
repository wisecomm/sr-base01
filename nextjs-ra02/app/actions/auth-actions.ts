"use client";

import { ApiResponse, LoginData } from "@/types";

// For static export, we use localStorage or client-side cookies.
// Here we'll use localStorage for simplicity in a static SPA.

export const setSession = (data: LoginData) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", data.token);
        localStorage.setItem("userInfo", JSON.stringify(data.user));
    }
};

export const getAccessToken = () => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("accessToken");
    }
    return null;
};

export const clearSession = () => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userInfo");
    }
};

export async function login(formData: FormData): Promise<ApiResponse<LoginData>> {
    const username = formData.get('userid') as string;
    const password = formData.get('password') as string;

    try {
        // We call the Spring Boot backend directly via the /api prefix
        // which will be handled by the same server in production.
        const response = await fetch("/api/v1/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const apiResponse: ApiResponse<LoginData> = await response.json();

        if (apiResponse.code === '200' && apiResponse.data) {
            setSession(apiResponse.data);
        }

        return apiResponse;
    } catch (error) {
        console.error('Login error:', error);
        const message = error instanceof Error ? error.message : '서버 에러가 발생했습니다.';
        return { code: '500', message, data: null };
    }
}

export async function logout() {
    clearSession();
    if (typeof window !== "undefined") {
        window.location.href = '/login';
    }
}
