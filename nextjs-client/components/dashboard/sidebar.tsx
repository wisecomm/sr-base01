"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    CreditCard,
    FileText,
    Image as ImageIcon,
    LogOut,
} from "lucide-react";

const sidebarItems = [
    {
        title: "Payments",
        href: "/payments",
        icon: CreditCard,
    },
    {
        title: "Posts",
        href: "/posts",
        icon: FileText,
    },
    {
        title: "Photos",
        href: "/photos",
        icon: ImageIcon,
    },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="hidden border-r bg-slate-50/40 dark:bg-slate-950/40 md:block md:w-64 lg:w-72">
            <div className="flex h-full flex-col gap-2">
                <div className="flex h-14 items-center border-b px-6 font-semibold lg:h-[60px]">
                    <Link href="/" className="flex items-center gap-2 font-bold">
                        <span className="">NextGen Admin</span>
                    </Link>
                </div>
                <div className="flex-1 overflow-auto py-2">
                    <nav className="grid items-start px-4 text-sm font-medium">
                        {sidebarItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                                        pathname === item.href
                                            ? "bg-slate-100 text-primary dark:bg-slate-800"
                                            : "text-muted-foreground"
                                    )}
                                >
                                    <Icon className="h-4 w-4" />
                                    {item.title}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
                <div className="mt-auto p-4 border-t">
                    <Link
                        href="/logout"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:text-primary"
                    >
                        <LogOut className="h-4 w-4" />
                        Log out
                    </Link>
                </div>
            </div>
        </div>
    );
}
