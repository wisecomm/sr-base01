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
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { SearchPageLayout } from "@/components/common/search-page-layout";

const mockProducts: Product[] = [
    { barcode: "A-01-02", productName: "무선 바코드 스캐너", status: "정상", statusColor: "text-green-600", quantity: 120, date: "2023-10-25" },
    { barcode: "B-12-01", productName: "산업용 PDA 단말기", status: "부족", statusColor: "text-orange-500", quantity: 45, date: "2023-10-25" },
    { barcode: "C-05-04", productName: "블루투스 라벨 프린터", status: null, statusColor: "", quantity: 8, date: "2023-10-24" },
    { barcode: "A-02-01", productName: "핸드헬드 터미널", status: "정상", statusColor: "text-green-600", quantity: 200, date: "2023-10-24" },
    { barcode: "SR-01", productName: "WMS 서버 랙", status: null, statusColor: "", quantity: 1, date: "2023-10-23" },
    { barcode: "B-03-03", productName: "재고 조사 스캐너", status: "품절임박", statusColor: "text-red-500", quantity: 50, date: "2023-10-23" },
];

export default function ProductsList2Page() {
    const router = useRouter();
    const dateInputRef = React.useRef<HTMLInputElement>(null);
    const [searchDate, setSearchDate] = React.useState(new Date().toISOString().split("T")[0]);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const handleSearch = () => {
        // Here we filter by the date column. 
        // Note: In columns.tsx the date column ID is likely "date"
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
        <div className="bg-muted font-sans antialiased text-foreground min-h-screen flex flex-col max-w-md mx-auto border-x shadow-sm">
            {/* Header */}
            <header className="flex items-center gap-3 p-4 sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
                <button
                    onClick={() => router.back()}
                    aria-label="뒤로가기"
                    className="flex items-center justify-center p-1 rounded-full hover:bg-black/5 transition-colors -ml-2"
                    type="button"
                >
                    <ChevronLeft className="h-6 w-6 text-foreground" />
                </button>
                <h1 className="text-xl font-bold text-foreground">상품 목록 (Grid)</h1>
            </header>





            <SearchPageLayout className="px-4">
                {/* Filter Section (Moved outside main to remove side margins) */}
                <DataTableToolbar
                    searchDate={searchDate}
                    onSearchDateChange={setSearchDate}
                    onSearch={handleSearch}
                    dateInputRef={dateInputRef}
                />

                <main className="flex-1 space-y-4 w-full">
                    {/* Results Info */}
                    <div className="flex justify-between items-end">
                        <p className="text-foreground text-lg font-bold">검색 결과 <span className="text-primary">{table.getFilteredRowModel().rows.length}</span>건</p>
                        <p className="text-muted-foreground text-xs font-medium">최신순 정렬</p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="rounded-xl border bg-background shadow-sm overflow-hidden">
                            <DataTable table={table} />
                        </div>
                    </div>
                </main>
            </SearchPageLayout>
        </div>
    );
}
