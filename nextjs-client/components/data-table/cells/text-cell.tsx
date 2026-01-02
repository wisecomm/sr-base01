"use client";

import { cn } from "@/lib/utils";

interface TextCellProps {
    value: string | null | undefined;
    /** 최대 너비 (Tailwind class) */
    maxWidth?: string;
    /** 말줄임 적용 여부 */
    truncate?: boolean;
    /** 빈 값일 때 표시할 텍스트 */
    fallback?: string;
    /** 추가 스타일 변형 */
    variant?: "default" | "mono" | "muted" | "bold";
    /** 정렬 */
    align?: "left" | "center" | "right";
    /** 글자 크기 (Tailwind class) */
    size?: string;
}

const variantStyles = {
    default: "text-slate-900 dark:text-slate-100",
    mono: "font-mono font-medium text-slate-900 dark:text-slate-100",
    muted: "text-slate-500 dark:text-slate-400",
    bold: "font-semibold text-slate-900 dark:text-slate-100",
};

const alignStyles = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
};

/**
 * 텍스트 셀 렌더러
 */
export function TextCell({
    value,
    maxWidth = "max-w-[200px]",
    truncate = false,
    fallback = "-",
    variant = "default",
    align = "left",
    size = "text-sm",
}: TextCellProps) {
    if (!value) {
        return <span className="text-slate-400">{fallback}</span>;
    }

    return (
        <div
            className={cn(
                variantStyles[variant],
                alignStyles[align],
                truncate && maxWidth,
                truncate && "truncate",
                size
            )}
            title={truncate ? value : undefined}
        >
            {value}
        </div>
    );
}

// 자주 쓰이는 프리셋
/** WiTitleCell: 타이틀용 ID 셀 (중앙 정렬 + 볼드체) */
export const WiTitleCell = ({ value, size }: { value: string; size?: string }) => (
    <TextCell value={value} variant="bold" align="center" size={size} />
);

/** DescriptionCell: 설명용 셀 (Muted + 말줄임) */
export const DescriptionCell = ({ value, size }: { value: string | null; size?: string }) => (
    <TextCell value={value} variant="muted" truncate maxWidth="max-w-[300px]" size={size} />
);

