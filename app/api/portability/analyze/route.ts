import { NextResponse } from 'next/server';
export async function GET(){ return NextResponse.json({ ok:false, error:"Method Not Allowed" }, { status:405 }); }
export async function POST(req: Request){
  // minimal stub
  const body = await req.json().catch(()=>({}));
  const score = 72; // placeholder
  return NextResponse.json({ score, benchmark:{ median:65, topQuartile:80 } });
}
