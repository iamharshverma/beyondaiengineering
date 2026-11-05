import { LabResource } from '../types';

export const LAB_RESOURCES: LabResource[] = [
  // ASSESS
  {
    id: 'cao-self-assessment',
    title: 'C.A.O. Self-Assessment Diagnostic',
    category: 'ASSESS',
    description: 'A 6-scenario evaluation framework that scores your current operating profile across Creator (Build), Architect (Design), and Orchestrator (Lead).',
    artifactProduced: 'Personal C.A.O. Profile & Gap Analysis',
    estimatedTime: '8 minutes',
    templateType: 'audit',
    defaultFields: {
      'Current Role': 'Senior Software Engineer / AI Practitioner',
      'Primary Bottleneck': 'Spending 70% of weekly hours writing repetitive boilerplate rather than defining architecture.',
      'Target Horizon': 'Transition to Principal Systems Architect & Agent Orchestrator within 12 months.',
    },
  },
  {
    id: 'human-advantage-inventory',
    title: 'Human Advantage Inventory',
    category: 'ASSESS',
    description: 'Systematic audit of your irreplaceable engineering strengths: system intuition, stakeholder trust, failure anticipation, and ethical discernment.',
    artifactProduced: '4-Quadrant Defensibility Map',
    estimatedTime: '20 minutes',
    templateType: 'canvas',
    defaultFields: {
      'Technical Depth': 'Deep understanding of distributed consensus, memory layout, and concurrency edge cases.',
      'Judgment Assets': 'Track record of catching catastrophic data corruption risks before production deployment.',
      'Organizational Trust': 'Credibility with executive leadership to greenlight complex architecture refactors.',
    },
  },
  {
    id: 'career-positioning-audit',
    title: 'Career Positioning Audit',
    category: 'ASSESS',
    description: 'Examines whether your public resume, portfolio, and internal reputation brand you as a syntax generator or a strategic system architect.',
    artifactProduced: 'Positioning Overhaul Scorecard',
    estimatedTime: '15 minutes',
    templateType: 'audit',
    defaultFields: {
      'Current Perception': 'High-velocity feature builder who closes Jira tickets quickly.',
      'Desired Perception': 'Trusted authority who decides which systems deserve to be built and mitigates enterprise risk.',
    },
  },

  // BUILD
  {
    id: 'ai-workflow-canvas',
    title: 'AI Workflow Canvas',
    category: 'BUILD',
    description: 'A structured blueprint for mapping multi-step AI-assisted development pipelines: task decomposition, context injection, model selection, and deterministic gates.',
    artifactProduced: 'Engineered Multi-Step Workflow Specification',
    estimatedTime: '25 minutes',
    templateType: 'canvas',
    defaultFields: {
      'Task Objective': 'Automate weekly vulnerability triage and patch synthesis across 40 microservices.',
      'Context Budget': 'Repository dependency graph, recent CVE alerts, internal security invariants.',
      'Model Tier': 'Frontier reasoning model for root-cause analysis; lightweight local model for syntax formatting.',
      'Validation Gate': 'Deterministic Docker compilation test + static security analysis before PR creation.',
    },
  },
  {
    id: 'agent-system-canvas',
    title: 'Agent System Canvas',
    category: 'BUILD',
    description: 'Comprehensive architectural framework defining agent roles, memory boundaries, tool capabilities, and fallback recovery paths.',
    artifactProduced: 'Multi-Agent State Machine Architecture',
    estimatedTime: '30 minutes',
    templateType: 'canvas',
    defaultFields: {
      'Agent Identities': 'Planner Agent (Read-only), Synthesizer Agent (Sandbox), Validator Agent (Deterministic).',
      'Tool Execution Sandbox': 'Isolated ephemeral container with read-only repository checkout and zero network egress.',
      'State Recovery': 'Rollback to checkpoint state if validation suite fails twice; page human on critical breach.',
    },
  },
  {
    id: 'evaluation-checklist',
    title: 'Evaluation Checklist for Generative Systems',
    category: 'BUILD',
    description: 'Rigorous 16-point evaluation protocol testing for semantic drift, hallucinated invariants, edge-case regressions, and latency budgets.',
    artifactProduced: 'Deterministic QA Sign-off Matrix',
    estimatedTime: '15 minutes',
    templateType: 'checklist',
    defaultFields: {
      'Test Dataset': '100 curated golden test cases containing known boundary failure modes and ambiguous user prompts.',
      'Passing Threshold': '100% deterministic schema compliance; zero unhandled API exceptions; latency < 1.8s.',
    },
  },

  // LEAD
  {
    id: 'ai-authority-matrix',
    title: 'AI Authority & Delegation Matrix',
    category: 'LEAD',
    description: 'Governance matrix establishing clear delegation levels (autonomous, human-informed, human-approved, strictly manual) for every agent capability.',
    artifactProduced: 'Enterprise Agent Authority Policy',
    estimatedTime: '20 minutes',
    templateType: 'canvas',
    defaultFields: {
      'Level 1: Autonomous': 'Read logs, summarize PR changes, execute test suites, run linting.',
      'Level 2: Human-Informed': 'Draft documentation updates, optimize database index recommendations.',
      'Level 3: Human-Approved': 'Modify database schema, merge code to production, invoke financial APIs.',
      'Level 4: Strictly Manual': 'Delete cloud infrastructure, grant administrative IAM permissions.',
    },
  },
  {
    id: 'ethical-ai-audit',
    title: 'Ethical AI & Liability Audit',
    category: 'LEAD',
    description: 'Framework to identify regulatory exposure, demographic bias risks, copyright vulnerabilities, and security liabilities before launch.',
    artifactProduced: 'Compliance & Safety Certification Record',
    estimatedTime: '25 minutes',
    templateType: 'audit',
    defaultFields: {
      'Liability Owner': 'Principal Systems Architect / Lead Responsible AI Engineer.',
      'Data Provenance': 'Audited clean training data pipeline with verified non-infringing licensing terms.',
      'Adversarial Defense': 'Input sanitization against indirect prompt injection and jailbreak payloads.',
    },
  },

  // GROW
  {
    id: 'war-story-template',
    title: 'War Story Narrative Template',
    category: 'GROW',
    description: 'Framework for turning complex production incidents, agent failures, and recovery triumphs into compelling technical authority case studies.',
    artifactProduced: 'Published Architectural War Story',
    estimatedTime: '20 minutes',
    templateType: 'canvas',
    defaultFields: {
      'The Crisis': 'Agent generated subtle race condition that bypassed conventional integration tests.',
      'The Diagnostic': 'How we analyzed distributed traces and detected the non-deterministic timing bug.',
      'The Invariant Added': 'The structural circuit breaker implemented to prevent recurrence permanently.',
      'The Broader Lesson': 'Why deterministic guards must precede probabilistic model execution.',
    },
  },
  {
    id: 'digital-paper-trail-planner',
    title: 'Digital Paper Trail Planner',
    category: 'GROW',
    description: 'Quarterly roadmap for authoring inspectable technical assets: Architecture Decision Records (ADRs), public post-mortems, and reproducible benchmarks.',
    artifactProduced: '90-Day Evidence Publication Schedule',
    estimatedTime: '15 minutes',
    templateType: 'planner',
    defaultFields: {
      'Month 1 Artifact': 'ADR on choosing between LangGraph and custom state machines for agent reliability.',
      'Month 2 Artifact': 'Public benchmark evaluating latency vs cost across 4 local inference engines.',
      'Month 3 Artifact': 'Comprehensive architectural teardown of multi-agent security boundaries.',
    },
  },

  // EXECUTE
  {
    id: '30-60-90-career-plan',
    title: '30/60/90-Day Career Transition Plan',
    category: 'EXECUTE',
    description: 'The step-by-step tactical sprint plan from Part IV of the book to evolve from code producer to trusted systems orchestrator.',
    artifactProduced: 'Quarterly Milestone Roadmap',
    estimatedTime: '30 minutes',
    templateType: 'planner',
    defaultFields: {
      'Days 1–30 (Audit & Unlearn)': 'Audit time allocation; automate 50% of routine boilerplate with agents; take C.A.O. assessment.',
      'Days 31–60 (Architect & Validate)': 'Design and ship a resilient agent system with deterministic evaluation and boundary guards.',
      'Days 61–90 (Lead & Orchestrate)': 'Publish 2 public architectural decision records; lead team AI governance briefing.',
    },
  },
  {
    id: 'weekly-ai-review',
    title: 'Weekly AI Engineering Review',
    category: 'EXECUTE',
    description: 'A 20-minute Friday ritual to analyze where your time went, audit your cognitive leverage, and capture new insights.',
    artifactProduced: 'Weekly Leverage Scorecard',
    estimatedTime: '10 minutes',
    templateType: 'checklist',
    defaultFields: {
      'Leverage Metric': 'Hours spent designing systems vs hours typing syntax.',
      'Experiment Run': 'Tested new prompt optimization technique on test generation.',
      'Evidence Logged': 'One technical decision recorded with rationale and alternatives considered.',
    },
  },
];
