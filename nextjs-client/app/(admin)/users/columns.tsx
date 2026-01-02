"use client";

import { ColumnDef } from "@tanstack/react-table";
import { UserDetail } from "@/types";
import { WiTitleCell, TextCell, DateCell } from "@/components/data-table/cells";
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
    { accessorKey: "userId", header: () => <WiTitleCell value="아이디" size="100" />, cell: ({ row }) => <TextCell value={row.getValue("userId")} /> },
    { accessorKey: "userName", header: () => <WiTitleCell value="이름" size="150" />, cell: ({ row }) => <TextCell value={row.getValue("userName")} /> },
    { accessorKey: "userEmail", header: () => <WiTitleCell value="이메일" size="200" />, cell: ({ row }) => <TextCell value={row.getValue("userEmail")} /> },
    { accessorKey: "userNick", header: () => <WiTitleCell value="닉네임" size="150" />, cell: ({ row }) => <TextCell value={row.getValue("userNick")} /> },
    { accessorKey: "useYn", header: () => <WiTitleCell value="사용 여부" size="80" />, cell: ({ row }) => <TextCell value={row.getValue("useYn")} /> },
    { accessorKey: "sysInsertDtm", header: () => <WiTitleCell value="등록일" size="180" />, cell: ({ row }) => <DateCell value={row.getValue("sysInsertDtm")} format="datetime" /> },
];
