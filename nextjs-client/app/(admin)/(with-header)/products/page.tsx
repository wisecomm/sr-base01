"use client";

import React from "react";
import {
    ChevronLeft,
    Calendar,
    Search,
    ScanBarcode
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProductInquiryPage() {
    const router = useRouter();
    const dateInputRef = React.useRef<HTMLInputElement>(null);
    const [searchDate, setSearchDate] = React.useState(new Date().toISOString().split("T")[0]);

    // Mock data based on the user's HTML
    const products = [
        { barcode: "A-01-02", name: "무선 바코드 스캐너", status: "정상", statusColor: "text-green-600", quantity: 120, date: "2023-10-25" },
        { barcode: "B-12-01", name: "산업용 PDA 단말기", status: "부족", statusColor: "text-orange-500", quantity: 45, date: "2023-10-25" },
        { barcode: "C-05-04", name: "블루투스 라벨 프린터", status: null, statusColor: "", quantity: 8, date: "2023-10-24" },
        { barcode: "A-02-01", name: "핸드헬드 터미널", status: "정상", statusColor: "text-green-600", quantity: 200, date: "2023-10-24" },
        { barcode: "SR-01", name: "WMS 서버 랙", status: null, statusColor: "", quantity: 1, date: "2023-10-23" },
        { barcode: "B-03-03", name: "재고 조사 스캐너", status: "품절임박", statusColor: "text-red-500", quantity: 50, date: "2023-10-23" },
    ];

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
        <div className="bg-muted font-sans antialiased text-foreground min-h-screen flex flex-col max-w-md mx-auto border-x shadow-sm relative">
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
                <h1 className="text-lg font-bold text-foreground flex-1 text-center pr-8">상품 조회</h1>
            </header>

            {/* Filter Section */}
            <div className="p-4 bg-background shadow-sm mb-4">
                <div className="flex items-center gap-3 w-full">
                    <p className="text-sm font-bold text-foreground leading-normal shrink-0">입고 날짜</p>
                    <div className="relative flex-1">
                        <input
                            className="w-full h-11 rounded-xl border border-border bg-background px-4 pr-10 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm font-normal text-sm"
                            type="text"
                            placeholder="YYYY-MM-DD"
                            value={searchDate}
                            onChange={(e) => setSearchDate(e.target.value)}
                        />
                        {/* Hidden date picker */}
                        <input
                            type="date"
                            ref={dateInputRef}
                            className="absolute opacity-0 pointer-events-none"
                            value={searchDate}
                            onChange={(e) => setSearchDate(e.target.value)}
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
                    <button className="flex h-11 px-10 items-center justify-center rounded-xl bg-primary hover:bg-primary/90 active:scale-[0.98] transition-all text-white font-bold text-sm shadow-md shrink-0">
                        <Search className="h-4 w-4 mr-1.5" />
                        <span>조회</span>
                    </button>
                </div>
            </div>

            {/* Results Info */}
            <div className="px-4 pb-2 flex justify-between items-end">
                <p className="text-foreground text-lg font-bold">검색 결과 <span className="text-primary">{products.length}</span>건</p>
                <p className="text-muted-foreground text-xs font-medium">최신순 정렬</p>
            </div>

            {/* Table Section */}
            <div className="p-4 pb-24">
                <div className="w-full overflow-hidden rounded-xl border border-border bg-background shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-foreground">
                            <thead className="bg-muted text-xs uppercase text-muted-foreground font-semibold border-b border-border">
                                <tr>
                                    <th className="px-4 py-3 text-center border-r border-border/50 whitespace-nowrap">바코드</th>
                                    <th className="px-4 py-3 text-center border-r border-border/50 whitespace-nowrap">상품명</th>
                                    <th className="px-4 py-3 text-center border-r border-border/50 whitespace-nowrap">입고수량</th>
                                    <th className="px-4 py-3 text-center whitespace-nowrap">입고일</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50">
                                {products.map((p, i) => (
                                    <tr key={i} className="hover:bg-muted/50 transition-colors">
                                        <td className="px-4 py-4 text-center border-r border-border/50 text-xs font-medium text-muted-foreground">{p.barcode}</td>
                                        <td className="px-4 py-4 border-r border-border/50">
                                            <div className="font-bold truncate max-w-[120px]">{p.name}</div>
                                            {p.status && (
                                                <div className={`text-[10px] font-bold mt-0.5 ${p.statusColor}`}>{p.status}</div>
                                            )}
                                        </td>
                                        <td className="px-4 py-4 text-center border-r border-border/50 font-bold text-primary text-base">{p.quantity}</td>
                                        <td className="px-4 py-4 text-center text-[11px] text-muted-foreground whitespace-nowrap">{p.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
