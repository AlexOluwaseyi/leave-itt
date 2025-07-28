import { getDashboardStats } from "@/lib/dashboard";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const stats = await getDashboardStats();
    return NextResponse.json({ stats }, { status: 200 });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json({ error: "Failed to fetch dashboard stats" }, { status: 500 });
  }
}