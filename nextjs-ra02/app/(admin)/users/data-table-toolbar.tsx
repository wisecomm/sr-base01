"use client";

import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, RefreshCw } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
    onAdd: () => void;
    onRefresh: () => void;
    isLoading?: boolean;
}

export function DataTableToolbar<TData>({
    table,
    onAdd,
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
                    Add User
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">Columns</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
