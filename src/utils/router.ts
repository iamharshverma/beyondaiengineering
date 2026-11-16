import { CAOStageId, PageId } from '../types';
import { FRAMEWORKS } from '../data/frameworksData';

export interface RouteState {
  page: PageId;
  param?: string;
  path: string;
}

const VALID_FRAMEWORK_IDS = new Set(FRAMEWORKS.map((f) => f.id));
const VALID_CAO_STAGES = new Set<CAOStageId>(['creator', 'architect', 'orchestrator']);

export const RESOURCE_WORKSPACE_ALIASES: Record<string, string> = {
  'cao-career-map': 'cao-career-map',
  'cao-self-assessment': 'cao-career-map',
  'human-advantage-inventory': 'human-advantage-inventory',
  'ai-workflow-experiment': 'ai-workflow-experiment',
  'ai-workflow-canvas': 'ai-workflow-experiment',
  'ethical-ai-audit': 'ethical-ai-audit',
  'professional-positioning': 'professional-positioning',
  'career-positioning-audit': 'professional-positioning',
  'war-story-narrative': 'war-story-narrative',
  'war-story-template': 'war-story-narrative',
  'digital-paper-trail': 'digital-paper-trail',
  'digital-paper-trail-planner': 'digital-paper-trail',
  'micro-community-map': 'micro-community-map',
  '30-60-90-plan': '30-60-90-plan',
  '30-60-90-career-plan': '30-60-90-plan',
};

export const VALID_RESOURCE_WORKSPACE_SLUGS = new Set([
  'cao-career-map',
  'human-advantage-inventory',
  'ai-workflow-experiment',
  'ethical-ai-audit',
  'professional-positioning',
  'war-story-narrative',
  'digital-paper-trail',
  'micro-community-map',
  '30-60-90-plan',
]);

function syncBrowserCanonicalUrl(canonicalPath: string) {
  if (typeof window === 'undefined') return;
  const current = window.location.pathname.replace(/\/+$/, '') || '/';
  if (current !== canonicalPath) {
    window.history.replaceState(null, '', canonicalPath);
  }
}

export function parseCurrentRoute(): RouteState {
  if (typeof window === 'undefined') {
    return { page: 'home', path: '/' };
  }

  // Handle GitHub Pages 404.html redirection parameter: ?p=/cao-framework
  const urlParams = new URLSearchParams(window.location.search);
  const redirectPath = urlParams.get('p');
  if (redirectPath) {
    window.history.replaceState(null, '', redirectPath);
    return routeFromPath(redirectPath);
  }

  // Check pathname first
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
  if (pathname !== '/') {
    return routeFromPath(pathname);
  }

  // Check hash fallback
  const hash = window.location.hash.replace(/^#\/?/, '').replace(/\/+$/, '');
  if (hash) {
    return routeFromPath('/' + hash);
  }

  return { page: 'home', path: '/' };
}

export function routeFromPath(rawPath: string, syncHistory = true): RouteState {
  const clean = rawPath.replace(/\/+$/, '') || '/';

  // 1. Home
  if (clean === '/' || clean === '') {
    return { page: 'home', path: '/' };
  }

  // 2. Book Core
  if (clean === '/book') return { page: 'book', path: '/book' };
  if (clean === '/book/sample' || clean === '/sample') {
    return { page: 'sample', path: '/book/sample' };
  }
  if (clean === '/book/buy' || clean === '/buy') {
    return { page: 'buy', path: '/book/buy' };
  }

  // 3. Dedicated Assessment Route
  if (clean === '/assessment' || clean === '/cao-assessment') {
    if (syncHistory && clean !== '/assessment') {
      syncBrowserCanonicalUrl('/assessment');
    }
    return { page: 'assessment', path: '/assessment' };
  }

  // 4. Canonical Audience Journeys + Legacy Redirects
  if (clean === '/journeys' || clean === '/journeys/working-engineers') {
    if (syncHistory && clean === '/journeys') {
      syncBrowserCanonicalUrl('/journeys/working-engineers');
    }
    return {
      page: 'journey-working-engineers',
      param: 'working-engineers',
      path: '/journeys/working-engineers',
    };
  }
  if (clean === '/engineers' || clean === '/for-engineers') {
    if (syncHistory) {
      syncBrowserCanonicalUrl('/journeys/working-engineers');
    }
    return {
      page: 'journey-working-engineers',
      param: 'working-engineers',
      path: '/journeys/working-engineers',
    };
  }
  if (clean === '/journeys/ai-ml-professionals') {
    return {
      page: 'journey-ai-ml',
      param: 'ai-ml-professionals',
      path: '/journeys/ai-ml-professionals',
    };
  }
  if (clean === '/journeys/technical-leaders') {
    return {
      page: 'journey-technical-leaders',
      param: 'technical-leaders',
      path: '/journeys/technical-leaders',
    };
  }
  if (clean === '/journeys/students') {
    return {
      page: 'journey-students',
      param: 'students',
      path: '/journeys/students',
    };
  }
  if (clean === '/students' || clean === '/for-students') {
    if (syncHistory) {
      syncBrowserCanonicalUrl('/journeys/students');
    }
    return {
      page: 'journey-students',
      param: 'students',
      path: '/journeys/students',
    };
  }

  // Keep /organizations intact for institutional & bulk orders
  if (
    clean === '/organizations' ||
    clean === '/for-organizations' ||
    clean === '/teams' ||
    clean === '/book/teams'
  ) {
    return { page: 'organizations', path: clean === '/teams' ? '/organizations' : clean };
  }

  // 5. Author, Speaking, Press, Contact
  if (clean === '/author' || clean === '/about') return { page: 'author', path: '/author' };
  if (clean === '/speaking') return { page: 'speaking', path: '/speaking' };
  if (clean === '/press') return { page: 'press', path: '/press' };
  if (clean === '/contact') return { page: 'contact', path: '/contact' };

  // 6. C.A.O. Framework, 3 Standalone Stage Routes, & Signature Frameworks
  if (clean === '/cao-framework') return { page: 'cao-framework', path: '/cao-framework' };
  if (clean === '/frameworks') return { page: 'frameworks', path: '/frameworks' };
  if (clean.startsWith('/frameworks/')) {
    const slug = clean.replace('/frameworks/', '');
    if (slug === 'cao-framework') {
      return { page: 'cao-framework', path: '/cao-framework' };
    }
    if (VALID_CAO_STAGES.has(slug as CAOStageId)) {
      return { page: 'cao-stage', param: slug, path: `/frameworks/${slug}` };
    }
    if (VALID_FRAMEWORK_IDS.has(slug)) {
      return { page: 'framework-detail', param: slug, path: clean };
    }
    return { page: 'frameworks', path: '/frameworks' };
  }

  // 7. Manifesto
  if (clean === '/manifesto') return { page: 'manifesto', path: '/manifesto' };

  // 8. Resources Workspaces & Toolkit
  if (clean === '/resources') return { page: 'resources', path: '/resources' };
  if (clean === '/toolkit' || clean === '/resources/toolkit') {
    return { page: 'toolkit', path: '/toolkit' };
  }
  if (clean.startsWith('/resources/')) {
    const rawSlug = clean.replace('/resources/', '').split('/')[0];
    const normalizedSlug = RESOURCE_WORKSPACE_ALIASES[rawSlug];
    if (normalizedSlug && VALID_RESOURCE_WORKSPACE_SLUGS.has(normalizedSlug)) {
      const canonical = `/resources/${normalizedSlug}`;
      if (syncHistory && rawSlug !== normalizedSlug) {
        syncBrowserCanonicalUrl(canonical);
      }
      return { page: 'resource-detail', param: normalizedSlug, path: canonical };
    }
    return { page: 'resources', param: rawSlug, path: '/resources' };
  }

  // 9. Unified Insights (consolidating /insights, /blog, /ideas)
  if (
    clean === '/insights' ||
    clean === '/blog' ||
    clean === '/ideas' ||
    clean === '/posts' ||
    clean === '/articles'
  ) {
    return { page: 'insights', path: clean };
  }
  if (clean.startsWith('/insights/')) {
    const slug = clean.replace('/insights/', '');
    return { page: 'insight-detail', param: slug, path: clean };
  }
  if (clean.startsWith('/blog/')) {
    const slug = clean.replace('/blog/', '');
    return { page: 'insight-detail', param: slug, path: clean };
  }
  if (clean.startsWith('/ideas/')) {
    const slug = clean.replace('/ideas/', '');
    return { page: 'insight-detail', param: slug, path: clean };
  }

  // 10. Reader Stories
  if (clean === '/stories') return { page: 'stories', path: '/stories' };

  return { page: 'home', path: '/' };
}

export function getPagePath(page: PageId, param?: string): string {
  if (param) {
    if (page === 'cao-stage') {
      return `/frameworks/${param}`;
    }
    if (page === 'frameworks' || page === 'framework-detail') {
      return param === 'cao-framework' ? '/cao-framework' : `/frameworks/${param}`;
    }
    if (page === 'resource-detail') {
      const normalized = RESOURCE_WORKSPACE_ALIASES[param] || param;
      return `/resources/${normalized}`;
    }
    if (
      page === 'insights' ||
      page === 'insight-detail' ||
      page === 'blog' ||
      page === 'blog-detail' ||
      page === 'ideas' ||
      page === 'article-detail'
    ) {
      return `/insights/${param}`;
    }
    return `/${page}/${param}`;
  }

  switch (page) {
    case 'home':
      return '/';
    case 'sample':
      return '/book/sample';
    case 'buy':
      return '/book/buy';
    case 'assessment':
      return '/assessment';
    case 'journey-working-engineers':
    case 'engineers':
      return '/journeys/working-engineers';
    case 'journey-ai-ml':
      return '/journeys/ai-ml-professionals';
    case 'journey-technical-leaders':
      return '/journeys/technical-leaders';
    case 'journey-students':
    case 'students':
      return '/journeys/students';
    case 'teams':
    case 'organizations':
      return '/organizations';
    case 'cao-framework':
      return '/cao-framework';
    case 'blog':
    case 'ideas':
    case 'insights':
      return '/insights';
    default:
      return `/${page}`;
  }
}

export function navigateTo(targetPath: string) {
  if (typeof window === 'undefined') return;

  const clean = targetPath.startsWith('/') ? targetPath : '/' + targetPath;
  window.history.pushState(null, '', clean);
  window.dispatchEvent(new PopStateEvent('popstate'));

  const prefersReducedMotion =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
}
