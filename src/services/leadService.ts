import { CustomerLead, SiteSettings } from '../types';

const LEADS_STORAGE_KEY = 'growthleap_leads_vault_v1';

/**
 * Submits a new customer inquiry and contact details (Name, Gmail, Mobile No)
 * directly storing it in the database and automatically syncing to Google Sheets.
 */
export async function submitCustomerLead(
  lead: Omit<CustomerLead, 'id' | 'timestamp'>,
  settings?: SiteSettings
): Promise<{ success: boolean; lead: CustomerLead; syncedToGoogleSheets: boolean; message: string }> {
  const newLead: CustomerLead = {
    ...lead,
    id: `GLA-LEAD-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`,
    timestamp: new Date().toISOString(),
    syncedToGoogleSheets: false,
  };

  // 1. Save to local storage vault immediately
  saveLeadToLocalStorage(newLead);

  let syncedToGoogleSheets = false;
  let backendSuccess = false;

  // 2. Post to backend server endpoint
  try {
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lead: newLead,
        googleSheetsWebhookUrl: settings?.googleSheetsWebhookUrl || '',
      }),
    });

    if (res.ok) {
      const data = await res.json();
      backendSuccess = true;
      syncedToGoogleSheets = Boolean(data.syncedToGoogleSheets);
      newLead.syncedToGoogleSheets = syncedToGoogleSheets;
    }
  } catch (err) {
    console.warn('Backend leads API unavailable, stored locally in browser vault:', err);
  }

  // 3. Direct Google Sheets Webhook fallback (client-side ping if configured)
  const webhookUrl = settings?.googleSheetsWebhookUrl?.trim();
  if (webhookUrl && !syncedToGoogleSheets) {
    try {
      // Send as URL-encoded or json payload to Google Apps Script Web App
      await fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors', // Google Apps Script redirects with 302, no-cors ensures submission passes
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
          referenceId: newLead.id,
          name: newLead.name,
          email: newLead.email,
          phone: newLead.phone,
          company: newLead.company || 'Not Specified',
          inquiry: newLead.inquiry,
          source: newLead.source,
          auditScore: newLead.auditScore || 'N/A',
          bottleneck: newLead.bottleneck || 'N/A',
        }),
      });
      syncedToGoogleSheets = true;
      newLead.syncedToGoogleSheets = true;
      updateLeadInLocalStorage(newLead);
    } catch (sheetErr) {
      console.warn('Google Sheets client webhook ping error:', sheetErr);
    }
  }

  return {
    success: true,
    lead: newLead,
    syncedToGoogleSheets,
    message: syncedToGoogleSheets
      ? 'Lead successfully captured and synced to Google Sheets!'
      : 'Lead successfully captured and stored in your GrowthLeap CRM vault.',
  };
}

/**
 * Loads all customer leads collected during sessions.
 */
export function getStoredCustomerLeads(): CustomerLead[] {
  try {
    const raw = localStorage.getItem(LEADS_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn('Could not read leads from local storage', e);
  }
  return [];
}

function saveLeadToLocalStorage(lead: CustomerLead) {
  try {
    const current = getStoredCustomerLeads();
    const updated = [lead, ...current.filter((l) => l.id !== lead.id)];
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('Failed saving lead locally', e);
  }
}

function updateLeadInLocalStorage(lead: CustomerLead) {
  try {
    const current = getStoredCustomerLeads();
    const updated = current.map((l) => (l.id === lead.id ? lead : l));
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('Failed updating lead locally', e);
  }
}

/**
 * Exports leads formatted for Google Sheets import (CSV & tab-delimited).
 */
export function exportLeadsToGoogleSheetsCSV(leads: CustomerLead[]): string {
  const headers = [
    'Timestamp (IST)',
    'Reference ID',
    'Customer Name',
    'Gmail / Email',
    'Mobile / WhatsApp',
    'Company / Factory',
    'Enquiry Details',
    'Lead Source',
    'Audit Score',
    'Identified Bottleneck',
  ];

  const rows = leads.map((l) => [
    `"${new Date(l.timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}"`,
    `"${l.id}"`,
    `"${(l.name || '').replace(/"/g, '""')}"`,
    `"${(l.email || '').replace(/"/g, '""')}"`,
    `"${(l.phone || '').replace(/"/g, '""')}"`,
    `"${(l.company || '').replace(/"/g, '""')}"`,
    `"${(l.inquiry || '').replace(/"/g, '""')}"`,
    `"${l.source}"`,
    `"${l.auditScore || ''}"`,
    `"${(l.bottleneck || '').replace(/"/g, '""')}"`,
  ]);

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
}

/**
 * Ready-to-use Google Apps Script template for 1-click Google Sheet integration.
 * Users copy this into Extensions > Apps Script in Google Sheets.
 */
export const GOOGLE_APPS_SCRIPT_TEMPLATE = `// -------------------------------------------------------------
// GrowthLeap AI -> Google Sheets Automatic Lead Ingestion Script
// -------------------------------------------------------------
// HOW TO CONNECT IN 30 SECONDS:
// 1. Open your Google Sheet
// 2. Click "Extensions" > "Apps Script"
// 3. Paste this code and click "Deploy" > "New deployment"
// 4. Select type: "Web app"
// 5. Set "Execute as": "Me"
// 6. Set "Who has access": "Anyone"
// 7. Click "Deploy", copy the Web App URL, and paste it into
//    GrowthLeap AI Website Settings (Google Sheets Webhook URL).
// -------------------------------------------------------------

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Ensure header row exists
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp (IST)",
        "Reference ID",
        "Customer Name",
        "Gmail / Email",
        "Mobile Number",
        "Company / Business",
        "Enquiry / Requirement",
        "Source",
        "Audit Score",
        "Bottleneck Focus"
      ]);
      sheet.getRange(1, 1, 1, 10).setFontWeight("bold").setBackground("#005A9C").setFontColor("#FFFFFF");
    }
    
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.timestamp || new Date().toLocaleString(),
      data.referenceId || "N/A",
      data.name || "Anonymous",
      data.email || "N/A",
      data.phone || "N/A",
      data.company || "N/A",
      data.inquiry || "General Inquiry",
      data.source || "Chatbot",
      data.auditScore || "-",
      data.bottleneck || "-"
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Lead added" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
`;
