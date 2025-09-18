import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  // This will handle CORS preflight requests
  return new NextResponse(null, {
    status: 200,
    headers: CORS_HEADERS,
  });
}

export async function POST(request: Request) {
  try {
    console.log("Environment check:", {
      resendKey: process.env.RESEND_API_KEY
        ? "***" + process.env.RESEND_API_KEY.slice(-4)
        : "MISSING",
      recipientEmail: process.env.EMAIL,
      nodeEnv: process.env.NODE_ENV,
    });

    if (!process.env.RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY environment variable");
      return new NextResponse(
        JSON.stringify({ error: "Server configuration error" }),
        {
          status: 500,
          headers: CORS_HEADERS,
        }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body) {
      return new NextResponse(JSON.stringify({ error: "Invalid JSON body" }), {
        status: 400,
        headers: CORS_HEADERS,
      });
    }

    if (!body.email || !body.message) {
      return new NextResponse(
        JSON.stringify({ error: "Email and message are required" }),
        {
          status: 400,
          headers: CORS_HEADERS,
        }
      );
    }

    console.log("Request body:", JSON.stringify(body, null, 2));

    const { data, error } = await resend.emails.send({
      from: "Website Contact <onboarding@resend.dev>",
      to: process.env.EMAIL!,
      replyTo: body.email,
      subject: `New message from ${body.firstname || "Unknown"} ${
        body.lastname || ""
      }`,
      text: [
        `Name: ${body.firstname} ${body.lastname}`,
        `Email: ${body.email}`,
        `Service: ${body.service || "Not specified"}`,
        `Message: ${body.message}`,
      ].join("\n\n"),
      html: [
        `<p><strong>Name:</strong> ${body.firstname} ${body.lastname}</p>`,
        `<p><strong>Email:</strong> ${body.email}</p>`,
        `<p><strong>Service:</strong> ${body.service || "Not specified"}</p>`,
        `<p><strong>Message:</strong></p>`,
        `<p>${body.message.replace(/\n/g, "<br>")}</p>`,
      ].join(""),
    });

    if (error) {
      console.error("Resend API error:", error);
      return new NextResponse(
        JSON.stringify({
          error: "Failed to send email",
          details: error.message,
        }),
        {
          status: 500,
          headers: CORS_HEADERS,
        }
      );
    }

    console.log("Email sent successfully:", data?.id);
    return new NextResponse(JSON.stringify({ success: true, id: data?.id }), {
      status: 200,
      headers: CORS_HEADERS,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Unexpected error:", {
        message: error.message,
        stack: error.stack,
      });
      return new NextResponse(
        JSON.stringify({
          error: "Internal server error",
          message: error.message,
        }),
        {
          status: 500,
          headers: CORS_HEADERS,
        }
      );
    } else {
      console.error("Unexpected error:", error);
      return new NextResponse(
        JSON.stringify({
          error: "Internal server error",
          message: String(error),
        }),
        {
          status: 500,
          headers: CORS_HEADERS,
        }
      );
    }
  }
}

export const runtime = "nodejs";
