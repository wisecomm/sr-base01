"use client";

import { Table } from "@tanstack/react-table";
import { Plus, RotateCw, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
    isLoading,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;

    return (
        <div className="flex items-center justify-between gap-4">
            <div className="flex flex-1 items-center space-x-2">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <Input
                        placeholder="Search roles..."
                        value={(table.getColumn("roleName")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("roleName")?.setFilterValue(event.target.value)
                        }
                        className="pl-9"
                    />
                </div>
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8 px-2 lg:px-3 text-slate-500"
                    >
                        Reset
                        <X className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
            <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={onRefresh} disabled={isLoading}>
                    <RotateCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                </Button>
                <Button onClick={onAdd} className="bg-primary text-primary-foreground">
                    <Plus className="mr-2 h-4 w-4" /> Add Role
                </Button>
            </div>
        </div>
    );
}
