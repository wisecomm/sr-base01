"use client";

import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { RoleInfo } from "@/types";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

interface ColumnsProps {
    onEdit: (role: RoleInfo) => void;
    onDelete: (role: RoleInfo) => void;
}

export const getColumns = ({ onEdit, onDelete }: ColumnsProps): ColumnDef<RoleInfo>[] => [
    {
        accessorKey: "roleId",
        header: "Role ID",
        cell: ({ row }) => <div className="font-mono font-medium">{row.getValue("roleId")}</div>,
    },
    {
        accessorKey: "roleName",
        header: "Role Name",
        cell: ({ row }) => <div className="font-medium text-slate-900 dark:text-slate-100">{row.getValue("roleName")}</div>,
    },
    {
        accessorKey: "roleDesc",
        header: "Description",
        cell: ({ row }) => (
            <div className="max-w-[300px] truncate text-slate-500 dark:text-slate-400">
                {row.getValue("roleDesc") || "-"}
            </div>
        ),
    },
    {
        accessorKey: "useYn",
        header: "Status",
        cell: ({ row }) => {
            const useYn = row.getValue("useYn") as string;
            return (
                <span className={cn(
                    "px-2 py-1 text-xs font-semibold rounded-full",
                    useYn === "1"
                        ? "text-green-700 bg-green-100"
                        : "text-red-700 bg-red-100"
                )}>
                    {useYn === "1" ? "Active" : "Disabled"}
                </span>
            );
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const role = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[160px]">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onEdit(role)}>
                            <Pencil className="mr-2 h-3.5 w-3.5" />
                            Edit details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => onDelete(role)}
                            className="text-destructive focus:text-destructive"
                        >
                            <Trash2 className="mr-2 h-3.5 w-3.5" />
                            Delete role
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
