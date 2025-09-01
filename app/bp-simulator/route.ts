import { NextResponse } from "next/server";
export function GET() {
  return NextResponse.redirect("https://executive-partners-bp-simulator.streamlit.app", 308);
}
