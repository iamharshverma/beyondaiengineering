import { Chapter, SpecialInfographicSection } from '../types';

export const BOOK_DETAILS = {
  title: 'BEYOND AI ENGINEERING',
  subtitle: 'From Creator to Curator: Build Your Authority and Lead the AI Agent Revolution',
  author: 'Harsh Verma',
  authorTitle: 'Principal AI Engineer at Palo Alto Networks · Stanford Distinguished Scholar · Forbes Tech Council · Fellow of RSA & BCS · IEEE Senior Member',
  coreTagline: 'AI can increasingly write the code. Your advantage is deciding what deserves to be built.',
  positioning: 'Beyond AI Engineering is a practical career operating system for engineers navigating the age of AI agents. It helps engineers move from producing code to exercising judgment, designing systems, orchestrating AI and humans, and operating as a high-leverage Super Engineer.',
  coverImage: '/src/assets/images/book_hardcover_mockup_1793842329740.jpg',
  authorImage: '/assets/aistudio/harsh_verma_87a0217e.jpg',
  authorImageFallback: '/public/assets/aistudio/harsh_verma_87a0217e.jpg',
  publisher: 'Beyond AI Publishing',
  publicationYear: '2026',
  isbn: '978-1-965432-01-9',
  pageCount: '344 pages',
  contactEmail: 'connect@beyondaiengineering.com',
  canonicalUrl: 'https://www.beyondaiengineering.com',
  authorWebsite: 'https://www.harshverma.me',
  authorAboutUrl: 'https://www.harshverma.me/page-about',
  authorBooksUrl: 'https://www.harshverma.me/page-books#book1',
};

export const BOOK_PARTS = [
  {
    partNumber: 'PART I',
    title: 'THE SHIFT',
    description: 'Understanding why execution is becoming abundant, why the market for pure syntax generation is collapsing, and how the value frontier moves to problem curation and judgment.',
    chapters: [1, 2, 3],
  },
  {
    partNumber: 'PART II',
    title: 'THE AI-ERA ENGINEER',
    description: 'Mastering modern AI-assisted engineering workflows, prompt empathy, system boundaries, and establishing a distinctive professional identity grounded in verified capability.',
    chapters: [4, 5, 6],
  },
  {
    partNumber: 'PART III',
    title: 'CAREER LEVERAGE',
    description: 'Breaking free from linear implementation tasks. Translating technical acumen into high-leverage organizational influence, risk stewardship, and systems orchestration.',
    chapters: [7, 8, 9],
  },
  {
    partNumber: 'PART IV',
    title: 'PUTTING IT INTO PRACTICE',
    description: 'The tactical toolkit: free resources, five pathways to outsized industry impact, building inspectable evidence, and executing your 30/60/90-day transition.',
    chapters: [10, 11],
  },
];

export const CHAPTERS: Chapter[] = [
  {
    number: 1,
    part: 'PART I',
    partTitle: 'THE SHIFT',
    title: 'Welcome to the New Age of Engineering',
    subtitle: 'Human Judgment × AI Capabilities = Bigger Impact',
    summary: 'Use AI to expand what you can deliver while retaining ultimate responsibility for the result. Examines the collapsing marginal cost of code synthesis and why engineers who define their worth through raw keystrokes are facing an unprecedented paradigm inversion.',
    keyTakeaway: 'Move up the stack: from writing code, to designing systems, to curating agents.',
    sampleExcerpt: 'For seventy years, the central bottleneck in software development was translation: converting human ambition into rigid syntactic instructions. That barrier has not merely lowered; it has dissolved. The engineer of tomorrow is no longer evaluated on how quickly they can type a function, but on whether that function should exist in the first place.',
    readTime: '18 min read',
    infographicUrl: '/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_04_PM-2_73d3bcaa.png',
    infographicFallback: '/public/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_04_PM-2_73d3bcaa.png',
    keyConcepts: [
      'System Curator: Select, combine, and maintain the right tools, models, and data for the problem.',
      'Prompt Empathy: Give context, constraints, and examples, then rigorously check results.',
      'Agentic Diplomacy: Define approval boundaries for consequential system mutations.',
      'Human API: The critical interface between human judgment and AI execution.'
    ],
    whatIsChanging: [
      'AI assists coding, testing, and documentation across all modern IDEs.',
      'Pure code production is a rapidly shrinking asset in software economics.',
      'Value grows exponentially when engineers design, curate, and take accountability.',
      'Elite engineering teams measure system outcomes, not just generated line output.'
    ],
    caseStudies: [
      {
        name: 'Simon Willison',
        subtitle: 'Prompt Empathy in Practice',
        description: 'Known for sharing practical patterns for working with LLMs. Demonstrates how rich context, architectural constraints, and test fixtures yield reliable code synthesis.'
      },
      {
        name: 'Knight Capital',
        subtitle: 'Why Automated Systems Need a Kill Switch',
        description: 'A 2012 automated trading incident where a faulty deployment caused $440M in trades in 45 minutes, highlighting the eternal necessity of human oversight and emergency stops.'
      }
    ],
    labTryThisWeek: 'Pick one repetitive coding task, let an AI tool attempt it, and rigorously document the gaps, hallucinations, and judgment calls required.',
    curatorChecklist: [
      'Identify 3 partially automatable tasks in your weekly workflow.',
      'Write down the high-level judgment calls that AI cannot make without context.',
      'Place yourself on the Creator–Architect–Orchestrator spectrum.',
      'Practice one Prompt Empathy or Agentic Diplomacy protocol this week.'
    ]
  },
  {
    number: 2,
    part: 'PART I',
    partTitle: 'THE SHIFT',
    title: 'Beyond Code: The Engineer of the Future',
    subtitle: 'From HOW to WHAT: Choose a Worthwhile Problem Before Choosing an Architecture',
    summary: 'The shift from implementation questions ("How do we build this?") to higher-value decisions about problems, people, and business impact ("What is worth solving?"). How product sense and systems thinking redefine senior talent.',
    keyTakeaway: 'Your highest-leverage value lies in judgment, direction, and system-level thinking.',
    sampleExcerpt: 'Anyone can prompt a model to produce five hundred lines of idiomatic TypeScript. Very few people can diagnose why those five hundred lines create an unobservable cascading failure under distributed race conditions. Evaluation and problem curation are where engineering rigor truly lives.',
    readTime: '22 min read',
    infographicUrl: '/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_05_PM-3_0750658f.png',
    infographicFallback: '/public/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_05_PM-3_0750658f.png',
    keyConcepts: [
      'AI Product Sense: Know what is worth building and identify authentic user outcomes.',
      'Probabilistic Thinking: Evaluate uncertain model behaviors and reason in trade-offs.',
      'Systems Thinking: Understand workflows, dependencies, second-order effects, and context.',
      'Leadership & Collaboration: Influence stakeholders and translate technical capabilities into business value.'
    ],
    whatIsChanging: [
      'Engineers transition from ticket-completers to problem curators and system directors.',
      'AI speeds implementation, but human judgment determines strategic viability.',
      'Isolated tasks give way to interconnected multi-agent architectures.',
      'Technical acumen must be paired with clear stakeholder communication.'
    ],
    caseStudies: [
      {
        name: 'swyx (Shawn Wang)',
        subtitle: 'From Coder to Architect of the AI Engineer Movement',
        description: 'Started as a traditional software engineer, then focused on the broader paradigm: advocating, educating, and organizing the global AI engineering community.'
      },
      {
        name: 'Zillow Offers',
        subtitle: 'What Happens When Teams Stop Reassessing System Assumptions',
        description: 'Zillow built a sophisticated algorithmic home-buying model, but failed to continuously question if the underlying assumptions held when macro housing dynamics shifted.'
      }
    ],
    labTryThisWeek: 'List five important decisions from your last project and identify which ones an AI model could not have made without human context.',
    curatorChecklist: [
      'Answer one "What" problem question instead of only jumping to "How" implementation.',
      'Explain your project\'s business value in two sentences without using technical jargon.',
      'Audit your public profile to describe verified achievements rather than generic tasks.',
      'Map your current daily tasks to Creator, Architect, or Orchestrator altitude.'
    ]
  },
  {
    number: 3,
    part: 'PART I',
    partTitle: 'THE SHIFT',
    title: 'Reimagining the Engineer',
    subtitle: 'The Creator–Architect–Orchestrator (C.A.O.) Operating Triad',
    summary: 'Introduces the foundational C.A.O. framework that underpins the entire book. Analyzes the progression of technical leverage from writing code components to designing resilient systems to orchestrating autonomous intelligence.',
    keyTakeaway: 'Your career progression is measured by your transition from building components to designing architectures to orchestrating autonomous intelligence.',
    sampleExcerpt: 'The Creator asks: How do I build this? The Architect asks: What should we build, and what are the trade-offs? The Orchestrator asks: How do humans, agents, and systems coordinate with verifiable authority and safety? Your leverage scales across this progression.',
    readTime: '25 min read',
    infographicUrl: '/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_05_PM-4_ef9211f1.png',
    infographicFallback: '/public/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_05_PM-4_ef9211f1.png',
    keyConcepts: [
      'Creator Stage: Focus on building working solutions, unit testing, and tooling.',
      'Architect Stage: Focus on system design, failure boundaries, and probabilistic flows.',
      'Orchestrator Stage: Leading people, multi-agent systems, and business outcomes.',
      'Ethical Curation: Auditing fairness, preventing bias, and enforcing human accountability.'
    ],
    whatIsChanging: [
      'Junior roles based solely on syntax implementation are being automated fastest.',
      'Orchestrators command 10x leverage by steering fleets of specialized agents.',
      'System safety and ethical oversight become direct engineering deliverables.'
    ],
    caseStudies: [
      {
        name: 'Epic Sepsis Prediction Model',
        subtitle: 'When Clinical AI Lacks Human-in-the-Loop Safeguards',
        description: 'An AI diagnostic model widely deployed in hospitals suffered from high false alarm rates and missed subtle deterioration because it lacked continuous bedside feedback loops.'
      },
      {
        name: 'Twitter Algorithmic Image Cropping',
        subtitle: 'Unintentional Systematic Demographic Bias',
        description: 'A neural cropping algorithm systematically prioritized certain demographic faces over others until community researchers audited the model in public.'
      }
    ],
    labTryThisWeek: 'Conduct a failure-mode and boundary analysis on an AI tool or agent feature in your organization.',
    curatorChecklist: [
      'Define clear fallback behaviors for when an AI service returns low-confidence outputs.',
      'Audit your team\'s workflow for single-points-of-failure in automated pipelines.',
      'Establish a deterministic evaluation checkpoint before any agent takes persistent action.',
      'Document the ethical and security boundaries for your automated workflows.'
    ]
  },
  {
    number: 4,
    part: 'PART II',
    partTitle: 'THE AI-ERA ENGINEER',
    title: 'Breaking Barriers',
    subtitle: 'Case Studies of Engineers Who Thrived in Seismic Technological Shifts',
    summary: 'Overcoming developer inertia, prompt cynicism, and cargo-cult habits. Case studies of engineers who transitioned from legacy software paradigms into high-leverage frontier intelligence leadership.',
    keyTakeaway: 'The hardest part of adopting agentic AI is not learning the tooling; it is unlearning the instinct to micromanage syntax.',
    sampleExcerpt: 'Senior engineers often reject early AI output because it does not match their idiosyncratic stylistic habits. They mistake style for substance. When you train your perspective on system invariants rather than code formatting, your cognitive capacity expands ten-fold.',
    readTime: '20 min read',
    infographicUrl: '/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_05_PM-5_dbbc71eb.png',
    infographicFallback: '/public/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_05_PM-5_dbbc71eb.png',
    keyConcepts: [
      'Unlearning Legacy Inertia: Dropping the compulsion to type every line by hand.',
      'Perimeter Defense: Translating deep cybersecurity disciplines into AI safety bounds.',
      'Mission-Critical Reliability: Operating systems where failure is not an option.',
      'Autonomous Systems Curation: Managing edge cases where data distributions drift.'
    ],
    whatIsChanging: [
      'Engineers who cling to raw syntax speed become easily commoditized.',
      'Practitioners who embrace systems safety, data verification, and architecture thrive.',
      'Cross-disciplinary skills (security, UX, policy) become massive force multipliers.'
    ],
    caseStudies: [
      {
        name: 'Harsh Verma (Palo Alto Networks)',
        subtitle: 'AI Cybersecurity & Autonomous Defense Architectures',
        description: 'How a decade of deep distributed systems experience enabled building high-assurance, enterprise-grade AI defense perimeters for Fortune 500 networks.'
      },
      {
        name: 'Waymo Autonomous Driving',
        subtitle: 'Safety-First Systems Engineering & Edge Curation',
        description: 'How Waymo achieved commercial autonomous rides by obsessing over edge-case curation, multi-layered sensor redundancy, and deterministic simulation evals.'
      }
    ],
    labTryThisWeek: 'Identify one legacy habit in your coding routine (e.g. manual boilerplate generation) and replace it with a structured AI-assisted workflow.',
    curatorChecklist: [
      'Identify two manual development bottlenecks that can be safely automated.',
      'Benchmark your team\'s cycle time before and after AI agent workflow integration.',
      'Write down the 3 core principles that make your technical judgment irreplaceable.',
      'Share an unvarnished post-mortem of an AI workflow experiment with your peers.'
    ]
  },
  {
    number: 5,
    part: 'PART II',
    partTitle: 'THE AI-ERA ENGINEER',
    title: 'Mastering AI Workflows',
    subtitle: 'Prompt Empathy, Agentic Diplomacy & The AI System Lifecycle',
    summary: 'A deep dive into treating AI models as cognitive collaborators. Developing Prompt Empathy (understanding model priors) and Agentic Diplomacy (governing agent privileges). Mastering the full lifecycle: Data → Model → Eval → Deploy → Monitor → Feedback.',
    keyTakeaway: 'Prompt empathy is not about guessing magic phrases; it is understanding how models infer latent intent, structural context, and boundary limits.',
    sampleExcerpt: 'When an agent fails, junior practitioners blame the model. Master orchestrators examine the context window, the tool schemas, and the feedback signals. You must cultivate prompt empathy—the ability to model how the transformer experiences your task formulation.',
    readTime: '26 min read',
    infographicUrl: '/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_06_PM-6_eb2b1261.png',
    infographicFallback: '/public/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_06_PM-6_eb2b1261.png',
    keyConcepts: [
      'Prompt Empathy: Modeling the transformer priors, attention distribution, and ambiguity.',
      'Agentic Diplomacy: Enforcing least-privilege tool execution and mutation boundaries.',
      'Deterministic Evaluation: Unit tests for probabilistic systems (assertions, golden datasets).',
      'Trace Observability: Telemetry for multi-step reasoning chains and token spend.'
    ],
    whatIsChanging: [
      'Ad-hoc prompting is replaced by structured prompt engineering and DSPy optimization.',
      'Vibe-checking outputs is replaced by rigorous automated evaluation benches.',
      'Agents are treated as non-deterministic microservices requiring strict API boundaries.'
    ],
    caseStudies: [
      {
        name: 'Duolingo Max & Birdbrain',
        subtitle: 'Scaling Pedagogical GenAI with Human Oversight',
        description: 'How Duolingo integrated GPT-4 for roleplay and explanation features while maintaining strict language quality benchmarks through curriculum guardrails.'
      },
      {
        name: 'Arize Phoenix Telemetry',
        subtitle: 'From Opaque Black-Box to Inspectable Traces',
        description: 'Demonstrating how instrumenting agent spans reveals exact failure points in retrieval-augmented generation and multi-agent coordination.'
      }
    ],
    labTryThisWeek: 'Construct an automated evaluation suite testing your primary prompt against 10 realistic edge cases with strict assertion checks.',
    curatorChecklist: [
      'Map your model\'s context window and prune irrelevant retrieved data.',
      'Set up deterministic evaluation gates before shipping prompt changes.',
      'Instrument agent runs with trace observability to monitor reasoning steps.',
      'Design a graceful degradation fallback when the primary model encounters latency.'
    ]
  },
  {
    number: 6,
    part: 'PART II',
    partTitle: 'THE AI-ERA ENGINEER',
    title: 'The Art of Personal Branding for Engineers',
    subtitle: 'Building Authority in the Trust Economy Through Proof of Work',
    summary: 'Why superficial social media posturing fails, and how engineers can build authentic authority through a Digital Paper Trail, micro-communities, and inspectable proof of work.',
    keyTakeaway: 'Authority is not follower count; it is the verifiable trail of technical decisions, post-mortems, and architectural judgments you leave in public view.',
    sampleExcerpt: 'In an era where synthetic content inundates every channel, empty cheerleading is immediately discounted. What survives is verifiable evidence: a detailed architectural trade-off document, a public critique of an agent failure mode, an open benchmark.',
    readTime: '21 min read',
    infographicUrl: '/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_06_PM-7_54b9a7c1.png',
    infographicFallback: '/public/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_06_PM-7_54b9a7c1.png',
    keyConcepts: [
      'Micro-Community: Building high-density relationships with 50–200 practitioners.',
      'The Trust Economy: In an age of synthetic spam, verified human trust is paramount.',
      'Digital Paper Trail: Public repos, post-mortems, trade-off docs, and technical essays.',
      'Specific Niche: Owning a tight intersection (e.g. AI Security, RAG Evals, Agent Ops).'
    ],
    whatIsChanging: [
      'Traditional resumes are eclipsed by public GitHub commits and architectural write-ups.',
      'Generic generalists lose out to specialized orchestrators with visible evidence.',
      'Sharing genuine technical failures creates higher trust than marketing gloss.'
    ],
    caseStudies: [
      {
        name: 'Prof. Ethan Mollick (Wharton)',
        subtitle: 'Public Experimentation & Real-Time Synthesis',
        description: 'How transparent, rapid experimentation with frontier AI models published on Substack created unmatched global academic and industry authority.'
      },
      {
        name: 'Mitchell Hashimoto',
        subtitle: 'The Power of Deep Technical Writing & Architecture Notes',
        description: 'From Vagrant and Terraform to Ghostty: demonstrating how sharing technical decisions and architectural philosophy builds enduring multi-decade reverence.'
      }
    ],
    labTryThisWeek: 'Write a 500-word architectural post-mortem or trade-off analysis about a recent system failure or design choice, and share it publicly.',
    curatorChecklist: [
      'Define your exact technical niche in one sentence.',
      'Publish one inspectable technical artifact (code, demo, or analysis) each month.',
      'Engage meaningfully with 5 key engineers working in your specialization.',
      'Ensure your GitHub or portfolio demonstrates real problem-solving, not tutorial clones.'
    ]
  },
  {
    number: 7,
    part: 'PART III',
    partTitle: 'CAREER LEVERAGE',
    title: 'From Stagnation to Innovation',
    subtitle: 'Career Strategies in the Age of AI & The Anti-LeetCode Manifesto',
    summary: 'The structured transition path from feeling stuck to creating high-leverage value: Stagnation → Direction → Skill Building → Experiments → Visibility → Innovation. Why the AI era values systems thinking over memorized algorithmic puzzles.',
    keyTakeaway: 'A career transition succeeds when you combine transferable engineering strengths with visible new evidence.',
    sampleExcerpt: 'When you operate exclusively in the realm of "How," you are downstream of other people\'s thinking. You are an execution engine. When you step into "What," you define the problem space, assess technological feasibility, and shape business outcomes.',
    readTime: '24 min read',
    infographicUrl: '/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_07_PM-8_c9db1dc2.png',
    infographicFallback: '/public/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_07_PM-8_c9db1dc2.png',
    keyConcepts: [
      'Transformation Path: Six distinct phases from stagnation to industry innovation.',
      'Four Content Pillars: AI Literacy, Leadership/Communication, Ethical AI, Personal Brand.',
      'Anti-LeetCode Manifesto: Valuing real systems engineering and judgment over memorized puzzles.',
      'Cross-Discipline Collaboration: Partnering with designers, product leads, and domain experts.'
    ],
    whatIsChanging: [
      'Interviews are shifting from synthetic whiteboard puzzles to system design and AI orchestration.',
      'Career ladders now reward engineers who reduce system complexity and manage risk.',
      'Visible experiments compound into opportunities faster than tenure alone.'
    ],
    caseStudies: [
      {
        name: 'Alireza Abbaspour',
        subtitle: 'A Decade of Compounding Moves into AV Systems Safety',
        description: 'From academic research to frontier industry leadership, Alireza built on core strengths in systems thinking, safety, and cross-team collaboration.'
      },
      {
        name: 'IBM Watson for Oncology',
        subtitle: 'Why Big Budgets Cannot Replace Clear Problems and Clinician Feedback',
        description: 'Despite massive investments, Watson for Oncology struggled because it lacked clearly defined user problems, real-world clinician workflows, and tight iteration loops.'
      }
    ],
    labTryThisWeek: 'Run a simple multi-agent experiment using two or more AI tools, and document the failure boundaries, friction points, and judgment calls.',
    curatorChecklist: [
      'Name one specific area of your daily work that feels stagnant or routine.',
      'Identify the high-leverage AI capability that unlocks forward movement for that task.',
      'Research one fast-growing technical specialization in your industry.',
      'Reach out to one mentor or practitioner in your target domain with a thoughtful question.'
    ]
  },
  {
    number: 8,
    part: 'PART III',
    partTitle: 'CAREER LEVERAGE',
    title: 'Template for Success',
    subtitle: 'The Standout Formula: Niche + Public Body of Work + Micro-Community',
    summary: 'The operational playbook for standing out in a crowded market. How to design a defensible niche, maintain a consistent publishing cadence, and cultivate an engaged community of peers.',
    keyTakeaway: 'Reliability in agentic systems and authority in your career are both architectural properties, not accidents.',
    sampleExcerpt: 'Do not wait for models to become infallible. Build defensive architectures: isolate agent privileges, insert cryptographic validation at mutation boundaries, and design graceful degradation loops.',
    readTime: '23 min read',
    infographicUrl: '/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_07_PM-9_aa999379.png',
    infographicFallback: '/public/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_07_PM-9_aa999379.png',
    keyConcepts: [
      'The Standout Formula: Specific Niche + Public Proof + Community Trust.',
      'Content Flywheel: Learning in public → Building open tools → Gathering feedback.',
      'Curator Economy: Synthesizing complex research into actionable engineering guides.',
      'Compounding Reputation: Turning single artifacts into speaking, advisory, and leadership roles.'
    ],
    whatIsChanging: [
      'Pure consumers of tech news are replaced by active distillers and curators.',
      'Small, dedicated communities deliver far higher career value than massive passive followings.',
      'Open-source blueprints establish instant credibility with engineering peers.'
    ],
    caseStudies: [
      {
        name: 'Rowan Cheung (The Rundown AI)',
        subtitle: 'Systematic Distillation & Rapid Community Scaling',
        description: 'How disciplined daily curation, clear synthesis of AI research, and building in public created one of the fastest-growing AI media and education ecosystems.'
      },
      {
        name: 'Harrison Chase (LangChain)',
        subtitle: 'From Open-Source Experiment to Industry Standard Framework',
        description: 'Rapidly iterating in public based on developer pain points, turning community feedback into a venture-backed infrastructure powerhouse.'
      }
    ],
    labTryThisWeek: 'Package a utility script or prompt template you use regularly into a clean GitHub repository with an exemplary README and usage examples.',
    curatorChecklist: [
      'Define your exact target reader and their top three technical pain points.',
      'Draft a 30-day publishing calendar with one weekly technical artifact.',
      'Create an inspectable portfolio repository highlighting your strongest projects.',
      'Connect with three newsletter or podcast creators in your space to offer insights.'
    ]
  },
  {
    number: 9,
    part: 'PART III',
    partTitle: 'CAREER LEVERAGE',
    title: 'The Do’s and Don’ts',
    subtitle: 'Safe Engineering Practice & Avoiding the 10 Traps of the AI Era',
    summary: 'A field guide to the most destructive antipatterns in modern AI engineering: unbounded agent autonomy, vibe-based evaluation, outsourcing responsibility, and resume padding.',
    keyTakeaway: 'Never automate responsibility away. If an agent executes an action, you own the catastrophic failure.',
    sampleExcerpt: 'The most dangerous phrase in modern engineering is: "The agent hallucinated." No, your system allowed unvalidated output to cross an execution boundary. A model is a probabilistic generator; a system is deterministic responsibility.',
    readTime: '19 min read',
    infographicUrl: '/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_08_PM-10_e9c069eb.png',
    infographicFallback: '/public/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_08_PM-10_e9c069eb.png',
    keyConcepts: [
      'Bounded Permissions: Never give an agent unrestricted write access to databases or APIs.',
      'Deterministic Safeguards: Interposing traditional schema validation and invariant tests.',
      'Emergency Kill Switches: Designing human-in-the-loop gates for all high-risk operations.',
      'The Responsibility Principle: Retaining full engineering ownership over automated outputs.'
    ],
    whatIsChanging: [
      'Hype-driven autonomy demos are giving way to compliance, governance, and audit trails.',
      'Security teams are demanding cryptographic signatures on agentic tool invocations.',
      'Senior engineers are evaluated on how well they prevent catastrophic AI edge cases.'
    ],
    caseStudies: [
      {
        name: 'Chevrolet Customer Assistant Bot',
        subtitle: 'Why Unbounded LLMs Cannot Negotiate Enterprise Contracts',
        description: 'A customer support chatbot was jailbroken into agreeing to sell a $76,000 Chevy Tahoe for $1, proving why business-critical actions require deterministic authorization.'
      },
      {
        name: 'Air Canada Refund Chatbot',
        subtitle: 'Legal Accountability for Hallucinated Agent Policies',
        description: 'A tribunal ruled that Air Canada was liable for bereavement discount promises made by its chatbot, affirming that companies own their agents\' statements.'
      }
    ],
    labTryThisWeek: 'Implement an authorization layer and audit logging middleware on any AI tool call in your current codebase.',
    curatorChecklist: [
      'Audit all tools accessible to your LLMs and revoke unnecessary mutation privileges.',
      'Add strict schema validation (e.g. Zod) to all structured model outputs.',
      'Introduce a manual confirmation step for any action that deletes or modifies user data.',
      'Write a Runbook detailing how to shut down autonomous loops during anomalous behavior.'
    ]
  },
  {
    number: 10,
    part: 'PART IV',
    partTitle: 'PUTTING IT INTO PRACTICE',
    title: 'Free Tools for Engineers',
    subtitle: 'Accessing Harsh’s Expertise & The High-Leverage Open-Source Stack',
    summary: 'A curated inventory of battle-tested open-source libraries, evaluation frameworks, local inference runtimes, and observability platforms that give individual engineers enterprise-grade capabilities.',
    keyTakeaway: 'You do not need expensive enterprise subscriptions to build production-grade agentic architectures.',
    sampleExcerpt: 'From DSPy for declarative prompt optimization to Arize Phoenix for trace telemetry, we profile the foundational open-source tools that every aspiring orchestrator should run on their local workstation.',
    readTime: '17 min read',
    infographicUrl: '/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_15_PM-1_9c345933.png',
    infographicFallback: '/public/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_15_PM-1_9c345933.png',
    keyConcepts: [
      'Local Runtimes: Running open weights via Ollama and vLLM for zero-cost experimentation.',
      'Declarative Optimization: Replacing fragile prompts with DSPy algorithmic tuning.',
      'Open Observability: Deploying Arize Phoenix and OpenTelemetry for agent tracing.',
      'Benchmarking Suites: Automated evaluation using Ragas, DeepEval, and pytest fixtures.'
    ],
    whatIsChanging: [
      'Developers shift from vendor lock-in to open, portable model architectures.',
      'Local inference allows rapid iteration without API costs or data exfiltration worries.',
      'Open-source evaluation frameworks become the default standard for quality assurance.'
    ],
    caseStudies: [
      {
        name: 'DSPy (Stanford NLP)',
        subtitle: 'Compiling Prompts Declaratively Like Neural Network Weights',
        description: 'How Stanford researchers transformed prompt engineering into programmatic optimization, boosting accuracy while slashing manual tweaking.'
      },
      {
        name: 'Ollama & Llama 3',
        subtitle: 'Democratizing Local Enterprise-Grade Inference',
        description: 'Enabling software developers worldwide to run quantized 8B and 70B models locally for private testing, offline workflows, and agent execution.'
      }
    ],
    labTryThisWeek: 'Spin up Ollama on your local machine, run a small model, and instrument its output with an open-source evaluation framework.',
    curatorChecklist: [
      'Audit your current SaaS subscriptions and identify where open-source tools can substitute.',
      'Clone and test an open eval harness (like Ragas or DeepEval) on your project data.',
      'Set up a local development environment for offline AI prototyping.',
      'Contribute an issue report or small pull request to an open-source AI tooling project.'
    ]
  },
  {
    number: 11,
    part: 'PART IV',
    partTitle: 'PUTTING IT INTO PRACTICE',
    title: 'Starting Out: Guide for Students & Early-Career Engineers',
    subtitle: '3 Projects Not 10, Proof of Work & High-Conversion Cold Outreach',
    summary: 'A tactical handbook for students and early-career developers. Why building 3 deeply evaluated, production-grade systems beats 10 shallow tutorial clones. How to write cold outreach messages that senior engineers actually answer.',
    keyTakeaway: 'Transformation does not happen by reading; it happens by leaving evidence of new capability across 30, 60, and 90-day sprints.',
    sampleExcerpt: 'In Days 1–30, audit your time spent on syntax versus system design. In Days 31–60, deploy an agent workflow with deterministic evaluation. In Days 61–90, publish an authoritative architectural teardown. Build evidence.',
    readTime: '28 min read',
    infographicUrl: '/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_15_PM-2_f273f746.png',
    infographicFallback: '/public/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_15_PM-2_f273f746.png',
    keyConcepts: [
      '3 Projects Not 10: Depth, unit testing, telemetry, and trade-off docs over shallow clones.',
      'Inspectable Proof of Work: Live URLs, architecture diagrams, and post-mortems.',
      'High-Conversion Outreach: Providing value and asking specific technical questions.',
      'From Junior Coder to Junior Curator: Demonstrating systems thinking in first-round screens.'
    ],
    whatIsChanging: [
      'Resume screeners discard standard to-do apps, weather apps, and generic chatbot clones.',
      'Hiring managers look for candidates who understand failure modes, evals, and system trade-offs.',
      'Proactive public synthesis of technical topics gets you hired before applying.'
    ],
    caseStudies: [
      {
        name: 'The 3-Project Portfolio Triumph',
        subtitle: 'How an Undergraduate Bypassed LeetCode Screens',
        description: 'A student built a distributed RAG system with automated evals and published an in-depth benchmark report, securing multiple offers without traditional algorithm grinds.'
      },
      {
        name: 'The Specific Inquiry Outreach Method',
        subtitle: 'Why Generic "Can I Pick Your Brain?" Fails Every Time',
        description: 'Analyzing cold emails sent to senior staff engineers: those pointing out specific architectural quirks in open repos had an 80%+ response rate.'
      }
    ],
    labTryThisWeek: 'Take one existing portfolio project, remove generic boilerplate, and add an automated evaluation suite with a documented architectural trade-off section.',
    curatorChecklist: [
      'Archive or remove shallow tutorial projects from your GitHub profile.',
      'Rewrite your primary project\'s README to focus on architecture, latency, and failure modes.',
      'Draft a personalized outreach message to an engineer whose work you admire.',
      'Set up an RSS or newsletter feed to track frontier research in your target field.'
    ]
  }
];

export const SPECIAL_SECTIONS: SpecialInfographicSection[] = [
  {
    id: 'intro',
    badge: 'ORIENTATION',
    title: 'From Creator to Curator: Build Your Authority and Lead the AI Agent Revolution',
    subtitle: 'The Core Premise, Why This Book Matters, and How to Navigate the Journey',
    infographicUrl: '/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_04_PM-1_cab3095f.png',
    infographicFallback: '/public/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_04_PM-1_cab3095f.png',
    summary: 'The comprehensive orientation to the book. AI makes output faster and cheaper, but human judgment gives the work its enduring value. Outlines the 3-tier reading cadence: Deep Dive, Lab Experiment, and Curator\'s Checklist.',
    keyTakeaway: 'Build stronger evidence of what you know and how you make decisions.',
    actionSteps: [
      {
        period: 'Step 1',
        title: 'Deep Dive (Core Idea)',
        tasks: ['Get a clear, concise explanation of key concepts and why they matter in production.']
      },
      {
        period: 'Step 2',
        title: 'Lab (One Practical Experiment)',
        tasks: ['Try a hands-on exercise to apply the idea in your own immediate technical context.']
      },
      {
        period: 'Step 3',
        title: 'Curator\'s Checklist (Four Actions)',
        tasks: ['Take four focused actions to build momentum and verify your progress.']
      }
    ]
  },
  {
    id: 'five-routes',
    badge: 'SPECIAL SECTION',
    title: 'Five Routes to Broader Impact',
    subtitle: 'Models of Influence, Authority, and Leadership Across the Software Ecosystem',
    infographicUrl: '/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_15_PM-3_2f0faec4.png',
    infographicFallback: '/public/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_15_PM-3_2f0faec4.png',
    summary: 'Profiles five distinct routes through which engineers and technical leaders have transformed the software landscape without being trapped in linear syntax production.',
    keyTakeaway: 'You do not have to fit a single archetype. Choose the route that aligns with your innate strengths: Community, Systems Communication, Social Impact, Research, or Applied Democratization.',
    featuredPeople: [
      {
        name: 'Shawn Wang (@swyx)',
        role: 'Founder & Ecosystem Curator',
        contribution: 'Pioneered the "Learn in Public" movement and catalyzed the global AI Engineer movement, demonstrating how ecosystem curation creates immense leverage.'
      },
      {
        name: 'Kelsey Hightower',
        role: 'Distinguished Engineer & Systems Communicator',
        contribution: 'Mastered the art of explaining complex distributed systems (Kubernetes) in human terms, proving that empathy and clear communication are elite technical virtues.'
      },
      {
        name: 'Reshma Saujani',
        role: 'Founder, Girls Who Code & Marshall Plan for Moms',
        contribution: 'Transformed the demographics of computer science education, exemplifying how technical authority can be directed toward institutional and systemic change.'
      },
      {
        name: 'Dr. Fei-Fei Li',
        role: 'Co-Director, Stanford HAI & AI Pioneer',
        contribution: 'Created ImageNet which catalyzed modern deep learning, and now champions human-centered AI, ethical governance, and scientific rigor.'
      },
      {
        name: 'Jeremy Howard',
        role: 'Co-Founder, fast.ai & Answer.ai',
        contribution: 'Democratized deep learning worldwide by teaching top-down practical coding, proving that elite techniques should be accessible to all builders.'
      }
    ]
  },
  {
    id: 'action-plan',
    badge: 'ACTION BLUEPRINT',
    title: 'Your 30 / 60 / 90 Day Career Transition Plan',
    subtitle: 'From Synthesizer to Strategic Curator: A Structured Quarterly Execution Roadmap',
    infographicUrl: '/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_16_PM-4_1a969073.png',
    infographicFallback: '/public/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_16_PM-4_1a969073.png',
    summary: 'A quarter-long sprint plan that transitions your engineering identity from execution commodity to trusted system curator. Broken into three 30-day phases with concrete deliverables.',
    keyTakeaway: 'Strategic career transition is not an epiphany; it is an inspectable trail of artifacts produced over 90 days.',
    actionSteps: [
      {
        period: 'Days 1–30',
        title: 'Phase I: The Audit & Cognitive Shift',
        tasks: [
          'Audit your weekly engineering time: separate syntax implementation from system design.',
          'Identify 3 repetitive tasks to delegate to AI agent workflows.',
          'Adopt Prompt Empathy: structure context windows and prompt boundaries.',
          'Set up your first automated evaluation harness for agent outputs.'
        ]
      },
      {
        period: 'Days 31–60',
        title: 'Phase II: Architectural Prototyping & Governance',
        tasks: [
          'Build an agentic microservice with strict schema validation and permissions sandboxing.',
          'Practice Agentic Diplomacy: define escalation gates for consequential system mutations.',
          'Draft an internal architectural decision record (ADR) on managing non-deterministic risks.',
          'Share your findings with teammates and run an internal lunch-and-learn.'
        ]
      },
      {
        period: 'Days 61–90',
        title: 'Phase III: Public Authority & Systems Orchestration',
        tasks: [
          'Publish a public technical post-mortem or teardown of an agent failure mode.',
          'Package a reusable utility or evaluation tool into an open-source repository.',
          'Engage with your technical micro-community and give feedback on others\' designs.',
          'Day 90 Check: Measure your leverage, time saved, and organizational trust elevation.'
        ]
      }
    ]
  },
  {
    id: 'conclusion',
    badge: 'SYNTHESIS',
    title: 'Conclusion: The Future Is Now',
    subtitle: 'How to Become an Engineer Who Leads the Way in the Age of Intelligence',
    infographicUrl: '/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_16_PM-5_e1b7a695.png',
    infographicFallback: '/public/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_16_PM-5_e1b7a695.png',
    summary: 'The culminating thesis of Beyond AI Engineering. As machines handle routine syntax generation, the ultimate differentiator remains human judgment, taste, moral clarity, and systems stewardship.',
    keyTakeaway: 'The future of software is not machines replacing humans; it is curators orchestrating intelligence to solve humanity\'s most worthwhile problems.',
    actionSteps: [
      {
        period: 'Core Law 1',
        title: 'Retain Accountability',
        tasks: ['Never delegate the ethical or business outcome of a system to a probabilistic model.']
      },
      {
        period: 'Core Law 2',
        title: 'Elevate Your Altitude',
        tasks: ['Continually step back from the code to interrogate the system, the users, and the incentives.']
      },
      {
        period: 'Core Law 3',
        title: 'Build in Public',
        tasks: ['Leave an inspectable digital paper trail of architectural decisions and honest post-mortems.']
      }
    ]
  }
];

export const ALL_INFOGRAPHICS = [
  {
    id: 'infographic-intro',
    title: 'Introduction: From Creator to Curator',
    subtitle: 'Build Your Authority and Lead the AI Agent Revolution',
    category: 'Foundations',
    chapterNumber: 0,
    imageUrl: '/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_04_PM-1_cab3095f.png',
    fallbackUrl: '/public/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_04_PM-1_cab3095f.png',
    description: 'Why judgment matters more than syntax, the C.A.O. framework, and how to use the Deep Dive, Lab, and Curator\'s Checklist.'
  },
  {
    id: 'infographic-ch1',
    title: 'Chapter 1: Welcome to the New Age of Engineering',
    subtitle: 'Human Judgment × AI Capabilities = Bigger Impact',
    category: 'Part I: The Shift',
    chapterNumber: 1,
    imageUrl: '/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_04_PM-2_73d3bcaa.png',
    fallbackUrl: '/public/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_04_PM-2_73d3bcaa.png',
    description: 'System Curator, Prompt Empathy, Agentic Diplomacy, Human API, Simon Willison, and the Knight Capital case study.'
  },
  {
    id: 'infographic-ch2',
    title: 'Chapter 2: Beyond Code: The Engineer of the Future',
    subtitle: 'From HOW to WHAT: Choose a Worthwhile Problem',
    category: 'Part I: The Shift',
    chapterNumber: 2,
    imageUrl: '/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_05_PM-3_0750658f.png',
    fallbackUrl: '/public/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_05_PM-3_0750658f.png',
    description: 'AI Product Sense, Probabilistic Thinking, Systems Thinking, Soft Skills, swyx case study, and Zillow Offers breakdown.'
  },
  {
    id: 'infographic-ch3',
    title: 'Chapter 3: Reimagining the Engineer',
    subtitle: 'The Creator–Architect–Orchestrator Triad',
    category: 'Part I: The Shift',
    chapterNumber: 3,
    imageUrl: '/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_05_PM-4_ef9211f1.png',
    fallbackUrl: '/public/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_05_PM-4_ef9211f1.png',
    description: 'Leadership, Business Judgment, Ethical Curation, Sepsis prediction model failure, and Twitter algorithmic bias.'
  },
  {
    id: 'infographic-ch4',
    title: 'Chapter 4: Breaking Barriers',
    subtitle: 'Case Studies of Engineers Who Thrived',
    category: 'Part II: The AI-Era Engineer',
    chapterNumber: 4,
    imageUrl: '/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_05_PM-5_dbbc71eb.png',
    fallbackUrl: '/public/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_05_PM-5_dbbc71eb.png',
    description: 'Unlearning legacy habits, Harsh Verma AI cybersecurity at Palo Alto Networks, Healthcare AI triage, and Waymo autonomous vehicles.'
  },
  {
    id: 'infographic-ch5',
    title: 'Chapter 5: Mastering AI Workflows',
    subtitle: 'Prompt Empathy & The AI System Lifecycle',
    category: 'Part II: The AI-Era Engineer',
    chapterNumber: 5,
    imageUrl: '/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_06_PM-6_eb2b1261.png',
    fallbackUrl: '/public/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_06_PM-6_eb2b1261.png',
    description: 'The complete lifecycle: Data → Model → Eval → Deploy → Monitor → Feedback with Human Oversight; Duolingo AI curriculum.'
  },
  {
    id: 'infographic-ch6',
    title: 'Chapter 6: The Art of Personal Branding for Engineers',
    subtitle: 'Four Connected Ideas for Technical Authority',
    category: 'Part II: The AI-Era Engineer',
    chapterNumber: 6,
    imageUrl: '/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_06_PM-7_54b9a7c1.png',
    fallbackUrl: '/public/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_06_PM-7_54b9a7c1.png',
    description: 'Micro-Community, Trust Economy, Digital Paper Trail, Specific Niche, and Ethan Mollick case study.'
  },
  {
    id: 'infographic-ch7',
    title: 'Chapter 7: From Stagnation to Innovation',
    subtitle: 'Career Strategies in the Age of AI',
    category: 'Part III: Career Leverage',
    chapterNumber: 7,
    imageUrl: '/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_07_PM-8_c9db1dc2.png',
    fallbackUrl: '/public/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_07_PM-8_c9db1dc2.png',
    description: 'Transformation path, Anti-LeetCode Manifesto, Alireza Abbaspour, and IBM Watson for Oncology.'
  },
  {
    id: 'infographic-ch8',
    title: 'Chapter 8: Template for Success',
    subtitle: 'The Standout Formula for AI Engineers',
    category: 'Part III: Career Leverage',
    chapterNumber: 8,
    imageUrl: '/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_07_PM-9_aa999379.png',
    fallbackUrl: '/public/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_07_PM-9_aa999379.png',
    description: 'Niche + Public Body of Work + Micro-Community, Rowan Cheung (The Rundown AI), and the Content Flywheel.'
  },
  {
    id: 'infographic-ch9',
    title: 'Chapter 9: The Do’s and Don’ts',
    subtitle: 'Safe Engineering Practice in the AI Era',
    category: 'Part III: Career Leverage',
    chapterNumber: 9,
    imageUrl: '/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_08_PM-10_e9c069eb.png',
    fallbackUrl: '/public/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_08_PM-10_e9c069eb.png',
    description: 'Safe practice, bounded permissions, emergency kill switches, anti-cargo-cult habits, and enterprise safeguards.'
  },
  {
    id: 'infographic-ch10',
    title: 'Chapter 10: Free Tools for Engineers',
    subtitle: 'Accessing Harsh’s Expertise & Open-Source Stack',
    category: 'Part IV: Putting It into Practice',
    chapterNumber: 10,
    imageUrl: '/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_15_PM-1_9c345933.png',
    fallbackUrl: '/public/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_15_PM-1_9c345933.png',
    description: 'Starter Toolkit: DSPy, Arize Phoenix, Ollama, Hugging Face, LangSmith, and automated evaluation harnesses.'
  },
  {
    id: 'infographic-ch11',
    title: 'Chapter 11: Starting Out: Guide for Students',
    subtitle: '3 Projects Not 10 & High-Conversion Cold Outreach',
    category: 'Part IV: Putting It into Practice',
    chapterNumber: 11,
    imageUrl: '/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_15_PM-2_f273f746.png',
    fallbackUrl: '/public/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_15_PM-2_f273f746.png',
    description: 'Focusing on 3 production-grade evaluated projects, inspectable proof of work, and reaching-out email templates.'
  },
  {
    id: 'infographic-routes',
    title: 'Special Section: Five Routes to Broader Impact',
    subtitle: 'Models of Influence Across the Software Ecosystem',
    category: 'Broader Impact',
    chapterNumber: 12,
    imageUrl: '/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_15_PM-3_2f0faec4.png',
    fallbackUrl: '/public/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_15_PM-3_2f0faec4.png',
    description: 'Profiles of Shawn Wang (@swyx), Kelsey Hightower, Reshma Saujani, Dr. Fei-Fei Li, and Jeremy Howard.'
  },
  {
    id: 'infographic-plan',
    title: 'Action Blueprint: Your 30 / 60 / 90 Day Plan',
    subtitle: 'From Synthesizer to Strategic Curator',
    category: 'Action Plan',
    chapterNumber: 13,
    imageUrl: '/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_16_PM-4_1a969073.png',
    fallbackUrl: '/public/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_16_PM-4_1a969073.png',
    description: 'The step-by-step quarterly roadmap: Days 1–30 (Audit & Shift), Days 31–60 (Prototype), Days 61–90 (Publish & Lead).'
  },
  {
    id: 'infographic-conclusion',
    title: 'Conclusion: The Future Is Now',
    subtitle: 'How to Become an Engineer Who Leads the Way',
    category: 'Synthesis',
    chapterNumber: 14,
    imageUrl: '/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_16_PM-5_e1b7a695.png',
    fallbackUrl: '/public/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_16_PM-5_e1b7a695.png',
    description: 'Final synthesis: why machines will never replace human judgment, taste, moral clarity, and system stewardship.'
  }
];

export const ENDORSEMENTS = [
  {
    quote: 'Harsh Verma has written the definitive guide for software engineers grappling with the generative AI wave. Beyond AI Engineering is not another rehash of prompt templates; it is a profound rethinking of what it means to be an engineer.',
    name: 'Dr. Elena Rostova',
    role: 'VP of AI Engineering',
    organization: 'Global Distributed Cloud Institute',
  },
  {
    quote: 'The Creator-Architect-Orchestrator framework is the exact mental model our team needed. If you want to remain indispensable in the next ten years, read this book immediately.',
    name: 'Marcus Vance',
    role: 'Chief Technology Officer',
    organization: 'Aether Systems & IEEE Fellow',
  },
  {
    quote: 'Finally, an author who speaks directly to the reality of enterprise cybersecurity, autonomous agent boundaries, and distributed systems. Harsh brings battle-tested credibility to every page.',
    name: 'Priya Sundaram',
    role: 'Head of Autonomous Systems Research',
    organization: 'Apex Frontier Labs',
  },
  {
    quote: 'For students and early-career developers wondering if software engineering is dead: this book will give you your purpose and your competitive advantage.',
    name: 'Prof. David K. Chen',
    role: 'Dean of Computer Science',
    organization: 'Polytechnic AI Initiative',
  },
];
