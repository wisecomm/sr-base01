"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    ChevronLeft,
    ChevronRight,
    LogOut,
    ChevronDown,
    LucideIcon,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { getMyMenus } from "@/app/(admin)/menus/actions";
import { MenuInfo } from "@/types";



import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SidebarItem {
    id: string;
    title: string;
    href?: string;
    icon?: LucideIcon;
    image?: string;
    children?: SidebarItem[];
}

const staticSidebarItems: SidebarItem[] = [
    {
        id: "dashboard",
        title: "대시보드",
        href: "/dashboard",
        image: "/images/menus/dashboard.svg",
    },
];

const buildMenuTree = (menus: MenuInfo[]): SidebarItem[] => {
    const menuMap: Record<string, SidebarItem> = {};
    const rootItems: SidebarItem[] = [];

    // 1. Map all items (Level 2 and below)
    menus.forEach((menu) => {
        if (menu.menuLvl === 1) return; // Skip Level 1 root

        menuMap[menu.menuId] = {
            id: menu.menuId,
            title: menu.menuName,
            href: menu.menuUri || undefined,
            image: menu.menuImgUri || undefined,
            children: [],
        };
    });

    // 2. Build hierarchy
    menus.forEach((menu) => {
        if (menu.menuLvl === 1) return; // Skip Level 1

        const item = menuMap[menu.menuId];

        // Root candidate if level is 2
        if (menu.menuLvl === 2) {
            rootItems.push(item);
        }
        // Otherwise, try to find parent
        else if (menu.upperMenuId && menuMap[menu.upperMenuId]) {
            menuMap[menu.upperMenuId].children!.push(item);
        }
        // Fallback for Level 3+ with missing parent (should be avoided by Backend recursive fetch)
        else {
            rootItems.push(item);
        }
    });

    // 3. Cleanup empty children
    const finalizeItems = (items: SidebarItem[]) => {
        items.forEach(it => {
            if (it.children?.length === 0) {
                delete it.children;
            } else if (it.children) {
                finalizeItems(it.children);
            }
        });
    };
    finalizeItems(rootItems);

    return rootItems;
};


const IconRenderer = ({ icon: Icon, image, className }: { icon?: LucideIcon, image?: string, className?: string }) => {
    if (image) {
        return (
            <div className={cn("relative h-6 w-6 shrink-0", className)}>
                <Image
                    src={image}
                    alt=""
                    fill
                    className="object-contain"
                />
            </div>
        );
    }
    if (Icon) {
        return <Icon className={cn("h-4 w-4 shrink-0", className)} />;
    }
    return null;
};

export function Sidebar() {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [sidebarItems, setSidebarItems] = useState<SidebarItem[]>(staticSidebarItems);
    const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
    const isFetched = useRef(false);

    useEffect(() => {
        if (isFetched.current) return;

        const loadMenus = async () => {
            setMounted(true);
            isFetched.current = true;
            try {
                const res = await getMyMenus();
                if (res.code === "200" && res.data && res.data.length > 0) {
                    const dynamicItems = buildMenuTree(res.data);
                    setSidebarItems(dynamicItems);

                    // Auto-open all root groups
                    const initialOpen: Record<string, boolean> = {};
                    dynamicItems.forEach(item => {
                        if (item.children) initialOpen[item.title] = true;
                    });
                    setOpenGroups(initialOpen);
                }
            } catch (error) {
                console.error("Failed to load dynamic menus:", error);
            }
        };
        loadMenus();
    }, []);


    const toggleGroup = (title: string) => {
        setOpenGroups(prev => ({ ...prev, [title]: !prev[title] }));
    };

    if (!mounted) return null;

    return (
        <TooltipProvider>
            <div
                className={cn(
                    "relative flex flex-col border-r bg-slate-50/40 transition-all duration-300 dark:bg-slate-900/40",
                    isCollapsed ? "w-[70px]" : "w-[240px]"
                )}
            >
                <div className="flex h-full flex-col gap-2">
                    <div className="flex h-[60px] items-center border-b px-4 justify-between">
                        {!isCollapsed && (
                            <Link href="/" className="flex items-center gap-2 font-semibold">
                                <div className="h-8 w-8 rounded-lg bg-primary" />
                                <span className="text-lg">Admin Panel</span>
                            </Link>
                        )}
                        <Button
                            variant="ghost"
                            size="icon"
                            className={cn("h-8 w-8", isCollapsed && "mx-auto")}
                            onClick={() => setIsCollapsed(!isCollapsed)}
                        >
                            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                        </Button>
                    </div>
                    <div className="flex-1 overflow-auto py-2">
                        <nav className="grid items-start px-2 text-sm font-medium gap-1">
                            {sidebarItems.map((item) => {
                                if (item.children) {
                                    // Group Item
                                    if (isCollapsed) {
                                        return (
                                            <DropdownMenu key={item.id}>
                                                <Tooltip delayDuration={0}>
                                                    <TooltipTrigger asChild>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                className="flex h-9 w-full items-center justify-center p-0"
                                                            >
                                                                <IconRenderer icon={item.icon} image={item.image} />
                                                                <span className="sr-only">{item.title}</span>
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                    </TooltipTrigger>
                                                    <TooltipContent side="right">
                                                        {item.title}
                                                    </TooltipContent>
                                                </Tooltip>
                                                <DropdownMenuContent side="right" align="start" className="w-48">
                                                    <DropdownMenuLabel>{item.title}</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    {item.children.map((child) => (
                                                        <DropdownMenuItem key={child.id} asChild>
                                                            <Link href={child.href || "#"} className="cursor-pointer">
                                                                <IconRenderer icon={child.icon} image={child.image} className="mr-2" />
                                                                <span>{child.title}</span>
                                                            </Link>
                                                        </DropdownMenuItem>
                                                    ))}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        );
                                    } else {
                                        return (
                                            <Collapsible
                                                key={item.id}
                                                open={openGroups[item.title]}
                                                onOpenChange={() => toggleGroup(item.title)}
                                                className="w-full"
                                            >
                                                <CollapsibleTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        className="flex w-full items-center justify-between p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <IconRenderer icon={item.icon} image={item.image} />
                                                            <span className="font-semibold">{item.title}</span>
                                                        </div>
                                                        <ChevronDown
                                                            className={cn(
                                                                "h-4 w-4 transition-transform duration-200",
                                                                openGroups[item.title] ? "" : "-rotate-90"
                                                            )}
                                                        />
                                                    </Button>
                                                </CollapsibleTrigger>
                                                <CollapsibleContent className="space-y-1 px-2 py-1">
                                                    {item.children.map((child) => (
                                                        <Link
                                                            key={child.id}
                                                            href={child.href || "#"}
                                                            className={cn(
                                                                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary pl-9",
                                                                pathname === child.href
                                                                    ? "bg-slate-100 text-primary dark:bg-slate-800"
                                                                    : "text-muted-foreground"
                                                            )}
                                                        >
                                                            <IconRenderer icon={child.icon} image={child.image} />
                                                            <span>{child.title}</span>
                                                        </Link>
                                                    ))}
                                                </CollapsibleContent>
                                            </Collapsible>
                                        );
                                    }
                                } else {
                                    // Single Item
                                    return (
                                        <Tooltip key={item.id}>
                                            <TooltipTrigger asChild>
                                                <Link
                                                    href={item.href || "#"}
                                                    className={cn(
                                                        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                                                        pathname === item.href
                                                            ? "bg-slate-100 text-primary dark:bg-slate-800"
                                                            : "text-muted-foreground",
                                                        isCollapsed && "justify-center px-2"
                                                    )}
                                                >
                                                    <IconRenderer icon={item.icon} image={item.image} />
                                                    {!isCollapsed && <span>{item.title}</span>}
                                                </Link>
                                            </TooltipTrigger>
                                            {isCollapsed && (
                                                <TooltipContent side="right">
                                                    {item.title}
                                                </TooltipContent>
                                            )}
                                        </Tooltip>
                                    );
                                }
                            })}
                        </nav>
                    </div>
                    <div className="mt-auto p-4 border-t">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="/logout"
                                    className={cn(
                                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:text-primary",
                                        isCollapsed && "justify-center px-2"
                                    )}
                                >
                                    <LogOut className="h-4 w-4" />
                                    {!isCollapsed && <span>로그아웃</span>}
                                </Link>
                            </TooltipTrigger>
                            {isCollapsed && (
                                <TooltipContent side="right">
                                    로그아웃
                                </TooltipContent>
                            )}
                        </Tooltip>
                    </div>
                </div>
            </div>
        </TooltipProvider>
    );
}
