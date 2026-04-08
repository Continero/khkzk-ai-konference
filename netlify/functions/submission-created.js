// Triggered automatically by Netlify when a form submission is created.
// Sends a formatted email matching the KHKZK format.

exports.handler = async function (event) {
  const { RESEND_API_KEY, NOTIFICATION_EMAIL = "info@khkzk.cz" } = process.env;

  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY not set");
    return { statusCode: 500, body: "Missing API key" };
  }

  let payload;
  try {
    payload = JSON.parse(event.body).payload;
  } catch {
    return { statusCode: 400, body: "Invalid payload" };
  }

  const data = payload.data || payload;

  // Build participants list
  const participants = [];
  const count = parseInt(data.pocet_ucastniku || "1", 10);
  for (let i = 1; i <= count; i++) {
    const name = data[`ucastnik_${i}_jmeno`];
    if (!name) continue;
    participants.push({
      jmeno: name,
      pozice: data[`ucastnik_${i}_pozice`] || "",
      email: data[`ucastnik_${i}_email`] || "",
      telefon: data[`ucastnik_${i}_telefon`] || "",
    });
  }

  // Format email body — matching KHKZK format
  const lines = [
    "Zpráva z kontaktního formuláře www stránky",
    "aivpraxi.khkzk.cz",
    "",
    "Název stránky",
    "AI konference 2026",
    "",
    "URL",
    "https://aivpraxi.khkzk.cz",
    "",
    "Název organizace",
    data.organizace || "",
    "",
    "IČO",
    data.ico || "",
    "",
    "Kurz",
    "AI konference 2026",
    "",
    "Účastníci",
  ];

  participants.forEach((p, i) => {
    if (i > 0) lines.push("");
    lines.push(`Jméno:`);
    lines.push(p.jmeno);
    lines.push(`Pozice:`);
    lines.push(p.pozice);
    lines.push(`E-mail:`);
    lines.push(p.email);
    lines.push(`Telefonní číslo:`);
    lines.push(p.telefon);
  });

  lines.push("");
  lines.push("Poznámka:");
  lines.push(data.poznamka || "");

  const textBody = lines.join("\n");

  // Send via Resend API
  const recipients = [NOTIFICATION_EMAIL];
  // Also send copy to submitter's email (first participant)
  if (participants[0]?.email) {
    // Don't CC the submitter — only send to KHKZK
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "AI konference 2026 <onboarding@resend.dev>",
        to: recipients,
        subject: "Online přihláška na kurz — AI konference 2026",
        text: textBody,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error:", err);
      // Don't fail — data is still in Netlify Forms
      return { statusCode: 200, body: "Email failed but submission saved" };
    }

    return { statusCode: 200, body: "OK" };
  } catch (err) {
    console.error("Email send error:", err);
    return { statusCode: 200, body: "Email failed but submission saved" };
  }
};
