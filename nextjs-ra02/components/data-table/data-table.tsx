"use client";

import * as React from "react";
import {
    Table as TanstackTable,
    flexRender,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataTableProps<TData> {
    table: TanstackTable<TData>;
}

export function DataTable<TData>({
    table,
}: DataTableProps<TData>) {
    const [clickedRowId, setClickedRowId] = React.useState<string | null>(null);

    return (
        <div className="w-full space-y-4">
            <div className="rounded-md border bg-white dark:bg-slate-900">
                <Table className="table-fixed">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            style={{ width: header.getSize() }}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    onClick={() => setClickedRowId(row.id === clickedRowId ? null : row.id)}
                                    className={`cursor-pointer ${clickedRowId === row.id ? "bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800" : ""}`}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={table.getAllColumns().length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">

                <div className="flex items-center justify-between px-2">
                    <div className="flex-1 text-sm text-muted-foreground">
                        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </div>
                    <div className="flex items-center space-x-6 lg:space-x-8">
                        <div className="flex items-center space-x-2">
                            <p className="text-sm font-medium">Rows per page</p>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="h-8 w-[70px]">
                                        {table.getState().pagination.pageSize}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {[10, 20, 30, 40, 50].map((pageSize) => (
                                        <DropdownMenuCheckboxItem
                                            key={pageSize}
                                            className="capitalize"
                                            checked={table.getState().pagination.pageSize === pageSize}
                                            onCheckedChange={(value) => {
                                                if (value) {
                                                    table.setPageSize(pageSize);
                                                }
                                            }}
                                        >
                                            {pageSize}
                                        </DropdownMenuCheckboxItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="outline"
                                className="h-8 w-8 p-0"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                <span className="sr-only">Go to previous page</span>
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            {Array.from({ length: Math.min(5, table.getPageCount()) }, (_, i) => {
                                const pageIndex = table.getState().pagination.pageIndex;
                                const totalPages = table.getPageCount();
                                const startPage = Math.floor(pageIndex / 5) * 5;

                                const pageNumber = startPage + i;

                                if (pageNumber >= totalPages) return null;

                                return (
                                    <Button
                                        key={pageNumber}
                                        variant={pageIndex === pageNumber ? "default" : "outline"}
                                        className="h-8 w-8 p-0"
                                        onClick={() => table.setPageIndex(pageNumber)}
                                    >
                                        {pageNumber + 1}
                                    </Button>
                                );
                            })}
                            <Button
                                variant="outline"
                                className="h-8 w-8 p-0"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                <span className="sr-only">Go to next page</span>
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Input
                                className="h-8 w-[70px]"
                                placeholder="Page"
                                type="number"
                                min={1}
                                max={table.getPageCount()}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        const page = Number(e.currentTarget.value) - 1;
                                        if (page >= 0 && page < table.getPageCount()) {
                                            table.setPageIndex(page);
                                        }
                                    }
                                }}
                            />
                            <Button
                                variant="outline"
                                className="h-8"
                                onClick={(e) => {
                                    const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                                    const page = Number(input.value) - 1;
                                    if (page >= 0 && page < table.getPageCount()) {
                                        table.setPageIndex(page);
                                    }
                                }}
                            >
                                Go
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
