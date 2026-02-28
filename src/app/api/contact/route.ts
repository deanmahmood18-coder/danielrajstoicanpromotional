import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not configured");
  return new Resend(key);
}

export async function POST(req: NextRequest) {
  try {
    const resend = getResend();
    const { name, organization, role, email, phone, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Send notification email to the team
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Daniel-raj Stoican <newsletter@danielrajstoican.com>",
      to: "ukhaliq7@hotmail.com",
      subject: `New Inquiry — ${role || "General"} — ${name}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background-color: #080808; color: #ffffff; padding: 48px 32px;">
          <div style="border-bottom: 1px solid rgba(201,168,76,0.3); padding-bottom: 20px; margin-bottom: 28px;">
            <p style="color: #C9A84C; font-size: 10px; letter-spacing: 0.4em; text-transform: uppercase; margin: 0 0 8px 0;">
              Website Inquiry
            </p>
            <h1 style="font-size: 28px; font-weight: 600; margin: 0; color: #ffffff; line-height: 1.2;">
              New Contact Form Submission
            </h1>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 28px;">
            <tr>
              <td style="padding: 10px 0; color: #6b7280; font-size: 13px; width: 120px; vertical-align: top;">Name</td>
              <td style="padding: 10px 0; color: #ffffff; font-size: 14px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #6b7280; font-size: 13px; vertical-align: top;">Organisation</td>
              <td style="padding: 10px 0; color: #ffffff; font-size: 14px;">${organization || "—"}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #6b7280; font-size: 13px; vertical-align: top;">Role</td>
              <td style="padding: 10px 0; color: #ffffff; font-size: 14px;">${role || "—"}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #6b7280; font-size: 13px; vertical-align: top;">Email</td>
              <td style="padding: 10px 0; color: #ffffff; font-size: 14px;"><a href="mailto:${email}" style="color: #C9A84C;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #6b7280; font-size: 13px; vertical-align: top;">Phone</td>
              <td style="padding: 10px 0; color: #ffffff; font-size: 14px;">${phone || "—"}</td>
            </tr>
          </table>

          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(201,168,76,0.2); padding: 20px; margin-bottom: 24px;">
            <p style="color: #6b7280; font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; margin: 0 0 10px 0;">Message</p>
            <p style="color: #d1d5db; font-size: 14px; line-height: 1.8; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>

          <div style="border-top: 1px solid rgba(201,168,76,0.15); padding-top: 16px;">
            <p style="color: #6b7280; font-size: 11px; margin: 0;">
              Sent from danielrajstoican.com contact form
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
