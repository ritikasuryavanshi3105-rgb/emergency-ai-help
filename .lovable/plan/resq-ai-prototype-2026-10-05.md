# ResQ AI prototype

## Build
- Replace the blank page with a polished, mobile-first ResQ AI experience using the requested navy, red, green, and light palette.
- Add all requested pages: splash, login, home, report, AI analysis, assessment, tracking, resolved, history, and profile.
- Add a shared mobile app shell, bottom navigation, page headers, safety disclaimer, reusable emergency cards, status timeline, and toast feedback.

## Complete demo journey
- Automatically move from splash to login and from the simulated AI analysis to the assessment.
- Validate the report form, retain its temporary details locally, and generate a safe sample assessment from the selected emergency type.
- Simulate ambulance movement and ETA updates, enable completion after arrival, and carry the selected incident details into the resolved summary.
- Make history details, profile options, logout, back actions, and all primary buttons functional without adding real emergency integrations.

## Presentation and verification
- Add subtle motion and a custom illustrated map placeholder while respecting reduced-motion preferences.
- Ensure every page has distinct sharing/search metadata and works across mobile and desktop sizes.
- Verify the main journey and secondary History/Profile paths in the running preview, then check automated tests and preview health.

## Technical details
- Use TanStack Router route files and React state, with localStorage only for temporary prototype report data.
- Keep the prototype entirely client-side with no backend, GPS, map, calling, or dispatch API.
- Use reusable React components and semantic design tokens in the global Tailwind theme.
