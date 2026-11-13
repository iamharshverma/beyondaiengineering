import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');

if (!fs.existsSync(distDir)) {
  console.error('Dist directory does not exist. Run vite build first.');
  process.exit(1);
}

const baseIndexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

const DEFAULT_IMAGE = 'https://www.beyondaiengineering.com/assets/images/book_hardcover_mockup_1793842329740.jpg';
const AUTHOR_IMAGE = 'https://www.beyondaiengineering.com/assets/aistudio/harsh_verma_87a0217e.jpg';

function escapeAttr(val) {
  return String(val || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const routes = [
  {
    path: '/book',
    title: 'The Book | Beyond AI Engineering — Harsh Verma',
    description:
      'Explore all 11 chapters, 4 parts, and 15 visual blueprints of Beyond AI Engineering: From Creator to Curator by Harsh Verma.',
    ogImage: DEFAULT_IMAGE,
  },
  {
    path: '/book/sample',
    title: 'Read a Sample Chapter | Beyond AI Engineering — Harsh Verma',
    description:
      'Read an excerpt from Beyond AI Engineering by Harsh Verma, including Escaping the Tyranny of Syntax and The Engineer After Code.',
    ogImage: DEFAULT_IMAGE,
  },
  {
    path: '/book/buy',
    title: 'Get Beyond AI Engineering | Editions & Direct Author Inquiry',
    description:
      'Request Hardcover, Paperback, Digital, or bulk organizational editions of Beyond AI Engineering by Harsh Verma.',
    ogImage: DEFAULT_IMAGE,
  },
  {
    path: '/engineers',
    title: 'For Engineers | Build Your Next Chapter — Beyond AI Engineering',
    description:
      'Practical pathways for mid-to-senior software engineers moving from code output to systems design, judgment, and agent orchestration.',
    ogImage: 'https://www.beyondaiengineering.com/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_04_PM-2_73d3bcaa.png',
  },
  {
    path: '/organizations',
    title: 'For Organizations & Engineering Teams | Beyond AI Engineering',
    description:
      'Bulk book adoption, leadership reading groups, workshops, and keynotes to prepare engineering organizations for the agentic AI era.',
    ogImage: 'https://www.beyondaiengineering.com/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_07_PM-8_c9db1dc2.png',
  },
  {
    path: '/author',
    title: 'Harsh Verma | Author of Beyond AI Engineering',
    description:
      'Harsh Verma is a Principal AI Engineer at Palo Alto Networks, Stanford Distinguished Scholar, Fellow of RSA, BCS & IFGICT, and Forbes Technology Council Member.',
    ogImage: AUTHOR_IMAGE,
  },
  {
    path: '/cao-framework',
    title: 'The C.A.O. Framework (Creator → Architect → Orchestrator) | Beyond AI Engineering',
    description:
      'The three-phase operating system for software engineers navigating the age of autonomous AI agents by Harsh Verma, including the 12-scenario diagnostic.',
    ogImage: 'https://www.beyondaiengineering.com/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_04_PM-1_cab3095f.png',
  },
  {
    path: '/frameworks',
    title: '12 Signature Frameworks for the Agentic Era | Beyond AI Engineering',
    description:
      'Explore all 12 signature frameworks from Beyond AI Engineering by Harsh Verma: C.A.O. Framework, Trust Economy, How to What, Human API, and Ethical Curation.',
    ogImage: 'https://www.beyondaiengineering.com/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_04_PM-2_73d3bcaa.png',
  },
  {
    path: '/frameworks/trust-economy',
    title: 'The Trust Economy Framework | Beyond AI Engineering',
    description:
      'When output is abundant, verified human judgment is scarce. Explore the Trust Economy framework from Beyond AI Engineering by Harsh Verma.',
    ogImage: 'https://www.beyondaiengineering.com/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_05_PM-3_0750658f.png',
  },
  {
    path: '/frameworks/how-to-what',
    title: 'The How-to-What Cognitive Shift | Beyond AI Engineering',
    description:
      'Moving from syntax execution to problem selection, specification, and architectural judgment in the age of AI agents.',
    ogImage: 'https://www.beyondaiengineering.com/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_04_PM-2_73d3bcaa.png',
  },
  {
    path: '/frameworks/prompt-empathy',
    title: 'Prompt Empathy Framework | Beyond AI Engineering',
    description:
      'Designing context budgets and structured contracts from the model perspective to produce deterministic systems outcomes.',
    ogImage: 'https://www.beyondaiengineering.com/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_04_PM-2_73d3bcaa.png',
  },
  {
    path: '/frameworks/agentic-diplomacy',
    title: 'Agentic Diplomacy Framework | Beyond AI Engineering',
    description:
      'Orchestrating multi-agent systems with explicit authority boundaries, permissions, and human escalation policies.',
    ogImage: 'https://www.beyondaiengineering.com/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_05_PM-4_ef9211f1.png',
  },
  {
    path: '/frameworks/ethical-curation',
    title: 'Ethical Curation Framework | Beyond AI Engineering',
    description:
      'Building transparent, accountable, and bias-resistant AI systems with human ownership over deployed outcomes.',
    ogImage: 'https://www.beyondaiengineering.com/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_04_PM-2_73d3bcaa.png',
  },
  {
    path: '/frameworks/ai-product-sense',
    title: 'AI Product Sense Framework | Beyond AI Engineering',
    description:
      'Bridging engineering feasibility, token unit economics, and genuine user value in autonomous software.',
    ogImage: 'https://www.beyondaiengineering.com/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_04_PM-2_73d3bcaa.png',
  },
  {
    path: '/frameworks/unlearn-relearn',
    title: 'Unlearn / Relearn Cycle | Beyond AI Engineering',
    description:
      'Continually discarding deprecated coding rituals in favor of high-leverage agentic workflows.',
    ogImage: 'https://www.beyondaiengineering.com/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_04_PM-2_73d3bcaa.png',
  },
  {
    path: '/frameworks/digital-paper-trail',
    title: 'Digital Paper Trail Framework | Beyond AI Engineering',
    description:
      'Creating auditable, inspectable records of AI-assisted engineering decisions, ADRs, and post-mortems.',
    ogImage: 'https://www.beyondaiengineering.com/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_05_PM-4_ef9211f1.png',
  },
  {
    path: '/frameworks/micro-community',
    title: 'The Micro-Community Engine | Beyond AI Engineering',
    description:
      'Building deep peer trust networks of domain practitioners rather than pursuing low-signal follower vanity metrics.',
    ogImage: 'https://www.beyondaiengineering.com/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_04_PM-2_73d3bcaa.png',
  },
  {
    path: '/frameworks/proof-of-work',
    title: 'Proof of Work Framework | Beyond AI Engineering',
    description:
      'Demonstrating irreplaceable technical judgment and systems authority through verifiable deployments and benchmarks.',
    ogImage: 'https://www.beyondaiengineering.com/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_04_PM-2_73d3bcaa.png',
  },
  {
    path: '/frameworks/human-api',
    title: 'The Human API Framework | Beyond AI Engineering',
    description:
      'How engineers structure their judgment and governance interface between human stakeholders and multi-agent systems.',
    ogImage: 'https://www.beyondaiengineering.com/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_04_PM-2_73d3bcaa.png',
  },
  {
    path: '/manifesto',
    title: 'The Engineer After Code Manifesto | Beyond AI Engineering',
    description:
      'Eight foundational axioms for software engineers building resilient careers around judgment, boundaries, and trust.',
    ogImage: 'https://www.beyondaiengineering.com/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_06_PM-7_54b9a7c1.png',
  },
  {
    path: '/resources',
    title: 'Implementation Lab & 15 Companion Resources | Beyond AI Engineering',
    description:
      '15 interactive canvases, evaluation checklists, governance matrices, and the 30/60/90-day career transition planner.',
    ogImage: 'https://www.beyondaiengineering.com/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_05_PM-4_ef9211f1.png',
  },
  {
    path: '/toolkit',
    title: 'The Living AI Engineering Toolkit | Beyond AI Engineering',
    description:
      'Curated agentic coding tools, evaluation harnesses, observability suites, and security frameworks across 11 categories.',
    ogImage: 'https://www.beyondaiengineering.com/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_05_PM-5_dbbc71eb.png',
  },
  {
    path: '/students',
    title: 'For Students & Early-Career Engineers | Beyond AI Engineering',
    description:
      'How computer science students build verifiable proof of work, core CS fundamentals, and engineering judgment when AI writes syntax.',
    ogImage: 'https://www.beyondaiengineering.com/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_06_PM-6_eb2b1261.png',
  },
  {
    path: '/speaking',
    title: 'Keynotes & Speaking | Harsh Verma — Beyond AI Engineering',
    description:
      'Invite Harsh Verma for keynotes, executive offsites, university talks, and engineering department masterclasses.',
    ogImage: 'https://www.beyondaiengineering.com/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_07_PM-8_c9db1dc2.png',
  },
  {
    path: '/press',
    title: 'Press Kit & Media Assets | Beyond AI Engineering',
    description:
      'Official press kit, high-resolution author portraits, book covers, verified author biographies, and media contacts.',
    ogImage: 'https://www.beyondaiengineering.com/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_07_PM-9_aa999379.png',
  },
  {
    path: '/stories',
    title: 'Transformation Archetypes & Reader Stories | Beyond AI Engineering',
    description:
      'Illustrative C.A.O. transition profiles showing how engineers and leaders apply the operating system, plus story submissions.',
    ogImage: 'https://www.beyondaiengineering.com/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_04_PM-2_73d3bcaa.png',
  },
  {
    path: '/contact',
    title: 'Contact Harsh Verma | Beyond AI Engineering',
    description:
      'Reach Harsh Verma directly for individual book inquiries, bulk orders, speaking engagements, media requests, and engineering partnerships.',
    ogImage: AUTHOR_IMAGE,
  },
  {
    path: '/insights',
    title: 'Insights: Articles, Forbes Columns & Engineering Notes | Harsh Verma',
    description:
      'Ideas beyond the book: Forbes Technology Council columns, MCP & local inference benchmarks, RSAC & HackerNoon essays, and systems notes.',
    ogImage: 'https://www.beyondaiengineering.com/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_08_PM-10_e9c069eb.png',
  },
];

// Dynamically read and register all /insights/:slug canonical routes from blogData.ts + articlesData.ts
const registeredSlugs = new Set();
try {
  const blogDataContent = fs.readFileSync(path.resolve('src/data/blogData.ts'), 'utf-8');
  const postMatches = [
    ...blogDataContent.matchAll(/"slug":\s*"([^"]+)"[\s\S]*?"title":\s*"([^"]+)"[\s\S]*?"subtitle":\s*"([^"]+)"/g),
  ];
  for (const match of postMatches) {
    const slug = match[1];
    if (!registeredSlugs.has(slug)) {
      registeredSlugs.add(slug);
      routes.push({
        path: `/insights/${slug}`,
        title: `${match[2]} | Harsh Verma — Beyond AI Engineering`,
        description: match[3],
        ogImage: AUTHOR_IMAGE,
      });
    }
  }
} catch (e) {
  console.warn('Could not dynamically extract blogData posts for prerender:', e);
}

try {
  const articlesContent = fs.readFileSync(path.resolve('src/data/articlesData.ts'), 'utf-8');
  const articleMatches = [
    ...articlesContent.matchAll(/id:\s*'([^']+)'[\s\S]*?title:\s*'([^']+)'[\s\S]*?subtitle:\s*'([^']+)'/g),
  ];
  for (const match of articleMatches) {
    const slug = match[1];
    if (!registeredSlugs.has(slug)) {
      registeredSlugs.add(slug);
      routes.push({
        path: `/insights/${slug}`,
        title: `${match[2]} | Harsh Verma — Beyond AI Engineering`,
        description: match[3],
        ogImage: 'https://www.beyondaiengineering.com/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_08_PM-10_e9c069eb.png',
      });
    }
  }
} catch (e) {
  console.warn('Could not dynamically extract articlesData essays for prerender:', e);
}

console.log(`Prerendering ${routes.length} canonical static pages with OpenGraph tags...`);

for (const r of routes) {
  const canonicalUrl = `https://www.beyondaiengineering.com${r.path}`;
  const ogImg = r.ogImage || DEFAULT_IMAGE;
  const safeTitle = escapeAttr(r.title);
  const safeDesc = escapeAttr(r.description);

  let html = baseIndexHtml;

  html = html.replace(/<title>.*?<\/title>/, `<title>${safeTitle}</title>`);
  html = html.replace(
    /<meta name="description" content=".*?" \/>/,
    `<meta name="description" content="${safeDesc}" />`
  );
  html = html.replace(
    /<link rel="canonical" href=".*?" \/>/,
    `<link rel="canonical" href="${canonicalUrl}" />`
  );
  html = html.replace(
    /<meta property="og:title" content=".*?" \/>/,
    `<meta property="og:title" content="${safeTitle}" />`
  );
  html = html.replace(
    /<meta property="og:description" content=".*?" \/>/,
    `<meta property="og:description" content="${safeDesc}" />`
  );
  html = html.replace(
    /<meta property="og:url" content=".*?" \/>/,
    `<meta property="og:url" content="${canonicalUrl}" />`
  );
  html = html.replace(
    /<meta property="og:image" content=".*?" \/>/,
    `<meta property="og:image" content="${ogImg}" />`
  );
  html = html.replace(
    /<meta name="twitter:title" content=".*?" \/>/,
    `<meta name="twitter:title" content="${safeTitle}" />`
  );
  html = html.replace(
    /<meta name="twitter:description" content=".*?" \/>/,
    `<meta name="twitter:description" content="${safeDesc}" />`
  );
  html = html.replace(
    /<meta name="twitter:image" content=".*?" \/>/,
    `<meta name="twitter:image" content="${ogImg}" />`
  );

  const relativeDir = r.path.replace(/^\//, '');
  const targetDir = path.join(distDir, relativeDir);

  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf-8');
}

console.log('Static route prerendering complete!');
