/**
 * Provider-Agnostic Analytics Dispatcher for Beyond AI Engineering
 * Automatically dispatches events to window.dataLayer (GTM/GA4) or custom listeners.
 */

export type AnalyticsEventName =
  | 'get_book_click'
  | 'retailer_click'
  | 'cao_assessment_start'
  | 'cao_assessment_complete'
  | 'sample_read'
  | 'resource_download'
  | 'email_signup'
  | 'manifesto_download'
  | 'manifesto_share'
  | 'speaking_inquiry'
  | 'team_inquiry'
  | 'press_asset_download';

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function trackEvent(name: AnalyticsEventName, properties: Record<string, unknown> = {}) {
  const payload = {
    event: name,
    timestamp: new Date().toISOString(),
    ...properties,
  };

  // 1. Google Tag Manager / GA4 DataLayer
  if (typeof window !== 'undefined') {
    if (!window.dataLayer) {
      window.dataLayer = [];
    }
    window.dataLayer.push(payload);

    // 2. Custom DOM Event for any third-party analytics listener
    window.dispatchEvent(new CustomEvent('beyond_analytics', { detail: payload }));
  }
}
