"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAccessToken } from "@/app/actions/auth-actions";
import { Sidebar } from "@/components/layout-admin/sidebar";
import { Header } from "@/components/layout-admin/header";
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
            // TODO: 로그인 페이지로 이동 잠시 막음
            //            router.push("/login");
        }
    }, [router]);

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40 md:flex-row">
            <Sidebar />
            <div className="flex flex-col flex-1 min-h-screen transition-all duration-300 ease-in-out">
                <Header />
                <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
                    {children}
                </main>
                <Footer />
            </div>
        </div>
    );
}
