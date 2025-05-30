import { NextResponse } from "next/server";
import { airtable } from "@/lib/airtable";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    await airtable.create(data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Fout bij toevoegen aan Airtable:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
