"use client";

import { api } from "@/lib/axiosClient";
import { ApiResponse, LoginData } from "@/types";

// For static export, we use localStorage or client-side cookies.
// Here we'll use localStorage for simplicity in a static SPA.

export const setSession = (data: LoginData) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", data.token);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("userInfo", JSON.stringify(data.user));
    }
};

export const getAccessToken = () => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("accessToken");
    }
    return null;
};

export const getRefreshToken = () => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("refreshToken");
    }
    return null;
};

export const updateAccessToken = (token: string, refreshToken?: string) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", token);
        if (refreshToken) {
            localStorage.setItem("refreshToken", refreshToken);
        }
    }
};

export const clearSession = () => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userInfo");
    }
};

export async function login(formData: FormData): Promise<ApiResponse<LoginData>> {
    const userId = formData.get('userid') as string;
    const userPwd = formData.get('password') as string;

    try {
        const response = await api.post<LoginData>("/v1/auth/login", { userId, userPwd });

        if (response.code === '200' && response.data) {
            setSession(response.data);
        }

        return response;
    } catch (error: unknown) {
        console.error('Login error:', error);
        const err = error as { response?: { data?: { code?: string; message?: string } }; message?: string };
        const message = err.response?.data?.message || err.message || '서버 에러가 발생했습니다.';
        return { code: '500', message, data: null };
    }
}

export async function logout() {
    clearSession();
    if (typeof window !== "undefined") {
        window.location.href = '/login';
    }
}
