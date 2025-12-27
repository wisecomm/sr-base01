"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface DialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: React.ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => onOpenChange(false)}
            />
            <div className="relative z-50 w-full max-w-lg bg-white dark:bg-slate-900 rounded-lg shadow-lg animate-in fade-in zoom-in duration-200">
                {children}
            </div>
        </div>
    );
}

export function DialogContent({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={cn("p-6", className)}>{children}</div>;
}

export function DialogHeader({ children }: { children: React.ReactNode }) {
    return <div className="mb-4 space-y-1.5 text-center sm:text-left">{children}</div>;
}

export function DialogTitle({ children }: { children: React.ReactNode }) {
    return <h2 className="text-lg font-semibold leading-none tracking-tight">{children}</h2>;
}

export function DialogDescription({ children }: { children: React.ReactNode }) {
    return <p className="text-sm text-muted-foreground">{children}</p>;
}

export function DialogFooter({ children }: { children: React.ReactNode }) {
    return <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">{children}</div>;
}

export function DialogClose({ onClick }: { onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none"
        >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
        </button>
    );
}
