import { Payment } from "@/app/(admin)/payments/columns";

export function generatePayments(count: number): Payment[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `PAY-${i + 1000}`,
    amount: Math.floor(Math.random() * 500) + 50,
    status: ["pending", "processing", "success", "failed"][
      Math.floor(Math.random() * 4)
    ] as Payment["status"],
    email: `user${i + 1}@example.com`,
    date: new Date(Date.now() - Math.floor(Math.random() * 10000000000))
      .toISOString()
      .split("T")[0],
  }));
}
