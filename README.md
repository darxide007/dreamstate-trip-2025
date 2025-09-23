# Dreamstate Trip 2025 — Starter

A minimal **Next.js 14 + Tailwind** site for planning a boys' trip to Dreamstate SoCal 2025.  
Includes a **password gate**, **RSVP/flight form** posting to a **Google Sheets webhook**, a **countdown**, and core pages.

## Quick Start
```bash
npm install
npm run dev
# open http://localhost:3000
```

## Deploy (Vercel)
1. Create a new project on Vercel and import this repo (or drag-and-drop the folder).
2. Add env var `NEXT_PUBLIC_SHEETS_WEBHOOK_URL` with your Google Apps Script Web App URL.
3. Deploy.

## Google Sheets Webhook
- Create a new Google Apps Script bound to a Sheet.
- Paste a simple doPost handler that writes JSON to a row (example below).
- Publish → Deploy as Web App → Anyone with link.
- Copy the Web App URL into `NEXT_PUBLIC_SHEETS_WEBHOOK_URL`.

**Apps Script example:**
```js
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('RSVP') || SpreadsheetApp.getActiveSpreadsheet().insertSheet('RSVP');
  const data = JSON.parse(e.postData.contents || "{}");
  const ts = new Date();
  sheet.appendRow([ts, data.name, data.arrivalFlight, data.arrivalTime, data.departureFlight, data.departureTime]);
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}
```

## Password Gate
- The front door requires passcode **DreamFiend2025**.
- Stored in `localStorage` so users only enter it once per browser.
- Note: client-side gating is not secure; it's just to keep the page low-profile.

## Customize Content
Edit `lib/config/trip.config.ts` for dates, city, links, packing list, etc.

## Pages
- `/` — Landing with password + RSVP form
- `/itinerary` — Trip & festival days + countdown
- `/lodging` — Airbnb placeholder
- `/budget` — Simple cost split calculator
- `/packing` — Packing list
- `/logistics` — Rides/parking/meeting points
- `/links` — Must-have links
- `/fun` — Media/memes placeholder

---

Design vibe: **clean neon trance**, dark UI with subtle neon gradients.
```

