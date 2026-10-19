import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const LEADS_FILE = path.resolve(__dirname, 'leads.json');

function readLeadsFromFile(): any[] {
  try {
    if (fs.existsSync(LEADS_FILE)) {
      const data = fs.readFileSync(LEADS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (e) {
    console.warn('Error reading leads file:', e);
  }
  return [];
}

function writeLeadsToFile(leads: any[]) {
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
  } catch (e) {
    console.error('Error writing leads file:', e);
  }
}

// Initialize Google GenAI SDK if GEMINI_API_KEY is available
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const SYSTEM_INSTRUCTION = `You are the GrowthLeap AI Executive Consultant and Smart Assistant.
Website: https://growthleapai.com
Founder: Sonendra Kumar
WhatsApp / Phone: +91 97614 40027
Founder LinkedIn: https://www.linkedin.com/in/sonendra-kumar-2101721b7
Headquarters: Bandra-Kurla Complex (BKC), Mumbai & Koramangala, Bengaluru, India.
Tagline: "Smart Automation for Smart Businesses"
Target Audience: Non-technical founders, directors, and operational heads of MSMEs, Exporters, Importers, Manufacturers, and Trading companies in India & international trade.

Your Core Services:
1. AI Efficiency Audit (₹25,000 / $350 or Free initial strategy audit): 5 to 7 day deep dive into operations, data flows, and bottlenecks. Delivers an ROI-prioritized Automation Roadmap and architecture blueprint.
2. Project-Based Implementation: 2 to 4 week agile sprints building custom AI workflows and Autonomous Agents with zero workflow disruption.
3. AI Growth Partner Retainer: Continuous operational scaling, prompt engineering, quarterly system updates, and 24/7 priority SLA support.

Your Autonomous AI Agents:
- AI Lead Qualification Agent: Engages buyer inquiries across WhatsApp and web within 45 seconds, assesses budget/specifications, qualifies high-intent RFQs, logs deals in CRM, and alerts sales closers.
- AI Document Agent: Reads commercial invoices, packing lists, Bills of Lading, ICEGATE shipping bills, supplier PDFs. Validates quantities, HSN codes, and taxes with 99.8% precision, syncing directly into Tally, Zoho, or ERP.
- AI Customer Support Agent: 24/7 multilingual client service trained on your company catalogs, technical tolerances, order tracking, and freight status. Escalates complex edge cases to human reps.
- AI Sales Assistant Agent: Synthesizes buyer research, auto-calculates machine and material margins, drafts tailored formal PDF export proposals, and executes scheduled follow-up cadences.
- AI Knowledge Agent: Instant internal search engine for staff to query internal SOPs, compliance guidelines, vendor payment terms, and machine maintenance checklists.
- AI Reporting Agent: Pulls nightly logs across sales, inventory, dispatches, and receivables to generate 8 AM executive WhatsApp audio/text briefings for company directors.

Supported Integrations:
- Tally Prime / ERP 9 (two-way XML & API sync)
- Zoho CRM, Zoho Books, Zoho Inventory
- Official WhatsApp Cloud API
- Salesforce, HubSpot, Leadsquared
- Google Sheets, Excel, Google Drive, OneDrive
- ICEGATE customs portal, GSTN portal, shipping line trackers
- PostgreSQL, MySQL, and custom legacy SQL ERPs

Founder Endorsement:
Founder Sonendra Kumar is available directly on WhatsApp at +91 97614 40027 or on LinkedIn (https://www.linkedin.com/in/sonendra-kumar-2101721b7).
Call to action to emphasize:
1. Book a Free 30-Minute Strategy Call with Sonendra Kumar.
2. Talk directly on WhatsApp (+91 97614 40027) for an instant voice/chat consultation.
3. Request a customized AI Business Audit.

Tone & Style:
- Professional, authoritative, empathetic, concise, and business-focused.
- Avoid vague AI jargon like "synergy" or "transformative disruption". Focus on practical business outcomes: hours saved, error elimination, container demurrage prevention, faster cash collection, and team multiplication without hiring bloat.
- Provide structured answers with bullet points, numbered steps, or quick summaries.
- When relevant, offer direct next steps (e.g. "Would you like to book a 30-min strategy call or message Sonendra directly on WhatsApp?").
`;

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'GrowthLeap AI Server',
    geminiEnabled: Boolean(ai),
    timestamp: new Date().toISOString(),
  });
});

// Leads API endpoints for customer contact & enquiry data collection into Google Sheets
app.get('/api/leads', (_req: Request, res: Response) => {
  const leads = readLeadsFromFile();
  res.json({
    total: leads.length,
    leads,
  });
});

app.post('/api/leads', async (req: Request, res: Response) => {
  try {
    const { lead, googleSheetsWebhookUrl } = req.body;
    if (!lead || (!lead.email && !lead.phone)) {
      return res.status(400).json({ error: 'Lead must include at least an email (Gmail) or mobile number.' });
    }

    const currentLeads = readLeadsFromFile();
    const newLead = {
      id: lead.id || `GLA-LEAD-${Date.now().toString(36).toUpperCase()}`,
      timestamp: lead.timestamp || new Date().toISOString(),
      name: lead.name || 'Website Visitor',
      email: lead.email || '',
      phone: lead.phone || '',
      company: lead.company || '',
      inquiry: lead.inquiry || 'Customer enquiry submitted via Chatbot',
      source: lead.source || 'chatbot',
      auditScore: lead.auditScore || null,
      bottleneck: lead.bottleneck || null,
      syncedToGoogleSheets: false,
    };

    // Forward to Google Sheets Webhook if configured
    const targetWebhook = (googleSheetsWebhookUrl || process.env.GOOGLE_SHEETS_WEBHOOK_URL || '').trim();
    if (targetWebhook) {
      try {
        await fetch(targetWebhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
            referenceId: newLead.id,
            name: newLead.name,
            email: newLead.email,
            phone: newLead.phone,
            company: newLead.company,
            inquiry: newLead.inquiry,
            source: newLead.source,
            auditScore: newLead.auditScore,
            bottleneck: newLead.bottleneck,
          }),
        });
        newLead.syncedToGoogleSheets = true;
      } catch (sheetErr) {
        console.warn('[GrowthLeap AI] Could not forward lead to Google Sheets webhook:', sheetErr);
      }
    }

    currentLeads.unshift(newLead);
    writeLeadsToFile(currentLeads);

    return res.status(201).json({
      success: true,
      lead: newLead,
      syncedToGoogleSheets: newLead.syncedToGoogleSheets,
      message: newLead.syncedToGoogleSheets
        ? 'Lead saved and forwarded to Google Sheets'
        : 'Lead saved to CRM database',
    });
  } catch (error: any) {
    console.error('Failed to save lead:', error);
    return res.status(500).json({ error: 'Internal server error saving lead' });
  }
});

app.get('/api/leads/export-csv', (_req: Request, res: Response) => {
  const leads = readLeadsFromFile();
  const headers = ['Timestamp (IST)', 'Reference ID', 'Name', 'Email (Gmail)', 'Mobile Number', 'Company', 'Enquiry', 'Source', 'Audit Score', 'Bottleneck'];
  const rows = leads.map((l: any) => [
    `"${new Date(l.timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}"`,
    `"${l.id}"`,
    `"${(l.name || '').replace(/"/g, '""')}"`,
    `"${(l.email || '').replace(/"/g, '""')}"`,
    `"${(l.phone || '').replace(/"/g, '""')}"`,
    `"${(l.company || '').replace(/"/g, '""')}"`,
    `"${(l.inquiry || '').replace(/"/g, '""')}"`,
    `"${l.source || ''}"`,
    `"${l.auditScore || ''}"`,
    `"${(l.bottleneck || '').replace(/"/g, '""')}"`,
  ]);
  const csv = [headers.join(','), ...rows.map((r: any) => r.join(','))].join('\n') + '\n';
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="growthleap_leads.csv"');
  return res.send(csv);
});

// Chatbot API endpoint
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { messages, userContext } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    // If Gemini API is configured, use official @google/genai SDK
    if (ai) {
      try {
        const contents = messages.map((m: { role: string; content: string }) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }],
        }));

        let contextualPrompt = SYSTEM_INSTRUCTION;
        if (userContext) {
          contextualPrompt += `\n\n--- ACTIVE SESSION CONTEXT ---
Industry: ${userContext.industry || 'Unspecified'}
Company Size: ${userContext.companySize || 'Unspecified'}
Primary Operational Challenge: ${userContext.challenge || 'Unspecified'}
Integrated Software Tools Mentioned: ${userContext.mentionedTools?.join(', ') || 'None yet'}
Interested Service: ${userContext.interestedService || 'General'}
Has Requested Audit: ${userContext.hasRequestedAudit ? 'Yes' : 'No'}
Has Requested Consultation: ${userContext.hasRequestedConsultation ? 'Yes' : 'No'}
Last Intent: ${userContext.lastIntent || 'None'}
INSTRUCTION: Maintain continuous conversation context. Reference the user's industry and tools where relevant to provide intelligent, hyper-relevant responses.`;
        }

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents,
          config: {
            systemInstruction: contextualPrompt,
            temperature: 0.7,
            maxOutputTokens: 1000,
          },
        });

        const replyText = response.text || 'I am ready to help you automate your business workflows. How can GrowthLeap AI assist you today?';
        return res.json({ reply: replyText, source: 'gemini' });
      } catch (geminiError: any) {
        console.warn('Gemini API call failed, falling back to expert knowledge engine:', geminiError?.message || geminiError);
      }
    }

    // Fallback response generator if API key is not present or failed
    const lastUserMessage = messages[messages.length - 1]?.content?.toLowerCase() || '';
    const fallbackReply = generateExpertFallbackReply(lastUserMessage, userContext);
    return res.json({ reply: fallbackReply, source: 'knowledge_engine' });
  } catch (error: any) {
    console.error('Chat endpoint error:', error);
    return res.status(500).json({
      error: 'An internal error occurred processing your request.',
      reply: 'I apologize for the brief interruption. You can connect directly with our founder Sonendra Kumar on WhatsApp at +91 97614 40027 or book a free 30-minute strategy call on our website.',
    });
  }
});

// Intelligent domain fallback responder
function generateExpertFallbackReply(query: string, context?: any): string {
  // Quick Intent 1: View Services
  if (
    query.includes('view services') ||
    query.includes('our services') ||
    query.includes('what services') ||
    query === 'services' ||
    query.includes('services breakdown')
  ) {
    return `**GrowthLeap AI Core Services**:

1. **AI Efficiency Audit (₹25,000 / $350 or Free Initial Consultation)**
   - 5 to 7 day deep-dive into your operational processes, data flows, and bottlenecks.
   - Comprehensive Automation Architecture Blueprint and ROI-ranked roadmap.

2. **Project-Based Implementation (2–4 Week Sprints)**
   - Custom AI workflow development with zero software replacement.
   - Secure integrations with Tally, Zoho, WhatsApp Cloud API, and ICEGATE customs portal.

3. **AI Growth Partner Retainer (Monthly Partnership)**
   - Ongoing system optimization, quarterly workflow expansions, and priority 24/7 SLA support.

Would you like to book a **Free Strategy Consultation** or start our **In-Chat Business Audit**?`;
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
    return `**Schedule Your Free 30-Minute AI Strategy Consultation**:

Connect directly with founder **Sonendra Kumar** to review your manual bottlenecks and plan practical AI workflows:

- **Duration**: 30 minutes (Zoom / Google Meet / Phone)
- **Who it is for**: MSME founders, exporters, importers, manufacturers, and trade directors
- **Topics**: Review your current software stack (Tally, Zoho, Excel), paperwork bottlenecks, and estimated ROI timeline

You can click **Book Free Call** on our website or reach Sonendra directly on WhatsApp at **+91 97614 40027**!`;
  }

  // Quick Intent 3: Get Business Audit
  if (
    query.includes('get business audit') ||
    query.includes('business audit') ||
    query.includes('run audit') ||
    query === 'audit' ||
    query.includes('automation audit')
  ) {
    return `**GrowthLeap AI Business Automation Audit**:

Our operational audit identifies where your company leaks hours, errors, and margin:

- **What We Evaluate**: Inquiry response times, invoice & packing list typing, customs documentation, inventory sync, and Tally/Zoho data entry.
- **Deliverables**: Detailed Bottleneck Map, ROI Projection (hours and cost saved), and a 3-phase Implementation Blueprint.

You can launch our **60-Second In-Chat Diagnostic** right now, or schedule a full consultation with founder Sonendra Kumar!`;
  }

  // Export & Import specific
  if (query.includes('export') || query.includes('shipping') || query.includes('icegate') || query.includes('customs') || query.includes('bill of lading')) {
    return `For Exporters and Importers, GrowthLeap AI specializes in automating:

1. **Customs & Document Verification**: Automated cross-checking between Commercial Invoices, Packing Lists, and ICEGATE Shipping Bills to eliminate port detention & demurrage penalties.
2. **Sub-60s Buyer RFQ Response**: Instant buyer catalog dispatch and multilingual inquiries handled on WhatsApp & email.
3. **Container Milestone Alerts**: Automated tracking updates sent to foreign buyers without manual freight forwarder follow-ups.

Would you like to schedule a **Free 30-Min Strategy Call** with our founder Sonendra Kumar, or message directly on WhatsApp at **+91 97614 40027**?`;
  }

  // Tally & ERP Integration
  if (query.includes('tally') || query.includes('zoho') || query.includes('erp') || query.includes('accounting') || query.includes('invoice') || query.includes('gst')) {
    return `We seamlessly integrate with your existing business stack:

- **Tally Prime & ERP 9**: Direct two-way XML sync for purchase bills, vendor GST invoices, and dispatch orders.
- **Zoho Books & Zoho CRM**: Auto-create sales orders, update deal stages from WhatsApp, and push inventory movements.
- **Zero Software Disruption**: Your accounting staff keeps working in Tally as usual, while AI eliminates 90%+ of manual data entry typing.

Would you like a demonstration of how our **AI Document Agent** connects with Tally?`;
  }

  // WhatsApp Automation
  if (query.includes('whatsapp') || query.includes('phone') || query.includes('message') || query.includes('chat')) {
    return `Our **WhatsApp Business Automation** replaces scattered employee phones with a high-converting automated pipeline:

- **45-Second Lead Capture**: Qualifies buyer requirements, product specifications, and budget.
- **Catalog & Quote Dispatch**: Automatically sends filtered PDF catalogs matching buyer volume.
- **Automated Payment Follow-Ups**: Polite, scheduled payment reminders with payment links that reduce debtor days by 30%.
- **Direct WhatsApp**: You can also reach our founder Sonendra Kumar directly at **+91 97614 40027** right now!`;
  }

  // Audit / Cost / Pricing
  if (query.includes('cost') || query.includes('price') || query.includes('pricing') || query.includes('fee') || query.includes('charges') || query.includes('audit')) {
    return `GrowthLeap AI offers transparent, high-ROI engagement models:

1. **Free 30-Min Strategy Consultation**: A zero-cost preliminary assessment with founder Sonendra Kumar to pinpoint your immediate bottleneck.
2. **Comprehensive AI Efficiency Audit**: 5 to 7 day deep-dive into your team's manual hours, tool stack, and processes. Includes an exact ROI blueprint.
3. **Project Implementation**: Fixed-price, 2 to 4 week sprints with guaranteed business outcomes.
4. **AI Growth Partner Retainer**: Ongoing monthly optimization, model tuning, and priority support.

You can click **"Run Automation Audit"** at the top or book a free call to get an exact proposal for your business!`;
  }

  // ROI / Savings
  if (query.includes('roi') || query.includes('save') || query.includes('hours') || query.includes('time') || query.includes('benefit')) {
    return `Typical MSMEs and Trading firms working with GrowthLeap AI achieve:

- **15 to 25 hours saved per week** per operational manager.
- **70% reduction in lead response time** (from hours to 45 seconds).
- **95% reduction in clerical document errors** on invoices & shipping bills.
- **3x to 6x ROI** within the first 90 days through accelerated deals and reduced administrative headcount.

Tell me about your team size and industry, and I can calculate an estimated monthly savings figure for you!`;
  }

  // Founder / Contact
  if (query.includes('sonendra') || query.includes('founder') || query.includes('contact') || query.includes('call') || query.includes('reach')) {
    return `You can connect directly with our founder, **Sonendra Kumar**:

- **WhatsApp**: [+91 97614 40027](https://wa.me/919761440027)
- **LinkedIn**: [Sonendra Kumar on LinkedIn](https://www.linkedin.com/in/sonendra-kumar-2101721b7)
- **Email**: contact@growthleapai.com
- **Offices**: BKC, Mumbai & Koramangala, Bengaluru

Would you like to book a 30-minute calendar slot or open WhatsApp now?`;
  }

  // Default smart overview
  return `At **GrowthLeap AI**, we help MSMEs, Exporters, and Manufacturers eliminate repetitive manual paperwork using practical, production-ready AI.

Here are 4 ways we can assist you right now:
1. **AI Efficiency Audit**: Identify where your team leaks hours and get a custom automation blueprint.
2. **Autonomous AI Agents**: Deploy custom WhatsApp, Document, Sales, or Support Agents.
3. **System Integration**: Connect Tally, Zoho, WhatsApp, and customs portals without replacing your software.
4. **Talk with Founder**: Chat directly with Sonendra Kumar on WhatsApp at **+91 97614 40027** or book a free 30-minute strategy call.

What part of your business operations would you most like to automate?`;
}

// In development, mount Vite middleware. In production, serve dist.
async function setupServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`[GrowthLeap AI] Server running on http://0.0.0.0:${PORT}`);
    console.log(`[GrowthLeap AI] Gemini AI status: ${ai ? 'ENABLED (gemini-3.8-flash)' : 'STANDALONE (Expert Knowledge Engine active)'}`);
  });
}

setupServer().catch((err) => {
  console.error('Failed to start server:', err);
});
