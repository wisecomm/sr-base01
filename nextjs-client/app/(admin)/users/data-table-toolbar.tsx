"use client";

import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, RefreshCw, Pencil, Trash2 } from "lucide-react";

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
    onAdd: () => void;
    onEdit: () => void;
    onDelete: () => void;
    onRefresh: () => void;
    isLoading?: boolean;
}

export function DataTableToolbar<TData>({
    table,
    onAdd,
    onEdit,
    onDelete,
    onRefresh,
    isLoading
}: DataTableToolbarProps<TData>) {
    return (
        <div className="flex items-center justify-between py-4 gap-2">
            <div className="flex flex-1 items-center space-x-2">
                <Input
                    placeholder="Search users..."
                    value={(table.getColumn("userName")?.getFilterValue() as string) ?? ""}
                    onChange={(event) => table.getColumn("userName")?.setFilterValue(event.target.value)}
                    className="max-w-sm"
                />
                <Button
                    variant="outline"
                    size="icon"
                    onClick={onRefresh}
                    disabled={isLoading}
                    title="Refresh"
                >
                    <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                </Button>
            </div>

            <div className="flex items-center space-x-2">
                <Button onClick={onAdd} className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="mr-2 h-4 w-4" />
                    추가
                </Button>

                <Button
                    variant="outline"
                    onClick={onEdit}
                    className="border-slate-200 text-slate-700 hover:bg-slate-100"
                >
                    <Pencil className="mr-2 h-4 w-4" />
                    수정
                </Button>

                <Button
                    variant="destructive"
                    onClick={onDelete}
                >
                    <Trash2 className="mr-2 h-4 w-4" />
                    삭제
                </Button>
            </div>
        </div>
    );
}
