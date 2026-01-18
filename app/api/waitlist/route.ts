import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Send notification email via webhook
    const webhookUrl = process.env.WAITLIST_WEBHOOK_URL;

    if (webhookUrl) {
      // Use a webhook service like Make.com, Zapier, or custom endpoint
      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          timestamp: new Date().toISOString(),
          source: "Clixs Website Waitlist",
        }),
      });
    }

    // Also send email directly using a simple email service
    // Using Resend, SendGrid, or any other email API
    const emailApiKey = process.env.RESEND_API_KEY;

    if (emailApiKey) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${emailApiKey}`,
        },
        body: JSON.stringify({
          from: "Clixs Waitlist <noreply@clixs.io>",
          to: "idan@idan-tavoti.co.il",
          subject: `New Waitlist Signup: ${email}`,
          html: `
            <h2>New Waitlist Signup!</h2>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleString("he-IL", { timeZone: "Asia/Jerusalem" })}</p>
            <p><strong>Source:</strong> Clixs Website</p>
          `,
        }),
      });
    }

    // Fallback: Log to console for debugging
    console.log(`[Waitlist] New signup: ${email} at ${new Date().toISOString()}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Waitlist] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
