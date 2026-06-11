import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  req: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const tokensPath = path.join(process.cwd(), "data/assessment-tokens.json");
    if (!fs.existsSync(tokensPath)) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    const tokens = JSON.parse(fs.readFileSync(tokensPath, "utf-8"));
    const entry = tokens[params.token];
    if (!entry) {
      return NextResponse.json({ error: "Invalid token" }, { status: 404 });
    }
    return NextResponse.json({
      candidateName: entry.candidateName || "",
      institution: entry.institution || "",
      mandate: entry.mandate || "",
    });
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
