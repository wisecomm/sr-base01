"use client";

import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { usePathname } from "next/navigation";

export function Header() {
    const pathname = usePathname();
    const title = pathname.split("/").pop() || "Dashboard";

    return (
        <header className="flex h-14 items-center gap-4 border-b bg-slate-50/40 px-6 dark:bg-slate-950/40 lg:h-[60px]">
            <div className="flex-1">
                <h1 className="text-lg font-semibold capitalize">{title}</h1>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                    <span className="sr-only">Notifications</span>
                </Button>
                <ThemeToggle />
                <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                    <span className="sr-only">User menu</span>
                </Button>
            </div>
        </header>
    );
}
