# Cursor Prompt 5 — Contact Page & Newsletter Signup

## What to do
Build the contact page at `src/pages/contact.astro`.
Implement the full ContactForm component.
Read PROJECT.md section 6 (integrations) before starting.

## Task A: src/pages/contact.astro

Use `PageLayout` as wrapper.

Page structure:
- Heading: "Let's talk."
- Short intro: "Whether you're curious about a class, want to ask about private
  sessions, or just want to say hello — reach out. I read every message."
- `ContactForm` component
- Below the form, simple info block:
  - Location: Asheville, NC
  - Optional: Instagram link placeholder

## Task B: Finish ContactForm.astro

Fields:
- Name (text, required)
- Email (email, required)
- Message (textarea, required)
- Checkbox: "Keep me in the loop — occasional updates about classes and offerings"

Behavior:
1. On submit, POST to Web3Forms (`https://api.web3forms.com/submit`)
   with hidden field `access_key` = WEB3FORMS_ACCESS_KEY env var
2. If the "keep me in the loop" checkbox is checked, ALSO make a second
   fetch to add the email to Brevo:
   ```
   POST https://api.brevo.com/v3/contacts
   Headers: api-key: BREVO_API_KEY (note: this is a PUBLIC call from browser)
   Body: { email, listIds: [BREVO_LIST_ID], updateEnabled: true }
   ```
   Note: Brevo API key must be scoped to contacts-only for browser exposure.
   Add TODO comment flagging this security consideration.
3. Success state: friendly thank-you message, hide form
4. Error state: friendly error, keep form visible

Style with Tailwind + brand palette.
Label all fields clearly. Use focus:ring in primary color.
Submit button: full-width on mobile, auto-width on desktop.

## Task C: Implement the booking-confirmation.js serverless function

Complete `netlify/functions/booking-confirmation.js`.
Implement the full function body:

1. Parse the Cal.com webhook JSON payload.
   Key fields: `payload.attendees[0].email`, `payload.attendees[0].name`,
   `payload.title`, `payload.startTime`, `payload.metadata.cost` (if set).

2. Build Venmo link:
   ```js
   const venmoLink = `https://venmo.com/?txn=pay&recipients=${VENMO_USERNAME}&amount=${cost}&note=${encodeURIComponent(eventTitle)}`;
   ```

3. Send Brevo transactional email:
   ```
   POST https://api.brevo.com/v3/smtp/email
   Body: {
     to: [{ email: attendeeEmail, name: attendeeName }],
     templateId: BREVO_TEMPLATE_ID,
     params: { student_name, class_name, class_date, class_cost, venmo_link }
   }
   ```

4. Add attendee to Brevo "Students" list:
   ```
   POST https://api.brevo.com/v3/contacts
   Body: { email: attendeeEmail, listIds: [STUDENTS_LIST_ID], updateEnabled: true }
   ```

Add env var constants at top of file for all configurable values.
Wrap everything in try/catch with descriptive error logging.
