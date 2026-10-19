import React from 'react';
import {
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  FileSpreadsheet,
  MessageSquare,
  FileText,
  Ship,
  Sparkles,
  Zap,
} from 'lucide-react';
import { PROCESS_STEPS } from '../data/siteData';
import { PageTab, SiteSettings } from '../types';

interface HowItWorksPageProps {
  setActiveTab: (tab: PageTab) => void;
  onOpenBooking: () => void;
  settings: SiteSettings;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({
  setActiveTab,
  onOpenBooking,
}) => {
  const toolsConnected = [
    { name: 'Tally Prime & ERP 9', type: 'Accounting & Invoicing', desc: 'Auto-sync supplier invoices, vouchers & GST entries without manual typing.' },
    { name: 'Microsoft Excel & Sheets', type: 'Spreadsheet Workflows', desc: 'Tabulate vendor quotes, customs manifest data, and shipping schedules instantly.' },
    { name: 'WhatsApp Business API', type: 'Instant Client & Vendor Chat', desc: 'Automate container location inquiries, order receipts, and dispatch updates 24/7.' },
    { name: 'Gmail & Outlook', type: 'Email Automation', desc: 'Extract attachments, parse buyer requests, and draft quotation responses in seconds.' },
    { name: 'Customs ICEGATE Portal', type: 'Export-Import Compliance', desc: 'Pre-validate shipping bill declarations, HSN codes, and verify bills of entry.' },
    { name: 'IndiaMART & TradePortals', type: 'Inquiry Management', desc: 'Filter high-intent trade leads and route them directly into your dispatch team CRM.' },
  ];

  return (
    <div className="space-y-0">
      {/* Page Header */}
      <section className="bg-gradient-to-b from-white via-sky-50/20 to-[#FAFAFA] py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-heading font-bold text-[#005A9C] uppercase tracking-wider">
            Safe, Transparent & Zero Disruption
          </span>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-900 tracking-tight">
            Our Simple 4-Step Process to Success.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We handle 100% of the technical heavy lifting behind the scenes. Your factory floor, export dispatches, and daily accounting continue seamlessly.
          </p>
        </div>
      </section>

      {/* 4-Step Process Timeline */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {PROCESS_STEPS.map((step, idx) => (
              <div
                key={step.number}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start p-8 rounded-3xl border border-slate-200 bg-white hover:border-sky-300 transition-colors shadow-sm"
              >
                {/* Step badge */}
                <div className="md:col-span-3 flex flex-row md:flex-col items-center md:items-start justify-between gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#005A9C] to-[#004273] text-white flex items-center justify-center font-heading font-extrabold text-xl shadow-sm">
                    {step.number}
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-[#2E8540] uppercase tracking-wider block">
                      {step.timeframe}
                    </span>
                    <span className="text-sm font-heading font-bold text-slate-900">
                      Step {idx + 1}
                    </span>
                  </div>
                </div>

                {/* Step details */}
                <div className="md:col-span-9 space-y-4">
                  <div>
                    <h2 className="text-2xl font-heading font-bold text-slate-900">
                      {step.title}
                    </h2>
                    <p className="text-sm font-semibold text-[#005A9C] mt-0.5">
                      {step.subtitle}
                    </p>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>

                  <div className="pt-2">
                    <span className="text-xs font-heading font-bold uppercase tracking-wider text-slate-700 block mb-2">
                      Key Deliverables for this Step:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {step.deliverables.map((item, dIdx) => (
                        <div
                          key={dIdx}
                          className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 font-medium flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2E8540] shrink-0" />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={onOpenBooking}
              className="py-3.5 px-8 bg-[#005A9C] hover:bg-[#004a82] text-white font-heading font-semibold text-sm rounded-xl shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-sky-200" />
              <span>Start With Step 1: Book Free 30-Min Strategy Call</span>
            </button>
          </div>
        </div>
      </section>

      {/* Tools We Connect */}
      <section className="py-20 bg-[#FAFAFA] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-14">
            <span className="text-xs font-heading font-bold text-[#2E8540] uppercase tracking-wider">
              Seamless Integration
            </span>
            <h2 className="text-3xl font-heading font-bold text-slate-900 tracking-tight">
              Software We Connect With Everyday
            </h2>
            <p className="text-sm text-slate-600">
              No need to switch to expensive ERPs. We connect AI automation into your existing stack.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {toolsConnected.map((tool) => (
              <div
                key={tool.name}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2 hover:border-sky-300 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-bold text-base text-slate-900">
                    {tool.name}
                  </h3>
                  <span className="text-[11px] font-semibold text-[#005A9C] bg-sky-50 px-2 py-0.5 rounded">
                    Plug & Play
                  </span>
                </div>
                <p className="text-xs font-semibold text-[#2E8540]">
                  {tool.type}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  {tool.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Won't Experience (Reassurance) */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-heading font-bold text-rose-600 uppercase tracking-wider">
              Our Zero-Headache Guarantee
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900">
              What You Won't Experience With GrowthLeap AI
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700">
              <span className="text-rose-500 font-bold block text-sm mb-1">✕</span>
              No Technical Jargon
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700">
              <span className="text-rose-500 font-bold block text-sm mb-1">✕</span>
              No ERP Replacements
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700">
              <span className="text-rose-500 font-bold block text-sm mb-1">✕</span>
              No Operational Downtime
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700">
              <span className="text-rose-500 font-bold block text-sm mb-1">✕</span>
              No Long-Term Lock-in
            </div>
          </div>

          <p className="text-xs text-slate-500 max-w-lg mx-auto">
            If an automation does not demonstrably save your staff time and eliminate errors in the first 30 days, we work without charge until it does.
          </p>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-gradient-to-r from-[#005A9C] to-[#004273] text-white">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-5">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white">
            Take the First Step: A 30-Minute Chat
          </h2>
          <p className="text-sm text-sky-100">
            Tell us about your biggest administrative headaches. We'll show you exactly how Step 1 works for your trade business.
          </p>
          <button
            onClick={onOpenBooking}
            className="py-3.5 px-7 bg-[#2E8540] hover:bg-[#256c34] text-white font-heading font-semibold text-xs rounded-xl shadow-md transition-colors cursor-pointer inline-flex items-center gap-2"
          >
            <Calendar className="w-4 h-4 text-emerald-200" />
            <span>Book Free Strategy Call</span>
          </button>
        </div>
      </section>
    </div>
  );
};
