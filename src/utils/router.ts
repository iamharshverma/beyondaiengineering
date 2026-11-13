import { PageId } from '../types';
import { FRAMEWORKS } from '../data/frameworksData';

export interface RouteState {
  page: PageId;
  param?: string;
  path: string;
}

const VALID_FRAMEWORK_IDS = new Set(FRAMEWORKS.map((f) => f.id));

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

function routeFromPath(rawPath: string): RouteState {
  const clean = rawPath.replace(/\/+$/, '') || '/';

  // 1. Home
  if (clean === '/' || clean === '') {
    return { page: 'home', path: '/' };
  }

  // 2. Book Core
  if (clean === '/book') return { page: 'book', path: '/book' };
  if (clean === '/book/sample' || clean === '/sample') return { page: 'sample', path: '/book/sample' };
  if (clean === '/book/buy' || clean === '/buy') return { page: 'buy', path: '/book/buy' };

  // 3. Pathways: Engineers, Students, Organizations (and legacy /teams alias)
  if (clean === '/engineers' || clean === '/for-engineers') {
    return { page: 'engineers', path: '/engineers' };
  }
  if (clean === '/students' || clean === '/for-students') {
    return { page: 'students', path: '/students' };
  }
  if (
    clean === '/organizations' ||
    clean === '/for-organizations' ||
    clean === '/teams' ||
    clean === '/book/teams'
  ) {
    return { page: 'organizations', path: clean === '/teams' ? '/organizations' : clean };
  }

  // 4. Author, Speaking, Press, Contact
  if (clean === '/author' || clean === '/about') return { page: 'author', path: '/author' };
  if (clean === '/speaking') return { page: 'speaking', path: '/speaking' };
  if (clean === '/press') return { page: 'press', path: '/press' };
  if (clean === '/contact') return { page: 'contact', path: '/contact' };

  // 5. C.A.O. Framework & Signature Frameworks
  if (clean === '/cao-framework') return { page: 'cao-framework', path: '/cao-framework' };
  if (clean === '/frameworks') return { page: 'frameworks', path: '/frameworks' };
  if (clean.startsWith('/frameworks/')) {
    const slug = clean.replace('/frameworks/', '');
    if (slug === 'cao-framework') {
      return { page: 'cao-framework', path: '/cao-framework' };
    }
    if (VALID_FRAMEWORK_IDS.has(slug)) {
      return { page: 'framework-detail', param: slug, path: clean };
    }
    return { page: 'frameworks', path: '/frameworks' };
  }

  // 6. Manifesto
  if (clean === '/manifesto') return { page: 'manifesto', path: '/manifesto' };

  // 7. Resources & Toolkit
  if (clean === '/resources') return { page: 'resources', path: '/resources' };
  if (clean.startsWith('/resources/ethical-ai-audit')) {
    return { page: 'resources', param: 'ethical-ai-audit', path: clean };
  }
  if (clean.startsWith('/resources/ai-workflow-canvas')) {
    return { page: 'resources', param: 'ai-workflow-canvas', path: clean };
  }
  if (clean.startsWith('/resources/30-60-90-plan')) {
    return { page: 'resources', param: '30-60-90-career-plan', path: clean };
  }
  if (clean === '/toolkit' || clean === '/resources/toolkit') return { page: 'toolkit', path: '/toolkit' };

  // 8. Unified Insights (consolidating /insights, /blog, /ideas)
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

  // 9. Reader Stories
  if (clean === '/stories') return { page: 'stories', path: '/stories' };

  return { page: 'home', path: '/' };
}

export function getPagePath(page: PageId, param?: string): string {
  if (param) {
    if (page === 'frameworks' || page === 'framework-detail') {
      return param === 'cao-framework' ? '/cao-framework' : `/frameworks/${param}`;
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
    case 'teams':
    case 'organizations':
      return '/organizations';
    case 'cao-framework':
      return '/cao-framework';
    case 'blog':
    case 'ideas':
    case 'insights':
      return '/insights';
    case 'assessment':
      return '/cao-framework';
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
