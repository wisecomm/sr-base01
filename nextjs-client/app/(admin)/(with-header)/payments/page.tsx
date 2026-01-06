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
} from "@tanstack/react-table";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "./data-table-toolbar";
import { generatePayments } from "@/app/(admin)/(with-header)/payments/mock";
import { useState, useEffect } from "react";
import { Payment } from "./columns";
import * as React from "react";

export default function PaymentsPage() {
  const [data, setData] = useState<Payment[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [enableMultiSelection, setEnableMultiSelection] = useState(true);

  useEffect(() => {
    // Simulate async data fetching to avoid hydration mismatch and synchronous state update warning
    const timer = setTimeout(() => {
      setData(generatePayments(100));
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    enableMultiRowSelection: enableMultiSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full space-y-6">
      <div className="w-full space-y-4">
        <DataTableToolbar table={table} />
        <DataTable table={table} />
      </div>
    </div>
  );
}
