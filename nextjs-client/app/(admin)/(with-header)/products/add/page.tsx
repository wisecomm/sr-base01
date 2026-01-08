"use client";

import React from "react";
import {
    ChevronLeft,
    Barcode,
    ChevronDown,
    Calendar
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProductAddPage() {
    const router = useRouter();
    const dateInputRef = React.useRef<HTMLInputElement>(null);

    const [formData, setFormData] = React.useState({
        barcode: "",
        productName: "",
        spec: "",
        unit: "",
        category: "",
        receivingDate: new Date().toISOString().split("T")[0]
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

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

    const handleReset = () => {
        setFormData({
            barcode: "",
            productName: "",
            spec: "",
            unit: "",
            category: "",
            receivingDate: new Date().toISOString().split("T")[0]
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitting product:", formData);
        alert("상품이 등록되었습니다.");
        router.push("/mainmenu");
    };

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
                <h1 className="text-lg font-bold text-foreground">상품 등록</h1>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-4 pb-8">
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    {/* Barcode Section */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-foreground" htmlFor="barcode">
                            상품 바코드
                        </label>
                        <div className="relative">
                            <input
                                autoFocus
                                className="w-full h-12 rounded-xl border border-border bg-background px-4 pr-12 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm"
                                id="barcode"
                                placeholder="바코드를 스캔하세요"
                                type="text"
                                value={formData.barcode}
                                onChange={handleInputChange}
                            />
                            <button
                                className="absolute right-0 top-0 h-12 w-12 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                                type="button"
                            >
                                <Barcode className="h-6 w-6" />
                            </button>
                        </div>
                        <p className="text-xs text-muted-foreground">PDA 스캐너 버튼을 눌러 스캔하세요.</p>
                    </div>

                    {/* Receiving Date Section */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-foreground" htmlFor="receivingDate">
                            입고일자
                        </label>
                        <div className="relative">
                            <input
                                className="w-full h-12 rounded-xl border border-border bg-background px-4 pr-12 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm"
                                id="receivingDate"
                                placeholder="YYYY-MM-DD"
                                type="text"
                                value={formData.receivingDate}
                                onChange={handleInputChange}
                            />
                            {/* Hidden date picker */}
                            <input
                                type="date"
                                ref={dateInputRef}
                                className="absolute opacity-0 pointer-events-none"
                                value={formData.receivingDate}
                                onChange={(e) => {
                                    setFormData(prev => ({ ...prev, receivingDate: e.target.value }));
                                }}
                                style={{ right: 0, bottom: 0, width: 1, height: 1 }}
                            />
                            <button
                                className="absolute right-0 top-0 h-12 w-12 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                                type="button"
                                onClick={handleDateIconClick}
                            >
                                <Calendar className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    {/* Product Name */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-foreground" htmlFor="productName">
                            상품명
                        </label>
                        <input
                            className="w-full h-12 rounded-xl border border-border bg-background px-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm"
                            id="productName"
                            placeholder="상품명을 입력하세요"
                            type="text"
                            value={formData.productName}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Spec / Option */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-foreground" htmlFor="spec">
                            규격 / 옵션
                        </label>
                        <input
                            className="w-full h-12 rounded-xl border border-border bg-background px-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm"
                            id="spec"
                            placeholder="예: 500ml, XL, Red"
                            type="text"
                            value={formData.spec}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Unit and Category Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-foreground" htmlFor="unit">
                                단위
                            </label>
                            <div className="relative">
                                <select
                                    className="w-full h-12 rounded-xl border border-border bg-background px-4 pr-10 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none appearance-none shadow-sm"
                                    id="unit"
                                    value={formData.unit}
                                    onChange={handleInputChange}
                                >
                                    <option disabled value="">선택</option>
                                    <option value="EA">EA (개)</option>
                                    <option value="BOX">BOX (박스)</option>
                                    <option value="KG">KG (킬로그램)</option>
                                    <option value="SET">SET (세트)</option>
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                                    <ChevronDown className="h-5 w-5" />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-foreground" htmlFor="category">
                                카테고리
                            </label>
                            <div className="relative">
                                <select
                                    className="w-full h-12 rounded-xl border border-border bg-background px-4 pr-10 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none appearance-none shadow-sm"
                                    id="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                >
                                    <option disabled value="">선택</option>
                                    <option value="elec">전자제품</option>
                                    <option value="food">식품</option>
                                    <option value="cloth">의류</option>
                                    <option value="raw">원자재</option>
                                    <option value="etc">기타</option>
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                                    <ChevronDown className="h-5 w-5" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons Included in Form */}
                    <div className="flex gap-3 mt-4">
                        <button
                            className="flex-1 h-12 rounded-xl bg-muted border border-border text-foreground font-bold text-base active:bg-slate-200 transition-colors"
                            type="button"
                            onClick={handleReset}
                        >
                            초기화
                        </button>
                        <button
                            className="flex-1 h-12 rounded-xl bg-primary text-white font-bold text-base shadow-md active:bg-primary/90 transition-colors"
                            type="submit"
                        >
                            등록
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}
