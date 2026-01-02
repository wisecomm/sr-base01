"use client";

import * as React from "react";
import { MenuInfo } from "@/types";
import { useMenus, useCreateMenu, useUpdateMenu, useDeleteMenu } from "@/hooks/useMenuQuery";
import { MenuTree } from "./menu-tree";
import { MenuForm } from "./menu-form";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

export default function MenusPage() {
    const { toast } = useToast();
    const { data: menus = [], isLoading } = useMenus();
    const createMenuMutation = useCreateMenu();
    const updateMenuMutation = useUpdateMenu();
    const deleteMenuMutation = useDeleteMenu();

    const [selectedMenu, setSelectedMenu] = React.useState<MenuInfo | null>(null);

    // Auto-select first menu if none is selected and data is available
    React.useEffect(() => {
        if (!selectedMenu && menus.length > 0) {
            const firstRoot = menus.find((m: MenuInfo) => !m.upperMenuId) || menus[0];
            setSelectedMenu(firstRoot);
        }
    }, [menus, selectedMenu]);

    const handleSelect = (menu: MenuInfo) => {
        setSelectedMenu(menu);
    };

    const handleAddChild = (parentId: string, level: number) => {
        setSelectedMenu({
            menuId: "",
            menuName: "",
            menuLvl: level,
            upperMenuId: parentId,
            leftMenuYn: "Y",
            useYn: "1",
            adminMenuYn: "N",
            personalDataYn: "N",
        } as MenuInfo);
    };

    const handleFormSubmit = async (formData: Partial<MenuInfo>) => {
        try {
            if (selectedMenu && selectedMenu.menuId) {
                await updateMenuMutation.mutateAsync({ id: selectedMenu.menuId, data: formData });
                toast({ title: "수정 완료", description: "메뉴 정보가 수정되었습니다.", variant: "success" });
            } else {
                await createMenuMutation.mutateAsync(formData);
                toast({ title: "등록 완료", description: "새 메뉴가 등록되었습니다.", variant: "success" });
            }
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : String(error);
            toast({ title: "오류 발생", description: message || "An error occurred.", variant: "destructive" });
        }
    };

    const handleDelete = async (menuId: string) => {
        if (confirm(`Are you sure you want to delete menu ${menuId}?`)) {
            try {
                await deleteMenuMutation.mutateAsync(menuId);
                setSelectedMenu(null);
                toast({ title: "삭제 완료", description: "메뉴가 삭제되었습니다.", variant: "success" });
            } catch (error: unknown) {
                const message = error instanceof Error ? error.message : String(error);
                toast({ title: "삭제 실패", description: message || "Failed to delete menu.", variant: "destructive" });
            }
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6">
            <div className="max-w-[1600px] mx-auto space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Menu Management</h1>
                    <p className="text-slate-500 dark:text-slate-400">Organize and configure system navigation menu hierarchy.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Column: Menu Tree */}
                    <Card className="lg:col-span-4 shadow-sm overflow-hidden flex flex-col max-h-[calc(100vh-200px)]">
                        <CardContent className="flex-1 overflow-auto p-4">
                            {isLoading ? (
                                <div className="space-y-4">
                                    {[...Array(8)].map((_, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <Skeleton className="h-4 w-4 rounded" />
                                            <Skeleton className="h-4 flex-1" />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <MenuTree
                                    items={menus}
                                    selectedId={selectedMenu?.menuId}
                                    onSelect={handleSelect}
                                    onAddChild={handleAddChild}
                                />
                            )}
                        </CardContent>
                    </Card>

                    {/* Right Column: Menu Detail Form */}
                    <div className="lg:col-span-8">
                        <MenuForm
                            item={selectedMenu}
                            allMenus={menus}
                            onSubmit={handleFormSubmit}
                            onDelete={handleDelete}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
