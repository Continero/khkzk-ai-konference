// Triggered automatically by Netlify when a form submission is created.
// Sends an HTML-formatted email matching the KHKZK format exactly.

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

  // Build participant HTML rows — each participant as a table row with label/value td pairs
  // Parser expects: <h3>Účastníci</h3><table><tr><td>Jméno:</td><td>value</td>...</tr></table>
  const participantRows = participants
    .map(
      (p) =>
        `  <tr><td><b>Jméno:</b></td><td>${esc(p.jmeno)}</td><td><b>Pozice:</b></td><td>${esc(p.pozice)}</td><td><b>E-mail:</b></td><td><a href="mailto:${esc(p.email)}">${esc(p.email)}</a></td><td><b>Telefonní číslo:</b></td><td>${esc(p.telefon)}</td></tr>`
    )
    .join("\n");

  // HTML email matching KHKZK format — uses table structure for parser compatibility
  const html = `<div style="font-family: sans-serif; font-size: 14px; color: #333;">
<p><b>Zpráva z kontaktního formuláře www stránek</b>&nbsp; <a href="https://aivpraxi.khkzk.cz">aivpraxi.khkzk.cz</a></p>
<table cellpadding="4" cellspacing="0" style="font-size: 14px;">
  <tr><td><b>Název stránky</b></td><td>AI konference 2026</td></tr>
  <tr><td><b>URL</b></td><td><a href="https://aivpraxi.khkzk.cz">https://aivpraxi.khkzk.cz</a></td></tr>
  <tr><td><b>Název organizace</b></td><td>${esc(data.organizace || "")}</td></tr>
  <tr><td><b>Ičo</b></td><td>${esc(data.ico || "")}</td></tr>
  <tr><td><b>Kurz</b></td><td>AI konference 2026</td></tr>
</table>

<h3 style="margin: 20px 0 10px 0;">Účastníci</h3>
<table cellpadding="4" cellspacing="0" style="font-size: 14px;">
${participantRows}
  <tr><td><b>Poznámka:</b></td><td colspan="7">${esc(data.poznamka || "")}</td></tr>
</table>
</div>`;

  // Plain text fallback
  const textLines = [
    "Zpráva z kontaktního formuláře www stránek",
    "aivpraxi.khkzk.cz",
    "Název stránky: AI konference 2026",
    "URL: https://aivpraxi.khkzk.cz",
    `Název organizace: ${data.organizace || ""}`,
    `Ičo: ${data.ico || ""}`,
    "Kurz: AI konference 2026",
    "",
    "Účastníci",
  ];
  participants.forEach((p) => {
    textLines.push(`Jméno: ${p.jmeno}  Pozice: ${p.pozice}  E-mail: ${p.email}  Telefonní číslo: ${p.telefon}`);
  });
  textLines.push("", `Poznámka: ${data.poznamka || ""}`);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "AI konference 2026 <registrace@notifications.continero.com>",
        to: [NOTIFICATION_EMAIL],
        subject: "Online přihláška na kurz",
        html: html,
        text: textLines.join("\n"),
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error:", err);
      return { statusCode: 200, body: "Email failed but submission saved" };
    }

    return { statusCode: 200, body: "OK" };
  } catch (err) {
    console.error("Email send error:", err);
    return { statusCode: 200, body: "Email failed but submission saved" };
  }
};

function esc(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
