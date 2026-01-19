import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    console.log("[Waitlist] Received email:", email);

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    console.log("[Waitlist] SMTP_USER:", process.env.SMTP_USER);
    console.log("[Waitlist] SMTP_HOST:", process.env.SMTP_HOST);
    console.log("[Waitlist] SMTP_PASS exists:", !!process.env.SMTP_PASS);

    // Create SMTP transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    console.log("[Waitlist] Sending email...");

    // Send email notification
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: "edantavory16@gmail.com",
      subject: `New Waitlist Signup: ${email}`,
      text: `New signup: ${email} at ${new Date().toISOString()}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0b0b0c;">New Waitlist Signup!</h2>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0 0 10px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 0 0 10px 0;"><strong>Date:</strong> ${new Date().toLocaleString("he-IL", { timeZone: "Asia/Jerusalem" })}</p>
            <p style="margin: 0;"><strong>Source:</strong> Clixs Website</p>
          </div>
        </div>
      `,
    });

    console.log("[Waitlist] Email sent successfully:", info.messageId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Waitlist] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
