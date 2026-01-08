"use client";

import { clearSession, getRefreshToken, updateAccessToken, TIMEOUT_MS } from "@/app/actions/auth-actions";
import { ApiResponse, LoginData } from "@/types";

/**
 * Handle token refresh logic.
 * Calls the backend /refresh endpoint with the stored refresh token.
 */
export async function handleTokenRefresh(): Promise<string | null> {
    console.log("Attempting to refresh token...");

    const refreshToken = getRefreshToken();
    if (!refreshToken) {
        console.warn("No refresh token found");
        return null;
    }

    try {
        const response = await fetch("/api/v1/auth/refresh", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken }),
        });

        if (!response.ok) {
            console.error("Token refresh request failed", response.status);
            return null;
        }

        const apiResponse: ApiResponse<LoginData> = await response.json();

        if (apiResponse.code === '200' && apiResponse.data) {
            const { token, refreshToken: newRefreshToken } = apiResponse.data;
            updateAccessToken(token, newRefreshToken);
            console.log("Token refreshed successfully");
            return token;
        }
    } catch (error) {
        console.error("Error during token refresh", error);
    }

    return null;
}

import { useAppStore } from "@/store/useAppStore";

/**
 * Handle unauthorized access (401).
 * Clears the session and redirects to the login page.
 */
export function handleUnauthorized() {
    clearSession();
    // Clear Zustand store as well
    if (typeof window !== "undefined") {
        useAppStore.getState().clearUser();
        window.location.href = "/login";
    }
}



export const updateActivity = () => {
    if (typeof window !== "undefined") {
        localStorage.setItem("lastActive", Date.now().toString());
    }
};

export const checkSessionTimeout = (): boolean => {
    if (typeof window !== "undefined") {
        const lastActive = localStorage.getItem("lastActive");
        if (!lastActive) return false;

        const now = Date.now();
        const inactiveTime = now - parseInt(lastActive, 10);

        if (inactiveTime > TIMEOUT_MS) {
            return true;
        }
    }
    return false;
};
