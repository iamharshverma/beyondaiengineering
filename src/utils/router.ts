import { PageId } from '../types';

export interface RouteState {
  page: PageId;
  param?: string;
  path: string;
}

export function parseCurrentRoute(): RouteState {
  if (typeof window === 'undefined') {
    return { page: 'home', path: '/' };
  }

  // Handle GitHub Pages 404.html redirection parameter: ?p=/cao-framework
  const urlParams = new URLSearchParams(window.location.search);
  const redirectPath = urlParams.get('p');
  if (redirectPath) {
    const cleanUrl = window.location.pathname + redirectPath.replace(/^\//, '');
    window.history.replaceState(null, '', redirectPath);
    return routeFromPath(redirectPath);
  }

  // Check path first
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
  if (pathname !== '/') {
    return routeFromPath(pathname);
  }

  // Check hash fallback (e.g. #cao-framework or #frameworks/trust-economy)
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

  // 2. Book
  if (clean === '/book') return { page: 'book', path: '/book' };
  if (clean === '/book/sample' || clean === '/sample') return { page: 'sample', path: '/book/sample' };
  if (clean === '/book/buy' || clean === '/buy') return { page: 'buy', path: '/book/buy' };
  if (clean === '/teams' || clean === '/book/teams') return { page: 'teams', path: '/teams' };

  // 3. Author
  if (clean === '/author') return { page: 'author', path: '/author' };

  // 4. C.A.O. Framework
  if (clean === '/cao-framework') return { page: 'cao-framework', path: '/cao-framework' };

  // 5. Frameworks Directory & Detail
  if (clean === '/frameworks') return { page: 'frameworks', path: '/frameworks' };
  if (clean.startsWith('/frameworks/')) {
    const slug = clean.replace('/frameworks/', '');
    return { page: 'framework-detail', param: slug, path: clean };
  }

  // 6. Manifesto
  if (clean === '/manifesto') return { page: 'manifesto', path: '/manifesto' };

  // 7. Resources & Toolkit
  if (clean === '/resources') return { page: 'resources', path: '/resources' };
  if (clean.startsWith('/resources/ethical-ai-audit')) return { page: 'resources', param: 'ethical-ai-audit', path: clean };
  if (clean.startsWith('/resources/ai-workflow-canvas')) return { page: 'resources', param: 'ai-workflow-canvas', path: clean };
  if (clean.startsWith('/resources/30-60-90-plan')) return { page: 'resources', param: '30-60-90-career-plan', path: clean };
  if (clean === '/toolkit' || clean === '/resources/toolkit') return { page: 'toolkit', path: '/toolkit' };

  // 8. Students
  if (clean === '/students') return { page: 'students', path: '/students' };

  // 9. Speaking
  if (clean === '/speaking') return { page: 'speaking', path: '/speaking' };

  // 10. Press
  if (clean === '/press') return { page: 'press', path: '/press' };

  // 11. Ideas Directory & Article Detail
  if (clean === '/ideas') return { page: 'ideas', path: '/ideas' };
  if (clean.startsWith('/ideas/')) {
    const slug = clean.replace('/ideas/', '');
    return { page: 'article-detail', param: slug, path: clean };
  }

  // 12. Stories
  if (clean === '/stories') return { page: 'stories', path: '/stories' };

  // 13. Blog & Engineering Dispatches
  if (clean === '/blog' || clean === '/posts' || clean === '/articles') {
    return { page: 'blog', path: '/blog' };
  }
  if (clean.startsWith('/blog/')) {
    const slug = clean.replace('/blog/', '');
    return { page: 'blog-detail', param: slug, path: clean };
  }

  return { page: 'home', path: '/' };
}

export function navigateTo(targetPath: string) {
  if (typeof window === 'undefined') return;

  const clean = targetPath.startsWith('/') ? targetPath : '/' + targetPath;
  window.history.pushState(null, '', clean);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
