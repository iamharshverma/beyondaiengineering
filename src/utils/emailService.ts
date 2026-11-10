/**
 * Email Dispatch Service for Beyond AI Engineering
 * Sends book orders, direct author requests, bulk licensing inquiries,
 * and keynote requests directly to harshverma59@gmail.com.
 */

export const AUTHOR_EMAIL = 'harshverma59@gmail.com';

export interface BookInquiryPayload {
  formType:
    | 'Book Order (Direct Author Copy)'
    | 'Team & Bulk Book Order'
    | 'Individual Book Inquiry'
    | 'Speaking & Keynote Inquiry'
    | 'Reader Transformation Story';
  name: string;
  email: string;
  organization?: string;
  formatOrCopies?: string; // e.g. "Hardcover Edition ($34.00)", "25-50 copies"
  notesOrMessage?: string;
  sourcePage?: string;
}

export interface EmailDispatchResult {
  success: boolean;
  message: string;
  mailtoUrl: string;
}

/**
 * Dispatches form data to harshverma59@gmail.com via FormSubmit AJAX endpoint,
 * and generates a companion mailto URL as an immediate fallback or verification.
 */
export async function sendBookInquiryToAuthor(
  payload: BookInquiryPayload
): Promise<EmailDispatchResult> {
  const subject = `[Beyond AI Engineering] ${payload.formType}: ${payload.name || payload.email}`;

  const bodyLines = [
    `NEW BOOK REQUEST — BEYOND AI ENGINEERING`,
    `----------------------------------------`,
    `Recipient: ${AUTHOR_EMAIL}`,
    `Form Type: ${payload.formType}`,
    `Contact Name: ${payload.name || 'Not provided'}`,
    `Contact Email: ${payload.email}`,
    `Organization: ${payload.organization || 'Individual Reader'}`,
    `Format / Copies Requested: ${payload.formatOrCopies || 'Not specified'}`,
    `Source Page: ${payload.sourcePage || (typeof window !== 'undefined' ? window.location.pathname : 'beyondaiengineering.com')}`,
    `Submitted At: ${new Date().toLocaleString()}`,
    ``,
    `Message / Delivery Notes:`,
    `${payload.notesOrMessage || 'Request to get a copy of Beyond AI Engineering.'}`,
    ``,
    `----------------------------------------`,
    `Automated dispatch from Beyond AI Engineering (beyondaiengineering.com)`,
  ];

  const bodyText = bodyLines.join('\n');

  // Pre-formatted mailto URL
  const mailtoUrl = `mailto:${AUTHOR_EMAIL}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(bodyText)}`;

  try {
    // Send via FormSubmit AJAX to harshverma59@gmail.com
    const response = await fetch(`https://formsubmit.co/ajax/${AUTHOR_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        _subject: subject,
        _replyto: payload.email,
        _template: 'table',
        _captcha: 'false',
        formType: payload.formType,
        name: payload.name || 'Anonymous Reader',
        email: payload.email,
        organization: payload.organization || 'Individual',
        formatOrCopies: payload.formatOrCopies || 'Standard Copy',
        message: payload.notesOrMessage || 'Request to get Beyond AI Engineering',
        sourceUrl: typeof window !== 'undefined' ? window.location.href : 'beyondaiengineering.com',
        timestamp: new Date().toISOString(),
      }),
    });

    if (response.ok) {
      return {
        success: true,
        message: `Your book request has been emailed directly to Harsh Verma at ${AUTHOR_EMAIL}.`,
        mailtoUrl,
      };
    } else {
      return {
        success: true,
        message: `Your request has been prepared for Harsh Verma at ${AUTHOR_EMAIL}.`,
        mailtoUrl,
      };
    }
  } catch (error) {
    console.warn('Network error during background email dispatch, using mailto fallback:', error);
    return {
      success: true,
      message: `Your request has been prepared for ${AUTHOR_EMAIL}.`,
      mailtoUrl,
    };
  }
}
