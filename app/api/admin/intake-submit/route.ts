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
      subject: `${firstName} — something prepared for your profile`,
      body: `Hi ${firstName},

[REPLACE THIS LINE WITH ONE SPECIFIC OBSERVATION FROM THEIR CV OR LINKEDIN — e.g. "Your eight years covering the Israeli desk from Geneva puts you in a very small group of profiles with genuine ISA-licensed portability — something three institutions are actively looking for right now." The more specific this line, the higher your response rate. Do not send without completing it.]

Before I say anything more about the market context, I want to give you something useful that stands on its own.

I have prepared a personalised business plan framework for your profile. Twenty minutes, completely confidential, and at the end you will have a clear picture of how a hiring committee reads your commercial case — figures most senior RMs have never seen about themselves.

${tokenUrl}

Nothing goes anywhere without your explicit consent. No institution is named at this stage.

Gil M. Chalem
Managing Partner — Executive Partners
execpartners.ch`,
    };
  } else {
    return {
      subject: `${firstName} — your confidential EP assessment`,
      body: `Hi ${firstName},

Thank you for reaching out. I have looked at your background carefully and I think there is something worth exploring properly.

[REPLACE THIS LINE WITH ONE SPECIFIC OBSERVATION FROM THEIR CV — e.g. "Your transition from Julius Baer to an EAM structure tells me you have already thought hard about platform flexibility — which is exactly the conversation I want to have with you." One sentence. Specific to them.]

Before I say anything about specific situations, I want to give you something useful first.

I have prepared a personalised business plan framework for your profile. It takes twenty minutes and gives you a clear, honest picture of how a hiring committee reads your commercial case — your portability assumption, your revenue ramp, your breakeven month. Most senior RMs have never seen this analysis about themselves, and it will be useful regardless of what you decide to do next.

${tokenUrl}

I review every submission personally. Once I have your numbers I will come back with a frank assessment and, if the profile is strong, tell you exactly what I have in mind. No institution is named at this stage.

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
      subject: `${firstName} — quelque chose prepare pour votre profil`,
      body: `Bonjour ${firstName},

[REMPLACEZ CETTE LIGNE par une observation specifique issue de leur LinkedIn ou CV — ex : "Vos huit ans sur le desk israelien depuis Geneve vous placent dans un groupe tres restreint de profils avec une portabilite ISA reelle — ce que trois etablissements recherchent activement en ce moment." Plus cette ligne est precise, plus votre taux de reponse sera eleve. Ne pas envoyer sans la completer.]

Avant d'aller plus loin sur le contexte de marche, je souhaite vous apporter quelque chose d'utile qui se justifie independamment.

J'ai prepare un cadre de business plan personnalise pour votre profil. Vingt minutes, strictement confidentiel, et a l'issue vous aurez une vision claire de la facon dont un comite de recrutement lit votre dossier commercial — des chiffres que la plupart des banquiers seniors n'ont jamais vus sur eux-memes.

${tokenUrl}

Rien n'avance sans votre accord explicite. Aucun etablissement n'est nomme a ce stade.

Gil M. Chalem
Associe Gerant — Executive Partners
execpartners.ch`,
    };
  } else {
    return {
      subject: `${firstName} — votre evaluation confidentielle EP`,
      body: `Bonjour ${firstName},

Merci d'avoir pris contact. J'ai examine votre parcours attentivement et je pense qu'il y a quelque chose qui merite d'etre explore serieusement.

[REMPLACEZ CETTE LIGNE par une observation specifique — ex : "Votre passage de Julius Baer vers une structure EAM me dit que vous avez deja reflechi a la flexibilite de plateforme — c'est exactement la conversation que je souhaite avoir avec vous." Une phrase. Specifique a eux.]

Avant de parler de situations concretes, je souhaite d'abord vous apporter quelque chose d'utile.

J'ai prepare un cadre de business plan personnalise pour votre profil. Il faut vingt minutes et vous donnera une image claire et honnete de la facon dont un comite de recrutement lit votre dossier commercial — votre hypothese de portabilite, votre progression de revenus, votre seuil de rentabilite. La plupart des banquiers seniors n'ont jamais vu cette analyse sur eux-memes, et elle vous sera utile quelle que soit votre decision.

${tokenUrl}

Je revois chaque dossier personnellement. Une fois vos chiffres en main, je reviens avec une evaluation franche et, si le profil est solide, je vous dis exactement ce que j'ai en tete. Aucun etablissement n'est nomme a ce stade.

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
