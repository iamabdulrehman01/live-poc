import { NextResponse } from "next/server";
import { readOrders } from "@/store/ordersDb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("orderId");

  if (!orderId) {
    return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
  }

  const orders = readOrders();
  const order = orders[orderId];

  if (!order) {
    return NextResponse.json({ status: "not_found" }, { status: 404 });
  }

  return NextResponse.json({ status: order.paymentStatus });
}
