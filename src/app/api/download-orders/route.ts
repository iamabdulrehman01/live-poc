import { NextResponse } from "next/server";
import { readOrders } from "@/store/ordersDb";

export async function GET() {
  try {
    const ordersMap = readOrders();
    const ordersList = Object.values(ordersMap).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Construct CSV Header
    const headers = [
      "Order ID",
      "Date",
      "Student Name",
      "Email",
      "Phone",
      "Selected Program",
      "College / University",
      "Amount (INR)",
      "Payment Status",
      "Notes"
    ];

    // Helper to escape values for CSV
    const escapeCsv = (val: any) => {
      const str = String(val || "").replace(/"/g, '""');
      return str.includes(",") || str.includes("\n") || str.includes('"') ? `"${str}"` : str;
    };

    // Construct CSV rows
    const rows = ordersList.map(o => [
      o.orderId,
      new Date(o.createdAt).toLocaleString(),
      o.fullName,
      o.email,
      o.phone,
      o.selectedProgram,
      o.collegeName,
      o.amount,
      o.paymentStatus,
      o.notes
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(escapeCsv).join(","))
    ].join("\n");

    return new Response(csvContent, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="c2c_orders.csv"'
      }
    });
  } catch (error) {
    console.error("Error creating CSV download:", error);
    return NextResponse.json({ error: "Failed to create CSV download" }, { status: 500 });
  }
}
