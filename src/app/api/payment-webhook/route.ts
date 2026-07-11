import { NextResponse } from "next/server";
import { readOrders, writeOrders } from "@/store/ordersDb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("orderId");
  const status = searchParams.get("status");

  if (!orderId || (status !== "success" && status !== "failed")) {
    return new NextResponse(
      `<html>
        <head>
          <title>Invalid Request</title>
          <style>
            body { font-family: sans-serif; background-color: #030712; color: #ef4444; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
            .card { background-color: #0b0f17; border: 1px solid rgba(239, 68, 68, 0.2); padding: 30px; border-radius: 12px; text-align: center; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>Invalid Request</h1>
            <p>Missing or incorrect parameters.</p>
          </div>
        </body>
      </html>`,
      { headers: { "Content-Type": "text/html" } }
    );
  }

  const orders = readOrders();
  const order = orders[orderId];

  if (!order) {
    return new NextResponse(
      `<html>
        <head>
          <title>Order Not Found</title>
          <style>
            body { font-family: sans-serif; background-color: #030712; color: #ef4444; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
            .card { background-color: #0b0f17; border: 1px solid rgba(239, 68, 68, 0.2); padding: 30px; border-radius: 12px; text-align: center; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>Order Not Found</h1>
            <p>The order ID ${orderId} does not exist in our database.</p>
          </div>
        </body>
      </html>`,
      { headers: { "Content-Type": "text/html" } }
    );
  }

  // Update status
  order.paymentStatus = status === "success" ? "success" : "failed";
  orders[orderId] = order;
  writeOrders(orders);

  const statusText = status === "success" ? "Received" : "Not Received / Rejected";
  const statusColor = status === "success" ? "#10b981" : "#ef4444";
  const actionMessage = status === "success" 
    ? "The student's portal has been updated instantly. They now have full access to the program!"
    : "The student's portal has been updated to reflect a failed payment. They will need to retry.";

  return new NextResponse(
    `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Payment Status Updated</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: radial-gradient(circle at center, #070b13 0%, #03050a 100%);
          color: #cbd5e1;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          margin: 0;
        }
        .container {
          max-width: 500px;
          width: 90%;
          background: rgba(11, 15, 23, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          padding: 40px;
          border-radius: 24px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.5);
          text-align: center;
        }
        h1 {
          color: #ffffff;
          font-size: 24px;
          margin-bottom: 10px;
          font-weight: 800;
        }
        .logo {
          font-size: 28px;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 20px;
        }
        .logo span {
          color: #22d3ee;
          font-weight: 400;
        }
        .status-badge {
          display: inline-block;
          background-color: ${statusColor}20;
          color: ${statusColor};
          border: 1px solid ${statusColor}40;
          padding: 8px 18px;
          border-radius: 9999px;
          font-weight: bold;
          font-size: 14px;
          text-transform: uppercase;
          margin-bottom: 25px;
          box-shadow: 0 0 15px ${statusColor}20;
        }
        .details-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
          text-align: left;
          font-size: 14px;
        }
        .details-table td {
          padding: 10px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
        }
        .details-table td.label {
          color: #64748b;
          font-weight: bold;
        }
        .details-table td.value {
          color: #ffffff;
          text-align: right;
          font-weight: 600;
        }
        .msg {
          font-size: 14px;
          line-height: 1.6;
          color: #94a3b8;
          margin-top: 20px;
        }
        .footer {
          margin-top: 30px;
          font-size: 11px;
          color: #475569;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">C<span>2C</span></div>
        <h1>Payment Verified</h1>
        <div class="status-badge">Status: ${statusText}</div>
        
        <table class="details-table">
          <tr>
            <td class="label">Order ID</td>
            <td class="value">${orderId}</td>
          </tr>
          <tr>
            <td class="label">Student Name</td>
            <td class="value">${order.fullName}</td>
          </tr>
          <tr>
            <td class="label">Program</td>
            <td class="value">${order.selectedProgram}</td>
          </tr>
          <tr>
            <td class="label">Amount</td>
            <td class="value" style="color: #22d3ee; font-weight: bold;">₹${order.amount}</td>
          </tr>
        </table>

        <p class="msg">${actionMessage}</p>
        
        <div class="footer">
          Campus to Corporate Admin Panel &bull; CEO Dashboard
        </div>
      </div>
    </body>
    </html>`,
    { headers: { "Content-Type": "text/html" } }
  );
}
