"use client";

import * as React from "react";
import { MenuInfo } from "@/types";
import { useMenus, useCreateMenu, useUpdateMenu, useDeleteMenu } from "@/hooks/useMenuQuery";
import { MenuTree } from "./menu-tree";
import { MenuForm } from "./menu-form";
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
        <div className="w-full h-full flex flex-col lg:flex-row gap-6">
            {/* Left Column: Menu Tree */}
            <div className="w-full lg:w-1/4 min-w-[300px] flex flex-col bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden h-fit max-h-[calc(100vh-200px)]">
                <div className="p-4 bg-gray-100 dark:bg-slate-700 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-medium text-sm text-gray-700 dark:text-gray-200">
                        <span className="text-base">최상위메뉴</span>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-2">
                    {isLoading ? (
                        <div className="space-y-4 p-2">
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
                </div>
            </div>

            {/* Right Column: Menu Detail Form */}
            <div className="flex-1 bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden">
                <MenuForm
                    item={selectedMenu}
                    allMenus={menus}
                    onSubmit={handleFormSubmit}
                    onDelete={handleDelete}
                />
            </div>
        </div>
    );
}
