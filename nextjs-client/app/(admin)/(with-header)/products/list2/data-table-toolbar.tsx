"use client";

import React from "react";
import { Search, Calendar } from "lucide-react";

interface DataTableToolbarProps {
    searchDate: string;
    onSearchDateChange: (value: string) => void;
    onSearch: () => void;
    dateInputRef: React.RefObject<HTMLInputElement | null>;
}

export function DataTableToolbar({
    searchDate,
    onSearchDateChange,
    onSearch,
    dateInputRef,
}: DataTableToolbarProps) {
    const handleDateIconClick = () => {
        if (dateInputRef.current) {
            try {
                dateInputRef.current.showPicker();
            } catch (error) {
                console.error("showPicker failed:", error);
                dateInputRef.current.focus();
                dateInputRef.current.click();
            }
        }
    };

    return (
        <div className="p-4 bg-background shadow-sm">
            <div className="flex items-center gap-3 w-full">
                <p className="text-sm font-bold text-foreground leading-normal shrink-0">입고 날짜</p>
                <div className="relative flex-1">
                    <input
                        className="w-full h-11 rounded-xl border border-border bg-background px-4 pr-10 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm font-normal text-sm"
                        type="text"
                        placeholder="YYYY-MM-DD"
                        value={searchDate}
                        onChange={(e) => onSearchDateChange(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && onSearch()}
                    />
                    {/* Hidden date picker */}
                    <input
                        type="date"
                        ref={dateInputRef}
                        className="absolute opacity-0 pointer-events-none"
                        value={searchDate}
                        onChange={(e) => onSearchDateChange(e.target.value)}
                        style={{ right: 0, bottom: 0, width: 1, height: 1 }}
                    />
                    <button
                        className="absolute right-0 top-0 h-11 w-10 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                        type="button"
                        onClick={handleDateIconClick}
                    >
                        <Calendar className="h-4 w-4" />
                    </button>
                </div>
                <button
                    className="flex h-11 px-10 items-center justify-center rounded-xl bg-primary hover:bg-primary/90 active:scale-[0.98] transition-all text-white font-bold text-sm shadow-md shrink-0"
                    onClick={onSearch}
                >
                    <Search className="h-4 w-4 mr-1.5" />
                    <span>조회</span>
                </button>
            </div>
        </div>
    );
}
