"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useMyMenus } from "@/hooks/useMenuQuery";
import { MenuInfo } from "@/types";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function PageHeader() {
    const pathname = usePathname();
    const { data: menus } = useMyMenus();

    if (!menus) return null;

    // Find the current menu item based on the pathname
    const currentMenu = menus.find((menu) => menu.menuUri === pathname);

    // If no menu matches the current path, we might be on a sub-page or dashboard
    if (!currentMenu && pathname !== "/dashboard") {
        // Fallback for sub-pages or unknown pages
        const title = pathname.split("/").pop() || "Admin";
        return (
            <div className="flex flex-col gap-3 mb-2 pt-2">
                <div className="flex items-center gap-4">
                    <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary)/0.4)]" />
                    <h1 className="text-2xl font-bold text-foreground dark:text-foreground capitalize">{title}</h1>
                </div>
                <div className="h-px bg-border dark:bg-border w-full" />
            </div>
        );
    }

    // Build the breadcrumbs by traversing up the menu hierarchy
    const breadcrumbs: string[] = [];
    let tempMenu: MenuInfo | undefined = currentMenu;

    while (tempMenu) {
        breadcrumbs.unshift(tempMenu.menuName);
        const upperId = tempMenu.upperMenuId;
        tempMenu = menus.find((m) => m.menuId === upperId);
    }

    // "최상단 메뉴는 제외" - Skip the very first ancestor if it exists
    const breadcrumbsToDisplay = breadcrumbs.length > 1 ? breadcrumbs.slice(1) : breadcrumbs;

    // Special case for dashboard or root
    const pageTitle = currentMenu?.menuName || (pathname === "/dashboard" ? "대시보드" : "Admin");
    const displayBreadcrumbs = ["홈", ...breadcrumbsToDisplay];

    return (
        <div className="flex flex-col gap-3 mb-2 pt-2">
            <div className="flex items-center gap-4">
                {/* The Orange Dot */}
                <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary)/0.4)] shrink-0" />

                {/* Page Title */}
                <h1 className="text-2xl font-bold text-foreground dark:text-foreground">{pageTitle}</h1>

                {/* Breadcrumbs */}
                <div className="ml-4 flex items-center gap-2 text-sm text-muted-foreground dark:text-muted-foreground font-medium">
                    {displayBreadcrumbs.map((crumb, index) => (
                        <React.Fragment key={index}>
                            <span className={cn(index === displayBreadcrumbs.length - 1 ? "text-foreground dark:text-muted-foreground" : "")}>
                                {crumb}
                            </span>
                            {index < displayBreadcrumbs.length - 1 && (
                                <ChevronRight className="w-3 h-3" />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Horizontal Separator */}
            <div className="h-px bg-border dark:bg-border w-full" />
        </div>
    );
}
