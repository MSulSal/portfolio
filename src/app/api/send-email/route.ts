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
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        {
          error:
            "Email service is not configured. Set RESEND_API_KEY in environment variables.",
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
    const firstname = body.firstname?.trim();
    const lastname = body.lastname?.trim();
    const service = body.service?.trim();
    const message = body.message?.trim();

    if (!firstname || !lastname || !email || !service || !message) {
      return NextResponse.json(
        { error: "All contact fields are required" },
        { status: 400 }
      );
    }

    const fullName = `${firstname} ${lastname}`.trim();
    const resend = new Resend(process.env.RESEND_API_KEY);
    const inbox =
      process.env.CONTACT_TO_EMAIL ||
      process.env.EMAIL ||
      "msulemansaleem01@gmail.com";
    const from =
      process.env.CONTACT_FROM_EMAIL ||
      process.env.RESEND_FROM ||
      "Portfolio Contact <onboarding@resend.dev>";

    const escapeHtml = (value: string) =>
      value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");

    const { data, error } = await resend.emails.send({
      from,
      to: inbox,
      replyTo: email,
      subject: `Portfolio inquiry from ${fullName || "Unknown sender"}`,
      text: [
        `Name: ${fullName || "Not provided"}`,
        `Email: ${email}`,
        `Engagement: ${service}`,
        `Message:\n${message}`,
      ].join("\n\n"),
      html: [
        `<p><strong>Name:</strong> ${escapeHtml(fullName || "Not provided")}</p>`,
        `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
        `<p><strong>Engagement:</strong> ${escapeHtml(service)}</p>`,
        `<p><strong>Message:</strong></p>`,
        `<p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`,
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
