import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactFormSchema } from "@/lib/validations/contact";
import { getClientIp, hashIp, checkRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

function sanitizeString(str: string): string {
  return str
    .replace(/<[^>]*>/g, "") // Strip HTML tags
    .replace(/[^\w\s@.,?!:;'"()/-]/gi, "") // Strip suspicious executable characters
    .trim();
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req.headers);
    const ipHash = hashIp(ip);

    // 1. Rate Limit: 3 submissions per hour per IP
    const rateLimit = await checkRateLimit(`contact-submit:${ipHash}`, 3, 3600);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: "Too many messages sent. Please wait before sending another." },
        { status: 429, headers: { "Retry-After": "3600" } }
      );
    }

    // 2. Parse request payload
    let rawBody: unknown;
    try {
      rawBody = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON format." }, { status: 400 });
    }

    // 3. Honeypot check: If honeypot field is filled, silently return success without sending email
    if (
      typeof rawBody === "object" &&
      rawBody !== null &&
      "honeypot" in rawBody &&
      typeof (rawBody as { honeypot?: unknown }).honeypot === "string" &&
      ((rawBody as { honeypot: string }).honeypot.trim().length > 0)
    ) {
      return NextResponse.json({
        success: true,
        message: "Your message has been sent successfully.",
      });
    }

    // 4. Validate with Zod
    const validationResult = contactFormSchema.safeParse(rawBody);
    if (!validationResult.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of validationResult.error.issues) {
        const fieldName = issue.path[0] as string;
        if (fieldName && !fieldErrors[fieldName]) {
          fieldErrors[fieldName] = issue.message;
        }
      }
      return NextResponse.json(
        {
          error: "Validation failed.",
          errors: fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, message } = validationResult.data;

    // 5. Sanitize text fields
    const cleanName = sanitizeString(name);
    const cleanMessage = sanitizeString(message);
    const cleanEmail = email.trim();

    const recipientEmail = process.env.CONTACT_TO_EMAIL;
    const resendApiKey = process.env.RESEND_API_KEY;

    // 6. Send via Resend
    if (resendApiKey && recipientEmail) {
      const resend = new Resend(resendApiKey);
      const emailResult = await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: recipientEmail,
        replyTo: cleanEmail,
        subject: `New Portfolio Message from ${cleanName}`,
        text: `You received a new message from your portfolio contact form:\n\nName: ${cleanName}\nEmail: ${cleanEmail}\n\nMessage:\n${cleanMessage}\n`,
      });

      if (emailResult.error) {
        console.error("Resend API error:", emailResult.error);
        return NextResponse.json(
          { error: "Failed to send email via mail service. Please try again or copy email directly." },
          { status: 500 }
        );
      }
    } else {
      console.log("[Dev Mode] Resend API key not configured. Message simulated successfully.");
    }

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully. Dharani will get back to you within 1 to 2 days.",
    });
  } catch (error) {
    console.error("Unexpected error in /api/contact:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again or copy email address directly." },
      { status: 500 }
    );
  }
}
