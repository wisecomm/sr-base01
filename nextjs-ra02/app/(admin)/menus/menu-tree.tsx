"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { MenuInfo } from "@/types";
import { ChevronRight, ChevronDown, Folder, File, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MenuTreeProps {
    items: MenuInfo[];
    selectedId?: string;
    onSelect: (item: MenuInfo) => void;
    onAddChild: (parentId: string, level: number) => void;
}

export function MenuTree({ items, selectedId, onSelect, onAddChild }: MenuTreeProps) {
    const [expanded, setExpanded] = React.useState<Record<string, boolean>>({});

    const toggleExpand = (id: string) => {
        setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
    };

    React.useEffect(() => {
        if (items.length > 0) {
            const initialExpanded: Record<string, boolean> = {};
            items.filter(item => !item.upperMenuId).forEach(item => {
                initialExpanded[item.menuId] = true;
            });
            setExpanded(prev => ({ ...initialExpanded, ...prev }));
        }
    }, [items]);

    const buildTree = (parentId?: string) => {
        return items
            .filter(item => item.upperMenuId === parentId || (!parentId && !item.upperMenuId))
            .sort((a, b) => (a.menuSeq || 0) - (b.menuSeq || 0));
    };

    const renderNode = (item: MenuInfo, level: number = 0) => {
        const children = buildTree(item.menuId);
        const hasChildren = children.length > 0;
        const isExpanded = expanded[item.menuId];
        const isSelected = selectedId === item.menuId;

        return (
            <div key={item.menuId} className="select-none">
                <div
                    className={cn(
                        "flex items-center py-1.5 px-2 rounded-md cursor-pointer group transition-colors",
                        isSelected ? "bg-slate-200 dark:bg-slate-800 text-primary" : "hover:bg-slate-100 dark:hover:bg-slate-900",
                        item.useYn === "0" && "opacity-50"
                    )}
                    onClick={() => onSelect(item)}
                    style={{ paddingLeft: `${level * 16 + 8}px` }}
                >
                    <div className="w-4 h-4 mr-1 flex items-center justify-center">
                        {hasChildren ? (
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleExpand(item.menuId);
                                }}
                                className="hover:bg-slate-300 dark:hover:bg-slate-700 rounded p-0.5"
                            >
                                {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                            </div>
                        ) : null}
                    </div>
                    {hasChildren ? (
                        <Folder className={cn("w-4 h-4 mr-2", isSelected ? "text-primary" : "text-slate-400")} />
                    ) : (
                        <File className={cn("w-4 h-4 mr-2", isSelected ? "text-primary" : "text-slate-400")} />
                    )}
                    <span className="text-sm font-medium truncate flex-1">{item.menuName}</span>
                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                            "w-6 h-6 ml-1 transition-opacity",
                            isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                        )}
                        onClick={(e) => {
                            e.stopPropagation();
                            onAddChild(item.menuId, item.menuLvl + 1);
                        }}
                    >
                        <Plus className="w-3 h-3" />
                    </Button>
                </div>
                {hasChildren && isExpanded && (
                    <div className="mt-0.5">
                        {children.map(child => renderNode(child, level + 1))}
                    </div>
                )}
            </div>
        );
    };

    const rootItems = buildTree();

    return (
        <div className="space-y-1">
            {rootItems.length === 0 ? (
                <div className="text-sm text-slate-500 text-center py-10">
                    No menus found.
                </div>
            ) : (
                rootItems.map(item => renderNode(item))
            )}
        </div>
    );
}
