import { CAOStageId } from '../types';

export type AudienceJourneySlug =
  | 'working-engineers'
  | 'ai-ml-professionals'
  | 'technical-leaders'
  | 'students';

export interface JourneyStep {
  stepNumber: string;
  phaseLabel: string;
  title: string;
  description: string;
  actionLabel: string;
  targetPath: string;
}

export interface AudienceJourneyDefinition {
  slug: AudienceJourneySlug;
  shortLabel: string;
  kicker: string;
  headline: string;
  quote: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  coreTensionTitle: string;
  coreTensions: { symptom: string; reframe: string }[];
  recommendedSequence: JourneyStep[];
  primaryStageFocus: CAOStageId;
  checklistTitle: string;
  checklistSubtitle: string;
  checklistItems: string[];
  highlightedResources: { slug: string; title: string; why: string }[];
  outreachTemplate?: {
    title: string;
    subtitle: string;
    content: string;
  };
  sourceId: string;
}

export const AUDIENCE_JOURNEY_ORDER: AudienceJourneySlug[] = [
  'working-engineers',
  'ai-ml-professionals',
  'technical-leaders',
  'students',
];

export const AUDIENCE_JOURNEYS: Record<AudienceJourneySlug, AudienceJourneyDefinition> = {
  'working-engineers': {
    slug: 'working-engineers',
    shortLabel: 'Working Engineers',
    kicker: 'Journey 01 · Mid-to-Senior Software Engineers',
    headline: 'From Feature Ticket Output to Durable Systems Authority',
    quote: 'When syntax supply goes infinite, trusted verification and problem framing become scarce.',
    description:
      'Designed for frontend, backend, full-stack, and platform engineers whose daily workflow already uses AI coding tools—and who want clear Staff+ systems judgment before review fatigue or role commoditization sets in.',
    seoTitle: 'Journey for Working Software Engineers | Beyond AI Engineering',
    seoDescription:
      'Practical career operating pathway for mid-to-senior software engineers moving from code velocity to architectural boundaries, verification, and agent oversight.',
    coreTensionTitle: 'Three Shifts Reshaping Mid-to-Senior Engineering',
    coreTensions: [
      {
        symptom: 'PR volume climbs 2x while code review fatigue and silent regressions multiply.',
        reframe: 'Shift time from generating lines of syntax to writing deterministic invariants and adversarial edge-case tests.',
      },
      {
        symptom: 'Resumes heavy on framework lists blur together in Staff-level evaluations.',
        reframe: 'Build a Digital Paper Trail of Architecture Decision Records (ADRs) and War Story post-mortems.',
      },
      {
        symptom: 'Tickets arrive ambiguous while business stakeholders ask for "AI features" reflexively.',
        reframe: 'Apply How → What framing early: decide what deterministic core deserves to exist before prompting.',
      },
    ],
    recommendedSequence: [
      {
        stepNumber: '01',
        phaseLabel: 'Diagnose',
        title: 'Run the 15-Item C.A.O. Self-Assessment',
        description:
          'Measure where your weekly leverage sits across Creator, Architect, and Orchestrator behaviors.',
        actionLabel: 'Open C.A.O. Assessment',
        targetPath: '/assessment',
      },
      {
        stepNumber: '02',
        phaseLabel: 'Master Design Mode',
        title: 'Read the Architect Stage Deep Dive',
        description:
          'Study boundary modeling, failure budgets, AI Product Sense, and how AI shifts system design work.',
        actionLabel: 'Read /frameworks/architect',
        targetPath: '/frameworks/architect',
      },
      {
        stepNumber: '03',
        phaseLabel: 'Inspect Frame Shifts',
        title: 'Explore From HOW to WHAT & Trust Economy',
        description:
          'Examine concrete before/after design questions and verify your current judgment defensibility.',
        actionLabel: 'Explore From HOW to WHAT',
        targetPath: '/frameworks/how-to-what',
      },
      {
        stepNumber: '04',
        phaseLabel: 'Execute',
        title: 'Build Your Career Map & War Story',
        description:
          'Document two high-stakes boundary wins and commit a 90-day transition sprint.',
        actionLabel: 'Open C.A.O. Career Map',
        targetPath: '/resources/cao-career-map',
      },
    ],
    primaryStageFocus: 'architect',
    checklistTitle: 'Staff-Ready C.A.O. Habits Checklist',
    checklistSubtitle: 'Track the weekly behaviors that separate trusted systems curators from syntax typists:',
    checklistItems: [
      'Audit my last 3 PRs for hidden edge-case risks introduced by generated code.',
      'Write 1 Architecture Decision Record explaining rejected alternatives and failure limits.',
      'Isolate deterministic DB/state cores cleanly from probabilistic LLM or heuristic steps.',
      'Convert one production save into an anonymized War Story Narrative.',
      'Run a 7-day measurable AI Workflow Experiment tracking defect escape rate alongside speed.',
    ],
    highlightedResources: [
      {
        slug: 'cao-career-map',
        title: 'C.A.O. Career Map',
        why: 'Audit sprint hours across Creator, Architect, and Orchestrator buckets.',
      },
      {
        slug: 'professional-positioning',
        title: 'Professional Positioning',
        why: 'Rewrite your internal & external bio around reliability and system boundaries.',
      },
      {
        slug: 'war-story-narrative',
        title: 'War Story Narrative',
        why: 'Package hard production incident saves into credible proof of judgment.',
      },
    ],
    sourceId: 'trust-economy-thesis',
  },

  'ai-ml-professionals': {
    slug: 'ai-ml-professionals',
    shortLabel: 'AI / ML Professionals',
    kicker: 'Journey 02 · Applied ML, LLM & Agent Systems Builders',
    headline: 'Bridging Notebook Prototypes to Governed, Reliable Production AI',
    quote: 'Model fluency opens the door; deterministic evals, sandboxing, and token economics keep systems alive in production.',
    description:
      'Built for ML engineers, applied AI builders, and RAG/agent architects moving past prompt tinkering into versioned evaluation harnesses, cost/latency trade-offs, and bounded multi-agent execution.',
    seoTitle: 'Journey for AI & ML Professionals | Beyond AI Engineering',
    seoDescription:
      'Applied pathway for AI/ML engineers focusing on evaluation harnesses, Agentic Diplomacy, Prompt Empathy, semantic drift control, and production liability boundaries.',
    coreTensionTitle: 'Three Failure Patterns Facing Applied AI Engineers',
    coreTensions: [
      {
        symptom: 'Demos shine on 5 happy-path inputs, then drift unpredictably after model snapshots change.',
        reframe: 'Institutionalize golden eval datasets, schema validators, and release-gating drift thresholds.',
      },
      {
        symptom: 'Every workflow reaches for multi-agent autonomy where a hybrid rules + deterministic step wins.',
        reframe: 'Practice AI Product Sense: price token economics, p99 latency SLOs, and error reversibility upfront.',
      },
      {
        symptom: 'Connected tools and MCP integrations inherit broad credentials susceptible to prompt injection.',
        reframe: 'Enforce least-privilege Agentic Diplomacy with read/write separation and signed escalation gates.',
      },
    ],
    recommendedSequence: [
      {
        stepNumber: '01',
        phaseLabel: 'Baseline',
        title: 'Benchmark Your C.A.O. Operating Split',
        description:
          'Check whether your daily hours skew heavily toward Creator prompt iteration vs. Architect/Orchestrator rigor.',
        actionLabel: 'Open C.A.O. Assessment',
        targetPath: '/assessment',
      },
      {
        stepNumber: '02',
        phaseLabel: 'Deep Dive',
        title: 'Read The Human API & Agentic Diplomacy',
        description:
          'Study hourglass interface contracts separating human intent from sandboxed tool execution.',
        actionLabel: 'Open The Human API',
        targetPath: '/frameworks/human-api',
      },
      {
        stepNumber: '03',
        phaseLabel: 'Experiment',
        title: 'Structure a Falsifiable Workflow Experiment',
        description:
          'Define deterministic CI gates and abort criteria before rolling model changes to users.',
        actionLabel: 'Open AI Workflow Experiment',
        targetPath: '/resources/ai-workflow-experiment',
      },
      {
        stepNumber: '04',
        phaseLabel: 'Audit',
        title: 'Run the Ethical AI & Liability Audit',
        description:
          'Stress-test tenant PII isolation, prompt-injection boundaries, and emergency kill switches.',
        actionLabel: 'Open Ethical AI Audit',
        targetPath: '/resources/ethical-ai-audit',
      },
    ],
    primaryStageFocus: 'orchestrator',
    checklistTitle: 'Production AI Reliability & Sandbox Checklist',
    checklistSubtitle: 'Verify every customer-facing agent or LLM pipeline against these boundaries:',
    checklistItems: [
      'Typed output schema assertion wraps every foundation model completion.',
      'Golden evaluation set (>= 50 adversarial & edge cases) runs automatically prior to model bumps.',
      'Untrusted external text is strictly isolated from privileged tool execution instructions.',
      'Read-only replicas or dry-run previews guard any state-mutating database action.',
      'P95 latency budget, fallback route, and per-run unit cost cap are documented in an ADR.',
    ],
    highlightedResources: [
      {
        slug: 'ai-workflow-experiment',
        title: 'AI Workflow Experiment',
        why: 'Measure latency, quality floors, and rollback conditions systematically.',
      },
      {
        slug: 'ethical-ai-audit',
        title: 'Ethical AI Audit',
        why: 'Harden privacy tokenization, blast radius limits, and escalation rules.',
      },
      {
        slug: 'digital-paper-trail',
        title: 'Digital Paper Trail',
        why: 'Publish reproducible benchmarks and architectural notes others trust.',
      },
    ],
    sourceId: 'scenario-fintech-migration',
  },

  'technical-leaders': {
    slug: 'technical-leaders',
    shortLabel: 'Technical Leaders',
    kicker: 'Journey 03 · Staff+ Leads, Engineering Managers, Directors & CTOs',
    headline: 'Governing Autonomous Velocity Without Losing Trust or Judgment',
    quote: 'Organizations remain legally and reputationally liable for every action taken by automated systems they deploy.',
    description:
      'For technical executives, Staff+ architects, and engineering managers responsible for team upskilling, coding-agent governance, incident accountability, and separating hype-driven agent sprawl from durable product moats.',
    seoTitle: 'Journey for Technical Leaders & CTOs | Beyond AI Engineering',
    seoDescription:
      'Leadership operating guide covering AI governance matrices, ethical liability stewardship, team upskilling ladders, and C.A.O. organizational adoption.',
    coreTensionTitle: 'Three Leadership Dilemmas in the Agentic Era',
    coreTensions: [
      {
        symptom: 'Mandating AI coding speed inflates lines merged without improving system reliability or customer retention.',
        reframe: 'Shift engineering KPIs from commit volume to defect escape rate, eval coverage, and mean-time-to-diagnose.',
      },
      {
        symptom: 'Senior engineers advance via architectural mentorship while junior hiring pipelines shrink arbitrarily.',
        reframe: 'Redesign onboarding ladders around spec literacy, testing rigor, and bounded prototyping.',
      },
      {
        symptom: 'Ad-hoc external AI integrations bypass AppSec, data provenance, and legal liability sign-off.',
        reframe: 'Institute an explicit Agent Authority Matrix classifying Autonomous, Co-Signed, and Human-Only risk tiers.',
      },
    ],
    recommendedSequence: [
      {
        stepNumber: '01',
        phaseLabel: 'Governance Mode',
        title: 'Explore the Orchestrator Stage Playbook',
        description:
          'Review legal liability precedents, Agentic Diplomacy policies, and cross-functional trust practices.',
        actionLabel: 'Read /frameworks/orchestrator',
        targetPath: '/frameworks/orchestrator',
      },
      {
        stepNumber: '02',
        phaseLabel: 'Ethical Curation',
        title: 'Run a 5-Point Ethical Curation Check',
        description:
          'Assess data provenance, human override latency, and named accountability across active AI launches.',
        actionLabel: 'Explore Ethical Curation',
        targetPath: '/frameworks/ethical-curation',
      },
      {
        stepNumber: '03',
        phaseLabel: 'Team Rollout',
        title: 'Review Organizational Reading & Workshop Options',
        description:
          'Explore bulk edition adoption, executive briefings, and C.A.O. diagnostic calibration for engineering orgs.',
        actionLabel: 'Visit /organizations',
        targetPath: '/organizations',
      },
      {
        stepNumber: '04',
        phaseLabel: 'Peer Stewardship',
        title: 'Map Your Executive Micro-Community',
        description:
          'Connect legal, security, and peer engineering leaders around shared governance benchmarks.',
        actionLabel: 'Open Micro-Community Map',
        targetPath: '/resources/micro-community-map',
      },
    ],
    primaryStageFocus: 'orchestrator',
    checklistTitle: 'Organizational AI Governance Checklist',
    checklistSubtitle: 'Audit your engineering organization’s readiness across accountability, mentorship, and safety:',
    checklistItems: [
      'Named technical & policy owners exist for every customer-facing AI system.',
      'Engineering review norms require invariant & rollback thinking alongside AI-assisted diffs.',
      'Junior/early-career mentorship focuses on debugging, eval authoring, and system boundaries.',
      'PII masking, model retention agreements, and prompt-injection tests precede production launch.',
      'Team runs quarterly blameless post-mortems turning automation near-misses into shared paper trails.',
    ],
    highlightedResources: [
      {
        slug: 'ethical-ai-audit',
        title: 'Ethical AI Audit',
        why: 'Create pre-launch safety and liability sign-off records across squads.',
      },
      {
        slug: 'micro-community-map',
        title: 'Micro-Community Map',
        why: 'Structure cross-functional alignment across AppSec, Legal, Product, and Staff.',
      },
      {
        slug: '30-60-90-plan',
        title: '30/60/90-Day Plan',
        why: 'Sequence team upskilling and governance rollouts over a quarter.',
      },
    ],
    sourceId: 'air-canada-tribunal-2024',
  },

  students: {
    slug: 'students',
    shortLabel: 'Students & New Grads',
    kicker: 'Journey 04 · CS Students & Early-Career Engineers',
    headline: 'Starting Your Career While the Profession Reinvented Itself',
    quote: 'Recruiters are exhausted by 20 cloned tutorial apps. Build 3 deep proofs of capability instead.',
    description:
      'Forget defeatist noise claiming software engineering is over. Eliminating routine boilerplate lets motivated students build deep machine fundamentals, reproducible evaluation judgment, and inspectable public proof from day one.',
    seoTitle: 'Journey for Students & Early-Career Engineers | Beyond AI Engineering',
    seoDescription:
      'Actionable roadmap for CS students and new graduates: the 3 Projects Not 20 rule, first-principles CS checklist, outreach templates, and 30/60/90-day transition.',
    coreTensionTitle: 'Three Proof Pillars Replacing Cloned Tutorial Portfolios',
    coreTensions: [
      {
        symptom: 'Submitting 20 AI-generated CRUD clones signals replaceable prompting rather than engineering judgment.',
        reframe: 'Ship Project 01 (Technical Rigor): low-level systems, concurrency, or profiling benchmark proving machine literacy.',
      },
      {
        symptom: 'Calling an LLM API once in a hackathon leaves cost, failure modes, and latency unexamined.',
        reframe: 'Ship Project 02 (Judgment Evidence): publish a small reproducible benchmark & ADR comparing failure rates cleanly.',
      },
      {
        symptom: 'Cold DMs asking "Can I pick your brain?" go unanswered in crowded engineering inboxes.',
        reframe: 'Ship Project 03 (Governance Evidence) + lead outreach with one concrete technical question grounded in your ADR.',
      },
    ],
    recommendedSequence: [
      {
        stepNumber: '01',
        phaseLabel: 'Baseline',
        title: 'Benchmark Your Starting C.A.O. Balance',
        description:
          'Establish your initial baseline across execution, framing, and governance habits.',
        actionLabel: 'Take C.A.O. Assessment',
        targetPath: '/assessment',
      },
      {
        stepNumber: '02',
        phaseLabel: 'Craft Foundation',
        title: 'Read the Creator Stage Deep Dive',
        description:
          'Learn how strong builders pair coding assistants with adversarial unit tests and debugging instinct.',
        actionLabel: 'Read /frameworks/creator',
        targetPath: '/frameworks/creator',
      },
      {
        stepNumber: '03',
        phaseLabel: 'First Audit',
        title: 'Build Your Human Advantage Inventory',
        description:
          'Separate commodity syntax skills from deeper CS invariants and domain instincts to invest in next.',
        actionLabel: 'Open Human Advantage Inventory',
        targetPath: '/resources/human-advantage-inventory',
      },
      {
        stepNumber: '04',
        phaseLabel: 'Execute Sprint',
        title: 'Draft Your First 30/60/90-Day Transition Plan',
        description:
          'Turn coursework or side projects into three inspectable proofs of technical rigor, judgment, and governance.',
        actionLabel: 'Open 30/60/90-Day Plan',
        targetPath: '/resources/30-60-90-plan',
      },
    ],
    primaryStageFocus: 'creator',
    checklistTitle: 'CS Fundamentals You Still Need',
    checklistSubtitle: 'You cannot inspect AI-generated code unless you understand the machine underneath:',
    checklistItems: [
      'Memory layout, concurrency primitives & deadlock invariants',
      'HTTP/TCP latency budgets, retries & idempotency keys',
      'Database indexing, transactions & isolation levels',
      'Evaluation harnesses: golden datasets, regression & drift assertions',
      'Least-privilege IAM & zero-trust tool execution boundaries',
    ],
    highlightedResources: [
      {
        slug: 'human-advantage-inventory',
        title: 'Human Advantage Inventory',
        why: 'Focus study time on durable systems concepts rather than memorizing syntax.',
      },
      {
        slug: 'digital-paper-trail',
        title: 'Digital Paper Trail',
        why: 'Structure 3 deep project write-ups with concise ADRs and reproducible tests.',
      },
      {
        slug: '30-60-90-plan',
        title: '30/60/90-Day Plan',
        why: 'Commit weekly milestones turning coursework into verifiable portfolio artifacts.',
      },
    ],
    outreachTemplate: {
      title: 'Specific Inquiry Cold Outreach Template',
      subtitle:
        'Senior engineers ignore vague "Can I pick your brain?" requests. Lead with verifiable work and one crisp question:',
      content: `Subject: Question on [Specific System / Repo File] — latency & failure trade-off

Hi [Engineer Name],

I reviewed your write-up on [specific technical artifact/talk] and noticed how you handled [specific invariant or trade-off].

I am currently building a reproducible benchmark evaluating [concise technical problem], and documented the trade-offs in a short Architecture Decision Record here: [link].

Quick question: when [edge case X] occurs under load, did you isolate the failure via [Approach A] or [Approach B]?

Two lines of perspective would be hugely helpful—no worries at all if you're slammed.

Best,
[Your Name]`,
    },
    sourceId: 'scenario-creator-pr-velocity',
  },
};
