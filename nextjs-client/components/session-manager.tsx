"use client";

import { useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { updateActivity, handleUnauthorized } from "@/lib/auth-utils";
import { getAccessToken } from "@/app/actions/auth-actions";

export function SessionManager() {
    const router = useRouter();
    const pathname = usePathname();

    // Check timeout periodically
    const checkTimeout = useCallback(() => {
        // getAccessToken now internally checks for timeout and returns null if expired
        const token = getAccessToken();

        // If no token (and we assume we were logged in/or on a protected route), 
        // handleUnauthorized logic could be triggered here if needed.
        // However, since getAccessToken() clears the session, the next API call or page refresh will handle it.
        // To force a redirect immediately when timeout happens (visual auto-logout), we can check:
        // But getAccessToken returning null doesn't distinguish between "never logged in" and "timed out".
        // So checking here might just be for "If I thought I was logged in, check if I'm still logged in".

        // Simple approach: Just reading getAccessToken() triggers the cleanup if expired.
        // If we want to redirect to login page instantly:
        if (!token && pathname !== "/login") {
            // Optional: If you want to force redirect immediately when token expires in background
            // handleUnauthorized(); 
        }
    }, [pathname]);

    // Update activity on user interaction
    const handleActivity = useCallback(() => {
        updateActivity();
    }, []);

    useEffect(() => {
        const events = ["mousedown", "keydown", "scroll", "touchstart"];

        events.forEach((event) => {
            window.addEventListener(event, handleActivity);
        });

        // Check every 1 minute
        const intervalId = setInterval(checkTimeout, 60 * 1000);

        return () => {
            events.forEach((event) => {
                window.removeEventListener(event, handleActivity);
            });
            clearInterval(intervalId);
        };
    }, [handleActivity, checkTimeout]);

    return null;
}
