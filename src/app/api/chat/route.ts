import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { chat } from "@/lib/ai-chat";
import type { Professional } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const { slug, message } = await req.json();

  if (!slug || !message) {
    return NextResponse.json({ error: "Missing slug or message" }, { status: 400 });
  }

  const supabaseAdmin = getSupabaseAdmin();
  const { data: pro } = await supabaseAdmin
    .from("professionals")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (!pro) {
    return NextResponse.json({ error: "Professional not found" }, { status: 404 });
  }

  const reply = await chat(pro as Professional, message);
  return NextResponse.json({ reply });
}
