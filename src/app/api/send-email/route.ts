import { NextResponse } from "next/server";
import { Resend } from "resend";

interface ContactPayload {
  firstname?: string;
  lastname?: string;
  email?: string;
  service?: string;
  message?: string;
}

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY || !process.env.EMAIL) {
      return NextResponse.json(
        {
          error:
            "Email service is not configured. Set RESEND_API_KEY and EMAIL in environment variables.",
        },
        { status: 500 }
      );
    }

    const body = (await request.json().catch(() => null)) as
      | ContactPayload
      | null;

    if (!body) {
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }

    const email = body.email?.trim();
    const message = body.message?.trim();

    if (!email || !message) {
      return NextResponse.json(
        { error: "Email and message are required" },
        { status: 400 }
      );
    }

    const fullName = `${body.firstname || ""} ${body.lastname || ""}`.trim();
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: process.env.EMAIL,
      replyTo: email,
      subject: `Portfolio inquiry from ${fullName || "Unknown sender"}`,
      text: [
        `Name: ${fullName || "Not provided"}`,
        `Email: ${email}`,
        `Engagement: ${body.service || "Not specified"}`,
        `Message:\n${message}`,
      ].join("\n\n"),
      html: [
        `<p><strong>Name:</strong> ${fullName || "Not provided"}</p>`,
        `<p><strong>Email:</strong> ${email}</p>`,
        `<p><strong>Engagement:</strong> ${body.service || "Not specified"}</p>`,
        `<p><strong>Message:</strong></p>`,
        `<p>${message.replace(/\n/g, "<br>")}</p>`,
      ].join(""),
    });

    if (error) {
      return NextResponse.json(
        { error: "Failed to send email", details: error.message },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Internal server error", details: message },
      { status: 500 }
    );
  }
}

export const runtime = "nodejs";