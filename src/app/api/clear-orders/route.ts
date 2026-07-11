import { NextResponse } from "next/server";
import { writeOrders } from "@/store/ordersDb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    if (password !== "Abdul") {
      return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
    }

    // Clear all orders
    writeOrders({});
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error clearing orders database:", error);
    return NextResponse.json({ error: "Failed to clear database" }, { status: 500 });
  }
}
