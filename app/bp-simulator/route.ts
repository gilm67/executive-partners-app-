import { NextResponse } from "next/server";

export function GET() {
  const url = "https://executive-partners-bp-simulator.streamlit.app";
  return NextResponse.redirect(url, 308);
}
