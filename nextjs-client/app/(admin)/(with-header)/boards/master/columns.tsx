"use client";

import { ColumnDef } from "@tanstack/react-table";
import { BoardMaster } from "./actions";
import { TextCell, DateCell, UseYnCell, NumberCell, SortableHeader } from "@/components/data-table/cells";
import { Checkbox } from "@/components/ui/checkbox";

export const getColumns = (): ColumnDef<BoardMaster>[] => [
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
        accessorKey: "brdId",
        header: ({ column }) => <SortableHeader column={column} title="게시판 코드" />,
        cell: ({ row }) => <TextCell value={row.getValue("brdId")} />,
        enableSorting: true,
        size: 120,
    },
    {
        accessorKey: "brdNm",
        header: ({ column }) => <SortableHeader column={column} title="게시판 명" />,
        cell: ({ row }) => <TextCell value={row.getValue("brdNm")} />,
        enableSorting: true,
        size: 200,
    },
    {
        accessorKey: "replyUseYn",
        header: ({ column }) => <SortableHeader column={column} title="댓글" />,
        cell: ({ row }) => <UseYnCell value={row.getValue("replyUseYn")} />,
        enableSorting: true,
        size: 80,
    },
    {
        accessorKey: "fileUseYn",
        header: ({ column }) => <SortableHeader column={column} title="파일첨부" />,
        cell: ({ row }) => <UseYnCell value={row.getValue("fileUseYn")} />,
        enableSorting: true,
        size: 80,
    },
    {
        accessorKey: "fileMaxCnt",
        header: ({ column }) => <SortableHeader column={column} title="파일 수" />,
        cell: ({ row }) => <NumberCell value={row.getValue("fileMaxCnt")} />,
        enableSorting: true,
        size: 80,
    },
    {
        accessorKey: "useYn",
        header: ({ column }) => <SortableHeader column={column} title="사용" />,
        cell: ({ row }) => <UseYnCell value={row.getValue("useYn")} />,
        enableSorting: true,
        size: 80,
    },
    {
        accessorKey: "sysInsertDtm",
        header: ({ column }) => <SortableHeader column={column} title="등록일" />,
        cell: ({ row }) => <DateCell value={row.getValue("sysInsertDtm")} format="datetime" />,
        enableSorting: true,
        size: 180,
    },
];
