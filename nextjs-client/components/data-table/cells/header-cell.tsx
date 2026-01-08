"use client";

import { Column } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SortableHeaderProps<TData> {
    column: Column<TData, unknown>;
    title: string;
    className?: string;
}

/**
 * 정렬 가능한 헤더 셀
 * 
 * @example
 * // 컬럼 정의에서 사용
 * {
 *     accessorKey: "name",
 *     header: ({ column }) => <SortableHeader column={column} title="이름" />,
 *     cell: ({ row }) => <TextCell value={row.getValue("name")} />,
 * }
 */
export function SortableHeader<TData>({
    column,
    title,
    className,
}: SortableHeaderProps<TData>) {
    const sorted = column.getIsSorted();

    return (
        <Button
            variant="ghost"
            onClick={() => {
                if (sorted === "asc") {
                    column.toggleSorting(true); // asc -> desc
                } else if (sorted === "desc") {
                    column.clearSorting(); // desc -> none
                } else {
                    column.toggleSorting(false); // none -> asc
                }
            }}
            className={cn(
                "h-8 px-2 font-semibold text-center w-full justify-center hover:bg-muted",
                className
            )}
        >
            {title}
            {sorted === "asc" ? (
                <ArrowUp className="ml-1.5 h-3.5 w-3.5" />
            ) : sorted === "desc" ? (
                <ArrowDown className="ml-1.5 h-3.5 w-3.5" />
            ) : (
                <ArrowUpDown className="ml-1.5 h-3.5 w-3.5 opacity-50" />
            )}
        </Button>
    );
}

interface HeaderCellProps {
    title: string;
    className?: string;
}

/**
 * 일반 헤더 셀 (정렬 없음)
 * 
 * @example
 * // 컬럼 정의에서 사용
 * {
 *     accessorKey: "description",
 *     header: () => <HeaderCell title="비고" />,
 *     cell: ({ row }) => <TextCell value={row.getValue("description")} />,
 * }
 */
export function HeaderCell({ title, className }: HeaderCellProps) {
    return (
        <div className={cn("text-center font-semibold text-sm", className)}>
            {title}
        </div>
    );
}
