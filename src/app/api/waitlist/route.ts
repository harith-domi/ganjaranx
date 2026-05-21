import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: NextRequest) {
  try {
    const { email, name, source } = await req.json();
    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

    const { error } = await supabaseAdmin
      .from("waitlist")
      .upsert({ email: email.toLowerCase().trim(), name: name?.trim() || null, source: source || "unknown" }, { onConflict: "email" });

    if (error) {
      console.error("Waitlist insert error:", error);
      return NextResponse.json({ error: "Failed to join waitlist" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Waitlist error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
