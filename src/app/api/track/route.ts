import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const { professional_id, event_type } = await req.json();

  if (!professional_id || !event_type) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  await supabaseAdmin.from("vitrina_events").insert({
    professional_id,
    event_type,
  });

  return NextResponse.json({ ok: true });
}
