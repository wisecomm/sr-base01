"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAccessToken } from "@/app/actions/auth-actions";
import { Sidebar } from "@/components/layout-admin/sidebar";
import { Header } from "@/components/layout-admin/header";
import { PageHeader } from "@/components/layout-admin/page-header";
import { Footer } from "@/components/layout-admin/footer";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    useEffect(() => {
        const token = getAccessToken();
        if (!token) {
            router.replace("/login");
        }
    }, [router]);

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40 md:flex-row">
            <Sidebar />
            <div className="flex flex-col flex-1 min-h-screen transition-all duration-300 ease-in-out">
                <Header />
                <main className="flex-1 bg-slate-50/50 dark:bg-slate-950/50 pt-2 pb-4 md:pt-3 md:pb-6 lg:pt-4 lg:pb-8 overflow-y-auto px-6">
                    <PageHeader />
                    {children}
                </main>
                <Footer />
            </div>
        </div>
    );
}
