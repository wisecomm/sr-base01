// This is a client-side mock data fetcher

import { Payment } from "../../app/(admin)/(with-header)/payments/columns";
import { generatePayments } from "@/app/(admin)/(with-header)/payments/mock";

// Simulate a database
const ALL_PAYMENTS = generatePayments(500);

export async function getPaserverData(
    pageIndex: number,
    pageSize: number
): Promise<{ data: Payment[]; pageCount: number; total: number }> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const start = pageIndex * pageSize;
    const end = start + pageSize;
    const data = ALL_PAYMENTS.slice(start, end);
    const pageCount = Math.ceil(ALL_PAYMENTS.length / pageSize);

    return {
        data,
        pageCount,
        total: ALL_PAYMENTS.length,
    };
}
