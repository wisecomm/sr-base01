"use client";

import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  PaginationState,
} from "@tanstack/react-table";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "./data-table-toolbar";
import * as React from "react";
import { useUsers } from "@/hooks/useUserQuery";

export default function PaserverPage() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [enableMultiSelection, setEnableMultiSelection] = React.useState(true);

  // Pagination state (0-indexed for React Table)
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  // Fetch data using TanStack Query (1-indexed for Backend)
  const { data, isLoading } = useUsers(pagination.pageIndex + 1, pagination.pageSize);

  const table = useReactTable({
    data: data?.list || [],
    columns,
    pageCount: data?.pages || -1,
    manualPagination: true,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    enableMultiRowSelection: enableMultiSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">사용자 관리</h1>
            <p className="text-muted-foreground">시스템 사용자 계정 및 권한을 관리합니다.</p>
          </div>
        </div>

        <div className="w-full space-y-4">
          <DataTableToolbar table={table} />
          {isLoading && !data ? (
            <div className="flex h-32 items-center justify-center">Loading users...</div>
          ) : (
            <DataTable table={table} showSeparators={false} />
          )}
        </div>
      </div>
    </div>
  );
}
