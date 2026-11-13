export type PageId =
  | 'home'
  | 'book'
  | 'frameworks'
  | 'cao-framework'
  | 'framework-detail'
  | 'resources'
  | 'toolkit'
  | 'engineers'
  | 'students'
  | 'organizations'
  | 'manifesto'
  | 'author'
  | 'speaking'
  | 'press'
  | 'insights'
  | 'insight-detail'
  | 'ideas'
  | 'article-detail'
  | 'stories'
  | 'buy'
  | 'sample'
  | 'teams'
  | 'assessment'
  | 'blog'
  | 'blog-detail'
  | 'contact';

export interface CaseStudyItem {
  name: string;
  subtitle?: string;
  description: string;
}

export interface Chapter {
  number: number;
  part: string;
  partTitle: string;
  title: string;
  subtitle: string;
  summary: string;
  keyTakeaway: string;
  sampleExcerpt: string;
  readTime: string;
  infographicUrl?: string;
  infographicFallback?: string;
  caseStudies?: CaseStudyItem[];
  labTryThisWeek?: string;
  curatorChecklist?: string[];
  keyConcepts?: string[];
  whatIsChanging?: string[];
}

export interface SpecialInfographicSection {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  infographicUrl: string;
  infographicFallback: string;
  summary: string;
  keyTakeaway: string;
  featuredPeople?: { name: string; role: string; contribution: string }[];
  actionSteps?: { period: string; title: string; tasks: string[] }[];
}

export interface Framework {
  id: string;
  title: string;
  subtitle: string;
  category: 'core' | 'execution' | 'mindset' | 'governance' | 'authority';
  caoPhase: 'Creator' | 'Architect' | 'Orchestrator' | 'All';
  definition: string;
  whyItMatters: string;
  diagramDescription: string;
  realWorldApplication: string;
  tryItYourself: string;
  relatedChapter: string;
}

export interface ToolkitItem {
  id: string;
  name: string;
  category:
    | 'Learn'
    | 'Build'
    | 'AI Coding'
    | 'Agents'
    | 'Evaluation'
    | 'Observability'
    | 'Security'
    | 'Research'
    | 'Open Source'
    | 'Productivity'
    | 'Career';
  whatItDoes: string;
  bestFor: string;
  pricing: 'Free' | 'Freemium' | 'Open Source' | 'Paid';
  whyItMatters: string;
  lastReviewed: string;
  linkUrl: string;
}

export interface LabResource {
  id: string;
  title: string;
  category: 'ASSESS' | 'BUILD' | 'LEAD' | 'GROW' | 'EXECUTE';
  pillar?: 'Career Resources' | 'AI Engineering Resources' | 'Student Resources';
  relatedChapter?: string;
  targetAudience?: string;
  description: string;
  artifactProduced: string;
  estimatedTime: string;
  templateType: 'canvas' | 'checklist' | 'planner' | 'audit';
  defaultFields?: Record<string, string>;
}

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  topic: string;
  readTime: string;
  publishDate: string;
  leadParagraph: string;
  content: string[];
  keyQuote: string;
}

export interface ReaderStory {
  id: string;
  authorName: string;
  role: string;
  company: string;
  transformationLabel: 'Creator → Architect' | 'Student → AI Engineer' | 'Engineer → Technical Leader' | 'Builder → Orchestrator';
  startingPoint: string;
  whatChanged: string;
  whatIBuilt: string;
  whatHappened: string;
}

export interface AssessmentQuestion {
  id: number;
  scenario: string;
  options: {
    text: string;
    stage: 'creator' | 'architect' | 'orchestrator';
    explanation: string;
  }[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  mainCategory?: string;
  subCategory?: string;
  readTime: string;
  publishDate: string;
  syndicatedPlatform?: string;
  externalUrl?: string;
  isFeatured?: boolean;
  img?: string;
  summary?: string;
  keyQuote: string;
  leadParagraph: string;
  content: string[];
  tags: string[];
  benchmarks?: { label: string; value: string; note?: string }[];
  relatedFrameworkId?: string;
}
