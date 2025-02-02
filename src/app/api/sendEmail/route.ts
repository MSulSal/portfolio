import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailRequest {
  firstname?: string;
  lastname?: string;
  email: string;
  service?: string;
  message: string;
}

export async function POST(request: Request) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST",
    "Content-Type": "application/json",
  };

  try {
    const body: EmailRequest = await request.json();

    // Validate required fields
    if (!body.email || !body.message) {
      return new NextResponse(
        JSON.stringify({ error: "Email and message are required" }),
        {
          status: 400,
          headers,
        }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Website Contact <onboarding@resend.dev>",
      to: process.env.EMAIL!,
      replyTo: body.email,
      subject: `${body.firstname || ""} ${body.lastname || ""} - ${
        body.service || "Service"
      } Request`,
      text: `Service: ${body.service || "Not specified"}\n\nMessage: ${
        body.message
      }\n\nFrom: ${body.firstname || ""} ${body.lastname || ""} <${
        body.email
      }>`,
      html: `
        <p><strong>Service:</strong> ${body.service || "Not specified"}</p>
        <p><strong>Message:</strong></p>
        <p>${body.message.replace(/\n/g, "<br>")}</p>
        <p><strong>From:</strong> ${body.firstname || ""} ${
        body.lastname || ""
      } &lt;${body.email}&gt;</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return new NextResponse(
        JSON.stringify({ error: "Failed to send email" }),
        {
          status: 500,
          headers,
        }
      );
    }

    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Server error:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers,
      }
    );
  }
}

// Optional: Enable Edge runtime for better performance
export const config = {
  runtime: "edge",
};
