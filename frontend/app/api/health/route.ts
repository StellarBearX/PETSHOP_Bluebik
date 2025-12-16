import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ status: "ok", message: "Frontend mock API is running" }, { status: 200 });
}
