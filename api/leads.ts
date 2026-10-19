import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';

const LEADS_FILE = path.resolve('/tmp', 'leads.json');

function getStoredLeads(): any[] {
  try {
    if (fs.existsSync(LEADS_FILE)) {
      return JSON.parse(fs.readFileSync(LEADS_FILE, 'utf-8'));
    }
  } catch (e) {
    console.warn('Could not read leads file:', e);
  }
  return [];
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // GET: Return leads list
  if (req.method === 'GET') {
    const leads = getStoredLeads();
    return res.status(200).json({
      total: leads.length,
      leads,
    });
  }

  // POST: Record new lead & forward to Google Sheets
  if (req.method === 'POST') {
    try {
      const { lead, googleSheetsWebhookUrl } = req.body || {};
      if (!lead || (!lead.email && !lead.phone)) {
        return res.status(400).json({ error: 'Lead must include at least an email or mobile number.' });
      }

      const newLead = {
        id: lead.id || `GLA-LEAD-${Date.now().toString(36).toUpperCase()}`,
        timestamp: lead.timestamp || new Date().toISOString(),
        name: lead.name || 'Website Visitor',
        email: lead.email || '',
        phone: lead.phone || '',
        company: lead.company || '',
        inquiry: lead.inquiry || 'Customer inquiry',
        source: lead.source || 'website',
        auditScore: lead.auditScore || null,
        bottleneck: lead.bottleneck || null,
        syncedToGoogleSheets: false,
      };

      // Forward to Google Sheets Webhook
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

      try {
        const current = getStoredLeads();
        current.unshift(newLead);
        fs.writeFileSync(LEADS_FILE, JSON.stringify(current, null, 2), 'utf-8');
      } catch (fsErr) {
        console.warn('Could not persist to /tmp:', fsErr);
      }

      return res.status(201).json({
        success: true,
        lead: newLead,
        syncedToGoogleSheets: newLead.syncedToGoogleSheets,
        message: newLead.syncedToGoogleSheets
          ? 'Lead saved and forwarded to Google Sheets'
          : 'Lead saved successfully',
      });
    } catch (error: any) {
      console.error('Failed to save lead:', error);
      return res.status(500).json({ error: 'Internal server error saving lead' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
