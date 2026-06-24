import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const SHEET_ID = "1Osr2RrgQZqDjK28knSXlqNXqJk2rcaATLqE1Yjy_W0c";
const PIPELINE_SHEET = "Pipeline";
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

async function getGoogleToken(): Promise<string> {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!;
  const privateKeyRaw = process.env.GOOGLE_PRIVATE_KEY!;
  const privateKey = privateKeyRaw.replace(/\\n/g, "\n");
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: clientEmail, scope: SCOPES.join(" "),
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600, iat: now,
  };
  const encode = (obj: object) => Buffer.from(JSON.stringify(obj)).toString("base64url");
  const signingInput = `${encode(header)}.${encode(payload)}`;
  const keyData = privateKey.replace("-----BEGIN PRIVATE KEY-----", "").replace("-----END PRIVATE KEY-----", "").replace(/\s/g, "");
  const binaryKey = Buffer.from(keyData, "base64");
  const cryptoKey = await crypto.subtle.importKey("pkcs8", binaryKey, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["sign"]);
  const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", cryptoKey, Buffer.from(signingInput));
  const jwt = `${signingInput}.${Buffer.from(signature).toString("base64url")}`;
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: jwt }),
  });
  const tokenData = await tokenRes.json();
  if (!tokenData.access_token) throw new Error("Failed to get Google access token");
  return tokenData.access_token;
}

async function appendToSheet(sheetName: string, values: string[]) {
  const token = await getGoogleToken();
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheetName}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ values: [values] }),
    }
  );
  if (!res.ok) throw new Error(`Sheets error: ${await res.text()}`);
  return res.json();
}

function buildCalendarLink(title: string, description: string, daysFromNow: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  date.setHours(9, 0, 0, 0);
  const endDate = new Date(date);
  endDate.setMinutes(30);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(".000", "");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    details: description,
    dates: `${fmt(date)}/${fmt(endDate)}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function buildOutreachEN(direction: "inbound" | "outbound", name: string, institution: string, market: string, tokenUrl: string): { subject: string; body: string } {
  const firstName = name.split(" ")[0];
  if (direction === "outbound") {
    return {
      subject: `Your commercial profile — confidential assessment, ${market}`,
      body: `Hi ${firstName},

I have been following your trajectory at ${institution} and I think your ${market} profile is genuinely compelling in the current market — [YOUR ONE OBSERVATION FROM THEIR CV].

Before I say more, I want to give you something useful regardless of where this goes.

I am sending you a personalised Business Plan framework — pre-configured for your market and seniority. It takes around 20 minutes and generates a committee-ready P&L model, a portability score, and a breakeven projection. The exact numbers a hiring committee runs on your profile before they agree to meet you. Most senior RMs have never seen this analysis about themselves.

Your personalised link: ${tokenUrl}

Everything stays completely confidential. No institution is named at this stage. Nothing goes anywhere without your explicit sign-off. I review every submission personally and come back with a frank assessment of your commercial position and what we can do together.

Gil M. Chalem
Managing Partner — Executive Partners
execpartners.ch`,
    };
  } else {
    return {
      subject: `Next step — your confidential EP profile`,
      body: `Hi ${firstName},

Thank you for reaching out. I have reviewed your background and I think there is something worth exploring seriously.

Before we go further I want to make sure I can genuinely help you — and that means understanding your commercial profile properly, not just your CV.

I am sending you a personalised Business Plan Assessment. It takes about 20 minutes and at the end you will have something most recruiters never give you: a clear, honest picture of how a hiring committee will read your profile commercially — your portability assumption, your revenue ramp, your breakeven month.

I noticed [YOUR ONE OBSERVATION FROM THEIR CV]. I want to make sure the numbers support what the narrative suggests before I put your name in front of anyone.

Your personalised link: ${tokenUrl}

I review every submission personally. Once I have your numbers I will come back with a frank assessment and, if the profile is strong, tell you exactly what I have in mind for you. The institution is not named at this stage — that conversation happens once we have established the fit.

Gil M. Chalem
Managing Partner — Executive Partners
execpartners.ch`,
    };
  }
}

function buildOutreachFR(direction: "inbound" | "outbound", name: string, institution: string, market: string, tokenUrl: string): { subject: string; body: string } {
  const firstName = name.split(" ")[0];
  if (direction === "outbound") {
    return {
      subject: `Votre profil commercial — evaluation confidentielle, ${market}`,
      body: `Bonjour ${firstName},

Je suis votre parcours chez ${institution} depuis quelque temps et je pense que votre profil sur le marche ${market} est particulierement pertinent dans le contexte actuel — [VOTRE OBSERVATION SPECIFIQUE DU CV].

Avant d'aller plus loin, je souhaite vous apporter quelque chose d'utile independamment de la suite.

Je vous envoie un cadre personnalise de Business Plan, pre-configure pour votre marche et votre niveau de seniorite. Il faut environ 20 minutes et genere un modele P&L pret pour comite, un score de portabilite et une projection de seuil de rentabilite.

Votre lien personnalise : ${tokenUrl}

Tout reste strictement confidentiel. Aucun etablissement n'est nomme a ce stade. Rien n'avance sans votre accord explicite.

Gil M. Chalem
Associe Gerant — Executive Partners
execpartners.ch`,
    };
  } else {
    return {
      subject: `Prochaine etape — votre profil confidentiel EP`,
      body: `Bonjour ${firstName},

Merci d'avoir pris contact. J'ai examine votre parcours et je pense qu'il y a quelque chose qui merite d'etre explore serieusement.

Avant d'aller plus loin, je souhaite m'assurer que je peux reellement vous aider — ce qui implique de comprendre votre profil commercial en profondeur, pas seulement votre CV.

Je vous envoie une evaluation personnalisee de Business Plan. Elle prend environ 20 minutes et vous donnera quelque chose que la plupart des recruteurs ne vous offrent jamais : une image claire et honnete de la facon dont un comite de recrutement lira votre profil commercialement.

J'ai note [VOTRE OBSERVATION SPECIFIQUE DU CV].

Votre lien personnalise : ${tokenUrl}

Je revois chaque dossier personnellement. L'etablissement n'est pas nomme a ce stade.

Gil M. Chalem
Associe Gerant — Executive Partners
execpartners.ch`,
    };
  }
}

export async function POST(req: NextRequest) {
  try {
    // Auth check
    const auth = req.headers.get("x-ep-admin");
    if (auth !== process.env.TALENT_BENCH_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { candidateName, candidateEmail, institution, market, mandate, language, direction, tokenUrl, token } = body;

    const timestamp = new Date().toLocaleString("en-GB", {
      timeZone: "Europe/Zurich", day: "2-digit", month: "short",
      year: "numeric", hour: "2-digit", minute: "2-digit",
    });

    // 1. Log to Google Sheet Pipeline tab
    try {
      await appendToSheet(PIPELINE_SHEET, [
        timestamp, candidateName, candidateEmail || "", institution,
        market || "", mandate || "Senior RM", direction, language,
        "NOT SENT", token, tokenUrl,
      ]);
    } catch (sheetErr) {
      console.error("Sheet log failed:", sheetErr);
    }

    // 2. Build outreach message
    const lang = language === "fr" ? "fr" : "en";
    const dir = direction === "inbound" ? "inbound" : "outbound";
    const outreach = lang === "fr"
      ? buildOutreachFR(dir, candidateName, institution, market, tokenUrl)
      : buildOutreachEN(dir, candidateName, institution, market, tokenUrl);

    // 3. Build Google Calendar links
    const firstName = candidateName.split(" ")[0];
    const calendarLinks = {
      day3: buildCalendarLink(
        `EP Follow-up Day 3 — ${firstName} (${institution})`,
        `Send Day 3 follow-up for ${candidateName}. Token: ${token}\n\nMessage: Just checking the personalised link reached you — sometimes it filters to spam. Your assessment is ready and takes about 20 minutes. ${tokenUrl}`,
        3
      ),
      day7: buildCalendarLink(
        `EP Follow-up Day 7 — ${firstName} (${institution})`,
        `Send Day 7 follow-up for ${candidateName}. Token: ${token}\n\nMessage: I will be presenting to a shortlisted institution later this week and wanted to give you the opportunity to be included. Your assessment link: ${tokenUrl}`,
        7
      ),
      day14: buildCalendarLink(
        `EP Close loop Day 14 — ${firstName} (${institution})`,
        `Send Day 14 close-loop for ${candidateName}. Token: ${token}\n\nMessage: I am going to move forward with the profiles I have. Your link remains active: ${tokenUrl}. I will keep your profile in mind.`,
        14
      ),
    };

    // 4. Send Resend notification to Gil
    try {
      const apiKey = process.env.RESEND_API_KEY;
      if (apiKey) {
        const { Resend } = await import("resend");
        const resend = new Resend(apiKey);
        await resend.emails.send({
          from: "EP Intake <noreply@auth.execpartners.ch>",
          to: "gil.chalem@execpartners.ch",
          subject: `New candidate intake — ${candidateName} | ${institution} | ${market}`,
          html: `
            <div style="font-family:Arial,sans-serif;max-width:600px">
              <div style="background:#1B3A6B;padding:20px;border-radius:8px 8px 0 0">
                <div style="color:#C9A14A;font-size:11px;text-transform:uppercase;letter-spacing:0.2em">Executive Partners</div>
                <div style="color:#fff;font-size:20px;margin-top:4px">New Candidate Intake</div>
              </div>
              <div style="background:#fff;border:1px solid #ddd;border-top:none;padding:24px;border-radius:0 0 8px 8px">
                <p><strong>Candidate:</strong> ${candidateName}</p>
                <p><strong>Email:</strong> ${candidateEmail || "not provided"}</p>
                <p><strong>Institution:</strong> ${institution}</p>
                <p><strong>Market:</strong> ${market}</p>
                <p><strong>Mandate:</strong> ${mandate || "Senior RM"}</p>
                <p><strong>Direction:</strong> ${direction} | <strong>Language:</strong> ${language}</p>
                <p><strong>Assessment link:</strong> <a href="${tokenUrl}">${tokenUrl}</a></p>
                <hr style="border:1px solid #eee;margin:20px 0">
                <p><strong>Outreach subject:</strong> ${outreach.subject}</p>
                <pre style="background:#f5f5f5;padding:16px;font-size:13px;line-height:1.7;white-space:pre-wrap;font-family:Arial,sans-serif">${outreach.body}</pre>
                <hr style="border:1px solid #eee;margin:20px 0">
                <p><strong>Add follow-up reminders to calendar:</strong></p>
                <p><a href="${calendarLinks.day3}" style="background:#1B3A6B;color:#C9A14A;padding:8px 16px;border-radius:6px;text-decoration:none;margin-right:8px">+ Day 3</a>
                <a href="${calendarLinks.day7}" style="background:#1B3A6B;color:#C9A14A;padding:8px 16px;border-radius:6px;text-decoration:none;margin-right:8px">+ Day 7</a>
                <a href="${calendarLinks.day14}" style="background:#1B3A6B;color:#C9A14A;padding:8px 16px;border-radius:6px;text-decoration:none">+ Day 14</a></p>
                <p style="font-size:11px;color:#999;margin-top:20px">Logged to EP Tool Leads sheet · ${timestamp}</p>
              </div>
            </div>
          `,
        });
      }
    } catch (emailErr) {
      console.error("Email notification failed:", emailErr);
    }

    return NextResponse.json({
      success: true,
      outreach,
      calendarLinks,
      tokenUrl,
      token,
    });
  } catch (err: any) {
    console.error("intake-submit error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// GET: initialise Pipeline sheet headers
export async function GET() {
  try {
    await appendToSheet(PIPELINE_SHEET, [
      "Date", "Candidate Name", "Email", "Institution", "Market",
      "Mandate", "Direction", "Language", "BP Status", "Token", "Assessment URL"
    ]);
    return NextResponse.json({ ok: true, message: "Pipeline headers added" });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}
