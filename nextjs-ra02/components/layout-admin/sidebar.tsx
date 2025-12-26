"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    CreditCard,
    FileText,
    Image as ImageIcon,
    LogOut,
    ChevronLeft,
    ChevronRight,
    LayoutDashboard,
    Info,
    Home,
    ChevronDown,
    Settings,
    LucideIcon,
    Table,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
    title: string;
    href?: string;
    icon: LucideIcon;
    children?: SidebarItem[];
}

const sidebarItems: SidebarItem[] = [
    {
        title: "대시보드",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "관리",
        icon: Settings,
        children: [

            {
                title: "결제 관리",
                href: "/payments",
                icon: CreditCard,
            },
            {
                title: "Paserver",
                href: "/paserver",
                icon: Table,
            },
            {
                title: "게시글 관리",
                href: "/posts",
                icon: FileText,
            },
            {
                title: "사진 관리",
                href: "/photos",
                icon: ImageIcon,
            },
        ],
    },
    {
        title: "정보",
        icon: Info,
        children: [
            {
                title: "소개",
                href: "/about",
                icon: Info,
            },
            {
                title: "환영합니다",
                href: "/welcome",
                icon: Home,
            },
        ],
    },
];

export function Sidebar() {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
        "관리": true,
        "정보": true,
    });

    const toggleGroup = (title: string) => {
        setOpenGroups(prev => ({ ...prev, [title]: !prev[title] }));
    };

    return (
        <TooltipProvider>
            <div
                className={cn(
                    "hidden border-r bg-slate-50/40 dark:bg-slate-950/40 md:block transition-all duration-300",
                    isCollapsed ? "w-[70px]" : "md:w-64 lg:w-72"
                )}
            >
                <div className="flex h-full flex-col gap-2">
                    <div className={cn(
                        "flex h-14 items-center border-b px-4 font-semibold lg:h-[60px]",
                        isCollapsed ? "justify-center" : "justify-between"
                    )}>
                        {!isCollapsed && (
                            <Link href="/" className="flex items-center gap-2 font-bold truncate">
                                <span className="">NextGen 관리자</span>
                            </Link>
                        )}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setIsCollapsed(!isCollapsed)}
                        >
                            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                        </Button>
                    </div>
                    <div className="flex-1 overflow-auto py-2">
                        <nav className="grid items-start px-2 text-sm font-medium gap-1">
                            {sidebarItems.map((item, index) => {
                                const Icon = item.icon;

                                if (item.children) {
                                    // Group Item
                                    if (isCollapsed) {
                                        return (
                                            <DropdownMenu key={index}>
                                                <Tooltip delayDuration={0}>
                                                    <TooltipTrigger asChild>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                className="flex h-9 w-full items-center justify-center p-0"
                                                            >
                                                                <Icon className="h-4 w-4" />
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
                                                        <DropdownMenuItem key={child.href} asChild>
                                                            <Link href={child.href!} className="cursor-pointer">
                                                                <child.icon className="mr-2 h-4 w-4" />
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
                                                key={index}
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
                                                            <Icon className="h-4 w-4" />
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
                                                            key={child.href}
                                                            href={child.href!}
                                                            className={cn(
                                                                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary pl-9",
                                                                pathname === child.href
                                                                    ? "bg-slate-100 text-primary dark:bg-slate-800"
                                                                    : "text-muted-foreground"
                                                            )}
                                                        >
                                                            <child.icon className="h-4 w-4" />
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
                                        <Tooltip key={item.href}>
                                            <TooltipTrigger asChild>
                                                <Link
                                                    href={item.href!}
                                                    className={cn(
                                                        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                                                        pathname === item.href
                                                            ? "bg-slate-100 text-primary dark:bg-slate-800"
                                                            : "text-muted-foreground",
                                                        isCollapsed && "justify-center px-2"
                                                    )}
                                                >
                                                    <Icon className="h-4 w-4" />
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
