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

/* ============================================================================
 * V2 15-STATEMENT, 5-POINT SCALE C.A.O. SELF-ASSESSMENT ENGINE (/assessment)
 * ========================================================================== */

export type ScaleScore = 1 | 2 | 3 | 4 | 5;
export type CAODimension = 'creator' | 'architect' | 'orchestrator';

export interface ScaleAssessmentQuestion {
  id: number;
  dimension: CAODimension;
  statement: string;
  contextHint: string;
}

export const LIKERT_SCALE_OPTIONS: {
  value: ScaleScore;
  label: string;
  shortLabel: string;
}[] = [
  { value: 1, label: 'Rarely or never true of my current work', shortLabel: '1 · Never' },
  { value: 2, label: 'Occasionally true', shortLabel: '2 · Rarely' },
  { value: 3, label: 'Sometimes true, depending on context', shortLabel: '3 · Sometimes' },
  { value: 4, label: 'Often true in my weekly practice', shortLabel: '4 · Often' },
  { value: 5, label: 'Consistently true across nearly all projects', shortLabel: '5 · Always' },
];

export const SCALE_ASSESSMENT_QUESTIONS: ScaleAssessmentQuestion[] = [
  // CREATOR (1-5): Execution, Verification, Debugging, Spec-First AI Pairing
  {
    id: 1,
    dimension: 'creator',
    statement:
      'I build quick vertical prototypes or spikes early to test technical feasibility before locking into heavy abstractions.',
    contextHint: 'Prototyping velocity & empirical validation',
  },
  {
    id: 2,
    dimension: 'creator',
    statement:
      'Whenever I use AI coding assistants, I write or verify failing edge-case tests rather than trusting plausible generated code.',
    contextHint: 'Deterministic verification over vibe coding',
  },
  {
    id: 3,
    dimension: 'creator',
    statement:
      'When latency spikes or bugs appear in production, I can trace logs, memory, queries, and stack frames down to root mechanics.',
    contextHint: 'First-principles debugging fluency',
  },
  {
    id: 4,
    dimension: 'creator',
    statement:
      'I keep AI-assisted pull requests focused, small, and free of redundant generated abstractions or dead helper functions.',
    contextHint: 'Diff hygiene & complexity restraint',
  },
  {
    id: 5,
    dimension: 'creator',
    statement:
      'I actively benchmark alternative prompts, libraries, or model contexts rather than accepting the first working snippet.',
    contextHint: 'Empirical craft & iteration discipline',
  },

  // ARCHITECT (6-10): Problem Definition, Boundaries, Trade-offs, AI Product Sense
  {
    id: 6,
    dimension: 'architect',
    statement:
      'Before writing implementation specs, I routinely question whether a deterministic workflow or non-AI fix solves the problem better.',
    contextHint: 'AI Product Sense & What-over-How judgment',
  },
  {
    id: 7,
    dimension: 'architect',
    statement:
      'I explicitly separate deterministic system state (schemas, transactions, auth) from probabilistic model inference at the edges.',
    contextHint: 'Boundary & invariant isolation',
  },
  {
    id: 8,
    dimension: 'architect',
    statement:
      'I define token budgets, latency SLOs, rollback paths, and failure modes upfront in written Architecture Decision Records (ADRs).',
    contextHint: 'Recorded trade-off & blast-radius planning',
  },
  {
    id: 9,
    dimension: 'architect',
    statement:
      'I maintain versioned evaluation harnesses or golden test datasets to catch quality drift before deploying model or prompt changes.',
    contextHint: 'Systematic evaluation architecture',
  },
  {
    id: 10,
    dimension: 'architect',
    statement:
      'I regularly turn complex production trade-offs and incident root causes into clear written teardowns that raise team clarity.',
    contextHint: 'Technical design synthesis & paper trail',
  },

  // ORCHESTRATOR (11-15): Agentic Governance, Ethics, Human API, Cross-Team Trust
  {
    id: 11,
    dimension: 'orchestrator',
    statement:
      'For workflows using autonomous tools or agents, I establish explicit least-privilege permissions and human sign-off thresholds.',
    contextHint: 'Agentic Diplomacy & authority matrices',
  },
  {
    id: 12,
    dimension: 'orchestrator',
    statement:
      'I proactively audit automated outputs and pipelines for privacy leakage, prompt injection, bias, and regulatory liability.',
    contextHint: 'Ethical Curation & Trust Economy ownership',
  },
  {
    id: 13,
    dimension: 'orchestrator',
    statement:
      'I translate probabilistic model risks, verification standards, and accountability clearly across product, security, legal, and leadership peers.',
    contextHint: 'The Human API across functions',
  },
  {
    id: 14,
    dimension: 'orchestrator',
    statement:
      'I coach teammates on shifting time away from boilerplate keystrokes toward review rigor, evals, and durable systems judgment.',
    contextHint: 'Force multiplication & mentorship',
  },
  {
    id: 15,
    dimension: 'orchestrator',
    statement:
      'I build inspectable proof of work and exchange candid architectural critique within a trusted circle of domain peers.',
    contextHint: 'Proof of work & micro-community stewardship',
  },
];

export interface ScaleAssessmentResult {
  scores: Record<CAODimension, number>; // Independent 0-100 scores per stage
  averages: Record<CAODimension, number>; // 1.0 - 5.0 raw mean per stage
  relativeBalance: Record<CAODimension, number>; // Normalized percentage (sums to 100)
  strongestDimension: CAODimension;
  growthDimension: CAODimension;
  archetypeTitle: string;
  headline: string;
  narrative: string;
  strengths: string[];
  developmentGaps: string[];
  plan7Day: string[];
  plan30Day: string[];
  plan90Day: string[];
  recommendedStagePath: `/frameworks/${CAODimension}`;
  recommendedResources: { slug: string; title: string; reason: string }[];
  recommendedChapters: { chapter: number; title: string; reason: string }[];
}

export function computeDimensionScore(values: ScaleScore[]): { average: number; score: number } {
  if (!values.length) return { average: 1, score: 0 };
  const sum = values.reduce((acc, v) => acc + v, 0);
  const average = sum / values.length;
  const score = Math.max(0, Math.min(100, Math.round(((average - 1) / 4) * 100)));
  return { average: Number(average.toFixed(2)), score };
}

export function calculateScaleAssessmentResult(
  answers: Record<number, ScaleScore>
): ScaleAssessmentResult {
  const byDim: Record<CAODimension, ScaleScore[]> = {
    creator: [],
    architect: [],
    orchestrator: [],
  };

  for (const q of SCALE_ASSESSMENT_QUESTIONS) {
    const val = answers[q.id];
    if (val >= 1 && val <= 5) {
      byDim[q.dimension].push(val);
    } else {
      byDim[q.dimension].push(1);
    }
  }

  const creatorCalc = computeDimensionScore(byDim.creator);
  const architectCalc = computeDimensionScore(byDim.architect);
  const orchestratorCalc = computeDimensionScore(byDim.orchestrator);

  const scores: Record<CAODimension, number> = {
    creator: creatorCalc.score,
    architect: architectCalc.score,
    orchestrator: orchestratorCalc.score,
  };

  const averages: Record<CAODimension, number> = {
    creator: creatorCalc.average,
    architect: architectCalc.average,
    orchestrator: orchestratorCalc.average,
  };

  const scoreSum = scores.creator + scores.architect + scores.orchestrator;
  let relativeBalance: Record<CAODimension, number>;
  if (scoreSum === 0) {
    relativeBalance = { creator: 34, architect: 33, orchestrator: 33 };
  } else {
    const creatorShare = Math.round((scores.creator / scoreSum) * 100);
    const architectShare = Math.round((scores.architect / scoreSum) * 100);
    const orchestratorShare = Math.max(0, 100 - creatorShare - architectShare);
    relativeBalance = {
      creator: creatorShare,
      architect: architectShare,
      orchestrator: orchestratorShare,
    };
  }

  // Determine strongest & primary growth opportunity deterministically
  const ordered: CAODimension[] = ['orchestrator', 'architect', 'creator'];
  let strongestDimension: CAODimension = 'creator';
  let bestVal = -1;
  for (const dim of ordered) {
    if (scores[dim] > bestVal) {
      bestVal = scores[dim];
      strongestDimension = dim;
    }
  }

  let growthDimension: CAODimension = 'orchestrator';
  let lowestVal = 101;
  for (const dim of ['orchestrator', 'architect', 'creator'] as CAODimension[]) {
    if (scores[dim] < lowestVal) {
      lowestVal = scores[dim];
      growthDimension = dim;
    }
  }
  if (growthDimension === strongestDimension) {
    growthDimension = strongestDimension === 'orchestrator' ? 'architect' : 'orchestrator';
  }

  const spread = Math.max(scores.creator, scores.architect, scores.orchestrator) - Math.min(scores.creator, scores.architect, scores.orchestrator);
  const overallMean = Math.round((scores.creator + scores.architect + scores.orchestrator) / 3);

  let archetypeTitle = 'Balanced Concentric Operator';
  let headline = 'Strong fluency across execution, system design, and human-agent governance.';
  let narrative =
    'Your operating profile spans all three concentric layers of the C.A.O. model cleanly. Your highest leverage comes from tightening your lowest scoring dimension while codifying what already works into repeatable team standards.';

  if (overallMean <= 25) {
    archetypeTitle = 'Emerging Builder Entering the C.A.O. Transition';
    headline = 'High upside ahead by anchoring verification habits alongside AI coding speed.';
    narrative =
      'Your baseline shows early-stage exposure to intentional C.A.O. practices across code verification, architecture framing, and governance. Focus first on disciplined Creator verification (testing what AI generates) before widening into system design and governance rituals.';
  } else if (spread <= 12 && overallMean >= 65) {
    archetypeTitle = 'Integrated Systems Orchestrator';
    headline = 'Concentric mastery linking hands-on realism, system boundaries, and trusted governance.';
    narrative =
      'You demonstrate rare equilibrium across execution realism (Creator), invariant boundary design (Architect), and accountable governance (Orchestrator). Continue compounding authority by turning implicit standards into durable organizational artifacts.';
  } else if (strongestDimension === 'creator') {
    archetypeTitle = 'High-Velocity Creator Transitioning to Architecture';
    headline = 'Strong build & debugging instincts ready to compound through explicit problem framing.';
    narrative =
      'You execute reliably and ship working code quickly. The biggest leverage jump over the next 90 days comes from pausing before prompt/code generation to define system invariants, write short ADRs, and own evaluation harnesses.';
  } else if (strongestDimension === 'architect') {
    archetypeTitle = 'Systems Architect Expanding Into Orchestration';
    headline = 'Disciplined boundary and trade-off thinking anchored in technical realism.';
    narrative =
      'You already frame problems around invariants, cost/latency trade-offs, and deterministic boundaries. Next-stage leverage lies in Orchestrator stewardship: formalizing agent permission policies, ethical curation checks, and cross-functional trust alignment.';
  } else {
    archetypeTitle = 'Trust-Economy Orchestrator';
    headline = 'High-leverage stewardship across multi-agent safety, accountability, and cross-team alignment.';
    narrative =
      'You prioritize governance, human escalation contracts, and organizational trust. Protect your credibility by keeping periodic Creator/Architect contact with real eval harnesses and hands-on failure inspection.';
  }

  const strengthCatalog: Record<CAODimension, string[]> = {
    creator: [
      'Hands-on debugging fluency and fast hypothesis validation under real runtime constraints.',
      'Disciplined pairing with coding assistants anchored in edge-case verification and clean diffs.',
    ],
    architect: [
      'Deliberate separation of deterministic system cores from probabilistic AI edges.',
      'Clear trade-off reasoning across cost, latency SLOs, schema boundaries, and ADR clarity.',
    ],
    orchestrator: [
      'Clear ownership of least-privilege agent boundaries, human sign-offs, and ethical curation.',
      'Strong cross-functional translation across security, product, legal, and engineering peers.',
    ],
  };

  const gapCatalog: Record<CAODimension, string> = {
    creator:
      'Verification depth at implementation time: ensure every AI-assisted diff is backed by failure-path tests and performance inspection.',
    architect:
      'Written design framing & evaluation harnesses: capture "what deserves to exist" and golden eval criteria before execution.',
    orchestrator:
      'Governance & externalized trust: establish explicit agent authority matrices, escalation policies, and public digital paper trails.',
  };

  const recommendedStagePath: `/frameworks/${CAODimension}` = `/frameworks/${growthDimension}`;

  return {
    scores,
    averages,
    relativeBalance,
    strongestDimension,
    growthDimension,
    archetypeTitle,
    headline,
    narrative,
    strengths: [
      ...strengthCatalog[strongestDimension],
      scores[growthDimension] >= 60
        ? `Solid supporting baseline (${scores[growthDimension]}/100) in ${growthDimension.toUpperCase()} practices.`
        : `Clear runway to raise your ${growthDimension.toUpperCase()} score (${scores[growthDimension]}/100) for higher system leverage.`,
    ],
    developmentGaps: [
      gapCatalog[growthDimension],
      strongestDimension === 'orchestrator' && scores.creator < 65
        ? 'Maintain hands-on technical realism via monthly prototyping spikes so governance stays grounded.'
        : 'Convert tacit weekly decisions into written artifacts others can inspect and reuse.',
    ],
    plan7Day: [
      `Complete the ${growthDimension === 'creator' ? 'Human Advantage Inventory' : growthDimension === 'architect' ? 'AI Workflow Experiment' : 'Ethical AI Audit'} workspace inside Companion Resources.`,
      'Audit your last 3 pull requests or design decisions to measure % time spent typing syntax vs. framing invariants and verifying edge cases.',
    ],
    plan30Day: [
      growthDimension === 'creator'
        ? 'Adopt spec-first pairing: write 3 failing boundary/invariant tests before asking an AI tool to implement code.'
        : growthDimension === 'architect'
        ? 'Author 2 structured Architecture Decision Records (ADRs) including rejected alternatives and failure budgets.'
        : 'Publish a 1-page Agent Authority & Escalation Matrix distinguishing Autonomous, Co-Signed, and Human-Only actions.',
      'Draft one concise War Story narrative documenting a failure prevented or diagnosed cleanly.',
    ],
    plan90Day: [
      'Execute a complete 30/60/90-Day Plan aligned to your target C.A.O. balance and track 3 visible proof artifacts.',
      'Build a 20-person peer Micro-Community exchange to review architecture notes and verification harnesses monthly.',
    ],
    recommendedStagePath,
    recommendedResources: [
      {
        slug: 'cao-career-map',
        title: 'C.A.O. Career Map',
        reason: 'Translate these dimension scores into concrete weekly calendar shifts.',
      },
      ...(growthDimension === 'orchestrator'
        ? [
            {
              slug: 'ethical-ai-audit',
              title: 'Ethical AI Audit',
              reason: 'Strengthen blast-radius controls, PII guardrails, and escalation clarity.',
            },
          ]
        : growthDimension === 'architect'
        ? [
            {
              slug: 'ai-workflow-experiment',
              title: 'AI Workflow Experiment',
              reason: 'Benchmark system designs and verification harnesses empirically.',
            },
          ]
        : [
            {
              slug: 'human-advantage-inventory',
              title: 'Human Advantage Inventory',
              reason: 'Separate AI-assisted syntax tasks from irreplaceable debugging judgment.',
            },
          ]),
      {
        slug: '30-60-90-plan',
        title: '30/60/90-Day Plan',
        reason: 'Turn your 7, 30, and 90-day recommendations into an exportable action plan.',
      },
    ],
    recommendedChapters: [
      {
        chapter: 3,
        title: 'The Creator · Architect · Orchestrator Triad',
        reason: 'Master how the three concentric operating modes reinforce one another.',
      },
      growthDimension === 'creator'
        ? {
            chapter: 1,
            title: 'Escaping the Tyranny of Syntax',
            reason: 'Anchor technical craft and fast verification when code is abundant.',
          }
        : growthDimension === 'architect'
        ? {
            chapter: 4,
            title: 'From HOW to WHAT',
            reason: 'Move cleanly from ticket execution to durable system framing.',
          }
        : {
            chapter: 6,
            title: 'Ethical Curation in Autonomous Systems',
            reason: 'Institutionalize safety, liability ownership, and organizational trust.',
          },
      {
        chapter: 11,
        title: 'Your 30/60/90-Day C.A.O. Transition',
        reason: 'Structured playbook for compounding judgment over the next quarter.',
      },
    ],
  };
}

export function buildAssessmentReportMarkdown(result: ScaleAssessmentResult): string {
  const dateStr = new Date().toISOString().split('T')[0];
  return `# Beyond AI Engineering — C.A.O. Self-Assessment Report

**Date:** ${dateStr}  
**Profile Archetype:** ${result.archetypeTitle}  
**Headline:** ${result.headline}

> *Disclaimer: Structured self-reflection and career-planning exercise accompanying Beyond AI Engineering by Harsh Verma. Not a clinical or formal psychometric test.*

---

## 1. Independent Dimension Scores (0–100 Scale)

| Dimension | Focus | Score (0–100) | Mean Rating (1–5) | Relative Operating Share |
| :--- | :--- | :---: | :---: | :---: |
| **Creator** | Build, Verify & Debug | ${result.scores.creator}/100 | ${result.averages.creator} / 5 | ${result.relativeBalance.creator}% |
| **Architect** | Design, Boundaries & Trade-offs | ${result.scores.architect}/100 | ${result.averages.architect} / 5 | ${result.relativeBalance.architect}% |
| **Orchestrator** | Govern, Align & Curate Trust | ${result.scores.orchestrator}/100 | ${result.averages.orchestrator} / 5 | ${result.relativeBalance.orchestrator}% |

**Strongest Dimension:** ${result.strongestDimension.toUpperCase()}  
**Highest-Leverage Growth Area:** ${result.growthDimension.toUpperCase()}

---

## 2. Diagnostic Summary

${result.narrative}

### Key Strengths
${result.strengths.map((s) => `- ${s}`).join('\n')}

### Development Opportunities
${result.developmentGaps.map((g) => `- ${g}`).join('\n')}

---

## 3. Recommended 7 / 30 / 90-Day Transition Plan

### Next 7 Days
${result.plan7Day.map((step, i) => `${i + 1}. ${step}`).join('\n')}

### Next 30 Days
${result.plan30Day.map((step, i) => `${i + 1}. ${step}`).join('\n')}

### Next 90 Days
${result.plan90Day.map((step, i) => `${i + 1}. ${step}`).join('\n')}

---

## 4. Recommended Next Reading & Workspaces

### Book Chapters
${result.recommendedChapters.map((c) => `- **Chapter ${c.chapter}: ${c.title}** — ${c.reason}`).join('\n')}

### Companion Workspaces
${result.recommendedResources.map((r) => `- **${r.title}** (/resources/${r.slug}) — ${r.reason}`).join('\n')}
`;
}

