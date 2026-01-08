"use client";

import { ColumnDef } from "@tanstack/react-table";
import { RoleInfo } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { TextCell, UseYnCell, HeaderCell, SortableHeader } from "@/components/data-table/cells";

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
        header: ({ column }) => <SortableHeader column={column} title="권한 아이디" />,
        cell: ({ row }) => <TextCell value={row.getValue("roleId")} />,
        enableSorting: true,
    },
    {
        accessorKey: "roleName",
        header: ({ column }) => <SortableHeader column={column} title="권한 이름" />,
        cell: ({ row }) => <TextCell value={row.getValue("roleName")} />,
        enableSorting: true,
    },
    {
        accessorKey: "roleDesc",
        header: () => <HeaderCell title="비고" />,
        cell: ({ row }) => <TextCell value={row.getValue("roleDesc")} variant="muted" />,
    },
    {
        accessorKey: "useYn",
        header: ({ column }) => <SortableHeader column={column} title="상태" />,
        cell: ({ row }) => <UseYnCell value={row.getValue("useYn")} />,
        size: 80,
        enableSorting: true,
    },
];
