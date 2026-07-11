import { NextResponse } from "next/server";
import { readOrders } from "@/store/ordersDb";

export async function GET() {
  try {
    const ordersMap = readOrders();
    const ordersList = Object.values(ordersMap).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return NextResponse.json(ordersList);
  } catch (error) {
    console.error("Error reading orders in admin endpoint:", error);
    return NextResponse.json({ error: "Failed to read orders" }, { status: 500 });
  }
}
