import { NextResponse } from "next/server";
import { readOrders, writeOrders, Order } from "@/store/ordersDb";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, selectedProgram, collegeName, notes, amount } = body;

    if (!fullName || !email || !phone || !selectedProgram || !collegeName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const orderId = `C2C-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: Order = {
      orderId,
      fullName,
      email,
      phone,
      selectedProgram,
      collegeName,
      notes: notes || "",
      amount: Number(amount) || 4999,
      paymentStatus: "pending",
      createdAt: new Date().toISOString(),
    };

    const orders = readOrders();
    orders[orderId] = newOrder;
    writeOrders(orders);

    // Get current host from request headers
    const host = request.headers.get("host") || "localhost:3000";
    const protocol = host.includes("localhost") ? "http" : "https";
    const approveUrl = `${protocol}://${host}/api/payment-webhook?orderId=${orderId}&status=success`;
    const rejectUrl = `${protocol}://${host}/api/payment-webhook?orderId=${orderId}&status=failed`;

    // Construct Terminal Console Log Message (very visible for developers on localhost!)
    console.log("\n" + "=".repeat(80));
    console.log(`🚨 [NEW PAYMENT VERIFICATION EMAIL SENT]`);
    console.log(`Order ID:       ${orderId}`);
    console.log(`Student:        ${fullName} (${email}, ${phone})`);
    console.log(`Program:        ${selectedProgram}`);
    console.log(`College:        ${collegeName}`);
    console.log(`Amount:         ₹${newOrder.amount}`);
    console.log(`\nCEO Mail Link Simulator (Click to update payment status):`);
    console.log(`✅ [YES, RECEIVED]:  ${approveUrl}`);
    console.log(`❌ [NO, NOT RECEIVED]: ${rejectUrl}`);
    console.log("=".repeat(80) + "\n");

    // Nodemailer configuration
    // If developer configures SMTP credentials, it will send the real email!
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = Number(process.env.SMTP_PORT) || 465;

    let emailSent = false;
    if (smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        const mailOptions = {
          from: `"Campus to Corporate" <${smtpUser}>`,
          to: "abdulrehman630092@gmail.com",
          subject: `🚨 Payment Verification Request: ${fullName} (Order ${orderId})`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #030712; color: #cbd5e1;">
              <h2 style="color: #22d3ee; text-align: center;">Campus to Corporate</h2>
              <h3 style="color: #ffffff; text-align: center;">New Program Registration & Payment Notification</h3>
              <p style="font-size: 14px; line-height: 1.5;">A student has completed registration and generated a UPI QR code for payment. Please verify if you have received the payment of <strong>₹${newOrder.amount}</strong> in your account.</p>
              
              <table style="width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 25px; background-color: #0b0f17; border: 1px solid #1e293b;">
                <tr style="background-color: #111827;">
                  <td style="padding: 12px; font-weight: bold; border: 1px solid #1e293b; color: #94a3b8;">Order ID</td>
                  <td style="padding: 12px; border: 1px solid #1e293b; color: #ffffff;">${orderId}</td>
                </tr>
                <tr>
                  <td style="padding: 12px; font-weight: bold; border: 1px solid #1e293b; color: #94a3b8;">Student Name</td>
                  <td style="padding: 12px; border: 1px solid #1e293b; color: #ffffff;">${fullName}</td>
                </tr>
                <tr style="background-color: #111827;">
                  <td style="padding: 12px; font-weight: bold; border: 1px solid #1e293b; color: #94a3b8;">Program Track</td>
                  <td style="padding: 12px; border: 1px solid #1e293b; color: #ffffff;">${selectedProgram}</td>
                </tr>
                <tr>
                  <td style="padding: 12px; font-weight: bold; border: 1px solid #1e293b; color: #94a3b8;">College/University</td>
                  <td style="padding: 12px; border: 1px solid #1e293b; color: #ffffff;">${collegeName}</td>
                </tr>
                <tr style="background-color: #111827;">
                  <td style="padding: 12px; font-weight: bold; border: 1px solid #1e293b; color: #94a3b8;">Amount</td>
                  <td style="padding: 12px; font-weight: bold; color: #22d3ee; border: 1px solid #1e293b; font-size: 16px;">₹${newOrder.amount}</td>
                </tr>
              </table>

              <div style="text-align: center; margin-top: 30px; margin-bottom: 30px;">
                <a href="${approveUrl}" style="background-color: #10b981; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; margin-right: 15px; display: inline-block;">Yes, Received</a>
                <a href="${rejectUrl}" style="background-color: #ef4444; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">No, Not Received</a>
              </div>

              <p style="font-size: 11px; color: #64748b; text-align: center; margin-top: 20px;">Clicking "Yes, Received" will instantly update the student's registration portal page to Payment Successful.</p>
            </div>
          `,
        };

        await transporter.sendMail(mailOptions);
        emailSent = true;
        console.log(`[SMTP] Verification email sent successfully to abdulrehman630092@gmail.com`);
      } catch (mailError) {
        console.error("Failed to send real email via SMTP transporter:", mailError);
      }
    } else {
      console.log(`[SMTP] SMTP_USER and SMTP_PASS env variables not configured. Server logged links in console instead.`);
    }

    return NextResponse.json({
      success: true,
      orderId,
      amount: newOrder.amount,
      emailSent,
      approveUrl,
      rejectUrl,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
