"use client";

interface DateCellProps {
    value: string | Date | null | undefined;
    /** 날짜 포맷 옵션 */
    format?: "date" | "datetime" | "time" | "relative";
    /** 값이 없을 때 표시할 텍스트 */
    fallback?: string;
    /** 로케일 */
    locale?: string;
}

/**
 * 날짜 포맷팅 셀 렌더러
 * 
 * @example
 * // 컬럼 정의에서 사용
 * cell: ({ row }) => <DateCell value={row.getValue("createdAt")} format="datetime" />
 */
export function DateCell({
    value,
    format = "datetime",
    fallback = "-",
    locale = "ko-KR",
}: DateCellProps) {
    if (!value) {
        return <span className="text-slate-400">{fallback}</span>;
    }

    const date = typeof value === "string" ? new Date(value) : value;

    if (isNaN(date.getTime())) {
        return <span className="text-slate-400">{fallback}</span>;
    }

    let formatted: string;

    switch (format) {
        case "date":
            formatted = date.toLocaleDateString(locale, {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            });
            break;
        case "time":
            formatted = date.toLocaleTimeString(locale, {
                hour: "2-digit",
                minute: "2-digit",
            });
            break;
        case "relative":
            formatted = getRelativeTime(date, locale);
            break;
        case "datetime":
        default:
            formatted = date.toLocaleString(locale, {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
            });
    }

    // ko-KR 로케일에서 날짜 사이의 마침표 제거 (예: 2025. 12. 30. -> 2025 12 30)
    if (locale === "ko-KR") {
        formatted = formatted.replace(/\./g, "");
    }

    return (
        <span className="text-slate-600 dark:text-slate-400 tabular-nums">
            {formatted}
        </span>
    );
}

/**
 * 상대 시간 계산 (예: "3시간 전", "2일 전")
 */
function getRelativeTime(date: Date, locale: string): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

    if (diffDays > 30) {
        return date.toLocaleDateString(locale);
    } else if (diffDays > 0) {
        return rtf.format(-diffDays, "day");
    } else if (diffHours > 0) {
        return rtf.format(-diffHours, "hour");
    } else if (diffMins > 0) {
        return rtf.format(-diffMins, "minute");
    } else {
        return rtf.format(-diffSecs, "second");
    }
}
