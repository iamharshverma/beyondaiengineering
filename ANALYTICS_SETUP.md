# Analytics & Telemetry Setup Guide (`beyondaiengineering.com`)

Beyond AI Engineering uses a provider-agnostic event pipeline located in `src/utils/analytics.ts`. Events are pushed cleanly to `window.dataLayer` (compatible with Google Tag Manager and Plausible/PostHog custom listeners) and conditionally forwarded to `window.gtag()` when `VITE_GA4_MEASUREMENT_ID` is configured.

---

## 1. Environment Configuration

Copy `.env.example` or define environment variables during deployment:

```bash
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_GTM_ID=GTM-XXXXXXX
```

Leave both unset in local development to prevent polluting production metrics. Events will still populate `window.dataLayer` and dispatch the DOM `beyond_analytics` custom event for local QA inspection.

---

## 2. Privacy & Non-PII Policy (Enforced in Code)

`sanitizeAnalyticsProperties()` strips sensitive keys and email-shaped strings before any event enters `dataLayer` or `gtag`:

- **Blocked Keys (Automatic Drop)**: `email`, `name`, `fullName`, `phone`, `notes`, `message`, `notesOrMessage`, `answers`, `responses`, `fieldValues`, `fields`, `customText`, `markdown`, `draft`, `prompt`, `userText`.
- **Blocked String Patterns**: Any value matching `[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}` is replaced with `[REDACTED]`.
- **Browser-Only Assessment & Tool Drafts**: Answers in `/assessment` and completed workbooks in `/resources/:slug` stay strictly inside `window.localStorage` on the user's device and are never transmitted to analytics or backend logs.

---

## 3. Canonical Event Taxonomy

| Event Name | Trigger Point | Permitted Non-PII Parameters |
| :--- | :--- | :--- |
| `book_cta_click` | Clicking primary Book CTA or Get the Book modal/page trigger | `location`, `destination` |
| `waitlist_registration_success` | Successful Formsubmit waitlist / pre-order response (`res.success === true`) | `sourcePage`, `editionPreference` |
| `assessment_started` | Answering Question 1 or starting `/assessment` | `scaleType`, `questionCount` |
| `assessment_completed` | Submitting all 15 assessment statements on `/assessment` | `archetype`, `creatorScore`, `architectScore`, `orchestratorScore`, `strongestDimension` |
| `assessment_report_viewed` | Entering the `/assessment` completed diagnostic report view | `archetype`, `strongestDimension` |
| `assessment_report_exported` | Clicking Copy, Download `.md`, or Print/PDF on `/assessment` | `format` (`copy` \| `markdown` \| `print`), `archetype` |
| `assessment_restarted` | Clicking Retake Assessment | `previousArchetype` |
| `resource_opened` | Opening `/resources/:slug` workspace or a resource card | `slug`, `pillar`, `category` |
| `resource_template_started` | First user keystroke/edit in a `/resources/:slug` workspace | `slug`, `sectionCount` |
| `resource_saved` | Explicit click on Save Snapshot or local draft persistence checkpoint | `slug`, `filledCount`, `totalCount` |
| `resource_download` | Downloading a `.md`, `.txt`, or PDF file | `resource`, `format` |
| `resource_exported` | Copying, downloading `.md`, or printing a `/resources/:slug` canvas | `slug`, `format` (`copy` \| `markdown` \| `print`) |
| `audience_journey_started` | Opening any `/journeys/*` route or selecting a checklist step | `journeySlug`, `step` |

---

## 4. Verifying Events Locally

Open Chrome DevTools Console and inspect `window.dataLayer`:

```js
window.addEventListener('beyond_analytics', (e) => {
  console.log('[Analytics]', e.detail.event, e.detail);
});
```

Confirm that submitting a waitlist form, answering all 15 assessment questions, or saving a resource canvas logs only structural metadata and contains zero email addresses, personal names, or user-authored notes.
