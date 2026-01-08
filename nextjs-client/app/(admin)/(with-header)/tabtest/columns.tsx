"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Product = {
    barcode: string;
    productName: string;
    status: string | null;
    statusColor: string;
    quantity: number;
    date: string;
};

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "barcode",
        header: "상품 바코드",
        cell: ({ row }) => <div className="font-medium">{row.getValue("barcode")}</div>,
    },
    {
        accessorKey: "productName",
        header: "상품명",
        cell: ({ row }) => {
            const status = row.original.status;
            const statusColor = row.original.statusColor;
            return (
                <div className="flex flex-col gap-0.5">
                    <div className="font-bold truncate max-w-[200px]">{row.getValue("productName")}</div>
                    {status && (
                        <div className={`text-[10px] font-bold ${statusColor}`}>
                            {status}
                        </div>
                    )}
                </div>
            );
        },
    },
    {
        accessorKey: "quantity",
        header: "입고 수량",
        cell: ({ row }) => (
            <div className="font-bold text-primary">
                {row.getValue("quantity")}
            </div>
        ),
    },
    {
        accessorKey: "date",
        header: "입고일",
        cell: ({ row }) => (
            <div className="text-muted-foreground whitespace-nowrap">
                {row.getValue("date")}
            </div>
        ),
    },
];
