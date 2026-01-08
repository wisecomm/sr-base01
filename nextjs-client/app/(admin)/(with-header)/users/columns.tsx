"use client";

import { ColumnDef } from "@tanstack/react-table";
import { UserDetail } from "@/types";
import { TextCell, DateCell, UseYnCell, SortableHeader } from "@/components/data-table/cells";
import { Checkbox } from "@/components/ui/checkbox";

export const getColumns = (): ColumnDef<UserDetail>[] => [
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
        accessorKey: "userId",
        header: ({ column }) => <SortableHeader column={column} title="아이디" />,
        cell: ({ row }) => <TextCell value={row.getValue("userId")} />,
        enableSorting: true,
        size: 100,
    },
    {
        accessorKey: "userName",
        header: ({ column }) => <SortableHeader column={column} title="이름" />,
        cell: ({ row }) => <TextCell value={row.getValue("userName")} />,
        enableSorting: true,
        size: 150,
    },
    {
        accessorKey: "userEmail",
        header: ({ column }) => <SortableHeader column={column} title="이메일" />,
        cell: ({ row }) => <TextCell value={row.getValue("userEmail")} />,
        enableSorting: true,
        size: 200,
    },
    {
        accessorKey: "userNick",
        header: ({ column }) => <SortableHeader column={column} title="닉네임" />,
        cell: ({ row }) => <TextCell value={row.getValue("userNick")} />,
        enableSorting: true,
        size: 150,
    },
    {
        accessorKey: "useYn",
        header: ({ column }) => <SortableHeader column={column} title="사용 여부" />,
        cell: ({ row }) => <UseYnCell value={row.getValue("useYn")} />,
        enableSorting: true,
        size: 80,
    },
    {
        accessorKey: "sysInsertDtm",
        header: ({ column }) => <SortableHeader column={column} title="등록일" />,
        cell: ({ row }) => <DateCell value={row.getValue("sysInsertDtm")} format="date" />,
        enableSorting: true,
        size: 180,
    },
];
