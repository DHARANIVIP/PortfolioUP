import { NextRequest, NextResponse } from "next/server";
import { getClientIp, hashIp, checkRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req.headers);
    const ipHash = hashIp(ip);

    // Rate limit: 10 email copy requests per minute per IP
    const rateLimit = await checkRateLimit(`contact-email:${ipHash}`, 10, 60);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment." },
        { status: 429, headers: { "Retry-After": "60" } }
      );
    }

    const email = process.env.CONTACT_TO_EMAIL;
    if (!email) {
      return NextResponse.json(
        { error: "Contact email address is not configured on server." },
        { status: 500 }
      );
    }

    return NextResponse.json({ email });
  } catch (error) {
    console.error("Error in /api/contact-email:", error);
    return NextResponse.json(
      { error: "Failed to retrieve email address." },
      { status: 500 }
    );
  }
}
