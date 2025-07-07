// app/api/submit-event/route.ts
import { NextResponse } from "next/server";
import { addEventToAirtable } from "@/lib/airtable";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const requiredFields = [
      "EventName", "Description", "EventType", "Date",
      "StartTime", "EndTime", "City", "Location"
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `${field} is required.` }, { status: 400 });
      }
    }

    const res = await addEventToAirtable(body);
    return NextResponse.json({ message: "Success", id: res[0].id });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
