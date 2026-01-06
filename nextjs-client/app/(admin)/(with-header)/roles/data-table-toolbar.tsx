"use client";

import * as React from "react";
import { Plus, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DataTableToolbarProps {
    onAdd: () => void;
    onRefresh: () => void;
    isLoading?: boolean;
}

export function DataTableToolbar({
    onAdd,
    onRefresh,
    isLoading,
}: DataTableToolbarProps) {

    return (
        <div className="flex items-center justify-between gap-4">
            <div className="flex flex-1 items-center space-x-2">
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
