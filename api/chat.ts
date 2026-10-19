import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

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
1. AI Efficiency Audit (₹25,000 / $350 or Free initial strategy audit): 5 to 7 day deep dive into operations, data flows, and bottlenecks.
2. Project-Based Implementation: 2 to 4 week agile sprints building custom AI workflows and Autonomous Agents with zero workflow disruption.
3. AI Growth Partner Retainer: Continuous operational scaling, prompt engineering, quarterly system updates, and 24/7 priority SLA support.

Your Autonomous AI Agents:
- AI Lead Qualification Agent: Engages buyer inquiries across WhatsApp and web within 45 seconds.
- AI Document Agent: Reads commercial invoices, packing lists, Bills of Lading, ICEGATE shipping bills, supplier PDFs. Validates quantities, HSN codes, and taxes with 99.8% precision, syncing directly into Tally, Zoho, or ERP.
- AI Customer Support Agent: 24/7 multilingual client service trained on your company catalogs.
- AI Sales Assistant Agent: Synthesizes buyer research, auto-calculates margins, drafts formal PDF export proposals.
- AI Knowledge Agent: Instant internal search engine for staff to query internal SOPs and compliance.
- AI Reporting Agent: Pulls nightly logs across sales, inventory, and receivables for 8 AM executive WhatsApp briefings.

Supported Integrations:
- Tally Prime / ERP 9
- Zoho CRM, Zoho Books, Zoho Inventory
- Official WhatsApp Cloud API
- Salesforce, HubSpot, Leadsquared
- Google Sheets, Excel, Google Drive

Call to action to emphasize:
1. Book a Free 30-Minute Strategy Call with Sonendra Kumar.
2. Talk directly on WhatsApp (+91 97614 40027).
3. Request a customized AI Business Audit.`;

function generateExpertFallbackReply(query: string): string {
  if (query.includes('service') || query.includes('offer')) {
    return `**GrowthLeap AI Core Services**:

1. **AI Efficiency Audit**: 5–7 day operational deep dive to identify automation opportunities and build an ROI blueprint.
2. **Autonomous AI Agents**: Deploy Document Agents (invoices to Tally), WhatsApp RFQ Agents, Customer Support Bots, and Sales Assistants.
3. **Software Integration**: Two-way sync with Tally Prime, Zoho Books, WhatsApp Cloud API, and ICEGATE.
4. **Talk with Founder**: Connect with Sonendra Kumar on WhatsApp at **+91 97614 40027** or book a free 30-minute strategy call.`;
  }
  if (query.includes('contact') || query.includes('call') || query.includes('book') || query.includes('phone') || query.includes('whatsapp')) {
    return `**Connect Directly with GrowthLeap AI**:
- **WhatsApp**: [+91 97614 40027](https://wa.me/919761440027)
- **Call**: +91 97614 40027
- **Email**: contact@growthleapai.com
- **Locations**: BKC, Mumbai & Koramangala, Bengaluru

Would you like to schedule a free 30-minute consultation call?`;
  }
  return `At **GrowthLeap AI**, we help MSMEs, Exporters, and Manufacturers eliminate repetitive manual paperwork using practical, production-ready AI.

How can GrowthLeap AI assist your business today?`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages, userContext } = req.body || {};

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

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
Challenge: ${userContext.challenge || 'Unspecified'}`;
        }

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents,
          config: {
            systemInstruction: contextualPrompt,
            temperature: 0.7,
            maxOutputTokens: 1000,
          },
        });

        const replyText = response.text || 'I am ready to help you automate your business workflows.';
        return res.status(200).json({ reply: replyText, source: 'gemini' });
      } catch (geminiError: any) {
        console.warn('Gemini API call failed, falling back to expert knowledge engine:', geminiError?.message || geminiError);
      }
    }

    const lastUserMessage = messages[messages.length - 1]?.content?.toLowerCase() || '';
    const fallbackReply = generateExpertFallbackReply(lastUserMessage);
    return res.status(200).json({ reply: fallbackReply, source: 'knowledge_engine' });
  } catch (error: any) {
    console.error('Chat endpoint error:', error);
    return res.status(500).json({
      error: 'An internal error occurred processing your request.',
      reply: 'You can connect directly with our founder Sonendra Kumar on WhatsApp at +91 97614 40027 or book a free 30-minute strategy call on our website.',
    });
  }
}
