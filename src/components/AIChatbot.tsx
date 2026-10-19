import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  Calendar,
  Phone,
  Maximize2,
  Minimize2,
  RotateCcw,
  Volume2,
  VolumeX,
  Copy,
  Check,
  ArrowRight,
  TrendingUp,
  FileText,
  Users,
  Cpu,
  Layers,
  CheckCircle2,
  Sliders,
  Calculator,
  MessageCircle,
  FileSpreadsheet,
  UserCheck,
  ShieldCheck,
  Building,
} from 'lucide-react';
import { SiteSettings } from '../types';
import {
  ChatMessage,
  ChatAction,
  ChatSessionContext,
  sendChatMessage,
  extractContextFromMessages,
} from '../services/chatService';
import { submitCustomerLead } from '../services/leadService';
import { AI_AGENTS } from '../data/siteData';

interface AIChatbotProps {
  onOpenBooking: () => void;
  onOpenAudit: () => void;
  settings: SiteSettings;
}

export type ChatMode = 'chat' | 'audit_quiz' | 'agents' | 'roi_calc' | 'lead_form';

export interface QuickReplyButton {
  id: string;
  label: string;
  intent: 'audit' | 'consultation' | 'services' | 'whatsapp' | 'agents' | 'roi' | 'lead';
  prompt: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  description: string;
  style: string;
}

/**
 * Predefined array of quick-reply buttons for common user intents.
 */
export const PREDEFINED_QUICK_REPLIES: QuickReplyButton[] = [
  {
    id: 'qr-lead',
    label: 'Leave Contact (Sheets)',
    intent: 'lead',
    prompt: 'I want to submit an enquiry with my Gmail and mobile number for Google Sheets',
    icon: FileSpreadsheet,
    badge: 'Sheets Sync',
    description: 'Store Gmail & Mobile No directly in Google Sheets CRM',
    style: 'border-emerald-500/50 bg-emerald-950/60 text-emerald-200 hover:bg-emerald-900/80 hover:border-emerald-400',
  },
  {
    id: 'qr-audit',
    label: 'Get Business Audit',
    intent: 'audit',
    prompt: 'Get Business Audit',
    icon: Sparkles,
    badge: 'Popular',
    description: 'Diagnose bottlenecks in 60s & calculate ROI',
    style: 'border-cyan-500/50 bg-cyan-950/60 text-cyan-200 hover:bg-cyan-900/80 hover:border-cyan-400',
  },
  {
    id: 'qr-consultation',
    label: 'Book Consultation',
    intent: 'consultation',
    prompt: 'Book Consultation',
    icon: Calendar,
    badge: 'Free 30m',
    description: 'Schedule 1-on-1 strategy call with Sonendra',
    style: 'border-blue-500/50 bg-blue-950/60 text-blue-200 hover:bg-blue-900/80 hover:border-blue-400',
  },
  {
    id: 'qr-services',
    label: 'View Services',
    intent: 'services',
    prompt: 'View Services',
    icon: Layers,
    description: 'Audits, Implementation sprints & Retainers',
    style: 'border-emerald-500/50 bg-emerald-950/60 text-emerald-200 hover:bg-emerald-900/80 hover:border-emerald-400',
  },
  {
    id: 'qr-whatsapp',
    label: 'Talk on WhatsApp',
    intent: 'whatsapp',
    prompt: 'I want to talk with Sonendra Kumar on WhatsApp',
    icon: MessageCircle,
    description: 'Direct WhatsApp message to +91 97614 40027',
    style: 'border-green-500/50 bg-green-950/60 text-green-200 hover:bg-green-900/80 hover:border-green-400',
  },
  {
    id: 'qr-agents',
    label: 'Explore AI Agents',
    intent: 'agents',
    prompt: 'What autonomous AI agents do you offer?',
    icon: Cpu,
    description: 'WhatsApp, Document, Sales, Support agents',
    style: 'border-purple-500/50 bg-purple-950/60 text-purple-200 hover:bg-purple-900/80 hover:border-purple-400',
  },
  {
    id: 'qr-roi',
    label: 'Calculate ROI',
    intent: 'roi',
    prompt: 'Calculate ROI for our team',
    icon: Calculator,
    description: 'Estimate hours & financial savings',
    style: 'border-amber-500/50 bg-amber-950/60 text-amber-200 hover:bg-amber-900/80 hover:border-amber-400',
  },
];

const INITIAL_WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome-1',
  role: 'assistant',
  content: `👋 Hello! I am the **GrowthLeap AI Assistant**.\n\nWe build custom, production-ready AI automations and autonomous agents for **MSMEs, Exporters, Importers, and Manufacturers** in India and worldwide.\n\nHow can I help accelerate your business today? Choose a quick intent below, leave your contact details for our **Google Sheets CRM**, or type any question:`,
  timestamp: 'Just now',
  source: 'knowledge_engine',
  actions: [
    { label: '📋 Leave Contact Details (Sheets)', type: 'prompt', value: 'I want to submit an enquiry with my contact details' },
    { label: '⚡ Get Business Audit', type: 'audit' },
    { label: '📅 Book Consultation', type: 'booking' },
    {
      label: '💬 WhatsApp Sonendra (9761440027)',
      type: 'whatsapp',
      value: `https://wa.me/919761440027?text=${encodeURIComponent(
        'Hi Sonendra / GrowthLeap AI, I am chatting with your AI assistant and want to discuss automating our business.'
      )}`,
    },
  ],
};

const SESSION_STORAGE_KEY = 'growthleap_chat_session_v2';

interface ChatSessionState {
  messages: ChatMessage[];
  activeMode: ChatMode;
  sessionContext: ChatSessionContext;
  auditStep: number;
  auditAnswers: {
    industry: string;
    teamSize: string;
    bottleneck: string;
  };
  roiStaff: number;
  roiManualHours: number;
  roiHourlyCost: number;
  isOpen: boolean;
}

export const AIChatbot: React.FC<AIChatbotProps> = ({
  onOpenBooking,
  onOpenAudit,
  settings,
}) => {
  // Read session storage to maintain conversation state during the current session
  const getInitialSession = (): Partial<ChatSessionState> => {
    try {
      const raw = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (e) {
      console.warn('Could not read session state from sessionStorage', e);
    }
    return {};
  };

  const initialSession = getInitialSession();

  const [isOpen, setIsOpen] = useState<boolean>(initialSession.isOpen ?? false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeMode, setActiveMode] = useState<ChatMode>(initialSession.activeMode || 'chat');
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(
    initialSession.messages && initialSession.messages.length > 1 ? false : true
  );
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Active Session Context State (remembers industry, tools, challenges, intents)
  const [sessionContext, setSessionContext] = useState<ChatSessionContext>(
    initialSession.sessionContext || {}
  );

  // In-chat Interactive Audit Quiz state
  const [auditStep, setAuditStep] = useState<number>(initialSession.auditStep || 0);
  const [auditAnswers, setAuditAnswers] = useState(
    initialSession.auditAnswers || {
      industry: '',
      teamSize: '',
      bottleneck: '',
    }
  );

  // In-chat Customer Lead Form state (for Google Sheets storage)
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadCompany, setLeadCompany] = useState('');
  const [leadInquiry, setLeadInquiry] = useState('');
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [leadSubmittedSuccess, setLeadSubmittedSuccess] = useState<{ id: string; syncedToGoogleSheets: boolean } | null>(null);

  // In-chat ROI Calculator state
  const [roiStaff, setRoiStaff] = useState<number>(initialSession.roiStaff || 10);
  const [roiManualHours, setRoiManualHours] = useState<number>(initialSession.roiManualHours || 3);
  const [roiHourlyCost, setRoiHourlyCost] = useState<number>(initialSession.roiHourlyCost || 350);

  // Messages list initialized from session or default
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (initialSession.messages && Array.isArray(initialSession.messages) && initialSession.messages.length > 0) {
      return initialSession.messages;
    }
    return [INITIAL_WELCOME_MESSAGE];
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Sync state to sessionStorage whenever it changes to maintain session persistence
  useEffect(() => {
    try {
      const sessionState: ChatSessionState = {
        messages,
        activeMode,
        sessionContext,
        auditStep,
        auditAnswers,
        roiStaff,
        roiManualHours,
        roiHourlyCost,
        isOpen,
      };
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionState));
    } catch (e) {
      console.warn('Failed to save chat session', e);
    }
  }, [
    messages,
    activeMode,
    sessionContext,
    auditStep,
    auditAnswers,
    roiStaff,
    roiManualHours,
    roiHourlyCost,
    isOpen,
  ]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, activeMode]);

  // Handle Text-to-Speech
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    if (!audioEnabled) return;

    // Clean markdown formatting
    const cleanText = text.replace(/[*_#`[\]()]/g, ' ');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const toggleAudio = () => {
    if (audioEnabled) {
      window.speechSynthesis.cancel();
      setAudioEnabled(false);
    } else {
      setAudioEnabled(true);
      speakText('Voice output enabled. I will read responses aloud for you.');
    }
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetChat = () => {
    window.speechSynthesis?.cancel();
    try {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    } catch (e) {}

    const freshWelcome: ChatMessage = {
      id: `welcome-${Date.now()}`,
      role: 'assistant',
      content: `Conversation restarted! How can GrowthLeap AI assist your operations today? You can choose a quick intent below, leave your contact details for our **Google Sheets CRM**, ask about our **AI Efficiency Audit**, or chat directly with **Sonendra Kumar** on WhatsApp (+91 97614 40027).`,
      timestamp: 'Just now',
      source: 'knowledge_engine',
      actions: [
        { label: '📋 Leave Contact Details (Sheets)', type: 'prompt', value: 'I want to submit an enquiry with my contact details' },
        { label: '⚡ Get Business Audit', type: 'audit' },
        { label: '📅 Book Consultation', type: 'booking' },
        {
          label: '💬 WhatsApp +91 97614 40027',
          type: 'whatsapp',
          value: `https://wa.me/919761440027?text=${encodeURIComponent(
            'Hi Sonendra / GrowthLeap AI, I would like to schedule an automation review.'
          )}`,
        },
      ],
    };

    setMessages([freshWelcome]);
    setActiveMode('chat');
    setSessionContext({});
    setAuditStep(0);
    setAuditAnswers({ industry: '', teamSize: '', bottleneck: '' });
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    // Detect if user is asking to leave contact details
    const lowerText = text.toLowerCase();
    if (
      lowerText.includes('leave contact') ||
      lowerText.includes('submit contact') ||
      lowerText.includes('add contact') ||
      lowerText.includes('google sheet') ||
      lowerText.includes('enquiry form') ||
      lowerText.includes('contact details')
    ) {
      setInputMessage('');
      setActiveMode('lead_form');
      return;
    }

    setInputMessage('');
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    // Proactive background lead detection: If message contains Gmail/Email or Phone Number, capture lead
    const emailRegex = /[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}/i;
    const phoneRegex = /(?:\+?91[\s-]?)?[6-9]\d{9}/;
    const foundEmail = text.match(emailRegex);
    const foundPhone = text.match(phoneRegex);

    if (foundEmail || foundPhone) {
      submitCustomerLead(
        {
          name: sessionContext.industry ? `${sessionContext.industry} Visitor` : 'Chat Visitor',
          email: foundEmail ? foundEmail[0] : '',
          phone: foundPhone ? foundPhone[0] : '',
          company: '',
          inquiry: text,
          source: 'chatbot',
          bottleneck: sessionContext.challenge,
        },
        settings
      ).catch((e) => console.warn('Background lead capture error', e));
    }

    // Extract and accumulate conversation context to maintain ongoing session memory
    const updatedContext = extractContextFromMessages(newMessages, sessionContext);
    setSessionContext(updatedContext);

    try {
      const history = newMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await sendChatMessage(history, updatedContext, settings);

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: res.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: res.source as any,
        actions: res.actions,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      if (audioEnabled) {
        speakText(res.reply);
      }
    } catch (err) {
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: `I'm having trouble connecting to the network right now. You can talk directly with our founder Sonendra Kumar on WhatsApp at **+91 97614 40027** or leave your contact details in our **Google Sheets form**.`,
        timestamp: 'Just now',
        actions: [
          {
            label: '💬 Message on WhatsApp (9761440027)',
            type: 'whatsapp',
            value: `https://wa.me/919761440027?text=${encodeURIComponent(
              'Hi Sonendra, connecting via GrowthLeap AI website.'
            )}`,
          },
          { label: '📋 Leave Contact Details (Sheets)', type: 'prompt', value: 'I want to submit an enquiry with my contact details' },
          { label: '📅 Book Consultation', type: 'booking' },
        ],
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Quick-Reply Button Click Handler
  const handleQuickReply = (qr: QuickReplyButton) => {
    // Record intent into session context
    setSessionContext((prev) => ({
      ...prev,
      lastIntent: qr.label,
    }));

    if (qr.intent === 'lead' || qr.id === 'qr-lead') {
      setActiveMode('lead_form');
    } else if (qr.intent === 'audit') {
      setActiveMode('audit_quiz');
      setAuditStep(1);
    } else if (qr.intent === 'consultation') {
      onOpenBooking();
      handleSendMessage('Book Consultation');
    } else if (qr.intent === 'services') {
      setActiveMode('chat');
      handleSendMessage('View Services');
    } else if (qr.intent === 'whatsapp') {
      window.open(
        `https://wa.me/919761440027?text=${encodeURIComponent(
          'Hi Sonendra / GrowthLeap AI, I am chatting with your AI assistant and want to discuss automating our business.'
        )}`,
        '_blank'
      );
    } else if (qr.intent === 'agents') {
      setActiveMode('agents');
    } else if (qr.intent === 'roi') {
      setActiveMode('roi_calc');
    } else {
      handleSendMessage(qr.prompt);
    }
  };

  const handleActionClick = (action: ChatAction) => {
    if (action.type === 'booking') {
      onOpenBooking();
      setIsOpen(false);
    } else if (action.type === 'audit') {
      setActiveMode('audit_quiz');
      setAuditStep(1);
    } else if (action.type === 'whatsapp') {
      window.open(
        action.value ||
          `https://wa.me/919761440027?text=${encodeURIComponent(
            'Hi Sonendra, I am contacting you from the GrowthLeap AI website.'
          )}`,
        '_blank'
      );
    } else if (action.type === 'url' && action.value) {
      window.open(action.value, '_blank');
    } else if (action.type === 'prompt' && action.value) {
      handleSendMessage(action.value);
    }
  };

  // Handle direct in-chat lead submission for Google Sheets
  const handleLeadFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadEmail && !leadPhone) return;

    setIsSubmittingLead(true);

    try {
      const res = await submitCustomerLead(
        {
          name: leadName || 'Website Lead',
          email: leadEmail,
          phone: leadPhone,
          company: leadCompany,
          inquiry: leadInquiry || 'General automation enquiry submitted via Chatbot',
          source: 'chatbot',
          auditScore: undefined,
          bottleneck: sessionContext.challenge || undefined,
        },
        settings
      );

      setLeadSubmittedSuccess({
        id: res.lead.id,
        syncedToGoogleSheets: res.syncedToGoogleSheets,
      });

      // Inject confirmation cards into chat history
      const confirmationUserMsg: ChatMessage = {
        id: `lead-user-${Date.now()}`,
        role: 'user',
        content: `Submitted Contact Details & Enquiry:\n- **Name**: ${leadName || 'Website Visitor'}\n- **Gmail / Email**: ${leadEmail}\n- **Mobile**: ${leadPhone}\n- **Company**: ${leadCompany || 'Not Specified'}\n- **Enquiry**: ${leadInquiry || 'Automation Consultation'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      const confirmationAssistantMsg: ChatMessage = {
        id: `lead-assistant-${Date.now()}`,
        role: 'assistant',
        content: `✅ **Thank you, ${leadName || 'Partner'}! Your contact details and enquiry have been received.**

- **Reference ID**: \`${res.lead.id}\`
- **Google Sheets Sync**: ${res.syncedToGoogleSheets ? '🟢 Synced directly to live Google Sheet' : '🟢 Logged in CRM database queue'}
- **Next Steps**: Founder **Sonendra Kumar** and our engineering team will review your enquiry and reach out via WhatsApp/Phone at **${leadPhone}** or Gmail at **${leadEmail}** within 4 business hours.

Feel free to connect right away on WhatsApp or book a calendar slot below!`,
        timestamp: 'Just now',
        source: 'knowledge_engine',
        actions: [
          {
            label: '💬 Chat with Sonendra on WhatsApp',
            type: 'whatsapp',
            value: `https://wa.me/919761440027?text=${encodeURIComponent(
              `Hi Sonendra, I just submitted an inquiry on GrowthLeap AI (Ref: ${res.lead.id}). My email is ${leadEmail} and mobile is ${leadPhone}. Let's discuss!`
            )}`,
          },
          { label: '📅 Book 30-Min Strategy Call', type: 'booking' },
          { label: '⚡ Run 60-Sec Audit', type: 'audit' },
        ],
      };

      setMessages((prev) => [...prev, confirmationUserMsg, confirmationAssistantMsg]);

      setTimeout(() => {
        setIsSubmittingLead(false);
        setActiveMode('chat');
        setLeadName('');
        setLeadEmail('');
        setLeadPhone('');
        setLeadCompany('');
        setLeadInquiry('');
      }, 1200);
    } catch (err) {
      setIsSubmittingLead(false);
      console.error('Lead submission failed', err);
    }
  };

  // Run in-chat interactive audit flow and update session context
  const handleAuditSelect = (field: 'industry' | 'teamSize' | 'bottleneck', val: string) => {
    const updated = { ...auditAnswers, [field]: val };
    setAuditAnswers(updated);

    if (field === 'industry') {
      setSessionContext((prev) => ({ ...prev, industry: val }));
      setAuditStep(2);
    } else if (field === 'teamSize') {
      setSessionContext((prev) => ({ ...prev, companySize: val }));
      setAuditStep(3);
    } else if (field === 'bottleneck') {
      setSessionContext((prev) => ({
        ...prev,
        challenge: val,
        hasRequestedAudit: true,
      }));

      // Calculate and generate diagnostic report
      const hoursSavedPerWeek =
        updated.teamSize === '1-10' ? 18 : updated.teamSize === '11-50' ? 45 : 90;
      const monthlySavingsINR = hoursSavedPerWeek * 4 * 450;

      const auditSummaryMessage: ChatMessage = {
        id: `audit-res-${Date.now()}`,
        role: 'assistant',
        content: `🎯 **Diagnostic Results for Your ${updated.industry.toUpperCase()} Business**:

- **Target Bottleneck**: ${val}
- **Estimated Hours Wasted**: ~${hoursSavedPerWeek} hours/week across your ${updated.teamSize} person team
- **Projected Value Reclaimed**: ~₹${monthlySavingsINR.toLocaleString('en-IN')}/month in operational overhead

**Recommended Next Step**:
We recommend deploying an **${updated.industry.includes('Export') ? 'Export AI Document & RFQ Agent' : 'Operations & Tally Sync Automation Pipeline'}**. 
Turnaround time: 10 to 14 business days with zero software replacement.`,
        timestamp: 'Just now',
        source: 'audit_result',
        actions: [
          { label: '📋 Leave Contact Details (Sheets)', type: 'prompt', value: 'I want to submit an enquiry with my contact details' },
          { label: '📅 Book Free Blueprint Review Call', type: 'booking' },
          {
            label: '💬 Send Audit to Sonendra on WhatsApp',
            type: 'whatsapp',
            value: `https://wa.me/919761440027?text=${encodeURIComponent(
              `Hi Sonendra, I ran the GrowthLeap AI in-chat audit for my ${updated.industry} business (Team: ${updated.teamSize}, Main Bottleneck: ${val}). I would like to review the implementation blueprint.`
            )}`,
          },
          { label: '🛠️ View Services', type: 'prompt', value: 'View Services' },
        ],
      };

      setMessages((prev) => [...prev, auditSummaryMessage]);
      setActiveMode('chat');
      setAuditStep(0);
      if (audioEnabled) {
        speakText(`Audit complete! Estimated savings: ${hoursSavedPerWeek} hours per week.`);
      }
    }
  };

  // Render markdown text neatly
  const renderMessageContent = (content: string) => {
    const lines = content.split('\n');
    return (
      <div className="space-y-1.5 text-[13px] leading-relaxed">
        {lines.map((line, idx) => {
          if (!line.trim()) return <div key={idx} className="h-1" />;

          // Bullet points
          if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
            const clean = line.trim().replace(/^[-*]\s+/, '');
            return (
              <div key={idx} className="flex items-start gap-2 pl-1">
                <span className="text-cyan-400 font-bold shrink-0 mt-0.5">•</span>
                <span dangerouslySetInnerHTML={{ __html: formatBoldAndLinks(clean) }} />
              </div>
            );
          }

          // Numbered items
          if (/^\d+\.\s+/.test(line.trim())) {
            const numberMatch = line.trim().match(/^(\d+\.)\s+(.*)/);
            if (numberMatch) {
              return (
                <div key={idx} className="flex items-start gap-2 pl-1">
                  <span className="text-emerald-400 font-mono font-bold shrink-0 text-xs mt-0.5">
                    {numberMatch[1]}
                  </span>
                  <span dangerouslySetInnerHTML={{ __html: formatBoldAndLinks(numberMatch[2]) }} />
                </div>
              );
            }
          }

          return (
            <p key={idx} dangerouslySetInnerHTML={{ __html: formatBoldAndLinks(line) }} />
          );
        })}
      </div>
    );
  };

  const formatBoldAndLinks = (str: string) => {
    let res = str.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');
    res = res.replace(
      /`([^`]+)`/g,
      '<code class="bg-[#070B14] text-cyan-300 font-mono px-1.5 py-0.5 rounded text-xs border border-white/10">$1</code>'
    );
    res = res.replace(
      /\[(.*?)\]\((.*?)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-cyan-400 underline hover:text-cyan-300 font-medium">$1</a>'
    );
    return res;
  };

  // Calculated ROI values
  const monthlyHoursSaved = Math.round(roiStaff * roiManualHours * 22 * 0.7); // 70% efficiency reclaim over 22 work days
  const monthlyMoneySaved = monthlyHoursSaved * roiHourlyCost;
  const annualMoneySaved = monthlyMoneySaved * 12;

  const hasContextMemory = Boolean(
    sessionContext.industry ||
      sessionContext.companySize ||
      (sessionContext.mentionedTools && sessionContext.mentionedTools.length > 0)
  );

  return (
    <>
      {/* Floating Chat Trigger with Badge */}
      <div className="fixed bottom-20 right-5 sm:bottom-6 sm:right-56 z-40 flex items-center gap-3">
        {hasUnread && !isOpen && (
          <div
            onClick={() => setIsOpen(true)}
            className="hidden md:flex items-center gap-2 bg-[#0C1527] text-white border border-cyan-500/40 px-3.5 py-2 rounded-2xl shadow-xl shadow-cyan-950/50 cursor-pointer text-xs font-medium animate-pulse"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Chat with AI Consultant</span>
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
          </div>
        )}

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Open GrowthLeap AI Assistant"
          className="relative bg-gradient-to-r from-blue-600 via-[#005A9C] to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-2xl hover:shadow-cyan-500/30 transition-all flex items-center gap-2.5 group cursor-pointer border border-cyan-400/40"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-cyan-200 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#070B14] animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#070B14]" />
          </div>
          <span className="hidden sm:inline text-xs font-heading font-extrabold tracking-wide">
            Ask AI Assistant
          </span>
        </button>
      </div>

      {/* Main Chat Drawer / Modal */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-200 flex flex-col bg-[#0A1122] border border-cyan-500/30 shadow-2xl rounded-2xl overflow-hidden backdrop-blur-xl ${
            isExpanded
              ? 'inset-3 sm:inset-10'
              : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[94vw] sm:w-[480px] h-[670px] max-h-[92vh]'
          }`}
        >
          {/* Header */}
          <div className="bg-[#070B14] border-b border-white/10 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-cyan-900/40">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-[#070B14] rounded-full" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-heading font-bold text-white tracking-wide">
                    GrowthLeap AI Assistant
                  </h3>
                  <span className="text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800/60 px-1.5 py-0.2 rounded font-mono">
                    ONLINE
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
                  <span>Founder: Sonendra Kumar</span>
                  <span>•</span>
                  <a
                    href="https://wa.me/919761440027"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline"
                  >
                    +91 97614 40027
                  </a>
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1 text-slate-400">
              <button
                onClick={toggleAudio}
                title={audioEnabled ? 'Mute voice responses' : 'Enable voice read-out'}
                className={`p-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-colors cursor-pointer ${
                  audioEnabled ? 'text-cyan-400 bg-cyan-950/60' : ''
                }`}
              >
                {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                onClick={handleResetChat}
                title="Restart conversation session"
                className="p-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsExpanded((prev) => !prev)}
                title={isExpanded ? 'Minimize' : 'Maximize'}
                className="p-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-colors cursor-pointer hidden sm:block"
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-colors cursor-pointer ml-1"
              >
                <X className="w-5 h-5 text-slate-300" />
              </button>
            </div>
          </div>

          {/* Active Session Memory Indicator Bar */}
          {hasContextMemory && (
            <div className="flex items-center gap-2 px-3 py-1 bg-[#060D1A] text-[10px] text-cyan-300/80 border-b border-white/5 font-mono overflow-x-auto no-scrollbar">
              <span className="text-slate-500 shrink-0">Session Memory:</span>
              {sessionContext.industry && (
                <span className="bg-cyan-950 border border-cyan-800/60 text-cyan-300 px-1.5 py-0.2 rounded shrink-0">
                  {sessionContext.industry}
                </span>
              )}
              {sessionContext.companySize && (
                <span className="bg-blue-950 border border-blue-800/60 text-blue-300 px-1.5 py-0.2 rounded shrink-0">
                  Team: {sessionContext.companySize}
                </span>
              )}
              {sessionContext.mentionedTools && sessionContext.mentionedTools.length > 0 && (
                <span className="bg-emerald-950 border border-emerald-800/60 text-emerald-300 px-1.5 py-0.2 rounded shrink-0">
                  Tools: {sessionContext.mentionedTools.join(', ')}
                </span>
              )}
            </div>
          )}

          {/* Quick Capability Sub-Tabs */}
          <div className="bg-[#0C1527] px-3 py-1.5 border-b border-white/5 flex items-center justify-between text-[11px] overflow-x-auto no-scrollbar gap-1">
            <button
              onClick={() => setActiveMode('chat')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                activeMode === 'chat'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-3 h-3" />
              Live Chat
            </button>

            <button
              onClick={() => setActiveMode('lead_form')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                activeMode === 'lead_form'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileSpreadsheet className="w-3 h-3 text-emerald-400" />
              Leave Contact (Sheets)
            </button>

            <button
              onClick={() => {
                setActiveMode('audit_quiz');
                setAuditStep(1);
              }}
              className={`px-2.5 py-1 rounded-md font-medium transition-all whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                activeMode === 'audit_quiz'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3 h-3 text-cyan-400" />
              60s Audit
            </button>

            <button
              onClick={() => setActiveMode('agents')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                activeMode === 'agents'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Cpu className="w-3 h-3 text-blue-400" />
              AI Agents
            </button>

            <button
              onClick={() => setActiveMode('roi_calc')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                activeMode === 'roi_calc'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Calculator className="w-3 h-3 text-emerald-400" />
              ROI Calc
            </button>
          </div>

          {/* Mode 1: Main Conversation View */}
          {activeMode === 'chat' && (
            <>
              {/* Message List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm bg-gradient-to-b from-[#0A1122] to-[#070B14]">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 px-1">
                      <span className="text-[10px] text-slate-500">
                        {msg.role === 'user' ? 'You' : 'GrowthLeap AI'} • {msg.timestamp}
                      </span>
                      {msg.role === 'assistant' && (
                        <button
                          onClick={() => handleCopyMessage(msg.id, msg.content)}
                          title="Copy response"
                          className="text-slate-500 hover:text-cyan-400 transition-colors p-0.5 cursor-pointer"
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      )}
                    </div>

                    <div
                      className={`max-w-[88%] sm:max-w-[84%] rounded-2xl p-3.5 shadow-md ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-r from-blue-600 to-[#005A9C] text-white rounded-br-xs'
                          : 'bg-[#101B30] text-slate-200 border border-white/10 rounded-bl-xs'
                      }`}
                    >
                      {renderMessageContent(msg.content)}

                      {/* Interactive Action Buttons */}
                      {msg.actions && msg.actions.length > 0 && (
                        <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-wrap gap-1.5">
                          {msg.actions.map((act, i) => (
                            <button
                              key={i}
                              onClick={() => handleActionClick(act)}
                              className="text-xs bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-200 px-2.5 py-1 rounded-lg transition-colors font-medium flex items-center gap-1 cursor-pointer"
                            >
                              <span>{act.label}</span>
                              <ArrowRight className="w-3 h-3 text-cyan-400" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-center gap-2 text-cyan-400 text-xs bg-[#101B30] border border-cyan-500/20 px-3.5 py-2.5 rounded-xl w-fit">
                    <Sparkles className="w-4 h-4 animate-spin text-cyan-400" />
                    <span>Analyzing operational context...</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Pre-Defined Quick-Reply Buttons for Common Intents */}
              <div className="bg-[#090F1E] border-t border-white/10 px-3 py-2">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    Quick Intents:
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Sheets Sync Active
                  </span>
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                  {PREDEFINED_QUICK_REPLIES.map((qr) => {
                    const IconComponent = qr.icon;
                    return (
                      <button
                        key={qr.id}
                        onClick={() => handleQuickReply(qr)}
                        title={qr.description}
                        className={`text-xs whitespace-nowrap px-2.5 py-1.5 rounded-lg border font-medium transition-all flex items-center gap-1.5 cursor-pointer shrink-0 shadow-sm ${qr.style}`}
                      >
                        <IconComponent className="w-3 h-3" />
                        <span>{qr.label}</span>
                        {qr.badge && (
                          <span className="text-[9px] bg-white/15 px-1 py-0.2 rounded font-mono font-bold">
                            {qr.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Input Area */}
              <div className="bg-[#070B14] p-3 border-t border-white/10">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-end gap-2"
                >
                  <textarea
                    ref={inputRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Type inquiry or share Gmail & Mobile number for Google Sheets..."
                    rows={1}
                    className="flex-1 bg-[#101B30] text-white border border-white/15 focus:border-cyan-500 rounded-xl px-3 py-2 text-xs placeholder:text-slate-500 focus:outline-none resize-none min-h-[38px] max-h-[80px]"
                  />

                  <button
                    type="submit"
                    disabled={!inputMessage.trim() || isLoading}
                    className="bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:hover:bg-cyan-500 text-black p-2.5 rounded-xl transition-all font-bold cursor-pointer shrink-0 shadow-md shadow-cyan-950"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

                <div className="flex items-center justify-between mt-2 pt-1 border-t border-white/5 text-[10px] text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>Gemini 3.8 & Knowledge Engine</span>
                    <button
                      onClick={() => setActiveMode('lead_form')}
                      className="text-emerald-400 hover:underline cursor-pointer ml-1"
                    >
                      • Submit Contact Form
                    </button>
                  </div>
                  <a
                    href="https://wa.me/919761440027"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline flex items-center gap-1 font-medium"
                  >
                    <Phone className="w-2.5 h-2.5" />
                    WhatsApp (+91 97614 40027)
                  </a>
                </div>
              </div>
            </>
          )}

          {/* Mode 5: Customer Data & Enquiry Collection (for Google Sheets storage) */}
          {activeMode === 'lead_form' && (
            <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-[#0A1122] to-[#070B14] space-y-4">
              <div className="text-center pb-2 border-b border-white/10">
                <div className="inline-flex items-center gap-1.5 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold mb-1">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                  GOOGLE SHEETS LEAD INGESTION
                </div>
                <h4 className="text-sm font-heading font-bold text-white">
                  Leave Your Contact Details & Enquiry
                </h4>
                <p className="text-[11px] text-slate-400">
                  Your enquiry is securely saved to our Google Sheets lead database. Founder Sonendra Kumar will contact you directly.
                </p>
              </div>

              <form onSubmit={handleLeadFormSubmit} className="space-y-3 bg-[#101B30] p-4 rounded-xl border border-white/10">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    placeholder="e.g. Ramesh Patel"
                    className="w-full bg-[#070B14] text-white border border-white/15 focus:border-cyan-500 rounded-lg px-3 py-2 text-xs placeholder:text-slate-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Gmail / Work Email
                    </label>
                    <input
                      type="email"
                      required
                      value={leadEmail}
                      onChange={(e) => setLeadEmail(e.target.value)}
                      placeholder="e.g. ramesh@gmail.com"
                      className="w-full bg-[#070B14] text-white border border-white/15 focus:border-cyan-500 rounded-lg px-3 py-2 text-xs placeholder:text-slate-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Mobile Number / WhatsApp
                    </label>
                    <input
                      type="tel"
                      required
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      placeholder="e.g. +91 98200 XXXXX"
                      className="w-full bg-[#070B14] text-white border border-white/15 focus:border-cyan-500 rounded-lg px-3 py-2 text-xs placeholder:text-slate-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Company / Business Type (Optional)
                  </label>
                  <input
                    type="text"
                    value={leadCompany}
                    onChange={(e) => setLeadCompany(e.target.value)}
                    placeholder="e.g. Patel Engineering / Exporter"
                    className="w-full bg-[#070B14] text-white border border-white/15 focus:border-cyan-500 rounded-lg px-3 py-2 text-xs placeholder:text-slate-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Your Specific Enquiry / Automation Requirement
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={leadInquiry}
                    onChange={(e) => setLeadInquiry(e.target.value)}
                    placeholder="e.g. We want to automate invoice data entry into Tally Prime and receive shipping updates on WhatsApp..."
                    className="w-full bg-[#070B14] text-white border border-white/15 focus:border-cyan-500 rounded-lg px-3 py-2 text-xs placeholder:text-slate-500 focus:outline-none resize-none"
                  />
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={isSubmittingLead}
                    className="w-full py-2.5 px-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:brightness-110 text-black font-heading font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-950 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                  >
                    {isSubmittingLead ? (
                      <>
                        <Sparkles className="w-3.5 h-3.5 animate-spin text-black" />
                        <span>Syncing to Google Sheets...</span>
                      </>
                    ) : (
                      <>
                        <FileSpreadsheet className="w-3.5 h-3.5 text-black" />
                        <span>Save Contact & Sync to Google Sheets</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-white/5">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <ShieldCheck className="w-3 h-3" />
                    Strict confidentiality guaranteed
                  </span>
                  <span>Dispatched in &lt; 4 business hours</span>
                </div>
              </form>

              <div className="flex justify-between items-center text-xs pt-1">
                <button
                  onClick={() => setActiveMode('chat')}
                  className="text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <ArrowRight className="w-3 h-3 rotate-180" />
                  Back to Live Chat
                </button>
                <a
                  href="https://wa.me/919761440027"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <Phone className="w-3 h-3" />
                  Talk directly on WhatsApp
                </a>
              </div>
            </div>
          )}

          {/* Mode 2: In-Chat Interactive 60s Audit Quiz */}
          {activeMode === 'audit_quiz' && (
            <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-[#0A1122] to-[#070B14] space-y-4">
              <div className="text-center pb-2 border-b border-white/10">
                <div className="inline-flex items-center gap-1.5 bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold mb-1">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  IN-CHAT 60s DIAGNOSTIC
                </div>
                <h4 className="text-sm font-heading font-bold text-white">
                  Diagnose Your Automation Bottlenecks
                </h4>
                <p className="text-[11px] text-slate-400">
                  Answer 3 quick questions to receive a tailored automation blueprint.
                </p>
              </div>

              {auditStep === 1 && (
                <div className="space-y-3">
                  <span className="text-xs font-semibold text-cyan-400 font-mono">
                    STEP 1 of 3: What is your primary business type?
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { id: 'Exporter', label: '🚢 Exporter (Goods, Textiles, Engineering, Chemicals)' },
                      { id: 'Importer', label: '📦 Importer (Raw materials, Components, Finished goods)' },
                      { id: 'Manufacturer', label: '🏭 Manufacturer (Factory, Auto ancillary, Production)' },
                      { id: 'Trading / MSME', label: '💼 B2B Trading & Distribution (High transaction volume)' },
                      { id: 'Services', label: '🛠️ Professional Services & Consulting' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleAuditSelect('industry', item.id)}
                        className="text-left text-xs bg-[#101B30] hover:bg-cyan-950/80 border border-white/10 hover:border-cyan-500/50 p-2.5 rounded-xl text-slate-200 transition-colors flex items-center justify-between cursor-pointer"
                      >
                        <span>{item.label}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {auditStep === 2 && (
                <div className="space-y-3">
                  <span className="text-xs font-semibold text-cyan-400 font-mono">
                    STEP 2 of 3: How large is your operational & administrative team?
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { id: '1-10', label: '👥 1 to 10 employees (Founder-heavy operations)' },
                      { id: '11-50', label: '🏢 11 to 50 employees (Growing departments, manual spreadsheets)' },
                      { id: '50+', label: '🏬 50+ employees (High volume transactions, multiple branches)' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleAuditSelect('teamSize', item.id)}
                        className="text-left text-xs bg-[#101B30] hover:bg-cyan-950/80 border border-white/10 hover:border-cyan-500/50 p-2.5 rounded-xl text-slate-200 transition-colors flex items-center justify-between cursor-pointer"
                      >
                        <span>{item.label}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {auditStep === 3 && (
                <div className="space-y-3">
                  <span className="text-xs font-semibold text-cyan-400 font-mono">
                    STEP 3 of 3: What is your #1 biggest operational bottleneck?
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      {
                        id: 'Slow Lead Response & WhatsApp Mess',
                        label: '📱 Inbound WhatsApp leads take hours to respond & RFQs get lost',
                      },
                      {
                        id: 'Document & ICEGATE Clerical Errors',
                        label: '📄 Shipping Bills, Packing Lists & Invoices typed manually with errors',
                      },
                      {
                        id: 'Tally & Accounting Data Entry',
                        label: '📊 Piles of purchase bills waiting for Tally entry & GST reconciliation',
                      },
                      {
                        id: 'Customer Tracking & Support Queries',
                        label: '🚚 Repetitive customer calls asking for shipment & order status',
                      },
                      {
                        id: 'Outdated CRM & Sales Quoting',
                        label: '📝 Sales reps spend hours creating quotes instead of closing deals',
                      },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleAuditSelect('bottleneck', item.id)}
                        className="text-left text-xs bg-[#101B30] hover:bg-cyan-950/80 border border-white/10 hover:border-cyan-500/50 p-2.5 rounded-xl text-slate-200 transition-colors flex items-center justify-between cursor-pointer"
                      >
                        <span>{item.label}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2 flex justify-between items-center text-xs">
                <button
                  onClick={() => setActiveMode('chat')}
                  className="text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <ArrowRight className="w-3 h-3 rotate-180" />
                  Back to Chat
                </button>
                <button
                  onClick={() => setAuditStep(1)}
                  className="text-cyan-400 hover:underline cursor-pointer"
                >
                  Start Over
                </button>
              </div>
            </div>
          )}

          {/* Mode 3: AI Agents Showcase */}
          {activeMode === 'agents' && (
            <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-[#0A1122] to-[#070B14] space-y-3">
              <div className="pb-1 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-heading font-bold text-white flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-cyan-400" />
                    GrowthLeap Autonomous Agents Suite
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Specialized AI workers deployed with human guardrails.
                  </p>
                </div>
                <button
                  onClick={() => setActiveMode('chat')}
                  className="text-xs text-cyan-400 hover:underline cursor-pointer"
                >
                  Chat View
                </button>
              </div>

              <div className="space-y-2.5">
                {AI_AGENTS.map((agent) => (
                  <div
                    key={agent.id}
                    className="bg-[#101B30] border border-white/10 p-3 rounded-xl hover:border-cyan-500/40 transition-all"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h5 className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-cyan-400" />
                        {agent.name}
                      </h5>
                      <span className="text-[10px] bg-blue-950 text-blue-300 px-1.5 py-0.5 rounded font-mono">
                        Ready
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-1">{agent.role}</p>

                    <div className="mt-2 bg-[#070B14] p-2 rounded-lg border border-white/5 text-[10px] text-slate-400 flex items-center justify-between">
                      <span className="text-cyan-300">⚡ {agent.benefit}</span>
                    </div>

                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() => {
                          setActiveMode('chat');
                          handleSendMessage(`Tell me how to implement the ${agent.name} for my company.`);
                        }}
                        className="text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800/60 px-2 py-1 rounded-md hover:bg-cyan-900 cursor-pointer font-medium"
                      >
                        Ask About This Agent
                      </button>

                      <a
                        href={`https://wa.me/919761440027?text=${encodeURIComponent(
                          `Hi Sonendra, I want to deploy the ${agent.name} for my business.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800/60 px-2 py-1 rounded-md hover:bg-emerald-900 cursor-pointer font-medium"
                      >
                        WhatsApp Deploy
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mode 4: Quick ROI Calculator */}
          {activeMode === 'roi_calc' && (
            <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-[#0A1122] to-[#070B14] space-y-4">
              <div className="pb-1 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-heading font-bold text-white flex items-center gap-1.5">
                    <Calculator className="w-4 h-4 text-emerald-400" />
                    Instant Automation ROI Calculator
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Estimate hours and financial capital reclaimed via AI workflows.
                  </p>
                </div>
                <button
                  onClick={() => setActiveMode('chat')}
                  className="text-xs text-cyan-400 hover:underline cursor-pointer"
                >
                  Chat View
                </button>
              </div>

              {/* Sliders */}
              <div className="space-y-3.5 bg-[#101B30] p-3.5 rounded-xl border border-white/10">
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Operational & Admin Staff:</span>
                    <span className="text-cyan-400 font-bold font-mono">{roiStaff} people</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="50"
                    value={roiStaff}
                    onChange={(e) => setRoiStaff(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Manual Work per Person:</span>
                    <span className="text-cyan-400 font-bold font-mono">{roiManualHours} hours/day</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="6"
                    value={roiManualHours}
                    onChange={(e) => setRoiManualHours(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Avg Hourly Compensation:</span>
                    <span className="text-cyan-400 font-bold font-mono">₹{roiHourlyCost}/hr</span>
                  </div>
                  <input
                    type="range"
                    min="200"
                    max="1000"
                    step="50"
                    value={roiHourlyCost}
                    onChange={(e) => setRoiHourlyCost(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>
              </div>

              {/* Projected Results Card */}
              <div className="bg-gradient-to-br from-[#070B14] to-[#12223D] border border-cyan-500/40 p-4 rounded-xl space-y-2">
                <span className="text-[10px] text-cyan-400 font-mono font-bold tracking-wider uppercase">
                  Projected Reclaimed Capacity
                </span>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="bg-[#0C1527] p-2.5 rounded-lg border border-white/5">
                    <span className="text-[10px] text-slate-400">Monthly Hours Reclaimed</span>
                    <div className="text-base font-extrabold text-cyan-300 font-mono">
                      ~{monthlyHoursSaved} hrs
                    </div>
                  </div>

                  <div className="bg-[#0C1527] p-2.5 rounded-lg border border-white/5">
                    <span className="text-[10px] text-slate-400">Monthly Overhead Saved</span>
                    <div className="text-base font-extrabold text-emerald-400 font-mono">
                      ₹{monthlyMoneySaved.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <span className="text-xs text-slate-300">
                    Annual Value: <strong className="text-emerald-300">₹{annualMoneySaved.toLocaleString('en-IN')}</strong> (~${Math.round(annualMoneySaved / 87).toLocaleString()} USD)
                  </span>
                </div>
              </div>

              {/* Call to Actions */}
              <div className="space-y-2">
                <button
                  onClick={() => {
                    onOpenBooking();
                    setIsOpen(false);
                  }}
                  className="w-full bg-cyan-500 hover:bg-cyan-400 text-black py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-cyan-950"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Lock In Savings — Book Free 30-Min Strategy Call
                </button>

                <a
                  href={`https://wa.me/919761440027?text=${encodeURIComponent(
                    `Hi Sonendra, our team of ${roiStaff} spends ~${roiManualHours} hrs/day on manual tasks. Our projected savings is ₹${monthlyMoneySaved.toLocaleString(
                      'en-IN'
                    )}/mo. Let's discuss an automation roadmap.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-[#070B14] py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Discuss ROI on WhatsApp (+91 97614 40027)
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
