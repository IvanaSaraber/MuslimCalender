import { NextResponse } from "next/server";
import { eventTableRef } from "../../../lib/airtable";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    await eventTableRef.create(data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Fout bij toevoegen aan Airtable:", error);
    return NextResponse.json({ ok: false, error: "Mislukt" }, { status: 500 });
  }
}
