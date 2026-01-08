"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Board } from "./actions";
import { TextCell, DateCell, UseYnCell, NumberCell } from "@/components/data-table/cells";
import { createColumn, createSelectColumn } from "@/components/data-table/column-helper";

export const getColumns = (): ColumnDef<Board>[] => [
    createSelectColumn(),
    createColumn("boardId", "순번", {
        sort: true,
        size: 80,
        cell: ({ row }) => <TextCell value={row.getValue("boardId")} />
    }),
    createColumn("title", "제목", {
        sort: true,
        size: 300,
        cell: ({ row }) => <TextCell value={row.getValue("title")} align="left" />
    }),
    createColumn("userId", "작성자", {
        sort: true,
        size: 120,
        cell: ({ row }) => <TextCell value={row.getValue("userId")} />
    }),
    createColumn("hitCnt", "조회수", {
        sort: true,
        size: 80,
        cell: ({ row }) => <NumberCell value={row.getValue("hitCnt")} />
    }),
    createColumn("secretYn", "비밀", {
        sort: true,
        size: 60,
        cell: ({ row }) => <UseYnCell value={row.getValue("secretYn")} />
    }),
    createColumn("useYn", "사용", {
        sort: true,
        size: 60,
        cell: ({ row }) => <UseYnCell value={row.getValue("useYn")} />
    }),
    createColumn("sysInsertDtm", "등록일", {
        sort: true,
        size: 150,
        cell: ({ row }) => <DateCell value={row.getValue("sysInsertDtm")} format="datetime" />
    }),
];
