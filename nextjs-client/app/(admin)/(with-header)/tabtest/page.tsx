"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { ProductAddForm } from "./product-add-form";
import { ProductListGrid } from "./product-list-grid";

export default function ProductTabTestPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = React.useState<"add" | "list">("add");

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
                <h1 className="text-xl font-bold text-foreground">상품 관리</h1>
            </header>

            {/* Tabs Navigation */}
            <div className="flex bg-background border-b border-border sticky top-[65px] z-30">
                <button
                    onClick={() => setActiveTab("add")}
                    className={`flex-1 py-3 text-sm font-bold transition-all border-b-2 ${activeTab === "add"
                        ? "text-primary border-primary bg-primary/10"
                        : "text-muted-foreground border-transparent hover:text-foreground"
                        }`}
                >
                    상품 등록
                </button>
                <button
                    onClick={() => setActiveTab("list")}
                    className={`flex-1 py-3 text-sm font-bold transition-all border-b-2 ${activeTab === "list"
                        ? "text-primary border-primary bg-primary/10"
                        : "text-muted-foreground border-transparent hover:text-foreground"
                        }`}
                >
                    상품 목록
                </button>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-auto">
                {/* 입력 데이터를 유지하고 싶은 경우 */}
                <div className={activeTab !== "add" ? "hidden" : ""}>
                    <ProductAddForm onSuccess={() => setActiveTab("list")} />
                </div>
                <div className={activeTab !== "list" ? "hidden" : ""}>
                    <ProductListGrid />
                </div>
            </div>
        </div>
    );
}
