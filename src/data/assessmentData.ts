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
        text: 'Quickly wire up a LangChain or LangGraph prototype over the weekend to show a working proof-of-concept on Monday.',
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
    scenario: 'How do you structure your daily workflow with modern AI coding assistants (Cursor, Claude Code, Copilot)?',
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
        explanation: 'Conducts autonomous agent swarms while maintaining authoritative oversight (Orchestrator).',
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
    scenario: 'An engineering squad wants to give an autonomous LLM agent execution permissions to run SQL queries and bash scripts in pre-production. What is your reaction?',
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
    scenario: 'A product manager proposes replacing the standard faceted search in your enterprise SaaS application with an open-ended conversational AI agent. How do you evaluate it?',
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
        text: 'Audit whether conversational search creates data liability, defensible customer retention moats, and business alignment.',
        explanation: 'Protects enterprise data rights, strategic defensibility, and long-term customer trust (Orchestrator).',
      },
    ],
  },
  {
    id: 10,
    scenario: 'An early-career software engineer confides that they feel anxious and demoralized because AI tools can synthesize their code in seconds. How do you mentor them?',
    options: [
      {
        stage: 'creator',
        text: 'Teach them advanced prompt engineering techniques and keyboard shortcuts so they become the fastest code generators on the team.',
        explanation: 'Focuses on increasing implementation velocity within existing paradigms (Creator).',
      },
      {
        stage: 'architect',
        text: 'Guide them to build systems intuition: understanding boundary failures, reading complex telemetry, and writing Architecture Decision Records.',
        explanation: 'Expands their skills into systems design, trade-offs, and critical technical discernment (Architect).',
      },
      {
        stage: 'orchestrator',
        text: 'Help them curate an irreplaceable Proof of Work portfolio, cultivate peer trust in specialized micro-communities, and master the curator mindset.',
        explanation: 'Develops long-term career resilience, personal authority, and strategic trust in the age of code abundance (Orchestrator).',
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
}

export function calculateAssessmentResult(answers: Record<number, 'creator' | 'architect' | 'orchestrator'>): AssessmentResult {
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
  const orchestratorPct = 100 - (creatorPct + architectPct);

  if (orchestratorPct >= 50) {
    return {
      creatorPct,
      architectPct,
      orchestratorPct,
      archetypeTitle: 'Strategic Systems Orchestrator',
      summary: 'You operate at the frontier of the AI agent revolution. You view software not as static syntax, but as an ecosystem of autonomous agents, human stakeholders, and verifiable authority boundaries. Your primary value lies in governance, risk mitigation, and strategic outcomes.',
      keyStrengths: [
        'Exceptional grasp of agent authority boundaries and governance',
        'Focus on enterprise trust and long-term organizational viability',
        'Ability to coordinate humans and autonomous intelligence seamlessly',
      ],
      blindSpots: [
        'Risk of detaching too far from emerging low-level model mechanics',
        'May overlook simple deterministic scripts in pursuit of multi-agent elegance',
      ],
      recommended30DayActions: [
        'Publish an authoritative public whitepaper on Agentic Diplomacy in your domain',
        'Implement an automated AI Authority Matrix for your engineering organization',
        'Host a private Micro-Community salon on multi-agent security invariants',
      ],
    };
  } else if (architectPct >= 45 || architectPct > creatorPct) {
    return {
      creatorPct,
      architectPct,
      orchestratorPct,
      archetypeTitle: 'Systems Architect with Emerging Orchestration',
      summary: 'You have successfully transitioned beyond pure code production into systems thinking. You naturally evaluate trade-offs, boundary invariants, and cognitive overhead. Your next quantum leap is expanding from single-system design into multi-agent orchestration and institutional authority.',
      keyStrengths: [
        'Strong AI Product Sense and problem selection discipline',
        'Anticipation of failure modes and distributed concurrency risks',
        'Focus on maintainability and structural elegance over quick hacks',
      ],
      blindSpots: [
        'May spend too much time perfecting single-system specs before deploying',
        'Opportunity to leave a more visible public Digital Paper Trail of your decisions',
      ],
      recommended30DayActions: [
        'Build and deploy a multi-agent system with explicit human approval checkpoints',
        'Document your next three technical decisions as public Architecture Decision Records (ADRs)',
        'Take the "Human API" concept from Chapter 5 and draft a team AI contract',
      ],
    };
  } else {
    return {
      creatorPct,
      architectPct,
      orchestratorPct,
      archetypeTitle: 'High-Velocity Master Creator',
      summary: 'You have extraordinary execution horsepower and prototyping depth. You love building, shipping, and turning ideas into working software. However, as AI models rapidly commoditize syntax generation, your highest-leverage growth area is ascending into system trade-offs (Architect) and governance (Orchestrator).',
      keyStrengths: [
        'Rapid prototyping velocity and implementation depth',
        'Hands-on mastery of modern developer tooling and AI coding assistants',
        'Relentless bias for action and tangible working software',
      ],
      blindSpots: [
        'Vulnerability to syntax commoditization as models continue improving',
        'Risk of answering "How do I build this?" before asking "Should this exist?"',
      ],
      recommended30DayActions: [
        'Shift 30% of your weekly coding hours toward system boundary analysis and failure modeling',
        'Complete the "How → What" exercise in Chapter 7 for your current sprint tickets',
        'Start your Digital Paper Trail by authoring a post-mortem of an AI agent failure',
      ],
    };
  }
}
