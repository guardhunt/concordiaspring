/**
 * booking-confirmation.js
 * Netlify Function — triggered by Cal.com webhook after a booking is made.
 *
 * Environment variables:
 *   BREVO_API_KEY, BREVO_TEMPLATE_ID, BREVO_STUDENTS_LIST_ID,
 *   VENMO_USERNAME, CAL_WEBHOOK_SECRET
 */

const BREVO_API_KEY = process.env.BREVO_API_KEY ?? '';
const BREVO_TEMPLATE_ID = process.env.BREVO_TEMPLATE_ID ?? '';
const BREVO_STUDENTS_LIST_ID = process.env.BREVO_STUDENTS_LIST_ID ?? '';
const VENMO_USERNAME = process.env.VENMO_USERNAME ?? '';
const CAL_WEBHOOK_SECRET = process.env.CAL_WEBHOOK_SECRET ?? '';

function verifyWebhookSecret(event) {
  if (!CAL_WEBHOOK_SECRET) return true;

  const headers = event.headers || {};
  const provided =
    headers['x-cal-signature-256'] ||
    headers['X-Cal-Signature-256'] ||
    headers['x-cal-webhook-secret'] ||
    headers['X-Cal-Webhook-Secret'];

  return provided === CAL_WEBHOOK_SECRET;
}

function formatClassDate(isoString) {
  if (!isoString) return '';
  try {
    return new Date(isoString).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZone: 'America/New_York',
    });
  } catch {
    return isoString;
  }
}

async function sendBrevoEmail({ attendeeEmail, attendeeName, eventTitle, classDate, cost, venmoLink }) {
  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': BREVO_API_KEY,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      to: [{ email: attendeeEmail, name: attendeeName }],
      templateId: Number.parseInt(BREVO_TEMPLATE_ID, 10),
      params: {
        student_name: attendeeName,
        class_name: eventTitle,
        class_date: classDate,
        class_cost: String(cost),
        venmo_link: venmoLink,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Brevo email failed (${response.status}): ${errorText}`);
  }
}

async function addStudentToBrevo(attendeeEmail, attendeeName) {
  const response = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'api-key': BREVO_API_KEY,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      email: attendeeEmail,
      attributes: {
        FIRSTNAME: attendeeName.split(' ')[0] || attendeeName,
      },
      listIds: [Number.parseInt(BREVO_STUDENTS_LIST_ID, 10)],
      updateEnabled: true,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Brevo contact add failed (${response.status}): ${errorText}`);
  }
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  if (!verifyWebhookSecret(event)) {
    console.error('Webhook rejected: invalid or missing Cal.com secret');
    return { statusCode: 401, body: 'Unauthorized' };
  }

  try {
    const body = JSON.parse(event.body ?? '{}');
    const payload = body.payload ?? body;

    const attendee = payload.attendees?.[0];
    const attendeeEmail = attendee?.email;
    const attendeeName = attendee?.name ?? 'Student';
    const eventTitle = payload.title ?? 'Class booking';
    const startTime = payload.startTime ?? payload.start ?? '';
    const cost = payload.metadata?.cost ?? payload.price ?? '';

    if (!attendeeEmail) {
      console.error('Webhook missing attendee email:', JSON.stringify(payload, null, 2));
      return { statusCode: 400, body: 'Missing attendee email' };
    }

    const classDate = formatClassDate(startTime);
    const venmoLink = `https://venmo.com/?txn=pay&recipients=${encodeURIComponent(VENMO_USERNAME)}&amount=${encodeURIComponent(cost)}&note=${encodeURIComponent(eventTitle)}`;

    if (BREVO_API_KEY && BREVO_TEMPLATE_ID) {
      await sendBrevoEmail({
        attendeeEmail,
        attendeeName,
        eventTitle,
        classDate,
        cost,
        venmoLink,
      });
    } else {
      console.warn('Skipping Brevo email: BREVO_API_KEY or BREVO_TEMPLATE_ID not set');
    }

    if (BREVO_API_KEY && BREVO_STUDENTS_LIST_ID) {
      await addStudentToBrevo(attendeeEmail, attendeeName);
    } else {
      console.warn('Skipping Brevo list add: BREVO_API_KEY or BREVO_STUDENTS_LIST_ID not set');
    }

    console.log('Booking processed:', { attendeeEmail, eventTitle, classDate, cost });

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };
  } catch (err) {
    console.error('Webhook error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal error processing booking webhook' }),
    };
  }
};
