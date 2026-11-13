import { AssessmentQuestion } from '../types';

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 1,
    scenario: 'Your team needs to build a new payment reconciliation pipeline connecting three third-party banking APIs with legacy internal databases. What is your primary instinct?',
    options: [
      {
        stage: 'creator',
        text: 'Prompt an AI coding agent to quickly generate the API client adapters and write the data mapping scripts in Python/TypeScript.',
        explanation: 'Focuses on rapid implementation and syntax synthesis (Creator).',
      },
      {
        stage: 'architect',
        text: 'Define the idempotent data invariants, error recovery boundaries, and latency budgets before any code or prompt is written.',
        explanation: 'Focuses on system design, trade-offs, and boundary stability (Architect).',
      },
      {
        stage: 'orchestrator',
        text: 'Architect an autonomous multi-agent monitoring loop with cryptographic human co-signatures for discrepancies over $10,000.',
        explanation: 'Focuses on agent authority boundaries, governance, and business trust (Orchestrator).',
      },
    ],
  },
  {
    id: 2,
    scenario: 'An AI-generated pull request introduces a clever optimization that doubles transaction throughput, but makes the codebase harder for junior team members to maintain. How do you evaluate it?',
    options: [
      {
        stage: 'creator',
        text: 'Benchmark the latency, run unit tests, and approve it if the execution speed meets our performance criteria.',
        explanation: 'Evaluates based on technical mechanics and immediate execution performance (Creator).',
      },
      {
        stage: 'architect',
        text: 'Evaluate whether the cognitive overhead and long-term maintenance liability outweigh the throughput gain.',
        explanation: 'Balances short-term performance against long-term architectural health (Architect).',
      },
      {
        stage: 'orchestrator',
        text: 'Formulate an engineering policy on complexity budgets and create an automated verification gate for future AI pull requests.',
        explanation: 'Translates technical lessons into enduring organizational standards and governance (Orchestrator).',
      },
    ],
  },
  {
    id: 3,
    scenario: 'Your executive leadership requests adding an "autonomous AI agent" to your core customer dashboard within two weeks. How do you respond?',
    options: [
      {
        stage: 'creator',
        text: 'Quickly wire up an agent prototype over the weekend to show a working proof-of-concept on Monday.',
        explanation: 'Relies on prototyping speed to demonstrate technical feasibility (Creator).',
      },
      {
        stage: 'architect',
        text: 'Challenge the premise: analyze the customer failure rate, cost per token, and assess whether a deterministic workflow is superior.',
        explanation: 'Applies AI Product Sense to determine what is truly worth building (Architect).',
      },
      {
        stage: 'orchestrator',
        text: 'Define the liability boundaries, data privacy exposure, and establish human-in-the-loop sign-off protocols before commitment.',
        explanation: 'Protects enterprise trust, legal liability, and strategic outcomes (Orchestrator).',
      },
    ],
  },
  {
    id: 4,
    scenario: 'How do you structure your daily workflow with modern AI coding assistants?',
    options: [
      {
        stage: 'creator',
        text: 'I use them continuously in my editor as an autocomplete engine and code generator to maximize my daily pull request volume.',
        explanation: 'Uses AI for linear implementation velocity (Creator).',
      },
      {
        stage: 'architect',
        text: 'I use them to draft architecture decision records (ADRs), generate adversarial edge-case test suites, and explore alternative schemas.',
        explanation: 'Uses AI as a sparring partner for systems thinking and trade-off evaluation (Architect).',
      },
      {
        stage: 'orchestrator',
        text: 'I orchestrate headless coding agents across repositories with automated security checks, spending my time curating system boundaries.',
        explanation: 'Conducts autonomous agent workflows while maintaining authoritative oversight (Orchestrator).',
      },
    ],
  },
  {
    id: 5,
    scenario: 'When a critical system bug causes an intermittent outage in production, what is your primary contribution to the resolution?',
    options: [
      {
        stage: 'creator',
        text: 'Diving directly into the debugger, reading logs, and writing the emergency hotfix patch to restore service.',
        explanation: 'Hands-on troubleshooting and code repair (Creator).',
      },
      {
        stage: 'architect',
        text: 'Conducting the root-cause trace analysis to understand why architectural assumptions failed and redesigning the invariant.',
        explanation: 'Systemic diagnostic and structural redesign (Architect).',
      },
      {
        stage: 'orchestrator',
        text: 'Leading the post-mortem, publishing a transparent War Story, and recalibrating the monitoring policies across the organization.',
        explanation: 'Organizational trust restoration, cultural learning, and governance (Orchestrator).',
      },
    ],
  },
  {
    id: 6,
    scenario: 'What best describes your current public professional presence and career portfolio?',
    options: [
      {
        stage: 'creator',
        text: 'A GitHub profile with repositories showcasing applications, languages, frameworks, and side projects I have coded.',
        explanation: 'Proof of syntactic implementation capability (Creator).',
      },
      {
        stage: 'architect',
        text: 'Technical articles, system teardowns, and architecture decision records explaining why specific trade-offs were made.',
        explanation: 'Digital Paper Trail proving engineering judgment (Architect).',
      },
      {
        stage: 'orchestrator',
        text: 'Keynotes, enterprise policy whitepapers, active advisory roles, and high-trust relationships in specialized technical micro-communities.',
        explanation: 'Industry authority, leadership, and ecosystem influence (Orchestrator).',
      },
    ],
  },
  {
    id: 7,
    scenario: 'Your organization plans a multi-quarter initiative to migrate a 10-year-old monolith with sparse documentation to a modern architecture. Where do you focus your energy?',
    options: [
      {
        stage: 'creator',
        text: 'Prompt coding agents to parse the legacy codebase, generate modern microservices, and synthesize unit tests for each endpoint.',
        explanation: 'Relies on automated code translation and prompt-assisted syntax porting (Creator).',
      },
      {
        stage: 'architect',
        text: 'Deconstruct domain invariants, event boundaries, and state consistency guarantees before writing any service code.',
        explanation: 'Prioritizes architectural decomposition, data boundaries, and failure isolation (Architect).',
      },
      {
        stage: 'orchestrator',
        text: 'Establish migration risk governance, define stage-gate rollback criteria, and coordinate cross-team organizational alignment.',
        explanation: 'Governs organizational risk, system-wide accountability, and strategic business delivery (Orchestrator).',
      },
    ],
  },
  {
    id: 8,
    scenario: 'An engineering squad wants to give an autonomous LLM agent execution permissions to run SQL queries and shell scripts in pre-production. What is your reaction?',
    options: [
      {
        stage: 'creator',
        text: 'Craft system prompt guardrails such as "Never execute DROP or destructive statements" and monitor the responses.',
        explanation: 'Relies on probabilistic model prompting rather than hard deterministic security boundaries (Creator).',
      },
      {
        stage: 'architect',
        text: 'Enforce deterministic read-only database replicas, strictly typed parameterized APIs, and ephemeral container sandboxes.',
        explanation: 'Designs structural security boundaries and deterministic blast-radius constraints (Architect).',
      },
      {
        stage: 'orchestrator',
        text: 'Implement Agentic Diplomacy protocols: cryptographic co-signing, multi-party authorization thresholds, and immutable forensic audit logs.',
        explanation: 'Builds comprehensive multi-agent governance, institutional compliance, and trust verification (Orchestrator).',
      },
    ],
  },
  {
    id: 9,
    scenario: 'A product manager proposes replacing standard faceted search in your enterprise SaaS application with a conversational AI agent. How do you evaluate it?',
    options: [
      {
        stage: 'creator',
        text: 'Rapidly assemble an interactive prototype with streaming LLM responses over the weekend to test user reactions.',
        explanation: 'Validates through rapid tactile prototyping and implementation speed (Creator).',
      },
      {
        stage: 'architect',
        text: 'Analyze token unit economics, p99 latency SLAs vs user attention spans, and evaluate whether semantic reranking delivers superior utility.',
        explanation: 'Applies AI Product Sense to balance cost, performance, and true functional value (Architect).',
      },
      {
        stage: 'orchestrator',
        text: 'Audit whether conversational search creates data liability, defensible customer retention moats, and strategic business alignment.',
        explanation: 'Protects enterprise data rights, strategic defensibility, and long-term customer trust (Orchestrator).',
      },
    ],
  },
  {
    id: 10,
    scenario: 'An early-career software engineer confides that they feel overwhelmed because AI tools can synthesize their code in seconds. How do you mentor them?',
    options: [
      {
        stage: 'creator',
        text: 'Teach them prompt workflows and editor shortcuts so they can generate and test features faster with AI assistance.',
        explanation: 'Focuses on improving implementation velocity within existing workflows (Creator).',
      },
      {
        stage: 'architect',
        text: 'Guide them to build systems intuition: understanding boundary failures, reading telemetry, and writing Architecture Decision Records.',
        explanation: 'Expands their skills into systems design, trade-offs, and technical discernment (Architect).',
      },
      {
        stage: 'orchestrator',
        text: 'Help them curate an inspectable Proof of Work portfolio, cultivate peer trust in micro-communities, and practice the curator mindset.',
        explanation: 'Develops long-term career resilience, authority, and strategic trust (Orchestrator).',
      },
    ],
  },
  {
    id: 11,
    scenario: 'A production AI feature begins producing subtle accuracy drift two weeks after an upstream foundation model update. How do you handle evaluation and observability?',
    options: [
      {
        stage: 'creator',
        text: 'Tweak a few system instructions manually and re-check a handful of sample inputs locally until responses look right again.',
        explanation: 'Addresses symptoms locally through manual prompt adjustments (Creator).',
      },
      {
        stage: 'architect',
        text: 'Build a versioned golden evaluation dataset, automated regression thresholds, and trace telemetry comparing baseline vs. model drift.',
        explanation: 'Installs deterministic evaluation harnesses and observability invariants (Architect).',
      },
      {
        stage: 'orchestrator',
        text: 'Institute release-gating Service Level Objectives (SLOs), automated fallback routing across model providers, and transparent incident reporting.',
        explanation: 'Governs production reliability, vendor resilience, and organizational trust (Orchestrator).',
      },
    ],
  },
  {
    id: 12,
    scenario: 'Security and legal teams raise compliance concerns before approving an external AI agent integration that touches customer PII. How do you lead the resolution?',
    options: [
      {
        stage: 'creator',
        text: 'Add regex redaction helper functions around user messages before forwarding payloads to the external API.',
        explanation: 'Applies localized code filtering to patch the immediate requirement (Creator).',
      },
      {
        stage: 'architect',
        text: 'Design zero-trust data tokenization, scoped least-privilege tool tokens, and strict network egress isolation.',
        explanation: 'Architects structural security isolation so sensitive state never leaks by design (Architect).',
      },
      {
        stage: 'orchestrator',
        text: 'Establish a repeatable cross-functional Human API review board, signed risk-acceptance criteria, and auditable provenance ledgers.',
        explanation: 'Aligns legal, security, and engineering around accountable governance standards (Orchestrator).',
      },
    ],
  },
];

export interface AssessmentResult {
  creatorPct: number;
  architectPct: number;
  orchestratorPct: number;
  archetypeTitle: string;
  summary: string;
  keyStrengths: string[];
  blindSpots: string[];
  recommended30DayActions: string[];
  recommendedChapters: { chapter: number; title: string; reason: string }[];
  recommendedExercises: string[];
}

export function calculateAssessmentResult(
  answers: Record<number, 'creator' | 'architect' | 'orchestrator'>
): AssessmentResult {
  let creatorCount = 0;
  let architectCount = 0;
  let orchestratorCount = 0;

  const total = Object.keys(answers).length || 1;

  Object.values(answers).forEach((val) => {
    if (val === 'creator') creatorCount++;
    if (val === 'architect') architectCount++;
    if (val === 'orchestrator') orchestratorCount++;
  });

  const creatorPct = Math.round((creatorCount / total) * 100);
  const architectPct = Math.round((architectCount / total) * 100);
  const orchestratorPct = Math.max(0, 100 - (creatorPct + architectPct));

  if (orchestratorPct >= 45) {
    return {
      creatorPct,
      architectPct,
      orchestratorPct,
      archetypeTitle: 'Strategic Systems Orchestrator',
      summary:
        'You operate at the orchestration frontier of the AI era. You view software as an ecosystem of autonomous agents, human stakeholders, and verifiable authority boundaries. Your signature strength is organizational trust, governance, and outcome accountability.',
      keyStrengths: [
        'Strong grasp of agent authority boundaries and governance',
        'Orientation toward enterprise trust, compliance, and organizational viability',
        'Ability to coordinate human teams and autonomous tooling toward clear outcomes',
      ],
      blindSpots: [
        'Stay grounded in evolving model failure modes so abstractions match reality',
        'Avoid over-engineering multi-agent governance where a simple script suffices',
      ],
      recommended30DayActions: [
        'Publish an internal or public architecture brief on Agentic Diplomacy in your domain',
        'Codify a 1-page Human API authorization policy for automated pull requests and agents',
        'Host a peer paper-reading or post-mortem circle on AI drift observability',
      ],
      recommendedChapters: [
        { chapter: 5, title: 'Mastering AI Workflows', reason: 'Deepen multi-agent permission design and Human API governance.' },
        { chapter: 9, title: 'The Do’s and Don’ts', reason: 'Audit production risk, ethical curation, and compliance boundaries.' },
        { chapter: 10, title: 'Sustaining Your Edge', reason: 'Build long-term leadership resilience and micro-community leverage.' },
      ],
      recommendedExercises: [
        'Ethical AI Audit Checklist (Lab Canvas #14)',
        'Human API Contract Template (Lab Canvas #8)',
      ],
    };
  } else if (architectPct >= 40 || architectPct > creatorPct) {
    return {
      creatorPct,
      architectPct,
      orchestratorPct,
      archetypeTitle: 'Systems Architect with Emerging Orchestration',
      summary:
        'You have transitioned naturally from pure implementation into systems judgment. You weigh trade-offs, invariants, unit economics, and cognitive overhead. Your next high-leverage growth step is formalizing multi-agent governance and making your engineering decisions visible.',
      keyStrengths: [
        'Strong AI Product Sense and rigorous problem selection discipline',
        'Proactive anticipation of failure modes, latency limits, and blast radius',
        'Emphasis on maintainability, observability, and deterministic verification',
      ],
      blindSpots: [
        'Watch for over-specifying architecture before empirical eval feedback arrives',
        'Make implicit design judgment visible through written Architecture Decision Records',
      ],
      recommended30DayActions: [
        'Build or harden an evaluation harness for one production AI workflow',
        'Publish two Architecture Decision Records (ADRs) explaining concrete system trade-offs',
        'Draft a team-wide Human API validation checklist for AI-assisted diffs',
      ],
      recommendedChapters: [
        { chapter: 2, title: 'From HOW to WHAT', reason: 'Sharpen problem framing and system direction over raw output.' },
        { chapter: 5, title: 'Mastering AI Workflows', reason: 'Combine deterministic constraints with agentic execution.' },
        { chapter: 6, title: 'The Art of Personal Branding for Engineers', reason: 'Convert architectural depth into a verifiable Digital Paper Trail.' },
      ],
      recommendedExercises: [
        'AI Evaluation & Drift Rubric (Lab Canvas #12)',
        'Digital Paper Trail Architecture Log (Lab Canvas #7)',
      ],
    };
  } else {
    return {
      creatorPct,
      architectPct,
      orchestratorPct,
      archetypeTitle: 'High-Velocity Builder & Creator',
      summary:
        'You bring strong execution horsepower, technical fluency, and hands-on prototyping energy. You turn ideas into running software quickly. Your biggest career multiplier now is pairing that builder speed with architectural framing (what should exist) and verification discipline (why it can be trusted).',
      keyStrengths: [
        'Rapid prototyping velocity and hands-on coding fluency',
        'Direct familiarity with modern developer tooling and AI assistants',
        'Strong bias for shipping tangible, working artifacts',
      ],
      blindSpots: [
        'Opportunity to pause on "What problem deserves solving?" before generating code',
        'Developing written decision trails so your system judgment is as visible as your code',
      ],
      recommended30DayActions: [
        'Dedicate 30% of weekly engineering time to writing edge-case evals and invariant notes',
        'Complete a How → What problem-framing teardown before starting your next feature',
        'Publish one detailed post-mortem or Digital Paper Trail benchmark study',
      ],
      recommendedChapters: [
        { chapter: 1, title: 'Welcome to the New Age of Engineering', reason: 'Understand why verification and judgment command growing leverage.' },
        { chapter: 3, title: 'Reimagining the Engineer', reason: 'Map the step-by-step transition from Creator to Architect.' },
        { chapter: 11, title: 'Starting Out', reason: 'Build concrete Proof of Work artifacts without falling into tutorial loops.' },
      ],
      recommendedExercises: [
        'C.A.O. Weekly Time Audit (Lab Canvas #1)',
        '30/60/90-Day Transition Plan (Lab Canvas #9)',
      ],
    };
  }
}
