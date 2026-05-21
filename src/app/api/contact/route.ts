import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: NextRequest) {
  try {
    const { name, email, contact, enquiry } = await req.json();
    if (!email || !enquiry) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const { error } = await supabaseAdmin
      .from("contact_submissions")
      .insert({ name: name?.trim(), email: email.toLowerCase().trim(), contact: contact?.trim() || null, enquiry: enquiry.trim() });

    if (error) {
      console.error("Contact insert error:", error);
      return NextResponse.json({ error: "Failed to save message" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
