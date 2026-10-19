import React, { useState, useEffect } from 'react';
import {
  X,
  FileSpreadsheet,
  Download,
  Copy,
  Check,
  RefreshCw,
  Phone,
  Mail,
  Building,
  Calendar,
  Sparkles,
  ExternalLink,
  Code,
} from 'lucide-react';
import { CustomerLead, SiteSettings } from '../types';
import {
  getStoredCustomerLeads,
  exportLeadsToGoogleSheetsCSV,
  GOOGLE_APPS_SCRIPT_TEMPLATE,
} from '../services/leadService';

interface LeadsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: SiteSettings;
  onOpenSettings: () => void;
}

export const LeadsModal: React.FC<LeadsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onOpenSettings,
}) => {
  const [leads, setLeads] = useState<CustomerLead[]>([]);
  const [copiedCsv, setCopiedCsv] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);
  const [showScriptInstructions, setShowScriptInstructions] = useState(false);

  const loadLeads = async () => {
    // 1. Fetch from server
    try {
      const res = await fetch('/api/leads');
      if (res.ok) {
        const data = await res.json();
        if (data.leads && Array.isArray(data.leads) && data.leads.length > 0) {
          setLeads(data.leads);
          return;
        }
      }
    } catch (e) {
      console.warn('Could not fetch server leads, falling back to local vault:', e);
    }

    // 2. Fallback to localStorage
    const local = getStoredCustomerLeads();
    setLeads(local);
  };

  useEffect(() => {
    if (isOpen) {
      loadLeads();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDownloadCsv = () => {
    const csvContent = exportLeadsToGoogleSheetsCSV(leads);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `growthleap_customer_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyForGoogleSheets = () => {
    // Format for direct Ctrl+V into Google Sheets (Tab-delimited)
    const headers = ['Timestamp', 'Reference ID', 'Name', 'Email (Gmail)', 'Mobile Number', 'Company', 'Enquiry', 'Source', 'Audit Score'];
    const rows = leads.map((l) => [
      new Date(l.timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      l.id,
      l.name,
      l.email,
      l.phone,
      l.company || 'N/A',
      l.inquiry,
      l.source,
      l.auditScore || 'N/A',
    ]);
    const tabDelimited = [headers.join('\t'), ...rows.map((r) => r.join('\t'))].join('\n');
    navigator.clipboard.writeText(tabDelimited);
    setCopiedCsv(true);
    setTimeout(() => setCopiedCsv(false), 2500);
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_TEMPLATE);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0D1527] rounded-2xl shadow-2xl border border-cyan-500/30 overflow-hidden max-h-[92vh] flex flex-col text-slate-100">
        {/* Header */}
        <div className="px-6 py-4 bg-[#070B14] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-black font-bold">
              <FileSpreadsheet className="w-5 h-5 text-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-bold text-base text-white">
                  Customer Leads & Google Sheets Sync
                </h3>
                <span className="text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800/60 px-2 py-0.5 rounded font-semibold">
                  {leads.length} Leads Collected
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Inquiries collected via AI Chatbot and Business Audit with live Google Sheets export.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadLeads}
              title="Refresh leads list"
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="bg-[#090F1E] px-6 py-3 border-b border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Webhook Status:</span>
            {settings.googleSheetsWebhookUrl ? (
              <span className="inline-flex items-center gap-1.5 text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded-full text-[11px] font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active Google Sheets Sync
              </span>
            ) : (
              <button
                onClick={onOpenSettings}
                className="text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer font-medium"
              >
                <span>Connect Google Sheet Webhook →</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowScriptInstructions((prev) => !prev)}
              className="px-3 py-1.5 bg-blue-950/60 hover:bg-blue-900 border border-blue-500/40 text-blue-200 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Code className="w-3.5 h-3.5" />
              <span>Google Sheets Setup (30s)</span>
            </button>

            <button
              onClick={handleCopyForGoogleSheets}
              className="px-3 py-1.5 bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-200 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedCsv ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCsv ? 'Copied Tab Data!' : 'Copy for Google Sheets'}</span>
            </button>

            <button
              onClick={handleDownloadCsv}
              className="px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 text-black font-bold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-cyan-950"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CSV</span>
            </button>
          </div>
        </div>

        {/* Expandable Google Apps Script Setup Guide */}
        {showScriptInstructions && (
          <div className="bg-[#060B14] p-5 border-b border-cyan-500/20 space-y-3 text-xs animate-in slide-in-from-top-2">
            <div className="flex items-center justify-between">
              <span className="font-heading font-bold text-white text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                How to Connect Any Google Sheet in 30 Seconds:
              </span>
              <button
                onClick={handleCopyScript}
                className="px-2.5 py-1 bg-cyan-950 text-cyan-300 border border-cyan-800 rounded flex items-center gap-1 font-mono text-[11px] hover:bg-cyan-900 cursor-pointer"
              >
                {copiedScript ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedScript ? 'Script Copied!' : 'Copy Apps Script Code'}</span>
              </button>
            </div>

            <ol className="list-decimal pl-5 space-y-1 text-slate-300 leading-relaxed text-[11px]">
              <li>Create a new spreadsheet at <strong className="text-white">sheets.new</strong></li>
              <li>Click menu <strong className="text-white">Extensions &gt; Apps Script</strong></li>
              <li>Delete any existing code, paste the copied script, and click <strong className="text-white">Deploy &gt; New deployment</strong></li>
              <li>Select type <strong className="text-white">Web app</strong>, set "Who has access" to <strong className="text-white">Anyone</strong>, and deploy</li>
              <li>Copy the Web App URL and paste it into <strong className="text-cyan-300">Website Settings &gt; Google Sheets Webhook URL</strong></li>
            </ol>
          </div>
        )}

        {/* Content Table */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {leads.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <h4 className="font-heading font-bold text-white text-sm">
                No Leads Collected Yet
              </h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                When visitors submit their Gmail or Mobile Number in the AI Chatbot or Audit Form, their details will automatically show up here and sync to your Google Sheet.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {leads.map((l) => (
                <div
                  key={l.id}
                  className="bg-[#101B30] border border-white/10 hover:border-cyan-500/40 p-4 rounded-xl space-y-2 transition-all"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-white/5 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-bold text-white text-sm">
                        {l.name}
                      </span>
                      {l.company && (
                        <span className="text-slate-400 text-xs flex items-center gap-1">
                          • <Building className="w-3 h-3 text-slate-500" /> {l.company}
                        </span>
                      )}
                      <span className="text-[10px] font-mono bg-blue-950 text-blue-300 px-1.5 py-0.2 rounded uppercase">
                        {l.source}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs">
                      {l.syncedToGoogleSheets && (
                        <span className="text-emerald-400 text-[10px] font-mono flex items-center gap-1">
                          <Check className="w-3 h-3 text-emerald-400" />
                          Sheets Synced
                        </span>
                      )}
                      <span className="text-slate-400 text-[11px] font-mono">
                        {new Date(l.timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                      </span>
                    </div>
                  </div>

                  {/* Contact Badges */}
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    {l.email && (
                      <a
                        href={`mailto:${l.email}`}
                        className="flex items-center gap-1 text-cyan-300 hover:underline bg-[#070B14] px-2.5 py-1 rounded-md border border-white/5"
                      >
                        <Mail className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{l.email}</span>
                      </a>
                    )}

                    {l.phone && (
                      <a
                        href={`https://wa.me/${l.phone.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-emerald-300 hover:underline bg-[#070B14] px-2.5 py-1 rounded-md border border-white/5"
                      >
                        <Phone className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{l.phone}</span>
                      </a>
                    )}

                    {l.auditScore && (
                      <span className="text-xs text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40 font-mono">
                        Audit Score: {l.auditScore}/100
                      </span>
                    )}
                  </div>

                  {/* Enquiry Body */}
                  <div className="bg-[#070B14] p-3 rounded-lg border border-white/5 text-xs text-slate-300">
                    <span className="text-slate-500 font-mono text-[10px] block mb-0.5">
                      ENQUIRY / REQUIREMENT:
                    </span>
                    <p className="leading-relaxed">{l.inquiry}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
