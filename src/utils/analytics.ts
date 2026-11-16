/**
 * Provider-Agnostic Analytics & Privacy-Safe Event Dispatch for Beyond AI Engineering
 * Dispatches sanitized, aggregate events to window.dataLayer (GTM / GA4) and optional gtag().
 * Strict rule: Never send PII (emails, names, free-text workspace inputs, or raw assessment answers).
 */

import { SITE_CONFIG } from '../config/siteConfig';

export type AnalyticsEventName =
  // Primary V2 platform taxonomy
  | 'book_cta_click'
  | 'waitlist_registration_success'
  | 'assessment_started'
  | 'assessment_completed'
  | 'assessment_report_viewed'
  | 'assessment_report_exported'
  | 'assessment_restarted'
  | 'resource_opened'
  | 'resource_template_started'
  | 'resource_saved'
  | 'resource_download'
  | 'resource_exported'
  | 'audience_journey_started'
  // Legacy / existing event names preserved for compatibility
  | 'book_purchase_click'
  | 'get_book_click'
  | 'retailer_click'
  | 'sample_download'
  | 'sample_read'
  | 'cao_assessment_start'
  | 'cao_assessment_complete'
  | 'newsletter_signup'
  | 'email_signup'
  | 'manifesto_download'
  | 'manifesto_share'
  | 'speaking_inquiry'
  | 'organization_inquiry'
  | 'team_inquiry'
  | 'contact_form_submit'
  | 'press_asset_download';

const BLOCKED_PII_KEYS = new Set([
  'email',
  'user_email',
  'useremail',
  'name',
  'full_name',
  'fullname',
  'authorname',
  'phone',
  'telephone',
  'notes',
  'message',
  'notesormessage',
  'answers',
  'responses',
  'fieldvalues',
  'fields',
  'customtext',
  'markdown',
  'draft',
  'prompt',
  'usertext',
]);

const EMAIL_PATTERN = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;

function sanitizeValue(value: unknown, depth = 0): unknown {
  if (depth > 4) return undefined;
  if (value === null || value === undefined) return value;

  if (typeof value === 'string') {
    if (EMAIL_PATTERN.test(value)) {
      return '[REDACTED]';
    }
    return value.length > 160 ? `${value.slice(0, 157)}...` : value;
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return value;
  }

  if (Array.isArray(value)) {
    return value.slice(0, 20).map((item) => sanitizeValue(item, depth + 1));
  }

  if (typeof value === 'object') {
    const cleanObj: Record<string, unknown> = {};
    for (const [key, nestedVal] of Object.entries(value as Record<string, unknown>)) {
      const normalizedKey = key.toLowerCase().replace(/[^a-z0-9_]/g, '');
      if (BLOCKED_PII_KEYS.has(normalizedKey)) {
        continue;
      }
      const sanitized = sanitizeValue(nestedVal, depth + 1);
      if (sanitized !== undefined) {
        cleanObj[key] = sanitized;
      }
    }
    return cleanObj;
  }

  return undefined;
}

export function sanitizeAnalyticsProperties(
  properties: Record<string, unknown> = {}
): Record<string, unknown> {
  const sanitized = sanitizeValue(properties, 0);
  if (sanitized && typeof sanitized === 'object' && !Array.isArray(sanitized)) {
    return sanitized as Record<string, unknown>;
  }
  return {};
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: AnalyticsEventName, properties: Record<string, unknown> = {}) {
  const safeProperties = sanitizeAnalyticsProperties(properties);
  const payload = {
    event: name,
    timestamp: new Date().toISOString(),
    path: typeof window !== 'undefined' ? window.location.pathname : '/',
    ...safeProperties,
  };

  if (typeof window !== 'undefined') {
    if (!window.dataLayer) {
      window.dataLayer = [];
    }
    window.dataLayer.push(payload);

    if (typeof window.gtag === 'function' && SITE_CONFIG.analytics.ga4MeasurementId) {
      window.gtag('event', name, safeProperties);
    }

    window.dispatchEvent(new CustomEvent('beyond_analytics', { detail: payload }));
  }
}

/**
 * Appends standardized UTM parameters to outbound URLs when retailer/partner links are configured.
 */
export function buildUtmUrl(
  baseUrl: string,
  campaign: string,
  medium: string = 'website',
  content?: string
): string {
  try {
    const parsed = new URL(baseUrl);
    parsed.searchParams.set('utm_source', 'beyondaiengineering');
    parsed.searchParams.set('utm_medium', medium);
    parsed.searchParams.set('utm_campaign', campaign);
    if (content) parsed.searchParams.set('utm_content', content);
    return parsed.toString();
  } catch {
    return baseUrl;
  }
}
