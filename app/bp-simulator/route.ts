import { NextResponse } from "next/server";

export function GET() {
  // Opens your Streamlit app; change only if your URL changes.
  const url = "https://executive-partners-bp-simulator.streamlit.app";
  return NextResponse.redirect(url, 308);
}
