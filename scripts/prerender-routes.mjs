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

const routes = [
  {
    path: '/book',
    title: 'The Book | Beyond AI Engineering — Harsh Verma',
    description: 'Read Beyond AI Engineering: From Creator to Curator by Harsh Verma. The practical career operating system for engineers navigating AI agents, code generation, and systems orchestration.',
    ogImage: DEFAULT_IMAGE,
  },
  {
    path: '/book/sample',
    title: 'Read a Sample Chapter | Beyond AI Engineering — Harsh Verma',
    description: 'Read an exclusive excerpt from Beyond AI Engineering by Harsh Verma, including Preface, Introduction (The Engineer After Code), and Chapter 1.',
    ogImage: DEFAULT_IMAGE,
  },
  {
    path: '/book/buy',
    title: 'Buy Beyond AI Engineering | Hardcover, Paperback & Digital',
    description: 'Order Beyond AI Engineering by Harsh Verma from Amazon, Barnes & Noble, Bookshop.org, and direct digital retailers globally.',
    ogImage: DEFAULT_IMAGE,
  },
  {
    path: '/teams',
    title: 'Team & University Bulk Orders | Beyond AI Engineering',
    description: 'Bring the Creator-Architect-Orchestrator operating system to your engineering organization or university with tiered bulk pricing, reading syllabi, and author sessions.',
    ogImage: 'https://www.beyondaiengineering.com/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_07_PM-8_c9db1dc2.png',
  },
  {
    path: '/author',
    title: 'Harsh Verma | Author of Beyond AI Engineering',
    description: 'Harsh Verma is the author of Beyond AI Engineering, Principal AI Engineer at Palo Alto Networks, Fellow of BCS, IEEE Senior Member, and Forbes Technology Council Member.',
    ogImage: AUTHOR_IMAGE,
  },
  {
    path: '/cao-framework',
    title: 'The C.A.O. Framework (Creator → Architect → Orchestrator) | Beyond AI Engineering',
    description: 'The defining three-phase operating system for software engineers navigating the age of autonomous AI agents by Harsh Verma: Creator (Build), Architect (Design), Orchestrator (Lead).',
    ogImage: 'https://www.beyondaiengineering.com/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_04_PM-1_cab3095f.png',
  },
  {
    path: '/frameworks',
    title: '10 Proprietary Frameworks for the Agentic Era | Beyond AI Engineering',
    description: 'Explore the 10 proprietary frameworks from Beyond AI Engineering by Harsh Verma: Trust Economy, How to What, Prompt Empathy, Agentic Diplomacy, and more.',
    ogImage: 'https://www.beyondaiengineering.com/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_04_PM-2_73d3bcaa.png',
  },
  {
    path: '/frameworks/trust-economy',
    title: 'The Trust Economy Framework | Beyond AI Engineering',
    description: 'When generation is free, trust is the only scarce commodity. Discover the Trust Economy framework from Beyond AI Engineering by Harsh Verma.',
    ogImage: 'https://www.beyondaiengineering.com/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_05_PM-3_0750658f.png',
  },
  {
    path: '/frameworks/how-to-what',
    title: 'The How-to-What Cognitive Shift | Beyond AI Engineering',
    description: 'Moving from syntax execution to problem formulation, specification, and architectural judgment in the age of AI agents.',
    ogImage: 'https://www.beyondaiengineering.com/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_04_PM-2_73d3bcaa.png',
  },
  {
    path: '/frameworks/prompt-empathy',
    title: 'Prompt Empathy Framework | Beyond AI Engineering',
    description: 'Designing prompts from the model and agent perspective to produce deterministic, verified systems outcomes.',
    ogImage: 'https://www.beyondaiengineering.com/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_04_PM-2_73d3bcaa.png',
  },
  {
    path: '/frameworks/agentic-diplomacy',
    title: 'Agentic Diplomacy Framework | Beyond AI Engineering',
    description: 'Orchestrating multi-agent systems with explicit authority boundaries, permissions, and escalation policies.',
    ogImage: 'https://www.beyondaiengineering.com/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_05_PM-4_ef9211f1.png',
  },
  {
    path: '/frameworks/ethical-curation',
    title: 'Ethical Curation Framework | Beyond AI Engineering',
    description: 'Building transparent, responsible, and bias-resistant AI systems that respect human agency and privacy.',
    ogImage: 'https://www.beyondaiengineering.com/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_04_PM-2_73d3bcaa.png',
  },
  {
    path: '/frameworks/ai-product-sense',
    title: 'AI Product Sense Framework | Beyond AI Engineering',
    description: 'Bridging engineering feasibility and genuine user value with generative and autonomous technology.',
    ogImage: 'https://www.beyondaiengineering.com/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_04_PM-2_73d3bcaa.png',
  },
  {
    path: '/frameworks/unlearn-relearn',
    title: 'Unlearn / Relearn Cycle | Beyond AI Engineering',
    description: 'The continuous cycle of discarding deprecated engineering habits and adopting high-leverage agent workflows.',
    ogImage: 'https://www.beyondaiengineering.com/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_04_PM-2_73d3bcaa.png',
  },
  {
    path: '/frameworks/digital-paper-trail',
    title: 'Digital Paper Trail Framework | Beyond AI Engineering',
    description: 'Creating auditable, human-inspectable records of AI-assisted engineering decisions and outputs.',
    ogImage: 'https://www.beyondaiengineering.com/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_05_PM-4_ef9211f1.png',
  },
  {
    path: '/frameworks/micro-community',
    title: 'Micro-Community Engine | Beyond AI Engineering',
    description: 'Building deep peer trust networks and professional moats in an era of automated, low-signal networking.',
    ogImage: 'https://www.beyondaiengineering.com/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_04_PM-2_73d3bcaa.png',
  },
  {
    path: '/frameworks/proof-of-work',
    title: 'Proof of Work Framework | Beyond AI Engineering',
    description: 'Demonstrating irreplaceable technical judgment and systems authority beyond raw code volume.',
    ogImage: 'https://www.beyondaiengineering.com/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_04_PM-2_73d3bcaa.png',
  },
  {
    path: '/frameworks/human-api',
    title: 'Human API Framework | Beyond AI Engineering',
    description: 'How senior engineers structure their judgment and communication interface for agents, leadership, and cross-functional teams.',
    ogImage: 'https://www.beyondaiengineering.com/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_04_PM-2_73d3bcaa.png',
  },
  {
    path: '/manifesto',
    title: 'The Engineer After Code Manifesto | Beyond AI Engineering',
    description: 'The 10 foundational theses for software engineers building resilient, high-leverage careers in the era of generative models and autonomous agents.',
    ogImage: 'https://www.beyondaiengineering.com/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_06_PM-7_54b9a7c1.png',
  },
  {
    path: '/resources',
    title: 'Interactive Engineering Lab & Canvases | Beyond AI Engineering',
    description: 'Interactive strategy canvases, ethical AI audit rubrics, and the 30-60-90 day engineering leadership transition planner.',
    ogImage: 'https://www.beyondaiengineering.com/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_05_PM-4_ef9211f1.png',
  },
  {
    path: '/toolkit',
    title: 'The Living AI Engineering Toolkit | Beyond AI Engineering',
    description: 'Curated agentic coding tools, prompt architectures, evaluation harnesses, and observability suites for modern AI orchestrators.',
    ogImage: 'https://www.beyondaiengineering.com/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_05_PM-5_dbbc71eb.png',
  },
  {
    path: '/students',
    title: 'Student & New Grad Guide | Beyond AI Engineering',
    description: 'How computer science students and early-career engineers can thrive when LLMs write syntax: proof of work, product judgment, and systems thinking.',
    ogImage: 'https://www.beyondaiengineering.com/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_06_PM-6_eb2b1261.png',
  },
  {
    path: '/speaking',
    title: 'Keynotes & Speaking | Harsh Verma — Beyond AI Engineering',
    description: 'Book Harsh Verma for keynotes, executive briefings, and engineering all-hands on the future of engineering, autonomous agents, and trust.',
    ogImage: 'https://www.beyondaiengineering.com/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_07_PM-8_c9db1dc2.png',
  },
  {
    path: '/press',
    title: 'Press Kit & Media Assets | Beyond AI Engineering',
    description: 'Official press kit, high-resolution author portraits, book covers, approved author bio, and media inquiry contacts for Harsh Verma.',
    ogImage: 'https://www.beyondaiengineering.com/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_07_PM-9_aa999379.png',
  },
  {
    path: '/ideas',
    title: 'Ideas Beyond the Book | Essays & Research by Harsh Verma',
    description: 'In-depth essays, technical commentary, and ongoing research on the transition from code-centric to judgment-centric engineering.',
    ogImage: 'https://www.beyondaiengineering.com/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_08_PM-10_e9c069eb.png',
  },
  {
    path: '/ideas/from-builder-to-curator',
    title: 'From Builder to Curator: The New Engineering Career Currency | Beyond AI Engineering',
    description: 'Why the era of code volume is ending, and how systems judgment, taste, and orchestration become the only enduring career assets.',
    ogImage: 'https://www.beyondaiengineering.com/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_08_PM-10_e9c069eb.png',
  },
  {
    path: '/ideas/ai-agent-diplomacy',
    title: 'The Architecture of Agentic Diplomacy | Beyond AI Engineering',
    description: 'When autonomous agents talk to other autonomous agents, software engineering looks less like writing algorithms and more like diplomacy.',
    ogImage: 'https://www.beyondaiengineering.com/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_05_PM-4_ef9211f1.png',
  },
  {
    path: '/ideas/death-of-junior-developer',
    title: 'The Myth of the Dying Junior Engineer | Beyond AI Engineering',
    description: 'Why AI coding tools are not killing early-career engineers, but dramatically altering the skills they must master to become indispensable.',
    ogImage: 'https://www.beyondaiengineering.com/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_06_PM-6_eb2b1261.png',
  },
  {
    path: '/ideas/trust-economy-software',
    title: 'Navigating the Trust Economy in Enterprise Software | Beyond AI Engineering',
    description: 'How enterprise tech stacks shift from paying for capability to paying for verification, safety, and accountability.',
    ogImage: 'https://www.beyondaiengineering.com/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_05_PM-3_0750658f.png',
  },
  {
    path: '/ideas/unlearning-code-habits',
    title: 'The 5 Code Habits Engineers Must Unlearn in 2026 | Beyond AI Engineering',
    description: 'From perfectionism in raw syntax to ticket-hoarding: the behavioral debt that prevents engineers from becoming orchestrators.',
    ogImage: 'https://www.beyondaiengineering.com/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_08_PM-10_e9c069eb.png',
  },
  {
    path: '/ideas/enterprise-agent-governance',
    title: 'Autonomous Agents in Production: The Missing Governance Layer | Beyond AI Engineering',
    description: 'A blueprint for engineering leaders implementing agentic systems with deterministic rollback, human oversight, and auditability.',
    ogImage: 'https://www.beyondaiengineering.com/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_05_PM-4_ef9211f1.png',
  },
  {
    path: '/stories',
    title: 'Reader Stories & Field Reports | Beyond AI Engineering',
    description: 'Real-world accounts from engineers, managers, and architects putting the C.A.O. framework and trust economy principles into practice.',
    ogImage: 'https://www.beyondaiengineering.com/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_04_PM-2_73d3bcaa.png',
  },
];

console.log(`Prerendering ${routes.length} canonical static pages for GitHub Pages with unique OpenGraph images...`);

for (const r of routes) {
  const canonicalUrl = `https://www.beyondaiengineering.com${r.path}`;
  const ogImg = r.ogImage || DEFAULT_IMAGE;
  
  let html = baseIndexHtml;
  
  // Replace title
  html = html.replace(/<title>.*?<\/title>/, `<title>${r.title}</title>`);
  
  // Replace meta description
  html = html.replace(
    /<meta name="description" content=".*?" \/>/,
    `<meta name="description" content="${r.description}" />`
  );
  
  // Replace canonical link
  html = html.replace(
    /<link rel="canonical" href=".*?" \/>/,
    `<link rel="canonical" href="${canonicalUrl}" />`
  );
  
  // Replace og:title
  html = html.replace(
    /<meta property="og:title" content=".*?" \/>/,
    `<meta property="og:title" content="${r.title}" />`
  );
  
  // Replace og:description
  html = html.replace(
    /<meta property="og:description" content=".*?" \/>/,
    `<meta property="og:description" content="${r.description}" />`
  );
  
  // Replace og:url
  html = html.replace(
    /<meta property="og:url" content=".*?" \/>/,
    `<meta property="og:url" content="${canonicalUrl}" />`
  );

  // Replace og:image
  html = html.replace(
    /<meta property="og:image" content=".*?" \/>/,
    `<meta property="og:image" content="${ogImg}" />`
  );

  // Replace twitter:image
  html = html.replace(
    /<meta name="twitter:image" content=".*?" \/>/,
    `<meta name="twitter:image" content="${ogImg}" />`
  );

  // Determine target directory
  const relativeDir = r.path.replace(/^\//, '');
  const targetDir = path.join(distDir, relativeDir);
  
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf-8');
}

console.log('Static route prerendering complete!');
