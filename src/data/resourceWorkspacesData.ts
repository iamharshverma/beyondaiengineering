import { CAOStageId } from '../types';

export interface WorkspaceField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'rating';
  placeholder: string;
  hint: string;
  options?: string[];
  rows?: number;
  exampleValue: string;
}

export interface ResourceWorkspaceDefinition {
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  pillar: 'Career Strategy' | 'Execution & Evals' | 'Governance & Trust' | 'Authority & Growth';
  caoStage: CAOStageId | 'all';
  estimatedTime: string;
  artifactProduced: string;
  relatedChapter: string;
  relatedConcepts: string[];
  purpose: string;
  instructions: string[];
  fields: WorkspaceField[];
  buildMarkdown: (values: Record<string, string>) => string;
}

export const RESOURCE_WORKSPACES: ResourceWorkspaceDefinition[] = [
  {
    slug: 'cao-career-map',
    number: '01',
    title: 'C.A.O. Career Map',
    subtitle: 'Map how your weekly hours distribute across Creator, Architect, and Orchestrator work.',
    pillar: 'Career Strategy',
    caoStage: 'all',
    estimatedTime: '15 minutes',
    artifactProduced: 'Personal C.A.O. Time & Leverage Rebalancing Plan',
    relatedChapter: 'Chapters 3 & 11',
    relatedConcepts: ['C.A.O. Triad', 'From HOW to WHAT', 'Time Reallocation'],
    purpose:
      'Audit where your engineering calendar actually goes today versus where durable career leverage lives over the next 6–12 months.',
    instructions: [
      'Review your last two sprints honestly: separate keystrokes/boilerplate (Creator) from boundary specs (Architect) and alignment/governance (Orchestrator).',
      'Identify the single routine task consuming high hours that can be safely automated or templated first.',
      'Commit one calendar block next week dedicated strictly to Architect or Orchestrator work.',
    ],
    fields: [
      {
        id: 'currentRoleHorizon',
        label: 'Current Role & 12-Month Career Horizon',
        type: 'text',
        placeholder: 'e.g., Senior Backend Engineer aiming for Staff Systems Architect',
        hint: 'Name both your starting point and the direction of your next role.',
        exampleValue: 'Senior Platform Engineer targeting Staff / Principal Systems Architect within 12 months',
      },
      {
        id: 'timeAllocation',
        label: 'Current vs. Target Weekly Time Allocation (Creator % / Architect % / Orchestrator %)',
        type: 'text',
        placeholder: 'e.g., Today: 75% Creator / 20% Architect / 5% Orchestrator -> Target: 35% / 45% / 20%',
        hint: 'Notice how moving up the triad rarely eliminates Creator work—it concentrates Creator hours on high-signal prototyping.',
        exampleValue: 'Current: 70% Creator / 22% Architect / 8% Orchestrator | Target Q2: 35% Creator / 45% Architect / 20% Orchestrator',
      },
      {
        id: 'automatableBottleneck',
        label: 'Biggest Routine Syntax / Boilerplate Bottleneck to Delegate to AI',
        type: 'textarea',
        rows: 3,
        placeholder: 'List recurring tasks (migrations, test scaffolding, repetitive adapters) you still write manually...',
        hint: 'Target low-risk, easily verifiable tasks first.',
        exampleValue: 'Writing CRUD service wrappers, seed fixtures, and initial OpenAPI client adapters. Moving to spec-first AI generation + strict schema contract tests.',
      },
      {
        id: 'architecturalOwnership',
        label: '1–2 High-Leverage System Boundaries or Risks You Want to Own',
        type: 'textarea',
        rows: 3,
        placeholder: 'What system invariants, failure modes, or cross-team bottlenecks lack clear ownership today?',
        hint: 'Think about reliability, cost economics, security boundaries, or ambiguous product framing.',
        exampleValue: 'End-to-end payment webhook idempotency guarantees and building a deterministic regression eval harness before upgrading our LLM triage model.',
      },
      {
        id: 'firstCalendarShift',
        label: 'Immediate Weekly Calendar Protection Rule',
        type: 'textarea',
        rows: 2,
        placeholder: 'e.g., Protect Tuesday/Thursday 9–11 AM strictly for ADR drafting and architecture reviews...',
        hint: 'What gets unscheduled so higher-leverage thinking actually happens?',
        exampleValue: 'Block Wednesday 9:00–11:30 AM for Architecture Decision Records and latency profiling; decline ad-hoc status syncs lacking pre-reads.',
      },
    ],
    buildMarkdown: (v) => `# C.A.O. Career Map

**Role & Horizon:** ${v.currentRoleHorizon || '_Not specified_'}  
**Time Reallocation (C / A / O):** ${v.timeAllocation || '_Not specified_'}

## Routine Work to Offload / Automate
${v.automatableBottleneck || '_Not specified_'}

## High-Leverage Boundaries & Ownership Targets
${v.architecturalOwnership || '_Not specified_'}

## Weekly Calendar Protection Rule
${v.firstCalendarShift || '_Not specified_'}
`,
  },
  {
    slug: 'human-advantage-inventory',
    number: '02',
    title: 'Human Advantage Inventory',
    subtitle: 'Separate tasks where AI accelerates volume from judgment where human accountability stays critical.',
    pillar: 'Career Strategy',
    caoStage: 'creator',
    estimatedTime: '20 minutes',
    artifactProduced: '4-Quadrant Engineering Defensibility Inventory',
    relatedChapter: 'Chapters 1 & 2',
    relatedConcepts: ['The Trust Economy', 'Abundant Code vs. Scarce Judgment'],
    purpose:
      'Clarify which parts of your daily craft AI commoditizes versus which parts appreciate in value as synthetic code multiplies.',
    instructions: [
      'List recurring technical activities where AI coding assistants match or exceed your raw typing speed.',
      'Inventory your lived intuition around failure modes, domain context, and political alignment that models lack.',
      'Select one judgment muscle to deliberately sharpen via code reviews or incident retrospectives this month.',
    ],
    fields: [
      {
        id: 'commodityTasks',
        label: 'Activities AI Handles Faster (Embrace & Speed Up)',
        type: 'textarea',
        rows: 3,
        placeholder: 'Syntax translation, test fixture scaffolding, regex construction, doc summaries...',
        hint: 'Do not tie ego or identity to out-typing a coding agent on boilerplate.',
        exampleValue: 'Unit test fixture permutations, SQL migration syntax drafting, translating JSON schemas into TypeScript interfaces.',
      },
      {
        id: 'systemsIntuition',
        label: 'Hard-Won Systems Intuition & Edge-Case Instincts',
        type: 'textarea',
        rows: 3,
        placeholder: 'Concurrency stalls, third-party API quirks, data integrity failure history...',
        hint: 'What have production scars taught you that is not written neatly in docs?',
        exampleValue: 'Recognizing retry-storm amplification on downstream rate limiters and subtle timezone/DST drift in billing settlements.',
      },
      {
        id: 'domainTrustAssets',
        label: 'Organizational & Domain Trust Capital',
        type: 'textarea',
        rows: 3,
        placeholder: 'Stakeholder credibility, compliance context, customer workflow nuance...',
        hint: 'Which colleagues come to you when trade-offs carry real financial or reputational stakes?',
        exampleValue: 'Translating probabilistic hallucination risks clearly to security & compliance reviewers before enterprise pilot launches.',
      },
      {
        id: 'skillInvestmentPlan',
        label: 'One Irreplaceable Human Advantage to Compound Over 60 Days',
        type: 'text',
        placeholder: 'e.g., Adversarial threat modeling on MCP tool integrations',
        hint: 'Pick one skill that compounds directly with higher AI adoption.',
        exampleValue: 'Designing golden evaluation harnesses and fault-injection drills for multi-step internal tools.',
      },
    ],
    buildMarkdown: (v) => `# Human Advantage Inventory

## Commodity Tasks Delegated to AI Speed
${v.commodityTasks || '_Not specified_'}

## Hard-Won Systems Intuition
${v.systemsIntuition || '_Not specified_'}

## Organizational & Domain Trust Capital
${v.domainTrustAssets || '_Not specified_'}

## 60-Day Priority Advantage to Compound
${v.skillInvestmentPlan || '_Not specified_'}
`,
  },
  {
    slug: 'ai-workflow-experiment',
    number: '03',
    title: 'AI Workflow Experiment',
    subtitle: 'Design a measurable engineering experiment pairing AI speed with strict verification gates.',
    pillar: 'Execution & Evals',
    caoStage: 'architect',
    estimatedTime: '20 minutes',
    artifactProduced: 'Benchmarked AI Workflow Specification',
    relatedChapter: 'Chapters 5 & 10',
    relatedConcepts: ['Prompt Empathy', 'Deterministic Verification Gates', 'Empirical Benchmarking'],
    purpose:
      'Replace ad-hoc "vibe coding" with a falsifiable experiment measuring quality, defect rate, token cost, and real cycle-time impact.',
    instructions: [
      'Choose one concrete engineering workflow (e.g., PR triage, test hardening, schema migration verification).',
      'Define the deterministic check that blocks unsafe or hallucinated outputs automatically.',
      'Run the experiment for 5–7 days and log quantitative trade-offs before standardizing.',
    ],
    fields: [
      {
        id: 'workflowTarget',
        label: 'Target Workflow & Baseline Pain Point',
        type: 'text',
        placeholder: 'e.g., Generating integration regression tests for checkout webhooks',
        hint: 'Pick one narrow, repeatable task rather than "all engineering".',
        exampleValue: 'Triaging weekly dependency CVEs and drafting minimal reproduction test cases across 12 services',
      },
      {
        id: 'hypothesis',
        label: 'Falsifiable Experiment Hypothesis',
        type: 'textarea',
        rows: 2,
        placeholder: 'If we provide structured trace + schema context before prompting, false-positive rate drops below...',
        hint: 'Include both a speed/coverage expectation and a quality floor.',
        exampleValue: 'If we supply lockfile trees and strict schema assertions in the spec prompt, triage time drops by 50% while passing 100% deterministic compile/test gates.',
      },
      {
        id: 'verificationGate',
        label: 'Mandatory Deterministic Verification Gate',
        type: 'textarea',
        rows: 3,
        placeholder: 'TypeScript strict compile + sandboxed integration tests + secret scan...',
        hint: 'What non-LLM mechanism verifies whether output is actually safe?',
        exampleValue: 'Ephemeral Docker test container execution + strict JSON schema validator + human diff inspection before commit.',
      },
      {
        id: 'successMetrics',
        label: 'Measured Metrics (Latency, Cost, Defect Escape Rate)',
        type: 'text',
        placeholder: 'e.g., Review time < 15 min, 0 security regressions, token cost < $0.25/run',
        hint: 'Record concrete thresholds you will measure after 7 days.',
        exampleValue: 'PR review time <= 12 mins | False positives < 10% | Cost per run <= $0.18 | Zero unverified DB writes',
      },
      {
        id: 'stopCondition',
        label: 'Abort / Rollback Trigger',
        type: 'text',
        placeholder: 'e.g., Roll back workflow if silent test skips exceed 1 occurrence',
        hint: 'Define upfront when you will declare the experiment ineffective.',
        exampleValue: 'Halt rollout if reviewers catch hallucinated assertions in >= 2 consecutive PRs or review time increases.',
      },
    ],
    buildMarkdown: (v) => `# AI Workflow Experiment Brief

**Target Workflow:** ${v.workflowTarget || '_Not specified_'}

## Hypothesis
${v.hypothesis || '_Not specified_'}

## Deterministic Verification Gate
${v.verificationGate || '_Not specified_'}

## Measurement & Thresholds
${v.successMetrics || '_Not specified_'}

## Abort / Rollback Criteria
${v.stopCondition || '_Not specified_'}
`,
  },
  {
    slug: 'ethical-ai-audit',
    number: '04',
    title: 'Ethical AI Audit',
    subtitle: 'Evaluate blast radius, data privacy, prompt injection, and human liability before shipping.',
    pillar: 'Governance & Trust',
    caoStage: 'orchestrator',
    estimatedTime: '25 minutes',
    artifactProduced: 'Pre-Launch Safety & Accountability Sign-off Record',
    relatedChapter: 'Chapters 6 & 9',
    relatedConcepts: ['Ethical Curation', 'Agentic Diplomacy', 'Blast-Radius Containment'],
    purpose:
      'Protect users, enterprise trust, and engineering accountability by stress-testing autonomous or LLM-powered features prior to release.',
    instructions: [
      'Identify who carries legal, financial, and operational accountability when the system outputs a bad decision.',
      'Map every data boundary where customer PII or privileged credentials could leak via prompts or tool calls.',
      'Define the explicit escalation trigger and kill-switch mechanism before enabling production traffic.',
    ],
    fields: [
      {
        id: 'systemScope',
        label: 'AI Feature / Agent System Under Audit',
        type: 'text',
        placeholder: 'e.g., Automated Customer Refund Triage Assistant v1',
        hint: 'Specify the exact production surface and user population.',
        exampleValue: 'Internal Support Resolution Agent with CRM Read Access & Draft Response Capability',
      },
      {
        id: 'blastRadiusLevel',
        label: 'Maximum Blast Radius Classification',
        type: 'select',
        options: [
          'Low — Read-only summary / internal draft',
          'Medium — Customer-facing copy or reversible suggestion',
          'High — Financial, security, healthcare, or irreversible write action',
        ],
        placeholder: 'Select blast radius tier',
        hint: 'Match human sign-off rigor strictly to irreversibility of errors.',
        exampleValue: 'Medium — Customer-facing copy or reversible suggestion',
      },
      {
        id: 'dataPrivacyCheck',
        label: 'PII, Tenant Isolation & Prompt-Injection Defenses',
        type: 'textarea',
        rows: 3,
        placeholder: 'Describe tokenization, read-only replicas, untrusted-input separation, and retention rules...',
        hint: 'What prevents untrusted external text from hijacking privileged tools?',
        exampleValue: 'Strict separation between untrusted ticket body and system tool instructions; PII fields tokenized prior to inference; zero third-party model retention enabled.',
      },
      {
        id: 'escalationPath',
        label: 'Human-in-the-Loop Escalation & Kill-Switch Protocol',
        type: 'textarea',
        rows: 3,
        placeholder: 'Specify exact confidence/policy triggers that freeze automation and page an accountable owner...',
        hint: 'Avoid "rubber-stamp" fatigue; show reviewers concise context & diffs.',
        exampleValue: 'Any policy exception > $100 or ambiguous account entitlement escalates to human queue with citations; feature-flag kill switch documented in runbook.',
      },
      {
        id: 'accountableOwner',
        label: 'Named Engineering & Governance Owners',
        type: 'text',
        placeholder: 'e.g., Principal Engineer (Technical Owner) + Product Compliance Lead',
        hint: 'Accountability must resolve to specific humans—never "the AI team".',
        exampleValue: 'Primary Technical Owner: Lead Platform Architect | Policy Co-Signer: Trust & Legal Operations',
      },
    ],
    buildMarkdown: (v) => `# Ethical AI & Liability Audit Record

**System Under Audit:** ${v.systemScope || '_Not specified_'}  
**Blast Radius Tier:** ${v.blastRadiusLevel || '_Not specified_'}  
**Named Accountable Owners:** ${v.accountableOwner || '_Not specified_'}

## Data Privacy, Tenant Isolation & Prompt-Injection Controls
${v.dataPrivacyCheck || '_Not specified_'}

## Human Escalation & Kill-Switch Protocol
${v.escalationPath || '_Not specified_'}
`,
  },
  {
    slug: 'professional-positioning',
    number: '05',
    title: 'Professional Positioning',
    subtitle: 'Reframe your bio, portfolio, and internal narrative around judgment rather than tool lists.',
    pillar: 'Authority & Growth',
    caoStage: 'architect',
    estimatedTime: '20 minutes',
    artifactProduced: 'Trust-Economy Positioning Statement & Bio Rewrite',
    relatedChapter: 'Chapters 6 & 7',
    relatedConcepts: ['The Trust Economy', 'Outcome Ownership Over Tool Lists'],
    purpose:
      'Eliminate interchangeable "React/Python/AI wrapper" framing and articulate the hard problems, architectural boundaries, and reliability outcomes you own.',
    instructions: [
      'Audit how your LinkedIn headline, resume summary, or internal promo packet reads today.',
      'Replace framework laundry lists with 2–3 specific classes of ambiguity and failure you repeatedly resolve.',
      'Anchor every headline claim to an inspectable proof artifact (benchmark, ADR, post-mortem, or shipped boundary).',
    ],
    fields: [
      {
        id: 'currentDescription',
        label: 'Current Bio / Resume Lead (Before C.A.O. Reframe)',
        type: 'textarea',
        rows: 2,
        placeholder: 'Paste your current 1–2 sentence self-description...',
        hint: 'Notice how much space goes to tools/languages versus system outcomes.',
        exampleValue: 'Full-stack software engineer experienced in TypeScript, Python, React, PostgreSQL, and building LLM apps.',
      },
      {
        id: 'hardProblemsOwned',
        label: 'High-Stakes Engineering Problems & Failure Modes You Own',
        type: 'textarea',
        rows: 3,
        placeholder: 'Distributed reliability, inference cost/latency trade-offs, security sandboxing, multi-team migrations...',
        hint: 'What goes wrong cleanly when you are in the room?',
        exampleValue: 'Turning brittle AI prototypes into predictable production infrastructure with strict schema contracts, regression evals, and sub-second tail latency.',
      },
      {
        id: 'newPositioningStatement',
        label: 'Reframed Positioning Statement (2 Sentences Max)',
        type: 'textarea',
        rows: 3,
        placeholder: 'Write your crisp, outcome-led positioning statement...',
        hint: 'Target audience + Hard system problem solved + Trust guarantee.',
        exampleValue: 'Systems-focused AI Engineer helping product teams ship reliable agentic workflows backed by deterministic evaluation harnesses and clear blast-radius controls.',
      },
      {
        id: 'anchorProofArtifact',
        label: 'Top 2 Inspectable Proof Artifacts Supporting This Claim',
        type: 'text',
        placeholder: 'e.g., Published MCP security teardown + Latency benchmark repo',
        hint: 'Never claim authority without linked evidence.',
        exampleValue: '1) Public ADR & evaluation suite on schema-constrained agents; 2) Local vs frontier inference cost teardown.',
      },
    ],
    buildMarkdown: (v) => `# Professional Positioning Audit

## Previous Positioning
${v.currentDescription || '_Not specified_'}

## Hard Problems & System Risks Owned
${v.hardProblemsOwned || '_Not specified_'}

## Reframed Positioning Statement
${v.newPositioningStatement || '_Not specified_'}

## Backing Proof Artifacts
${v.anchorProofArtifact || '_Not specified_'}
`,
  },
  {
    slug: 'war-story-narrative',
    number: '06',
    title: 'War Story Narrative',
    subtitle: 'Distill a hard technical save, incident, or trade-off into compelling proof of judgment.',
    pillar: 'Authority & Growth',
    caoStage: 'architect',
    estimatedTime: '20 minutes',
    artifactProduced: 'Structured Engineering War Story Brief',
    relatedChapter: 'Chapters 6 & 8',
    relatedConcepts: ['Digital Paper Trail', 'Scars Over Buzzwords'],
    purpose:
      'Turn lived engineering incidents—where textbook answers failed—into clear, defensible narratives for interviews, leadership briefs, or public essays.',
    instructions: [
      'Avoid revealing confidential employer secrets, private customer names, or unredacted metrics.',
      'Focus equally on *why* conventional intuition failed and what structural invariant you installed permanently.',
      'Keep the closing transferable principle sharp enough that peers on another stack can apply it Monday morning.',
    ],
    fields: [
      {
        id: 'storyTitle',
        label: 'Working Title & Context (Anonymized Where Needed)',
        type: 'text',
        placeholder: 'e.g., Why Our Cached Retry Queue Amplified Latency During Upstream Model Throttling',
        hint: 'Lead with the core tension or surprise.',
        exampleValue: 'Preventing Cascading Retry Storms in an Async LLM Enrichment Pipeline',
      },
      {
        id: 'symptomAndStakes',
        label: '1. The Symptom & Real Stakes',
        type: 'textarea',
        rows: 3,
        placeholder: 'What broke, how did users feel it, and why did standard logs initially mislead the team?',
        hint: 'Be concrete about timing, queues, or silent corruption.',
        exampleValue: 'During upstream provider rate limits, worker retries synchronized on fixed 5s timers, exhausting worker threads and delaying non-AI webhook delivery.',
      },
      {
        id: 'diagnosticBreakthrough',
        label: '2. Root-Cause Diagnostic & Rejected Fix',
        type: 'textarea',
        rows: 3,
        placeholder: 'What deeper coupling did you uncover, and why did adding a naive retry delay fail?',
        hint: 'Show Architect reasoning: what trade-off ruled out the easy band-aid?',
        exampleValue: 'Trace correlation showed AI enrichment shared the same worker pool as transactional billing alerts. Raising timeouts only prolonged thread starvation.',
      },
      {
        id: 'invariantInstalled',
        label: '3. The Structural Boundary / Invariant Added',
        type: 'textarea',
        rows: 3,
        placeholder: 'Bulkhead queue isolation + adaptive circuit breaker + degraded deterministic fallback...',
        hint: 'Explain the lasting architectural safeguard.',
        exampleValue: 'Isolated probabilistic enrichment onto a dedicated bulkhead queue with jittered backoff, circuit breaker cutoff, and graceful deterministic fallback tags.',
      },
      {
        id: 'transferableLesson',
        label: '4. Transferable Engineering Principle',
        type: 'text',
        placeholder: 'One crisp sentence peers can remember...',
        hint: 'Summarize the enduring C.A.O. takeaway.',
        exampleValue: 'Never share execution bulkheads between deterministic customer commitments and probabilistic external inference.',
      },
    ],
    buildMarkdown: (v) => `# War Story Narrative: ${v.storyTitle || 'Untitled'}

## 1. The Symptom & Stakes
${v.symptomAndStakes || '_Not specified_'}

## 2. Diagnostic Breakthrough & Rejected Shortcuts
${v.diagnosticBreakthrough || '_Not specified_'}

## 3. Permanent Architectural Invariant Installed
${v.invariantInstalled || '_Not specified_'}

## 4. Transferable Principle
> ${v.transferableLesson || '_Not specified_'}
`,
  },
  {
    slug: 'digital-paper-trail',
    number: '07',
    title: 'Digital Paper Trail',
    subtitle: 'Plan a 90-day sequence of inspectable ADRs, benchmarks, and technical teardowns.',
    pillar: 'Authority & Growth',
    caoStage: 'orchestrator',
    estimatedTime: '15 minutes',
    artifactProduced: 'Quarterly Inspectable Artifact Schedule',
    relatedChapter: 'Chapters 6 & 9',
    relatedConcepts: ['Proof of Work Framework', 'Searchable Judgment Trail'],
    purpose:
      'Build enduring credibility in the Trust Economy by publishing concise, verifiable technical thinking rather than hot takes or shallow engagement posts.',
    instructions: [
      'Commit to one high-signal artifact per month over the next quarter (one internal ADR or public essay/benchmark).',
      'Ensure each piece includes real failure modes tested, constraints, and falsifiable conclusions.',
      'Cross-link each artifact to concrete GitHub benchmarks or architectural diagrams where safe.',
    ],
    fields: [
      {
        id: 'targetDomain',
        label: 'Core Technical Niche / Domain Focus',
        type: 'text',
        placeholder: 'e.g., Agentic Security Boundaries & Enterprise Evaluation Systems',
        hint: 'Specificity builds far faster trust than generic "AI news".',
        exampleValue: 'Deterministic Guardrails & Evaluation Harnesses for Production AI Systems',
      },
      {
        id: 'artifactMonth1',
        label: 'Month 1 Artifact (Architectural Trade-off or ADR)',
        type: 'textarea',
        rows: 2,
        placeholder: 'Topic, audience, and publication venue (Internal Engineering Wiki / Personal Blog / GitHub)...',
        hint: 'Document a real decision you already wrestled with.',
        exampleValue: 'Public technical note: Designing idempotent sandboxes for MCP tools with read/write separation (Personal site + team engineering review).',
      },
      {
        id: 'artifactMonth2',
        label: 'Month 2 Artifact (Benchmark or Empirical Evaluation)',
        type: 'textarea',
        rows: 2,
        placeholder: 'Reproducible measurement comparing latency, accuracy, or cost across real inputs...',
        hint: 'Even small 20-case golden benchmarks teach readers far more than opinions.',
        exampleValue: 'Benchmark study: Schema compliance & tail latency across 3 structured-output prompting strategies on 50 real test cases.',
      },
      {
        id: 'artifactMonth3',
        label: 'Month 3 Artifact (War Story or Field Post-Mortem)',
        type: 'textarea',
        rows: 2,
        placeholder: 'Sanitized teardown of a non-obvious failure mode and durable safeguard...',
        hint: 'Pair technical rigor with clarity non-specialists can follow.',
        exampleValue: 'Sanitized post-mortem & checklist: Catching silent semantic drift when upgrading foundation model snapshots.',
      },
    ],
    buildMarkdown: (v) => `# 90-Day Digital Paper Trail Plan

**Domain Niche:** ${v.targetDomain || '_Not specified_'}

## Month 1 · Architectural Trade-off / ADR
${v.artifactMonth1 || '_Not specified_'}

## Month 2 · Reproducible Benchmark / Evaluation
${v.artifactMonth2 || '_Not specified_'}

## Month 3 · Sanitized War Story / Field Synthesis
${v.artifactMonth3 || '_Not specified_'}
`,
  },
  {
    slug: 'micro-community-map',
    number: '08',
    title: 'Micro-Community Map',
    subtitle: 'Cultivate a high-trust peer network of 20–50 builders, domain critics, and mentors.',
    pillar: 'Authority & Growth',
    caoStage: 'orchestrator',
    estimatedTime: '20 minutes',
    artifactProduced: 'High-Trust Peer Exchange & Contribution Map',
    relatedChapter: 'Chapter 9',
    relatedConcepts: ['The Micro-Community Engine', 'High-Trust Peer Circles vs. Vanity Reach'],
    purpose:
      'Replace exhausting social-feed chasing with genuine intellectual exchange among practitioners solving comparable architectural problems.',
    instructions: [
      'Identify 3 distinct circles: Deep Domain Peers (5–15 people), Cross-Disciplinary Challengers (Security/Product/Legal), and Emerging Engineers You Mentor.',
      'Focus on value-first reciprocity—sharing evaluation fixtures, candid feedback on specs, or curated bug reports—rather than networking asks.',
      'Schedule one lightweight recurring touchpoint per month.',
    ],
    fields: [
      {
        id: 'corePeerCircle',
        label: 'Close Practitioner Peers (5–15 Engineers Solving Hard Problems)',
        type: 'textarea',
        rows: 3,
        placeholder: 'List roles/communities (or anonymized peer archetypes) whose architectural rigor challenges yours...',
        hint: 'Look for honest critics who spot blind spots in your designs early.',
        exampleValue: '4 Staff/Principal peers from security infra, distributed DB meetups, and open-source eval maintainer threads.',
      },
      {
        id: 'crossFunctionalBridge',
        label: 'Cross-Functional Challengers (Security, Legal, Product, Research)',
        type: 'textarea',
        rows: 2,
        placeholder: 'Who pressure-tests your work from non-engineering angles?',
        hint: 'Orchestrators grow strongest where disciplines collide.',
        exampleValue: 'Product Legal Counsel for AI licensing questions; Staff AppSec Lead for agent threat-model reviews.',
      },
      {
        id: 'valueFirstContribution',
        label: 'Your Signature Value-First Contribution',
        type: 'textarea',
        rows: 3,
        placeholder: 'How do you make peers sharper without asking for favors upfront?',
        hint: 'e.g., Sharing anonymized evaluation rubrics, testing open-source releases cleanly, summarizing dense papers.',
        exampleValue: 'Offering thoughtful PR & ADR critiques with concrete reproduction harnesses; sharing sanitized post-mortem checklists every quarter.',
      },
      {
        id: 'monthlyCadence',
        label: 'Recurring Monthly Community Rhythm',
        type: 'text',
        placeholder: 'e.g., First-Friday 45-minute virtual architecture teardown with 4 peers',
        hint: 'Small consistent rituals beat large one-off events.',
        exampleValue: 'Monthly 45-min small-group system teardown + two thoughtful outreach notes per month replying directly to peers’ technical posts.',
      },
    ],
    buildMarkdown: (v) => `# Micro-Community Map

## Core Technical Peer Circle
${v.corePeerCircle || '_Not specified_'}

## Cross-Functional Challengers
${v.crossFunctionalBridge || '_Not specified_'}

## Signature Value-First Contribution
${v.valueFirstContribution || '_Not specified_'}

## Monthly Community Cadence
${v.monthlyCadence || '_Not specified_'}
`,
  },
  {
    slug: '30-60-90-plan',
    number: '09',
    title: '30/60/90-Day Plan',
    subtitle: 'Convert C.A.O. insights into a concrete 90-day transition sprint with verifiable milestones.',
    pillar: 'Career Strategy',
    caoStage: 'all',
    estimatedTime: '25 minutes',
    artifactProduced: 'Quarterly C.A.O. Execution Roadmap',
    relatedChapter: 'Chapter 11 & Closing Blueprint',
    relatedConcepts: ['Unlearn / Relearn', 'C.A.O. Transition', 'Proof of Work'],
    purpose:
      'Bridge knowledge and daily habit across three distinct 30-day horizons: Audit & Verification (Days 1–30), Architecture & Evals (Days 31–60), and Paper Trail & Governance (Days 61–90).',
    instructions: [
      'Complete your C.A.O. Self-Assessment at /assessment first so your highest-leverage dimension leads your sprint.',
      'Keep each 30-day block scoped to 2 concrete deliverables you can actually inspect at day 30, 60, and 90.',
      'Review this exported Markdown on Friday mornings against real shipped artifacts.',
    ],
    fields: [
      {
        id: 'northStarGoal',
        label: '90-Day Career / Skill North Star',
        type: 'text',
        placeholder: 'e.g., Transition from pure feature execution to owning evaluation & AI service boundaries',
        hint: 'Define one crisp outcome observable to your team or hiring managers by Day 90.',
        exampleValue: 'Own production evaluation harness + publish 2 public ADRs transitioning into Architect/Orchestrator scope.',
      },
      {
        id: 'days1To30',
        label: 'Days 1–30 · Audit, Unlearn & Tighten Creator Verification',
        type: 'textarea',
        rows: 3,
        placeholder: 'What syntax habit will you delegate cleanly, and what test/verification standard becomes mandatory?',
        hint: 'Target measurable weekly hygiene wins.',
        exampleValue: '1) Run C.A.O. Self-Assessment & time-log 2 sprints; 2) Enforce adversarial test-first pairing on all AI-assisted PRs; 3) Automate recurring script boilerplate safely.',
      },
      {
        id: 'days31To60',
        label: 'Days 31–60 · Design Boundaries, Evals & System Ownership',
        type: 'textarea',
        rows: 3,
        placeholder: 'What system invariant, ADR, or deterministic evaluation suite will you ship?',
        hint: 'Anchor Days 31–60 in concrete architecture artifacts.',
        exampleValue: '1) Author 2 structured ADRs separating deterministic cores from LLM steps; 2) Ship a 50-case golden evaluation suite gating CI prompt/model changes.',
      },
      {
        id: 'days61To90',
        label: 'Days 61–90 · Governance, Paper Trail & Peer Multiplier',
        type: 'textarea',
        rows: 3,
        placeholder: 'What Ethical AI Audit, War Story, or internal workshop will cement organizational trust?',
        hint: 'Make judgment visible beyond your immediate keyboard.',
        exampleValue: '1) Run Ethical AI Audit with security/product partners; 2) Publish sanitized War Story teardown; 3) Lead 45-min team post-mortem on agent boundary safety.',
      },
    ],
    buildMarkdown: (v) => `# 30 / 60 / 90-Day C.A.O. Transition Plan

**90-Day North Star:** ${v.northStarGoal || '_Not specified_'}

## Days 1–30 · Audit, Unlearn & Verification Rigor
${v.days1To30 || '_Not specified_'}

## Days 31–60 · Boundaries, ADRs & Evaluation Harnesses
${v.days31To60 || '_Not specified_'}

## Days 61–90 · Governance, Digital Paper Trail & Leadership
${v.days61To90 || '_Not specified_'}
`,
  },
];

export function findResourceWorkspace(slug: string): ResourceWorkspaceDefinition {
  return (
    RESOURCE_WORKSPACES.find((w) => w.slug === slug) || RESOURCE_WORKSPACES[0]
  );
}
