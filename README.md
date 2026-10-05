# ResQ AI Companion

Build a complete responsive web application called “ResQ AI”.

APP PURPOSE:
ResQ AI is a modern AI-powered emergency response prototype for a college/final-year/hackathon project.

Tagline:
“Report. Respond. Rescue.”

IMPORTANT:
This is a prototype/demo only. Do not implement real emergency dispatch, real police/ambulance calling, or real medical decision-making. Use simulated/sample data.

DESIGN SYSTEM:

- Modern professional emergency-response design
- Mobile-first responsive layout
- Clean white/light background
- Dark navy #172554
- Emergency red #EF4444
- Green #22C55E
- Light background #F8FAFC
- Modern sans-serif font
- Rounded cards and buttons
- Soft shadows
- Clear typography
- Professional icons
- Consistent design across every screen
- Make it look like a real emergency-response mobile application

USER:
Name: Ritika

MAIN FLOW:

1. SPLASH SCREEN
   Route: /splash

Show:

- Emergency shield/cross logo
- ResQ AI
- “Report. Respond. Rescue.”
- “Powered by AI”
- Subtle emergency/city illustration

After 2–3 seconds automatically navigate to /login.

2. LOGIN SCREEN
   Route: /login

Show:

- “Welcome Back”
- Email/Mobile input
- Password input
- Login button
- Forgot Password
- Continue with Google
- Create Account

Login button should navigate to /home.

3. HOME DASHBOARD
   Route: /home

Show:

- “Hello, Ritika 👋”
- “Emergency Services Online”
- Notification bell
- Large prominent red button:
  “🚨 REPORT EMERGENCY”

Quick Emergency section:

- Medical
- Accident
- Fire
- Police

Nearby Services:

- Ambulance — 1.2 km
- Police — 2.1 km
- Fire Station — 3.4 km
- Hospital — 2.7 km

Bottom navigation:

- Home
- History
- Profile

Report Emergency button navigates to /report.

4. EMERGENCY REPORT
   Route: /report

Title:
“Report Emergency”

Emergency type cards:

- Medical Emergency
- Road Accident
- Fire
- Police
- Other

Fields:

- Emergency description textarea
- Voice Input button
- Add Photo button
- Use Current Location button

Show validation if emergency type or description is missing.

Button:
“Analyze Emergency”

On click navigate to /ai-analysis.

Use React state/localStorage for temporary prototype data.

5. AI ANALYSIS
   Route: /ai-analysis

Create an attractive AI analysis screen.

Show:

- AI assistant visual
- “AI is analyzing the emergency…”

Progress checklist:
✓ Understanding incident
✓ Identifying emergency type
✓ Estimating severity
○ Finding appropriate response

Show animated progress from 0% to 100%.

After analysis automatically navigate to /severity-result.

For now use simulated AI analysis.

6. EMERGENCY ASSESSMENT
   Route: /severity-result

Title:
“Emergency Assessment”

Display a professional assessment card.

Sample prototype result:

- CRITICAL EMERGENCY
- Severity: Critical
- Confidence: 92%
- Priority: IMMEDIATE
- Recommended Response: Ambulance + Police

Show:
“AI Assessment”
with a short explanation based on the selected emergency type.

Show:
“Incident Location”
with a simulated location such as:
“Current Location”

Buttons:

- “View Response”
- “Edit Report”

View Response → /tracking
Edit Report → /report

The result should be generated from the emergency type selected by the user, but use safe simulated prototype logic.

7. LIVE TRACKING
   Route: /tracking

Create a simulated live emergency tracking screen.

Show a map-style interface using a visual placeholder, not a real map API.

Map elements:

- User location marker
- Ambulance marker
- Route line
- Nearby roads/buildings style background

Show:
LIVE

Bottom information card:

- “Ambulance Arriving”
- ETA: 6 min
- AMB-204
- City Care Ambulance
- Distance: 1.2 km

Buttons:

- Call Response Team
- Share Location

These buttons can show a prototype toast/modal instead of making real calls.

Timeline:
✓ Emergency reported
✓ AI assessment completed
✓ Response team assigned
✓ Ambulance on the way
○ Response team arrived

Simulate ambulance movement and ETA changes.

When the simulated ambulance arrives, show:
“Response team has arrived”

Then enable:
“Complete Emergency”

Complete Emergency → /resolved

8. EMERGENCY RESOLVED
   Route: /resolved

Show a large success/check icon.

Title:
“Emergency Resolved”

Emergency summary:

- Road Accident
- Critical
- Ambulance + Police
- AMB-204
- Response Time: 7 min
- Status: Resolved

Request ID:
ER-2026-10482

Completed timeline:
✓ Emergency reported
✓ AI assessment completed
✓ Response team assigned
✓ Ambulance arrived
✓ Emergency resolved

Buttons:

- View Emergency Report
- Back to Home

Back to Home → /home.

9. HISTORY
   Route: /history

Show previous emergency cards.

Sample:

- Road Accident — Critical — Resolved
- Medical Emergency — High — Resolved
- Fire Emergency — Critical — Resolved

Each card should be clickable and open a simple emergency-details view/modal.

Bottom navigation should remain visible.

10. PROFILE
    Route: /profile

Show:

- User avatar
- Ritika
- Email/mobile

Settings/options:

- Personal Information
- Emergency Contacts
- Location Permissions
- Notifications
- Settings
- Logout

Logout should return to /login.

Bottom navigation should remain visible.

ADDITIONAL UX:

- Add smooth transitions and subtle animations.
- Add loading states where appropriate.
- Add toast messages for prototype actions.
- Make all navigation buttons functional.
- Add Back navigation where appropriate.
- Keep the UI consistent across every route.
- Ensure no broken links or blank screens.
- Make the layout responsive for desktop and mobile.

TECHNICAL:

- Build using React.
- Use client-side routing.
- Use reusable components.
- Use React state/localStorage for temporary data.
- No backend required for this version.
- No real API required yet.
- No real GPS required yet.
- No real map API required yet.
- No real emergency service integration.
- Use sample/prototype data.
- Keep code clean and maintainable.

IMPORTANT SAFETY/DISCLAIMER:
Include a subtle disclaimer in appropriate places:
“ResQ AI is a prototype decision-support system and does not replace professional emergency services.”

FINAL REQUIREMENT:
The complete user journey must work:

Splash
→ Login
→ Home
→ Report Emergency
→ AI Analysis
→ Emergency Assessment
→ Live Tracking
→ Emergency Resolved
→ Home

Also make these accessible:
Home → History
Home → Profile

Do not create unnecessary extra screens. Focus on making these screens polished, functional, and presentation-ready for a college project demo.

## Project Architecture

ResQ AI is an educational emergency-response decision support prototype designed for final-year engineering evaluation. It demonstrates simulated AI triage analysis, emergency CAD dispatch tracking, and citizen ICE profiles.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
