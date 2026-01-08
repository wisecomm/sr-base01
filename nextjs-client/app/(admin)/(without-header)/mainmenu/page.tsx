"use client";

import Link from "next/link";
import {
    Barcode,
    Scan,
    Boxes,
    RotateCcw,
    ClipboardList,
    Bird,
    MapPin,
    PackagePlus,
    Power,
    Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/store/useAppStore";
import { useEffect, useState } from "react";

const menuItems = [
    { title: "반품 스캔", icon: Barcode, color: "text-primary", href: "/return-scan" },
    { title: "재고 스캔", icon: Scan, color: "text-primary", href: "/inventory-scan" },
    { title: "재고 업무", icon: Boxes, color: "text-foreground", href: "/inventory-task" },
    { title: "반품 업무", icon: RotateCcw, color: "text-foreground", href: "/return-task" },
    { title: "스캔 작업", icon: ClipboardList, color: "text-foreground", href: "/scan-work" },
    { title: "Stock Eagle", icon: Bird, color: "text-foreground", href: "/stock-eagle" },
    { title: "로케이션 관리", icon: MapPin, color: "text-foreground", href: "/location-management" },
    { title: "상품 등록", icon: PackagePlus, color: "text-foreground", href: "/products/add" },
    { title: "상품 조회", icon: PackagePlus, color: "text-foreground", href: "/products" },
    { title: "상품 조회2", icon: PackagePlus, color: "text-foreground", href: "/tabtest" },
];

export default function MainMenuPage() {
    const user = useAppStore((state) => state.user);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 0);
        return () => clearTimeout(timer);
    }, []);

    if (!mounted) return null;

    return (
        <div className="flex flex-col min-h-screen bg-muted text-foreground max-w-md mx-auto border-x shadow-sm">
            {/* Header */}
            <header className="flex items-center justify-between p-4 bg-background border-b sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border">
                        <AvatarImage src="/images/avatar-placeholder.png" />
                        <AvatarFallback className="bg-primary/10 text-primary">
                            {user?.userName?.[0] || '管'}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground font-medium">
                            {user?.roles?.includes('ROLE_ADMIN') ? '관리자' : '사용자'}
                        </span>
                        <span className="text-sm font-bold">환영합니다, {user?.userName || '관리자'}님</span>
                    </div>
                </div>
                <div className="relative">
                    <Button variant="ghost" size="icon" className="text-muted-foreground">
                        <Bell className="h-6 w-6" />
                        <Badge className="absolute -top-1 -right-1 h-2 w-2 p-0 bg-destructive border-2 border-background rounded-full" />
                    </Button>
                </div>
            </header>

            {/* Grid Content */}
            <main className="flex-1 p-4 bg-muted/50">
                <div className="grid grid-cols-2 gap-3">
                    {menuItems.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            className="block"
                        >
                            <Card
                                className="border-none shadow-sm hover:shadow-md transition-all cursor-pointer group active:scale-[0.98]"
                            >
                                <CardContent className="flex flex-col items-center justify-center p-6 gap-3 min-h-[140px]">
                                    <div className={`${item.color} group-hover:scale-110 transition-transform`}>
                                        <item.icon className="h-10 w-10 stroke-[1.5]" />
                                    </div>
                                    <span className="text-base font-bold text-center leading-tight">
                                        {item.title}
                                    </span>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                {/* Action Button */}
                <div className="mt-4 pb-8">
                    <Button
                        variant="outline"
                        className="w-full h-14 border-none shadow-sm text-destructive font-bold text-lg bg-background hover:bg-destructive/10 hover:text-destructive transition-colors gap-2"
                    >
                        <Power className="h-5 w-5" />
                        작업 종료
                    </Button>
                </div>
            </main>
        </div>
    );
}
