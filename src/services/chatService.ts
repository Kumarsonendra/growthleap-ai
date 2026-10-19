import { SiteSettings } from '../types';

export interface ChatMessage {
  id: string;
  role: 'assistant' | 'user' | 'system';
  content: string;
  timestamp: string;
  source?: 'gemini' | 'knowledge_engine' | 'audit_result' | 'agent_card';
  actions?: ChatAction[];
  meta?: any;
}

export interface ChatAction {
  label: string;
  type: 'booking' | 'whatsapp' | 'audit' | 'url' | 'prompt' | 'roi';
  value?: string;
  icon?: string;
}

export interface ChatSessionContext {
  industry?: string;
  companySize?: string;
  challenge?: string;
  interestedService?: string;
  hasRequestedAudit?: boolean;
  hasRequestedConsultation?: boolean;
  mentionedTools?: string[];
  lastIntent?: string;
}

/**
 * Extracts and accumulates conversation context across session turns.
 */
export function extractContextFromMessages(
  messages: { role: string; content: string }[],
  existingContext: ChatSessionContext = {}
): ChatSessionContext {
  const ctx: ChatSessionContext = { ...existingContext };
  const toolsSet = new Set<string>(ctx.mentionedTools || []);

  for (const m of messages) {
    if (m.role !== 'user') continue;
    const text = m.content.toLowerCase();

    // Industry detection
    if (text.includes('export') || text.includes('shipping bill') || text.includes('icegate') || text.includes('port')) {
      ctx.industry = 'Exporters';
    } else if (text.includes('import') || text.includes('bill of entry') || text.includes('customs clearance')) {
      ctx.industry = 'Importers';
    } else if (text.includes('factory') || text.includes('manufacturing') || text.includes('production') || text.includes('plant')) {
      ctx.industry = 'Manufacturers';
    } else if (text.includes('trading') || text.includes('wholesale') || text.includes('distributor')) {
      ctx.industry = 'Trading Companies';
    } else if (text.includes('msme') || text.includes('small business')) {
      if (!ctx.industry) ctx.industry = 'MSME';
    }

    // Tools detection
    if (text.includes('tally')) toolsSet.add('Tally Prime');
    if (text.includes('zoho')) toolsSet.add('Zoho');
    if (text.includes('whatsapp')) toolsSet.add('WhatsApp Cloud API');
    if (text.includes('excel') || text.includes('spreadsheet')) toolsSet.add('Excel');
    if (text.includes('icegate')) toolsSet.add('ICEGATE');
    if (text.includes('sap')) toolsSet.add('SAP');

    // Intent detection
    if (text.includes('audit')) {
      ctx.hasRequestedAudit = true;
      ctx.lastIntent = 'Get Business Audit';
      ctx.interestedService = 'AI Efficiency Audit';
    }
    if (text.includes('book') || text.includes('consultation') || text.includes('appointment')) {
      ctx.hasRequestedConsultation = true;
      ctx.lastIntent = 'Book Consultation';
    }
    if (text.includes('service')) {
      ctx.lastIntent = 'View Services';
    }
    if (text.includes('agent')) {
      ctx.interestedService = 'Autonomous AI Agents';
      ctx.lastIntent = 'Explore AI Agents';
    }
    if (text.includes('retainer') || text.includes('partner')) {
      ctx.interestedService = 'AI Growth Partner Retainer';
    }
  }

  ctx.mentionedTools = Array.from(toolsSet);
  return ctx;
}

// Client service to communicate with backend /api/chat with instant client fallback
export async function sendChatMessage(
  messages: { role: string; content: string }[],
  userContext?: ChatSessionContext,
  settings?: SiteSettings
): Promise<{ reply: string; source: string; actions?: ChatAction[] }> {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, userContext }),
    });

    if (res.ok) {
      const data = await res.json();
      return {
        reply: data.reply,
        source: data.source || 'gemini',
        actions: inferActionsFromText(data.reply, settings),
      };
    }
  } catch (err) {
    console.info('Using client-side GrowthLeap intelligence engine (offline/static mode)');
  }

  // Pure client-side intelligence fallback
  const lastMsg = messages[messages.length - 1]?.content?.toLowerCase() || '';
  const fallback = generateClientReply(lastMsg, settings, userContext);
  return fallback;
}

function inferActionsFromText(text: string, settings?: SiteSettings): ChatAction[] {
  const actions: ChatAction[] = [];
  const lower = text.toLowerCase();

  if (lower.includes('strategy call') || lower.includes('book') || lower.includes('consultation')) {
    actions.push({
      label: '📅 Book Free 30-Min Strategy Call',
      type: 'booking',
    });
  }

  if (lower.includes('whatsapp') || lower.includes('sonendra') || lower.includes('9761440027')) {
    actions.push({
      label: '💬 WhatsApp Sonendra (+91 97614 40027)',
      type: 'whatsapp',
      value: `https://wa.me/919761440027?text=${encodeURIComponent(
        'Hi Sonendra, I was chatting with the GrowthLeap AI assistant on your website and would like to discuss automating our business.'
      )}`,
    });
  }

  if (lower.includes('audit') || lower.includes('roadmap')) {
    actions.push({
      label: '⚡ Run Free Automation Audit',
      type: 'audit',
    });
  }

  return actions;
}

function generateClientReply(
  query: string,
  settings?: SiteSettings,
  context?: any
): { reply: string; source: string; actions: ChatAction[] } {
  const whatsappUrl = `https://wa.me/919761440027?text=${encodeURIComponent(
    'Hi Sonendra / GrowthLeap AI, I am interested in exploring automation for my business.'
  )}`;

  // Quick Intent 1: View Services
  if (
    query.includes('view services') ||
    query.includes('our services') ||
    query.includes('what services') ||
    query === 'services' ||
    query.includes('services breakdown')
  ) {
    return {
      reply: `**GrowthLeap AI Core Services Suite**:

1. **AI Efficiency Audit (₹25,000 / $350 or Free Initial Consultation)**
   - 5 to 7 day comprehensive operational walkthrough.
   - We map where hours leak across spreadsheets, emails, and manual paperwork.
   - Deliverable: ROI-ranked Automation Architecture Blueprint with zero tool replacement.

2. **Project-Based Implementation (2–4 Week Sprints)**
   - Custom development and sandbox deployment of automated workflows.
   - Secure integrations with Tally, Zoho, WhatsApp Cloud API, and ICEGATE customs portal.
   - Zero-disruption guarantee with staff training and SOP documentation.

3. **AI Growth Partner Retainer (Monthly Partnership)**
   - Continuous operational scaling, model optimization, and prompt engineering.
   - Quarterly automation reviews, workflow expansions, and priority 24/7 SLA support.

Which service would you like to explore for your company?`,
      source: 'knowledge_engine',
      actions: [
        { label: '⚡ Get Business Audit', type: 'audit' },
        { label: '📅 Book Consultation', type: 'booking' },
        { label: '💬 WhatsApp Sonendra (9761440027)', type: 'whatsapp', value: whatsappUrl },
      ],
    };
  }

  // Quick Intent 2: Book Consultation
  if (
    query.includes('book consultation') ||
    query.includes('book a call') ||
    query.includes('schedule a call') ||
    query.includes('strategy call') ||
    query === 'book' ||
    query.includes('appointment')
  ) {
    return {
      reply: `**Schedule Your Free 30-Minute AI Strategy Consultation**:

Connect directly with founder **Sonendra Kumar** to review your manual bottlenecks and discuss practical automation:

- **Duration**: 30 minutes (Zoom / Google Meet / Phone)
- **Who it is for**: MSME founders, exporters, importers, factory owners, and trade directors
- **What we cover**: Your current software stack (Tally, Zoho, Excel), paperwork bottlenecks, feasibility check, and estimated ROI timeline
- **No Technical Background Required**: We speak business outcomes, not confusing jargon

Click below to open the scheduler or connect immediately on WhatsApp!`,
      source: 'knowledge_engine',
      actions: [
        { label: '📅 Open Booking Calendar', type: 'booking' },
        {
          label: '💬 Chat on WhatsApp (+91 97614 40027)',
          type: 'whatsapp',
          value: `https://wa.me/919761440027?text=${encodeURIComponent(
            'Hi Sonendra, I would like to book a 30-minute AI strategy consultation for my business.'
          )}`,
        },
        { label: '⚡ Run 60s Audit First', type: 'audit' },
      ],
    };
  }

  // Quick Intent 3: Get Business Audit
  if (
    query.includes('get business audit') ||
    query.includes('business audit') ||
    query.includes('run audit') ||
    query === 'audit' ||
    query.includes('automation audit')
  ) {
    return {
      reply: `**Get Your GrowthLeap AI Business Automation Audit**:

Our operational audit pinpoints exactly where your business leaks time, errors, and revenue:

- **What We Analyze**: Inbound inquiry response times, invoice & packing list typing, customs documentation, inventory sync, and Tally/Zoho data entry.
- **Deliverables**: Detailed Bottleneck Map, ROI Projection (hours and cost saved), and a 3-phase Implementation Blueprint.
- **Two Ways to Start**:
  1. **Instant 60-Second In-Chat Diagnostic**: Click below to diagnose your bottlenecks in 3 quick questions.
  2. **Comprehensive 5–7 Day Deep-Dive Audit**: Full review with founder Sonendra Kumar.`,
      source: 'knowledge_engine',
      actions: [
        { label: '⚡ Launch 60s In-Chat Audit', type: 'audit' },
        { label: '📅 Book Full Audit Consultation', type: 'booking' },
        { label: '🛠️ View Services Overview', type: 'prompt', value: 'View Services' },
      ],
    };
  }

  // 1. Export / Import queries
  if (
    query.includes('export') ||
    query.includes('shipping') ||
    query.includes('icegate') ||
    query.includes('customs') ||
    query.includes('bill of lading') ||
    query.includes('hsn')
  ) {
    return {
      reply: `**GrowthLeap AI Export-Import Automation Capabilities**:

1. **ICEGATE & Shipping Document Reconciliation**:
   - Automated cross-check between Commercial Invoice, Packing List, and Shipping Bill.
   - Eliminates port detention charges & documentation penalties.
2. **Sub-60s Global Buyer Inquiry Engine**:
   - Captures RFQs from email, WhatsApp, and trade portals (IndiaMART, Alibaba).
   - Generates customized multilingual catalog PDFs and quotation sheets automatically.
3. **Container Milestone Intelligence**:
   - Fetches tracking events from shipping lines and pushes automated WhatsApp updates to overseas buyers.

Would you like to review an architecture blueprint for your export-import operation?`,
      source: 'knowledge_engine',
      actions: [
        { label: '📅 Book Free 30-Min Strategy Call', type: 'booking' },
        { label: '💬 Talk to Sonendra on WhatsApp', type: 'whatsapp', value: whatsappUrl },
        { label: '⚡ Run 60-Sec Audit', type: 'audit' },
      ],
    };
  }

  // 2. Tally / ERP / Accounting
  if (
    query.includes('tally') ||
    query.includes('zoho') ||
    query.includes('accounting') ||
    query.includes('gst') ||
    query.includes('invoice') ||
    query.includes('erp')
  ) {
    return {
      reply: `**Zero-Disruption ERP & Tally Integration**:

- **Tally Prime & ERP 9 Sync**: We deploy secure local connectors that read scanned supplier invoices and inject clean XML vouchers straight into Tally with GSTIN and HSN verification.
- **Zoho Ecosystem**: Real-time two-way synchronization between Zoho Books, Inventory, and CRM with WhatsApp pipelines.
- **Your Team Keeps Existing Tools**: We don't force your staff to learn complicated new software—we automate the repetitive copy-pasting between your spreadsheets, emails, and accounting software.

Typical time reclaimed: **15–20 hours per week** for your accounting team.`,
      source: 'knowledge_engine',
      actions: [
        { label: '⚡ Run Accounting Audit', type: 'audit' },
        { label: '📅 Schedule Demo Call', type: 'booking' },
        { label: '💬 WhatsApp +91 97614 40027', type: 'whatsapp', value: whatsappUrl },
      ],
    };
  }

  // 3. Autonomous AI Agents
  if (query.includes('agent') || query.includes('agents') || query.includes('bot') || query.includes('autonomous')) {
    return {
      reply: `**GrowthLeap AI Autonomous Agents Suite**:

1. **AI Lead Qualification Agent**: Qualifies inbound prospects on WhatsApp within 45s, logs deals in CRM, and books meetings.
2. **AI Document Agent**: Parses complex multi-page invoices, packing lists, and test reports with 99.8% accuracy.
3. **AI Customer Support Agent**: 24/7 multilingual resolver trained on your specific product specifications and warranty terms.
4. **AI Sales Assistant Agent**: Prepares client briefings, calculates machine rate margins, and drafts formal proposals.
5. **AI Knowledge Agent**: Instant internal search assistant answering staff questions about company SOPs.
6. **AI Reporting Agent**: Compiles daily 8:00 AM executive briefings sent via WhatsApp voice/text to directors.

Which AI Agent would you like to implement first?`,
      source: 'knowledge_engine',
      actions: [
        { label: '🤖 Explore All 6 Agents', type: 'prompt', value: 'Tell me about the AI Document Agent' },
        { label: '📅 Book Implementation Call', type: 'booking' },
        { label: '💬 Chat on WhatsApp', type: 'whatsapp', value: whatsappUrl },
      ],
    };
  }

  // 4. Pricing / Cost / Engagement Models
  if (
    query.includes('cost') ||
    query.includes('pricing') ||
    query.includes('price') ||
    query.includes('fee') ||
    query.includes('charges') ||
    query.includes('package')
  ) {
    return {
      reply: `**GrowthLeap AI Engagement & Pricing Structure**:

1. **Free Initial 30-Min Strategy Consultation**: Zero cost. Direct review with founder Sonendra Kumar to assess automation feasibility.
2. **AI Efficiency Audit (₹25,000 / $350)**: A rigorous 5–7 day operational audit mapping your bottlenecks, delivering a custom Automation Blueprint and guaranteed ROI roadmap.
3. **Project-Based Implementation (Custom Sprints)**: Fixed-scope 2–4 week sprints deploying tailored workflows and autonomous agents.
4. **AI Growth Partner Retainer**: Monthly ongoing operational scaling, prompt fine-tuning, and priority 24/7 SLA support.

All implementations come with a **Zero-Disruption Guarantee**: We integrate with your existing tools without replacing them.`,
      source: 'knowledge_engine',
      actions: [
        { label: '📅 Book Free 30-Min Strategy Call', type: 'booking' },
        { label: '💬 Get Custom Quote on WhatsApp', type: 'whatsapp', value: whatsappUrl },
        { label: '⚡ Run Free Online Audit', type: 'audit' },
      ],
    };
  }

  // 5. ROI / Value calculation
  if (query.includes('roi') || query.includes('saving') || query.includes('benefit') || query.includes('calculator')) {
    return {
      reply: `**Proven Business ROI Metrics**:

- **70% Faster Turnaround**: Inbound leads answered in 45 seconds instead of 4–6 hours.
- **15–25 Hours Saved/Week**: Per operational manager freed from manual data entry and report collation.
- **Zero Demurrage & Penalty Fees**: Customs documents validated prior to container clearance.
- **3x to 6x Annualized Return**: MSMEs save ₹6,00,000–₹18,00,000 annually by avoiding unnecessary administrative headcount additions.

Try our built-in **Automation Audit** to calculate your company's exact projected savings!`,
      source: 'knowledge_engine',
      actions: [
        { label: '⚡ Run Automation Audit Now', type: 'audit' },
        { label: '📅 Schedule Discovery Call', type: 'booking' },
        { label: '💬 Discuss ROI on WhatsApp', type: 'whatsapp', value: whatsappUrl },
      ],
    };
  }

  // 6. Founder / Contact / Sonendra Kumar
  if (
    query.includes('sonendra') ||
    query.includes('founder') ||
    query.includes('phone') ||
    query.includes('number') ||
    query.includes('linkedin') ||
    query.includes('contact')
  ) {
    return {
      reply: `**Connect with Founder Sonendra Kumar**:

- **WhatsApp**: [+91 97614 40027](https://wa.me/919761440027) (Instant response)
- **LinkedIn Profile**: [linkedin.com/in/sonendra-kumar-2101721b7](https://www.linkedin.com/in/sonendra-kumar-2101721b7)
- **Email**: contact@growthleapai.com
- **Locations**: BKC Mumbai & Koramangala Bengaluru

Sonendra actively consults non-technical MSME owners and exporters on practical AI implementation. You can message him directly or schedule a calendar session below.`,
      source: 'knowledge_engine',
      actions: [
        { label: '💬 Open WhatsApp (+91 97614 40027)', type: 'whatsapp', value: whatsappUrl },
        { label: '📅 Book 30-Min Strategy Call', type: 'booking' },
        {
          label: '🔗 View Sonendra on LinkedIn',
          type: 'url',
          value: 'https://www.linkedin.com/in/sonendra-kumar-2101721b7',
        },
      ],
    };
  }

  // General helpful overview
  return {
    reply: `Welcome to **GrowthLeap AI** — Smart Automation for Smart Businesses.

We help MSMEs, Exporters, and Manufacturers eliminate manual paperwork and scale operations through intelligent AI workflows.

**How can I assist you right now?**
1. **Discover Services**: Learn about our AI Efficiency Audit, Implementation Sprints, or Retainers.
2. **Explore AI Agents**: WhatsApp Agents, Document Validation Agents, and CRM pipelines.
3. **Assess Feasibility**: Check how we connect with Tally, Zoho, WhatsApp, and ICEGATE.
4. **Talk with Founder**: Direct consultation with Sonendra Kumar (+91 97614 40027).`,
    source: 'knowledge_engine',
    actions: [
      { label: '⚡ Run Free Business Audit', type: 'audit' },
      { label: '📅 Book Free 30-Min Strategy Call', type: 'booking' },
      { label: '💬 WhatsApp Sonendra (9761440027)', type: 'whatsapp', value: whatsappUrl },
      { label: '🤖 Explore AI Agents', type: 'prompt', value: 'What AI agents do you provide?' },
    ],
  };
}
