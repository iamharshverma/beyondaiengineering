import { CAOStageId } from '../types';

export interface CAOStageScenario {
  title: string;
  situation: string;
  stageMove: string;
  outcome: string;
}

export interface CAOStageExercise {
  title: string;
  duration: string;
  prompt: string;
  deliverable: string;
}

export interface CAOStageResourceLink {
  slug: string;
  title: string;
  whyUseIt: string;
}

export interface CAOStageChapterRef {
  chapter: number;
  title: string;
  relevance: string;
}

export interface CAOStageDefinition {
  id: CAOStageId;
  stageNumber: '01' | '02' | '03';
  shortLabel: string;
  verb: string;
  title: string;
  headline: string;
  subtitle: string;
  coreQuestion: string;
  seoTitle: string;
  seoDescription: string;
  readTime: string;
  definition: string;
  whyItMatters: string[];
  coreResponsibilities: { title: string; detail: string }[];
  essentialCompetencies: { name: string; descriptor: string }[];
  practicalScenarios: CAOStageScenario[];
  howAiChangesTheWork: {
    beforeAi: string;
    withAi: string;
    enduringHumanEdge: string;
  }[];
  typicalMistakes: { mistake: string; consequence: string; correction: string }[];
  realisticExample: {
    title: string;
    narrative: string;
    sourceId: string;
  };
  practicalExercises: CAOStageExercise[];
  relatedChapters: CAOStageChapterRef[];
  relatedResources: CAOStageResourceLink[];
  nextStageId: CAOStageId;
  nextStageLabel: string;
  prevStageId?: CAOStageId;
  prevStageLabel?: string;
}

export const CAO_STAGE_ORDER: CAOStageId[] = ['creator', 'architect', 'orchestrator'];

export const CAO_STAGES: Record<CAOStageId, CAOStageDefinition> = {
  creator: {
    id: 'creator',
    stageNumber: '01',
    shortLabel: 'Creator',
    verb: 'Build',
    title: 'The Creator Stage — Technical Execution & Verification Fluency',
    headline: 'Creator: Turning Ambiguity into Tested, Inspectable Reality',
    subtitle:
      'High-speed prototyping, implementation craft, debugging instinct, and test-verified code ownership in an era of cheap syntax.',
    coreQuestion: 'How do we build and verify this cleanly under real runtime constraints?',
    seoTitle: 'Creator Stage (C.A.O. Framework) | Beyond AI Engineering',
    seoDescription:
      'Master the Creator mode in Beyond AI Engineering: rapid prototyping, AI-assisted implementation, deterministic testing, and debugging discipline.',
    readTime: '7 min read',
    definition:
      'The Creator stage is the foundational craft layer of software engineering: translating specifications and hypotheses into working, observable systems. In the pre-AI era, Creator work rewarded manual typing fluency and API recall. In the agentic era, Creator excellence shifts toward rapid hypothesis testing, crisp incremental decomposition, adversarial test authorship, and knowing immediately when generated code violates runtime reality.',
    whyItMatters: [
      'AI coding agents can emit hundreds of lines of plausible syntax in seconds, yet plausibility is not correctness. Without disciplined Creator craft—reading stack traces, spotting subtle race conditions, and profiling memory—teams ship brittle code faster than they can understand it.',
      'Crucially, strong Architect and Orchestrator judgment depends on lived Creator intuition. An engineer who has never debugged a lock contention stall or traced an N+1 query cannot reliably audit agent-proposed designs later.',
    ],
    coreResponsibilities: [
      {
        title: 'Rapid Hypothesis & Prototype Validation',
        detail:
          'Build vertical slices quickly to prove feasibility, measure latency, and uncover hidden integration edge cases before committing architectural polish.',
      },
      {
        title: 'Deterministic Testing & Verification',
        detail:
          'Pair every generated or hand-written module with property tests, edge-case assertions, and regression checks that fail loudly on silent corruption.',
      },
      {
        title: 'Runtime & Performance Literacy',
        detail:
          'Understand memory allocation, network round-trips, database query plans, and dependency costs rather than treating abstractions as free.',
      },
      {
        title: 'Disciplined Diff Hygiene',
        detail:
          'Treat AI-suggested pull requests with higher—not lower—review scrutiny, keeping changes small, bisect-friendly, and free of dead hallucinated helpers.',
      },
    ],
    essentialCompetencies: [
      {
        name: 'First-Principles Debugging',
        descriptor: 'Isolating faults across logs, network traces, state transitions, and reproduce-first harnesses.',
      },
      {
        name: 'Spec-First AI Pairing',
        descriptor: 'Prompting coding assistants with concrete types, invariants, and failing tests before implementation.',
      },
      {
        name: 'Complexity Restraint',
        descriptor: 'Deleting unnecessary generated abstractions in favor of readable, maintainable primitives.',
      },
      {
        name: 'Observability Instrumentation',
        descriptor: 'Embedding structured logs, timing counters, and explicit error propagation as code is written.',
      },
    ],
    practicalScenarios: [
      {
        title: 'Shipping a Rate-Limited Webhook Worker Under Load',
        situation:
          'An AI assistant generates an async worker using an unbounded in-memory queue and retries every non-200 HTTP status indiscriminately.',
        stageMove:
          'As a disciplined Creator, you replace the unbounded array with backpressure bounds, distinguish transient 429/5xx codes from permanent 4xx payloads, and write a deterministic backoff test.',
        outcome:
          'Prevents out-of-memory crashes and duplicate retry storms on day one of production traffic.',
      },
      {
        title: 'Replacing Flaky Mocks with Contract Integration Tests',
        situation:
          'Generated unit tests pass 100% because every database and cache boundary was stubbed out by the assistant.',
        stageMove:
          'You add ephemeral test-container coverage for SQL constraint and transaction isolation behavior before opening the PR.',
        outcome:
          'Catches a broken unique-index migration in CI rather than during peak customer signups.',
      },
    ],
    howAiChangesTheWork: [
      {
        beforeAi: 'Writing boilerplate adapters, CRUD routes, and repetitive test fixtures line by line.',
        withAi: 'Scaffolding working drafts and fixture permutations in minutes from clear type definitions.',
        enduringHumanEdge: 'Authoring crisp invariants, inspecting corner cases, and refusing subtle security regressions.',
      },
      {
        beforeAi: 'Spending hours scanning documentation for obscure library signatures.',
        withAi: 'Synthesizing usage examples interactively inside the editor context.',
        enduringHumanEdge: 'Verifying library version behavior against actual compiled docs and runtime telemetry.',
      },
    ],
    typicalMistakes: [
      {
        mistake: 'Copy-Paste Delegation ("Vibe Merging")',
        consequence: 'Pull requests balloon with unexamined abstractions, subtle resource leaks, and unused imports.',
        correction: 'Never merge a diff you cannot trace line-by-line during an incident at 2:00 AM.',
      },
      {
        mistake: 'Optimizing for Raw Ticket Velocity',
        consequence: 'Teams celebrate closing twice as many tickets while regression bugs and cognitive debt double.',
        correction: 'Track defect escape rate, rollback frequency, and time-to-diagnose alongside cycle time.',
      },
    ],
    realisticExample: {
      title: 'Prototype-to-Verification Workflow Pattern',
      narrative:
        'An early-career backend engineer uses a coding assistant to scaffold an invoice-reconciliation batch job in 20 minutes, then invests the next 90 minutes building a ledger-imbalance fuzzer, idempotency replay checks, and explicit structured failure alerts. The saved syntax time funds higher verification rigor.',
      sourceId: 'scenario-creator-pr-velocity',
    },
    practicalExercises: [
      {
        title: 'Adversarial PR Audit Drill',
        duration: '30 mins',
        prompt:
          'Ask an AI coding assistant to implement a non-trivial webhook parser or state machine, then review the diff strictly for unhandled null paths, injection risks, and missing timeouts.',
        deliverable: 'Document 5 concrete invariants the assistant missed and add unit tests enforcing all 5.',
      },
      {
        title: 'Boilerplate-to-Benchmark Refactor',
        duration: '45 mins',
        prompt:
          'Take a 200-line AI-generated utility module in your repo, remove speculative abstractions, and add latency/memory assertions.',
        deliverable: 'A cleaner, shorter diff accompanied by reproducible benchmark output.',
      },
    ],
    relatedChapters: [
      {
        chapter: 1,
        title: 'Escaping the Tyranny of Syntax',
        relevance: 'Explains why syntax generation dropped toward zero marginal cost and what replaces it.',
      },
      {
        chapter: 3,
        title: 'The Creator · Architect · Orchestrator Triad',
        relevance: 'Establishes the foundational Creator operating mode and how it feeds higher leverage tiers.',
      },
      {
        chapter: 11,
        title: 'Your 30/60/90-Day C.A.O. Transition',
        relevance: 'Shows how individual contributors upgrade weekly verification habits cleanly.',
      },
    ],
    relatedResources: [
      {
        slug: 'human-advantage-inventory',
        title: 'Human Advantage Inventory',
        whyUseIt: 'Audit which daily Creator tasks belong to AI assistance versus irreversible human judgment.',
      },
      {
        slug: 'ai-workflow-experiment',
        title: 'AI Workflow Experiment',
        whyUseIt: 'Design a repeatable 7-day coding experiment measuring quality alongside speed.',
      },
      {
        slug: 'cao-career-map',
        title: 'C.A.O. Career Map',
        whyUseIt: 'Benchmark current Creator strengths against next-tier Architect responsibilities.',
      },
    ],
    nextStageId: 'architect',
    nextStageLabel: '02 · Architect (Design & System Boundaries)',
  },
  architect: {
    id: 'architect',
    stageNumber: '02',
    shortLabel: 'Architect',
    verb: 'Design',
    title: 'The Architect Stage — Problem Definition, Boundaries & Trade-offs',
    headline: 'Architect: Choosing What Deserves to Exist and Where Systems Must Hold',
    subtitle:
      'Systems thinking, data invariants, AI Product Sense, latency and cost budgets, reliability guarantees, and deliberate trade-offs.',
    coreQuestion: 'What system should exist, what must never break, and what trade-offs are we accepting?',
    seoTitle: 'Architect Stage (C.A.O. Framework) | Beyond AI Engineering',
    seoDescription:
      'Master the Architect mode in Beyond AI Engineering: problem framing, failure boundaries, AI Product Sense, evaluation harnesses, and technical trade-offs.',
    readTime: '8 min read',
    definition:
      'The Architect stage is where engineering shifts from "How do we code this ticket?" to "What problem are we actually solving, and what boundaries prevent fragile complexity?" Architects design schemas, blast-radius fences, latency/cost economics, evaluation benchmarks, and explicit Architecture Decision Records (ADRs) so that both human teammates and AI agents operate inside durable invariants.',
    whyItMatters: [
      'When implementation gets ten times faster, bad architectural decisions multiply ten times sooner. Generating five microservices or an unconstrained RAG pipeline that solves the wrong problem only creates expensive maintenance liabilities.',
      'AI Product Sense turns engineers into strategic partners: deciding when deterministic SQL/rules beat probabilistic LLM calls, where non-deterministic outputs require human sign-off, and how system architecture shapes customer trust.',
    ],
    coreResponsibilities: [
      {
        title: 'From HOW to WHAT Framing',
        detail:
          'Challenge ambiguous product requests early to isolate core user outcomes, regulatory constraints, and build-vs-buy leverage before implementation starts.',
      },
      {
        title: 'Boundary & Invariant Design',
        detail:
          'Define strict data contracts, API schemas, permission scopes, idempotency guarantees, and fallback paths for when upstream models degrade.',
      },
      {
        title: 'Evaluation & Cost Economics',
        detail:
          'Architect golden evaluation datasets, latency SLOs, and token-unit economics before rolling generative features into customer workflows.',
      },
      {
        title: 'Architecture Decision Records (ADRs)',
        detail:
          'Write concise, falsifiable design records capturing rejected alternatives, reversibility cost, and failure triggers for future teams.',
      },
    ],
    essentialCompetencies: [
      {
        name: 'Systems Boundary Modeling',
        descriptor: 'Separating deterministic transactional cores from probabilistic model-assisted edges.',
      },
      {
        name: 'AI Product Sense',
        descriptor: 'Knowing when not to use an LLM, and how confidence UX shapes user reliance.',
      },
      {
        name: 'Adversarial Failure Analysis',
        descriptor: 'Pre-mortems across prompt injection, schema drift, cascading retries, and silent data staleness.',
      },
      {
        name: 'Trade-off Communication',
        descriptor: 'Presenting clear cost, latency, security, and maintainability trade-offs to product and executive peers.',
      },
    ],
    practicalScenarios: [
      {
        title: 'Stopping a Premature Autonomous Agent Rewrite',
        situation:
          'Stakeholders ask for an autonomous multi-agent workflow to reconcile enterprise billing exceptions end-to-end.',
        stageMove:
          'As an Architect, you design a two-tier boundary: deterministic SQL ledger checks run first, LLM classification proposes structured drafts only with citations, and settlement writes require explicit human approval.',
        outcome:
          'Cuts model spend by 80%, eliminates silent write corruption, and delivers faster time-to-trust.',
      },
      {
        title: 'Preventing Schema Drift Across Model Upgrades',
        situation:
          'Upstream foundation model updates subtly alter JSON nesting and tone across six dependent internal tools.',
        stageMove:
          'You isolate every model call behind strict typed adapters, schema validators, and a CI golden-eval suite run prior to any model version bump.',
        outcome:
          'Turns volatile prompt dependencies into versioned, testable infrastructure components.',
      },
    ],
    howAiChangesTheWork: [
      {
        beforeAi: 'Months spent wiring infrastructure before validating architectural assumptions with users.',
        withAi: 'Spiking two competing architectural approaches in days to gather empirical latency and failure data.',
        enduringHumanEdge: 'Owning non-functional guarantees—security boundaries, consistency models, and long-term coupling.',
      },
      {
        beforeAi: 'Mostly deterministic state machines with explicit rule branches.',
        withAi: 'Hybrid pipelines blending deterministic invariants with probabilistic reasoning.',
        enduringHumanEdge: 'Deciding which edge decisions can fail gracefully and which states must never be guessed.',
      },
    ],
    typicalMistakes: [
      {
        mistake: 'Treating Models as Drop-In Databases',
        consequence: 'Hallucinations, latency spikes, and opaque failures leak directly into core business logic.',
        correction: 'Keep source-of-truth state deterministic; confine probabilistic inference behind strict schemas and evals.',
      },
      {
        mistake: 'Architecture Diagrams Without Failure Budgets',
        consequence: 'Happy-path boxes look crisp in design reviews while error handling and observability remain undefined.',
        correction: 'Mandate explicit degraded modes, circuit breakers, and rollback paths on every design spec.',
      },
    ],
    realisticExample: {
      title: 'Payment Ledger Agent Boundary Audit',
      narrative:
        'During a fintech ledger migration, the Architect blocks direct autonomous DB writes by migration agents. Instead, agents emit idempotent SQL dry-run plans scored against shadow ledger balances; human finance engineers verify invariance diffs before staged cutover.',
      sourceId: 'scenario-fintech-migration',
    },
    practicalExercises: [
      {
        title: 'Deterministic Core vs. Probabilistic Edge Split',
        duration: '45 mins',
        prompt:
          'Pick an AI-enabled feature on your roadmap and draw an explicit boundary separating state that must be 100% deterministic from steps that may be probabilistic.',
        deliverable: 'A 1-page ADR stating exact schema assertions and fallback behavior when confidence drops.',
      },
      {
        title: 'AI Product Sense Rejection Exercise',
        duration: '30 mins',
        prompt:
          'Identify one workflow in your organization where a non-AI rule engine, caching layer, or UX tweak beats deploying an LLM.',
        deliverable: 'Write a 200-word trade-off note comparing cost, latency, and error modes.',
      },
    ],
    relatedChapters: [
      {
        chapter: 2,
        title: 'The Trust Economy',
        relevance: 'Shows why reliable verification architecture appreciates faster than raw volume.',
      },
      {
        chapter: 4,
        title: 'From HOW to WHAT',
        relevance: 'Guides the mental shift from local syntax tactics to architectural problem selection.',
      },
      {
        chapter: 7,
        title: 'AI Product Sense & Durable Moats',
        relevance: 'Teaches token economics, proprietary feedback loops, and non-trivial defensibility.',
      },
    ],
    relatedResources: [
      {
        slug: 'war-story-narrative',
        title: 'War Story Narrative',
        whyUseIt: 'Transform production architecture trade-offs and incident saves into durable technical proof.',
      },
      {
        slug: 'professional-positioning',
        title: 'Professional Positioning',
        whyUseIt: 'Reframe your resume and design influence around boundaries owned rather than tickets shipped.',
      },
      {
        slug: 'ai-workflow-experiment',
        title: 'AI Workflow Experiment',
        whyUseIt: 'Structure benchmarked architecture spikes cleanly.',
      },
    ],
    prevStageId: 'creator',
    prevStageLabel: '01 · Creator (Build & Verify)',
    nextStageId: 'orchestrator',
    nextStageLabel: '03 · Orchestrator (Coordinate & Govern)',
  },
  orchestrator: {
    id: 'orchestrator',
    stageNumber: '03',
    shortLabel: 'Orchestrator',
    verb: 'Coordinate & Govern',
    title: 'The Orchestrator Stage — Agentic Governance, Ethics & Trust Accountability',
    headline: 'Orchestrator: Coordinating Humans, Agents, Permissions, and Accountable Trust',
    subtitle:
      'Human-agent collaboration contracts, least-privilege governance, ethical curation, incident ownership, and organizational authority.',
    coreQuestion: 'Who owns accountability, permission boundaries, and societal trust across humans and agents?',
    seoTitle: 'Orchestrator Stage (C.A.O. Framework) | Beyond AI Engineering',
    seoDescription:
      'Master the Orchestrator mode in Beyond AI Engineering: Agentic Diplomacy, Ethical Curation, Human API contracts, blast-radius governance, and technical leadership.',
    readTime: '8 min read',
    definition:
      'The Orchestrator stage sits at the center of the Trust Economy. Orchestrators coordinate fleets of specialized agents, multi-disciplinary teams, governance gates, and executive stakeholders. Rather than surrendering oversight to autonomy, an Orchestrator enforces least-privilege tool access, mandatory human escalation triggers, ethical bias curation, and auditable accountability when high-impact decisions occur.',
    whyItMatters: [
      'Both public safety incidents and legal precedent—such as tribunals holding organizations strictly liable for faulty chatbot guidance—prove that "the agent hallucinated" is never a defensible governance posture.',
      'Technical leaders who pair deep architectural realism with credible governance become trusted stewards for boards, regulators, customers, and engineering teams navigating autonomous tooling.',
    ],
    coreResponsibilities: [
      {
        title: 'Agentic Diplomacy & Escalation Contracts',
        detail:
          'Define explicit authority tiers distinguishing what agents can execute autonomously, what requires peer review, and what demands signed human approval.',
      },
      {
        title: 'Ethical Curation & Liability Stewardship',
        detail:
          'Monitor systems continuously for prompt-injection vectors, demographic bias, privacy leakage, and compliance violations across real traffic.',
      },
      {
        title: 'The Human API & Cross-Team Alignment',
        detail:
          'Translate probabilistic technical risks cleanly for legal, security, product, and executive stakeholders without hiding behind jargon.',
      },
      {
        title: 'Institutional Proof & Digital Paper Trails',
        detail:
          'Build transparent organizational standards—blameless post-mortems, audit trails, and mentorship ladders—so engineering trust compounds over time.',
      },
    ],
    essentialCompetencies: [
      {
        name: 'Least-Privilege Sandboxing',
        descriptor: 'Designing scoped credentials, egress controls, and circuit breakers around autonomous actions.',
      },
      {
        name: 'Ethical Curation',
        descriptor: 'Continuous auditing of automated outputs for harm, fairness, regulatory compliance, and factual grounding.',
      },
      {
        name: 'Cross-Functional Diplomacy',
        descriptor: 'Aligning legal, security, GTM, and engineering around crisp risk tolerances.',
      },
      {
        name: 'Micro-Community Leadership',
        descriptor: 'Cultivating high-trust internal guilds and external practitioner circles grounded in real evidence.',
      },
    ],
    practicalScenarios: [
      {
        title: 'Governing MCP Tool Permissions Across Enterprise Agents',
        situation:
          'Multiple product teams request connecting coding and support agents to production customer-data MCP servers.',
        stageMove:
          'As an Orchestrator, you establish an Agent Authority Matrix: read-only PII-masked views for triage, dry-run diff proposals for writes, cryptographic approval tokens for destructive actions, and centralized audit logging.',
        outcome:
          'Unlocks team experimentation within security guardrails rather than an unenforceable blanket ban.',
      },
      {
        title: 'Leading Incident Accountability After an Automated Regression',
        situation:
          'An automated policy-update script misclassifies customer accounts, triggering customer-facing disruptions.',
        stageMove:
          'You own customer communication transparently, institute an immediate circuit-breaker threshold, publish a blameless technical War Story, and update verification gates.',
        outcome:
          'Preserves customer trust and strengthens institutional resilience.',
      },
    ],
    howAiChangesTheWork: [
      {
        beforeAi: 'Coordinating human sprint handoffs, code reviews, and vendor procurement.',
        withAi: 'Coordinating hybrid human + multi-agent execution graphs where velocity can outpace human comprehension.',
        enduringHumanEdge: 'Moral and legal accountability, crisis judgment, stakeholder trust, and explicit kill-switch governance.',
      },
      {
        beforeAi: 'Annual compliance checklists divorced from daily deployment commits.',
        withAi: 'Continuous evaluation telemetry and automated policy verification running beside every agent action.',
        enduringHumanEdge: 'Setting organizational risk thresholds and refusing unsafe shortcuts under deadline pressure.',
      },
    ],
    typicalMistakes: [
      {
        mistake: 'Rubber-Stamp Governance ("Human-in-the-Loop Theater")',
        consequence: 'Reviewers click "Approve" on dozens of opaque agent outputs per hour without context or verification tools.',
        correction: 'Design compact review surfaces showing diffs, confidence checks, and blast radius—or automate deterministic assertions instead of fatiguing humans.',
      },
      {
        mistake: 'Ivory-Tower Orchestration',
        consequence: 'Leaders mandate abstract AI policies without inspecting how tools actually fail in daily workflows.',
        correction: 'Stay grounded through hands-on prototyping spikes and regular post-mortem deep dives.',
      },
    ],
    realisticExample: {
      title: 'Verified Precedents on Unchecked Automation Liability',
      narrative:
        'Historical enforcement records—from SEC Release No. 34-70694 on Knight Capital’s $440M+ automated deployment failure to the Moffatt v. Air Canada tribunal ruling holding the airline accountable for chatbot misinformation—anchor the Orchestrator thesis: organizations always retain legal and trust ownership over automated systems.',
      sourceId: 'air-canada-tribunal-2024',
    },
    practicalExercises: [
      {
        title: 'Agent Authority & Kill-Switch Audit',
        duration: '40 mins',
        prompt:
          'List every automated agent or CI bot with write access in your stack. Assign each action to Autonomous, Co-Signed, or Human-Only governance.',
        deliverable: 'Complete the Ethical AI Audit workspace and circulate the table to your security/tech lead.',
      },
      {
        title: 'Institutional Paper Trail Charter',
        duration: '30 mins',
        prompt:
          'Draft a lightweight 1-page team standard covering model evaluation expectations, PII redaction rules, and incident ownership.',
        deliverable: 'Publish the charter inside your Digital Paper Trail planner for quarterly review.',
      },
    ],
    relatedChapters: [
      {
        chapter: 5,
        title: 'The Human API: Prompt Empathy & Agentic Diplomacy',
        relevance: 'Details the orchestration interface between human clarity and autonomous execution limits.',
      },
      {
        chapter: 6,
        title: 'Ethical Curation in Autonomous Systems',
        relevance: 'Examines real liability, bias curation, and non-negotiable engineering accountability.',
      },
      {
        chapter: 9,
        title: 'Digital Paper Trails & The Micro-Community Engine',
        relevance: 'Shows how Orchestrators build inspectable reputation across peer and executive networks.',
      },
    ],
    relatedResources: [
      {
        slug: 'ethical-ai-audit',
        title: 'Ethical AI Audit',
        whyUseIt: 'Assess blast radius, privacy leaks, human oversight, and escalation guarantees on real AI systems.',
      },
      {
        slug: 'digital-paper-trail',
        title: 'Digital Paper Trail',
        whyUseIt: 'Plan verifiable ADRs, public architecture notes, and governance proof artifacts.',
      },
      {
        slug: 'micro-community-map',
        title: 'Micro-Community Map',
        whyUseIt: 'Map 20–50 high-trust engineering peers, mentors, and domain collaborators.',
      },
      {
        slug: '30-60-90-plan',
        title: '30/60/90-Day Plan',
        whyUseIt: 'Commit concrete Creator, Architect, and Orchestrator milestones across your next quarter.',
      },
    ],
    prevStageId: 'architect',
    prevStageLabel: '02 · Architect (Design & System Boundaries)',
    nextStageId: 'creator',
    nextStageLabel: '01 · Creator (Return to Execution Foundations)',
  },
};
