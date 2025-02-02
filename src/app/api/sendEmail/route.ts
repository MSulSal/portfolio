import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    // Debugging: Verify environment variables
    console.log(
      "Resend Key:",
      process.env.RESEND_API_KEY ? "exists" : "missing"
    );
    console.log("Recipient Email:", process.env.YOUR_EMAIL);

    const body = await request.json();

    // Validate required fields
    if (!body.email || !body.message) {
      return NextResponse.json(
        { error: "Email and message are required" },
        { status: 400 }
      );
    }

    // Debugging: Log the received data
    console.log("Received data:", JSON.stringify(body));

    const { error } = await resend.emails.send({
      from: "Website Contact <onboarding@resend.dev>",
      to: process.env.YOUR_EMAIL!,
      subject: `New Contact: ${body.firstname || ""} ${body.lastname || ""}`,
      text: `Message: ${body.message}\nEmail: ${body.email}`,
      html: `<p>${body.message}</p><p>From: ${body.email}</p>`,
    });

    if (error) {
      console.error("Resend Error:", error);
      return NextResponse.json(
        { error: "Email service failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Server Error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export const config = {
  runtime: "edge", // Remove if using Node.js runtime
};
