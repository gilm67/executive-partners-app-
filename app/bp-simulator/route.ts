import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export function GET() {
  return NextResponse.redirect("https://executive-partners-bp-simulator.streamlit.app", 308);
}
