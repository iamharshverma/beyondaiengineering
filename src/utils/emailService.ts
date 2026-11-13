/**
 * Email Dispatch Service for Beyond AI Engineering
 * Routes book inquiries, bulk orders, speaking requests, stories, newsletter signups,
 * C.A.O. diagnostic plans, and general contact inquiries directly to harshverma59@gmail.com.
 *
 * Returns honest `success: false` if the HTTP dispatch fails so callers can render
 * an explicit fallback action (mailto:) rather than misleading confirmation text.
 */

import { SITE_CONFIG } from '../config/siteConfig';

export const AUTHOR_EMAIL = SITE_CONFIG.author.directRecipientEmail;

export interface BookInquiryPayload {
  formType:
    | 'Book Order (Direct Author Copy)'
    | 'Team & Bulk Book Order'
    | 'Individual Book Inquiry'
    | 'Speaking & Keynote Inquiry'
    | 'Reader Transformation Story'
    | 'Newsletter Subscription'
    | 'General Contact Inquiry'
    | 'C.A.O. Assessment Report';
  name: string;
  email: string;
  organization?: string;
  formatOrCopies?: string;
  notesOrMessage?: string;
  sourcePage?: string;
}

export interface EmailDispatchResult {
  success: boolean;
  message: string;
  mailtoUrl: string;
  providerStatus?: 'sent' | 'fallback_required';
}

export async function sendBookInquiryToAuthor(
  payload: BookInquiryPayload
): Promise<EmailDispatchResult> {
  const cleanEmail = (payload.email || '').trim();
  const subject = `[Beyond AI Engineering] ${payload.formType}: ${payload.name || cleanEmail}`;

  const bodyLines = [
    `NEW REQUEST — BEYOND AI ENGINEERING`,
    `----------------------------------------`,
    `Recipient: ${AUTHOR_EMAIL}`,
    `Form Type: ${payload.formType}`,
    `Contact Name: ${payload.name || 'Not provided'}`,
    `Contact Email: ${cleanEmail}`,
    `Organization: ${payload.organization || 'Individual Reader'}`,
    `Format / Details: ${payload.formatOrCopies || 'Not specified'}`,
    `Source Page: ${payload.sourcePage || (typeof window !== 'undefined' ? window.location.pathname : 'beyondaiengineering.com')}`,
    `Submitted At: ${new Date().toISOString()}`,
    ``,
    `Message / Notes:`,
    `${payload.notesOrMessage || 'Request submitted via beyondaiengineering.com.'}`,
    ``,
    `----------------------------------------`,
    `Dispatched from Beyond AI Engineering (beyondaiengineering.com)`,
  ];

  const bodyText = bodyLines.join('\n');
  const mailtoUrl = `mailto:${AUTHOR_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;

  if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    return {
      success: false,
      message: 'Please provide a valid email address before submitting.',
      mailtoUrl,
      providerStatus: 'fallback_required',
    };
  }

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${AUTHOR_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        _subject: subject,
        _replyto: cleanEmail,
        _template: 'table',
        _captcha: 'false',
        formType: payload.formType,
        name: payload.name || 'Reader',
        email: cleanEmail,
        organization: payload.organization || 'Individual',
        formatOrCopies: payload.formatOrCopies || 'Standard Inquiry',
        message: payload.notesOrMessage || 'Request via Beyond AI Engineering',
        sourceUrl: typeof window !== 'undefined' ? window.location.href : SITE_CONFIG.canonicalOrigin,
        timestamp: new Date().toISOString(),
      }),
    });

    if (response.ok) {
      return {
        success: true,
        message: `Your submission has been sent to Harsh Verma (${AUTHOR_EMAIL}).`,
        mailtoUrl,
        providerStatus: 'sent',
      };
    }

    return {
      success: false,
      message: `Background email dispatch could not be verified (HTTP ${response.status}). Use the button below to send directly via your email client to ${AUTHOR_EMAIL}.`,
      mailtoUrl,
      providerStatus: 'fallback_required',
    };
  } catch (error) {
    console.warn('Email dispatch error, returning explicit mailto fallback:', error);
    return {
      success: false,
      message: `Unable to reach the background email relay right now. Use the button below to send directly to ${AUTHOR_EMAIL} via your email app.`,
      mailtoUrl,
      providerStatus: 'fallback_required',
    };
  }
}
