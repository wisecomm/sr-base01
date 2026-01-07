"use client";

import { ColumnDef } from "@tanstack/react-table";
import { RoleInfo } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { WiTitleCell, TextCell } from "@/components/data-table/cells";
import { cn } from "@/lib/utils";

export const getColumns = (): ColumnDef<RoleInfo>[] => [
    {
        id: "select",
        cell: ({ row }) => (
            <div
                className="flex justify-center"
                onClick={(e) => e.stopPropagation()}
            >
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
        size: 40,
    },
    {
        accessorKey: "roleId",
        header: () => <WiTitleCell value="권한 아이디" size="100" />,
        cell: ({ row }) => <TextCell value={row.getValue("roleId")} />,
    },
    {
        accessorKey: "roleName",
        header: () => <WiTitleCell value="권한 이름" size="150" />,
        cell: ({ row }) => <TextCell value={row.getValue("roleName")} />, // Using TextCell for consistency
    },
    {
        accessorKey: "roleDesc",
        header: () => <WiTitleCell value="비고" size="200" />,
        cell: ({ row }) => <TextCell value={row.getValue("roleDesc") || "-"} />,
    },
    {
        accessorKey: "useYn",
        header: () => <WiTitleCell value="상태" size="80" />,
        cell: ({ row }) => {
            const useYn = row.getValue("useYn") as string;
            return (
                <div className="flex items-center">
                    <span className={cn(
                        "px-2 py-1 text-xs font-semibold rounded-full",
                        useYn === "1"
                            ? "text-green-700 bg-green-100"
                            : "text-red-700 bg-red-100"
                    )}>
                        {useYn === "1" ? "Active" : "Disabled"}
                    </span>
                </div>
            );
        },
    },
];
