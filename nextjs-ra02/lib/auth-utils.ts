"use client";

import { clearSession, getRefreshToken, updateAccessToken } from "@/app/actions/auth-actions";
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
