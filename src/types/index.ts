export type PageTab = 'home' | 'solutions' | 'industries' | 'agents' | 'audit' | 'use-cases' | 'how-it-works' | 'resources' | 'about' | 'contact';

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  targetAudience: string;
  duration: string;
  deliverables: string[];
  businessOutcomes: string[];
  popularFor: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  timeframe: string;
}

export interface SiteSettings {
  calendlyUrl: string;
  contactEmail: string;
  phone: string;
  whatsapp: string;
  address: string;
  founderName: string;
  founderLinkedIn: string;
  googleSheetsWebhookUrl?: string;
}

export interface CustomerLead {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  inquiry: string;
  source: 'chatbot' | 'audit_form' | 'contact_page' | 'booking_modal';
  auditScore?: number;
  bottleneck?: string;
  syncedToGoogleSheets?: boolean;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  industry: string;
  rating: number;
  highlightMetric: string;
  headline: string;
  quote: string;
  workflowsDeployed: string[];
  avatarInitial: string;
  avatarBgColor?: string;
  verifiedClient: boolean;
}

export interface ProblemCard {
  id: string;
  iconName: string;
  title: string;
  explanation: string;
  automationOpportunity: string;
}

export interface SolutionCard {
  id: string;
  iconName: string;
  title: string;
  description: string;
  features: string[];
  department: string;
}

export interface IndustryCard {
  id: string;
  name: string;
  tagline: string;
  visualType: 'export' | 'import' | 'msme' | 'manufacturing' | 'trading';
  solutions: string[];
  ctaLabel: string;
}

export interface AIAgentCard {
  id: string;
  name: string;
  role: string;
  description: string;
  miniWorkflow: { step1: string; step2: string; step3: string };
  connectsTo: string[];
  benefit: string;
}

export interface UseCaseItem {
  id: string;
  title: string;
  category: 'Sales' | 'Marketing' | 'Operations' | 'Customer Support' | 'Export' | 'Import' | 'MSME' | 'CRM' | 'WhatsApp' | 'Documents' | 'Reporting';
  problem: string;
  manualProcess: string;
  aiSolution: string;
  businessResult: string;
}

export interface AutomationScenario {
  id: string;
  clientType: string;
  industry: string;
  challenge: string;
  solution: string;
  technology: string[];
  implementation: string;
  measuredResult: string;
}

export interface ResourceCard {
  id: string;
  category: string;
  title: string;
  description: string;
  readTime: string;
  keyTakeaways: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface AuditQuestion {
  id: number;
  label: string;
  subtitle: string;
  options: { label: string; value: string; score: number }[];
}

export interface AuditReportResult {
  score: number;
  readinessLevel: 'High Automation Readiness' | 'Moderate Automation Readiness' | 'Immediate Opportunity';
  priorityOpportunities: string[];
  recommendedWorkflows: string[];
  recommendedAgents: string[];
  suggestedNextSteps: string[];
}
