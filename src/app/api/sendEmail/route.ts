import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailRequest {
  firstname: string;
  lastname: string;
  email: string;
  service: string;
  message: string;
}

interface ResendResponse {
  data: { id: string } | null;
  error: Error | null;
}

export async function POST(request: Request): Promise<Response> {
  try {
    const { firstname, lastname, email, service, message }: EmailRequest =
      await request.json();

    // Basic validation
    if (!email || !message) {
      return NextResponse.json(
        { error: "Email and message are required" },
        { status: 400 }
      );
    }

    // Send email
    const { data, error }: ResendResponse = await resend.emails.send({
      from: "Website Contact <onboarding@resend.dev>",
      to: process.env.NEXT_PUBLIC_RECIPIENT_EMAIL || "default@example.com",
      replyTo: email,
      subject: `${firstname} ${lastname} - ${service} Request`,
      text: `Service: ${service}\n\nMessage: ${message}\n\nFrom: ${firstname} ${lastname} <${email}>`,
      html: `
                <p><strong>Service:</strong> ${service}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, "<br>")}</p>
                <p><strong>From:</strong> ${firstname} ${lastname} &lt;${email}&gt;</p>
            `,
    });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to send email";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
