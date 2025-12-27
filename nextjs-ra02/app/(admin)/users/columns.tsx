"use client";

import { ColumnDef } from "@tanstack/react-table";
import { UserDetail } from "@/types";
import { MoreHorizontal, SquarePen, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ColumnProps {
    onEdit: (user: UserDetail) => void;
    onDelete: (user: UserDetail) => void;
}

export const getColumns = ({ onEdit, onDelete }: ColumnProps): ColumnDef<UserDetail>[] => [
    {
        accessorKey: "userId",
        header: "User ID",
        size: 100,
    },
    {
        accessorKey: "userName",
        header: "Name",
        size: 150,
    },
    {
        accessorKey: "userEmail",
        header: "Email",
        size: 200,
    },
    {
        accessorKey: "userNick",
        header: "Nickname",
        size: 150,
    },
    {
        accessorKey: "useYn",
        header: "Use Y/N",
        size: 80,
        cell: ({ row }) => (
            <div className="text-center">
                {row.getValue("useYn") === "1" ? (
                    <span className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">Yes</span>
                ) : (
                    <span className="px-2 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-full">No</span>
                )}
            </div>
        ),
    },
    {
        accessorKey: "sysInsertDtm",
        header: "Created At",
        size: 180,
        cell: ({ row }) => {
            const date = row.getValue("sysInsertDtm") as string;
            if (!date) return "-";
            return new Date(date).toLocaleString();
        },
    },
    {
        id: "actions",
        header: "Actions",
        size: 100,
        cell: ({ row }) => {
            const user = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onEdit(user)}>
                            <SquarePen className="mr-2 h-4 w-4" />
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="text-red-600 focus:text-red-600"
                            onClick={() => onDelete(user)}
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
