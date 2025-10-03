import { NextResponse } from 'next/server';
export async function GET(){ return NextResponse.json({ ok:false, error:"Method Not Allowed" }, { status:405 }); }
export async function POST(){
  // return a tiny PDF-like blob just so download flow works
  const data = new Blob([`Executive Partners – Portability Dossier`], { type: 'application/pdf' });
  return new Response(data, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="Executive-Partners_Portability-Dossier.pdf"'
    }
  });
}
