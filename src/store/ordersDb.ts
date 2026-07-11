import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src/store/orders.json");

export interface Order {
  orderId: string;
  fullName: string;
  email: string;
  phone: string;
  selectedProgram: string;
  collegeName: string;
  universityName: string;
  batchSize?: string;
  excelFileName?: string;
  notes: string;
  amount: number;
  paymentStatus: "pending" | "success" | "failed";
  createdAt: string;
}

export function readOrders(): Record<string, Order> {
  try {
    if (!fs.existsSync(filePath)) {
      return {};
    }
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading orders database:", error);
    return {};
  }
}

export function writeOrders(orders: Record<string, Order>) {
  try {
    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(orders, null, 2), "utf8");
  } catch (error) {
    console.error("Error writing orders database:", error);
  }
}
