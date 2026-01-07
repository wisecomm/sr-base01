"use client";

import { ColumnDef } from "@tanstack/react-table";
import { BoardMaster } from "./actions";
import { WiTitleCell, TextCell, DateCell } from "@/components/data-table/cells";
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
    { accessorKey: "brdId", header: () => <WiTitleCell value="게시판 코드" size="120" />, cell: ({ row }) => <TextCell value={row.getValue("brdId")} /> },
    { accessorKey: "brdNm", header: () => <WiTitleCell value="게시판 명" size="200" />, cell: ({ row }) => <TextCell value={row.getValue("brdNm")} /> },
    { accessorKey: "replyUseYn", header: () => <WiTitleCell value="댓글" size="80" />, cell: ({ row }) => <TextCell value={row.getValue("replyUseYn") === "1" ? "사용" : "미사용"} /> },
    { accessorKey: "fileUseYn", header: () => <WiTitleCell value="파일첨부" size="80" />, cell: ({ row }) => <TextCell value={row.getValue("fileUseYn") === "1" ? "사용" : "미사용"} /> },
    { accessorKey: "fileMaxCnt", header: () => <WiTitleCell value="파일 수" size="80" />, cell: ({ row }) => <TextCell value={row.getValue("fileMaxCnt")} /> },
    { accessorKey: "useYn", header: () => <WiTitleCell value="사용" size="80" />, cell: ({ row }) => <TextCell value={row.getValue("useYn") === "1" ? "사용" : "미사용"} /> },
    { accessorKey: "sysInsertDtm", header: () => <WiTitleCell value="등록일" size="180" />, cell: ({ row }) => <DateCell value={row.getValue("sysInsertDtm")} format="datetime" /> },
];
