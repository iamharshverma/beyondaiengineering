/**
 * Provider-Agnostic Analytics & UTM Tracking Utility for Beyond AI Engineering
 * Dispatches events to window.dataLayer (GTM / GA4), optional gtag(), and custom DOM listeners.
 */

import { SITE_CONFIG } from '../config/siteConfig';

export type AnalyticsEventName =
  | 'book_purchase_click'
  | 'get_book_click'
  | 'retailer_click'
  | 'sample_download'
  | 'sample_read'
  | 'resource_download'
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

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: AnalyticsEventName, properties: Record<string, unknown> = {}) {
  const payload = {
    event: name,
    timestamp: new Date().toISOString(),
    path: typeof window !== 'undefined' ? window.location.pathname : '/',
    ...properties,
  };

  if (typeof window !== 'undefined') {
    if (!window.dataLayer) {
      window.dataLayer = [];
    }
    window.dataLayer.push(payload);

    if (typeof window.gtag === 'function' && SITE_CONFIG.analytics.ga4MeasurementId) {
      window.gtag('event', name, properties);
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
