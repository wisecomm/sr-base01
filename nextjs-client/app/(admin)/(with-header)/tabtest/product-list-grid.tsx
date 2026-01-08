"use client";

import * as React from "react";
import {
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { columns, Product } from "./columns";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "./data-table-toolbar";

const mockProducts: Product[] = [
    { barcode: "A-01-02", productName: "무선 바코드 스캐너", status: "정상", statusColor: "text-green-600", quantity: 120, date: "2023-10-25" },
    { barcode: "B-12-01", productName: "산업용 PDA 단말기", status: "부족", statusColor: "text-orange-500", quantity: 45, date: "2023-10-25" },
    { barcode: "C-05-04", productName: "블루투스 라벨 프린터", status: null, statusColor: "", quantity: 8, date: "2023-10-24" },
    { barcode: "A-02-01", productName: "핸드헬드 터미널", status: "정상", statusColor: "text-green-600", quantity: 200, date: "2023-10-24" },
    { barcode: "SR-01", productName: "WMS 서버 랙", status: null, statusColor: "", quantity: 1, date: "2023-10-23" },
    { barcode: "B-03-03", productName: "재고 조사 스캐너", status: "품절임박", statusColor: "text-red-500", quantity: 50, date: "2023-10-23" },
];

export function ProductListGrid() {
    const dateInputRef = React.useRef<HTMLInputElement>(null);
    const [searchDate, setSearchDate] = React.useState(new Date().toISOString().split("T")[0]);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const handleSearch = () => {
        table.getColumn("date")?.setFilterValue(searchDate);
    };

    const table = useReactTable({
        data: mockProducts,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div className="flex flex-col w-full">
            <DataTableToolbar
                searchDate={searchDate}
                onSearchDateChange={setSearchDate}
                onSearch={handleSearch}
                dateInputRef={dateInputRef}
            />

            <main className="flex-1 px-4 pt-2 space-y-4 w-full">
                <div className="flex justify-between items-end">
                    <p className="text-foreground text-lg font-bold">검색 결과 <span className="text-primary">{table.getFilteredRowModel().rows.length}</span>건</p>
                    <p className="text-muted-foreground text-xs font-medium">최신순 정렬</p>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="rounded-xl border bg-white shadow-sm overflow-hidden mb-8">
                        <DataTable table={table} />
                    </div>
                </div>
            </main>
        </div>
    );
}
