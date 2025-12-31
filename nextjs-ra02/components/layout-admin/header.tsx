"use client";

import { Bell, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { logout } from "@/app/actions/auth-actions";
import { useAppStore } from "@/store/useAppStore";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export function Header() {
    const pathname = usePathname();
    const title = pathname.split("/").pop() || "Dashboard";
    const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
    const user = useAppStore((state) => state.user);
    const clearUser = useAppStore((state) => state.clearUser);

    const handleLogout = () => {
        clearUser();
        logout();
    };

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

                <div className="flex items-center gap-3 px-2">
                    {user && (
                        <div className="hidden flex-col items-end gap-0.5 md:flex">
                            <span className="text-sm font-medium leading-none">{user.userName}님</span>
                            <span className="text-[10px] text-muted-foreground">{user.roles.includes('ROLE_ADMIN') ? '관리자' : '사용자'}</span>
                        </div>
                    )}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <User className="h-5 w-5" />
                                <span className="sr-only">User menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>{user?.userName || 'My Account'}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => setIsLogoutDialogOpen(true)} className="text-destructive focus:text-destructive cursor-pointer">
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Logout</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>로그아웃 확인</DialogTitle>
                            <DialogDescription>
                                정말로 로그아웃 하시겠습니까?
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="ghost" onClick={() => setIsLogoutDialogOpen(false)}>
                                취소
                            </Button>
                            <Button variant="destructive" onClick={handleLogout}>
                                로그아웃
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </header>
    );
}
