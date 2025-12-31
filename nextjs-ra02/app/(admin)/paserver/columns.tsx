"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { UserDetail } from "@/types";

export const columns: ColumnDef<UserDetail>[] = [
  {
    id: "select",
    header: ({ table }) => {
      if (!table.options.enableMultiRowSelection) {
        return null;
      }
      return (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      );
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 50,
  },
  {
    accessorKey: "userId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          아이디
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="font-medium">{row.getValue("userId")}</div>,
  },
  {
    accessorKey: "userName",
    header: "이름",
    cell: ({ row }) => <div>{row.getValue("userName")}</div>,
  },
  {
    accessorKey: "userEmail",
    header: "이메일",
    cell: ({ row }) => <div>{row.getValue("userEmail")}</div>,
  },
  {
    accessorKey: "userMobile",
    header: "연락처",
    cell: ({ row }) => <div>{row.getValue("userMobile")}</div>,
  },
  {
    accessorKey: "userStatCd",
    header: "상태",
    cell: ({ row }) => {
      const status = row.getValue("userStatCd") as string;
      return (
        <div className={status === "10" ? "text-green-600" : "text-red-500"}>
          {status === "10" ? "활성" : "중지"}
        </div>
      );
    },
  },
  {
    accessorKey: "sysInsertDtm",
    header: "등록일",
    cell: ({ row }) => {
      const dtm = row.getValue("sysInsertDtm") as string;
      return <div>{dtm ? new Date(dtm).toLocaleDateString() : "-"}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
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
            <DropdownMenuLabel>작업</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.userId)}>
              아이디 복사
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>상세 보기</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">삭제</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    size: 50,
  },
];
