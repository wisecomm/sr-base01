"use client"

import * as React from "react"

// Simplified toast for fixing build errors
// In a full shadcn setup, this would be much more complex

type ToastProps = {
    title?: string
    description?: React.ReactNode
    variant?: "default" | "destructive"
}

export function toast({ title, description, variant = "default" }: ToastProps) {
    console.log(`[Toast ${variant}] ${title}: ${description}`)
    // In a real app, this would trigger a UI update.
    alert(`${title}\n${description}`)
}

export function useToast() {
    return {
        toast,
    }
}
