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
    const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;
    const { email, firstName } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Add contact to Resend audience (newsletter list)
    if (AUDIENCE_ID) {
      await resend.contacts.create({
        email,
        firstName: firstName || undefined,
        audienceId: AUDIENCE_ID,
      });
    }

    // Send notification to team about new signup
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Daniel-raj Stoican <newsletter@danielrajstoican.com>",
      to: "deanmahmood18@icloud.com",
      subject: `New Newsletter Signup — ${firstName || "Anonymous"} (${email})`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 500px; margin: 0 auto; background-color: #080808; color: #ffffff; padding: 40px 28px;">
          <p style="color: #C9A84C; font-size: 10px; letter-spacing: 0.4em; text-transform: uppercase; margin: 0 0 16px 0;">
            New Newsletter Subscriber
          </p>
          <h2 style="font-size: 24px; font-weight: 600; margin: 0 0 20px 0; color: #fff;">
            ${firstName || "Someone"} just joined the Inner Circle
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 13px; width: 80px;">Email</td>
              <td style="padding: 8px 0; color: #C9A84C; font-size: 14px;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Name</td>
              <td style="padding: 8px 0; color: #ffffff; font-size: 14px;">${firstName || "—"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Date</td>
              <td style="padding: 8px 0; color: #ffffff; font-size: 14px;">${new Date().toLocaleString("en-GB", { timeZone: "Europe/London" })}</td>
            </tr>
          </table>
          <div style="border-top: 1px solid rgba(201,168,76,0.15); margin-top: 20px; padding-top: 12px;">
            <p style="color: #6b7280; font-size: 11px; margin: 0;">danielrajstoican.com — Inner Circle Newsletter</p>
          </div>
        </div>
      `,
    });

    // Send professional welcome email to the subscriber
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://danielrajstoican.com";

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Daniel-raj Stoican <newsletter@danielrajstoican.com>",
      to: email,
      subject: "Welcome to the Inner Circle — Daniel-raj Stoican",
      html: generateWelcomeEmail(firstName, siteUrl),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter signup error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe. Please try again." },
      { status: 500 }
    );
  }
}

function generateWelcomeEmail(firstName: string, siteUrl: string): string {
  const name = firstName || "Champion";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #050505; font-family: Georgia, 'Times New Roman', serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #050505;">
    <tr>
      <td align="center" style="padding: 40px 16px;">

        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #080808; border: 1px solid rgba(201,168,76,0.15);">

          <!-- Gold top bar -->
          <tr>
            <td style="height: 3px; background: linear-gradient(90deg, #A68B3A, #C9A84C, #E2C878, #C9A84C, #A68B3A);"></td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 24px 40px; text-align: center;">
              <table cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                <tr>
                  <td style="width: 48px; height: 48px; border: 1px solid rgba(201,168,76,0.4); text-align: center; vertical-align: middle;">
                    <span style="color: #C9A84C; font-size: 11px; letter-spacing: 0.15em; font-weight: 700;">DSR</span>
                  </td>
                </tr>
              </table>
              <p style="color: #C9A84C; font-size: 9px; letter-spacing: 0.5em; text-transform: uppercase; margin: 16px 0 0 0;">
                The Inner Circle
              </p>
            </td>
          </tr>

          <!-- Welcome headline -->
          <tr>
            <td style="padding: 0 40px 32px 40px; text-align: center;">
              <h1 style="font-size: 36px; font-weight: 600; color: #ffffff; margin: 0 0 12px 0; line-height: 1.1;">
                Welcome, ${name}.
              </h1>
              <p style="color: #9ca3af; font-size: 15px; line-height: 1.7; margin: 0;">
                You&rsquo;re now part of an exclusive group following one of Britain&rsquo;s most
                exciting rising boxing talents from the inside.
              </p>
            </td>
          </tr>

          <!-- Hero image -->
          <tr>
            <td style="padding: 0 24px 32px 24px;">
              <img
                src="${siteUrl}/media/european_champ.JPG"
                alt="Daniel-raj Stoican — European Champion"
                width="552"
                style="width: 100%; max-width: 552px; height: auto; display: block; border: 1px solid rgba(201,168,76,0.1);"
              />
            </td>
          </tr>

          <!-- Stats bar -->
          <tr>
            <td style="padding: 0 24px 32px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0E1014; border: 1px solid #22262E;">
                <tr>
                  <td width="33%" style="text-align: center; padding: 24px 12px; border-right: 1px solid #22262E;">
                    <p style="color: #C9A84C; font-size: 32px; font-weight: 700; margin: 0; line-height: 1;">42</p>
                    <p style="color: #6b7280; font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; margin: 6px 0 0 0;">Wins</p>
                  </td>
                  <td width="34%" style="text-align: center; padding: 24px 12px; border-right: 1px solid #22262E;">
                    <p style="color: #C9A84C; font-size: 32px; font-weight: 700; margin: 0; line-height: 1;">50</p>
                    <p style="color: #6b7280; font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; margin: 6px 0 0 0;">Total Bouts</p>
                  </td>
                  <td width="33%" style="text-align: center; padding: 24px 12px;">
                    <p style="color: #C9A84C; font-size: 32px; font-weight: 700; margin: 0; line-height: 1;">84%</p>
                    <p style="color: #6b7280; font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; margin: 6px 0 0 0;">Win Rate</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Win rate visual bar -->
          <tr>
            <td style="padding: 0 40px 8px 40px;">
              <p style="color: #6b7280; font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; margin: 0 0 8px 0;">Win Rate Breakdown</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 32px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="height: 8px; border-radius: 4px; overflow: hidden;">
                <tr>
                  <td width="84%" style="background: linear-gradient(90deg, #A68B3A, #C9A84C, #E2C878); height: 8px;"></td>
                  <td width="16%" style="background-color: #22262E; height: 8px;"></td>
                </tr>
              </table>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 6px;">
                <tr>
                  <td style="color: #C9A84C; font-size: 11px;">42 Wins (84%)</td>
                  <td style="color: #6b7280; font-size: 11px; text-align: right;">8 Losses (16%)</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Achievements -->
          <tr>
            <td style="padding: 0 40px 12px 40px;">
              <p style="color: #C9A84C; font-size: 9px; letter-spacing: 0.5em; text-transform: uppercase; margin: 0;">
                Career Honours
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding: 0 40px 32px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                ${[
                  ["European Champion", "First ever from Nottinghamshire"],
                  ["ABA National Champion", "First from Nottingham since Carl Froch"],
                  ["British Silver Medalist", "National Championships"],
                  ["Romanian National Champion", "Representing his roots"],
                  ["Haringey Box Cup Winner", "Prestigious invitational tournament"],
                  ["Elite Boxer of the Tournament", "Sweden — 757 competitors"],
                  ["Beat an Olympian", "In just his 30th career fight"],
                ].map(([title, sub], i, arr) => `
                <tr>
                  <td style="padding: 14px 16px; background-color: #0E1014; border: 1px solid rgba(201,168,76,0.25);${i < arr.length - 1 ? " border-bottom: none;" : ""}">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="color: #C9A84C; font-size: 16px; padding-right: 12px; vertical-align: top;">&bull;</td>
                        <td>
                          <p style="color: #ffffff; font-size: 14px; font-weight: 600; margin: 0;">${title}</p>
                          <p style="color: #6b7280; font-size: 11px; margin: 4px 0 0 0;">${sub}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>`).join("")}
              </table>
            </td>
          </tr>

          <!-- Training image -->
          <tr>
            <td style="padding: 0 24px 32px 24px;">
              <img
                src="${siteUrl}/media/IMG_7038.jpg"
                alt="Daniel-raj Stoican — Training"
                width="552"
                style="width: 100%; max-width: 552px; height: auto; display: block; border: 1px solid rgba(201,168,76,0.1);"
              />
            </td>
          </tr>

          <!-- Promise section -->
          <tr>
            <td style="padding: 0 40px 32px 40px;">
              <div style="border-left: 2px solid #C9A84C; padding-left: 20px;">
                <h2 style="color: #ffffff; font-size: 22px; font-weight: 600; margin: 0 0 12px 0; line-height: 1.2;">
                  What&rsquo;s Coming Next
                </h2>
                <p style="color: #9ca3af; font-size: 14px; line-height: 1.8; margin: 0;">
                  As a member of the Inner Circle, you&rsquo;ll be the first to know about every milestone
                  on Daniel-raj&rsquo;s journey to the professional stage and beyond.
                </p>
              </div>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 20px;">
                ${[
                  ["Fight announcements", "and ticket pre-sale access before the general public"],
                  ["Training camp updates", "— behind-the-scenes footage, sparring reports, and preparation insights"],
                  ["Personal messages", "directly from Daniel-raj — his thoughts, his mindset, his goals"],
                  ["Career milestones", "as they happen — pro debut, rankings, title shots, and everything in between"],
                ].map(([bold, rest], i, arr) => `
                <tr>
                  <td style="padding: 12px 16px;${i < arr.length - 1 ? " border-bottom: 1px solid #22262E;" : ""}">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="color: #C9A84C; font-size: 14px; padding-right: 12px;">&#9733;</td>
                        <td style="color: #d1d5db; font-size: 13px; line-height: 1.6;">
                          <strong style="color: #fff;">${bold}</strong> ${rest}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>`).join("")}
              </table>
            </td>
          </tr>

          <!-- Social CTA -->
          <tr>
            <td style="padding: 0 40px 40px 40px; text-align: center;">
              <p style="color: #9ca3af; font-size: 14px; line-height: 1.7; margin: 0 0 20px 0;">
                Follow Daniel-raj on social media to stay connected between newsletters.
              </p>
              <table cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                <tr>
                  <td style="padding: 0 8px;">
                    <a href="https://www.instagram.com/danielrajstoican" style="color: #C9A84C; font-size: 12px; text-decoration: none; letter-spacing: 0.1em;">Instagram</a>
                  </td>
                  <td style="color: #22262E;">|</td>
                  <td style="padding: 0 8px;">
                    <a href="https://twitter.com/danielrajboxer" style="color: #C9A84C; font-size: 12px; text-decoration: none; letter-spacing: 0.1em;">Twitter</a>
                  </td>
                  <td style="color: #22262E;">|</td>
                  <td style="padding: 0 8px;">
                    <a href="https://www.tiktok.com/@danielrajstoican" style="color: #C9A84C; font-size: 12px; text-decoration: none; letter-spacing: 0.1em;">TikTok</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; border-top: 1px solid rgba(201,168,76,0.12); text-align: center;">
              <p style="color: #6b7280; font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; margin: 0 0 4px 0;">
                Managed by Sunny Edwards &middot; Nottingham, England
              </p>
              <p style="color: #4b5563; font-size: 10px; margin: 8px 0 0 0;">
                One email per month. No spam.
              </p>
            </td>
          </tr>

          <!-- Gold bottom bar -->
          <tr>
            <td style="height: 2px; background: linear-gradient(90deg, #A68B3A, #C9A84C, #E2C878, #C9A84C, #A68B3A);"></td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;
}
