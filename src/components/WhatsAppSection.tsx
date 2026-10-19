import React, { useState } from 'react';
import {
  MessageCircle,
  CheckCircle2,
  ArrowRight,
  Shield,
  Bot,
  User,
  Send,
  Sparkles,
} from 'lucide-react';
import { SiteSettings } from '../types';

interface WhatsAppSectionProps {
  onOpenBooking: () => void;
  settings: SiteSettings;
}

export const WhatsAppSection: React.FC<WhatsAppSectionProps> = ({
  onOpenBooking,
  settings,
}) => {
  const [activeTab, setActiveTab] = useState<'buyer' | 'support' | 'tracking'>('buyer');

  const features = [
    'Instant Lead Capture',
    'AI Qualification & Intent',
    'Product Specs & Instant PDFs',
    'Automatic Quotation Drafting',
    'Order & Container Tracking',
    'Human Sales Team Handoff',
    'Two-Way CRM Synchronization',
    'Follow-Up Sequence Triggers',
  ];

  return (
    <section className="bg-[#0A0F1D] py-16 lg:py-24 border-b border-white/10 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Value Proposition */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold uppercase">
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Official Cloud API Automation</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight leading-tight">
              Turn WhatsApp Into an{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                Automated Business Channel.
              </span>
            </h2>

            <p className="text-base text-slate-300 leading-relaxed max-w-xl">
              In India and international trade, 80%+ of business happens on WhatsApp. Convert chat conversations into an organized, autonomous sales and customer service powerhouse.
            </p>

            {/* Workflow Diagram Banner */}
            <div className="p-4 bg-[#0D1527] border border-white/10 rounded-2xl space-y-2">
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                Continuous Conversion Architecture:
              </span>
              <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold text-slate-200">
                <span className="bg-white/10 px-2 py-1 rounded">Customer</span>
                <span className="text-emerald-400">→</span>
                <span className="bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 px-2 py-1 rounded">
                  WhatsApp
                </span>
                <span className="text-emerald-400">→</span>
                <span className="bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 px-2 py-1 rounded">
                  AI Agent
                </span>
                <span className="text-emerald-400">→</span>
                <span className="bg-white/10 px-2 py-1 rounded">Qualification</span>
                <span className="text-emerald-400">→</span>
                <span className="bg-blue-950/60 text-blue-300 border border-blue-500/30 px-2 py-1 rounded">
                  CRM Sync
                </span>
                <span className="text-emerald-400">→</span>
                <span className="bg-white/10 px-2 py-1 rounded">Sales Team</span>
              </div>
            </div>

            {/* Feature Checklist */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              {features.map((feat, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3.5">
              <a
                href={`https://wa.me/919761440027?text=${encodeURIComponent(
                  'Hi Sonendra, I want to build a customized WhatsApp Business automation for my company.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-6 bg-[#25D366] hover:bg-[#20ba5a] text-[#070B14] font-heading font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Build My WhatsApp Automation (9761440027)</span>
              </a>

              <button
                onClick={onOpenBooking}
                className="py-3.5 px-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-heading font-semibold text-xs rounded-xl transition-all cursor-pointer"
              >
                Schedule Architecture Call
              </button>
            </div>
          </div>

          {/* Right Column: Premium Interactive WhatsApp Interface Mockup */}
          <div className="lg:col-span-6">
            <div className="max-w-md mx-auto bg-[#070B14] rounded-3xl border-2 border-emerald-500/30 p-2 shadow-2xl shadow-emerald-950/50">
              {/* Phone Frame */}
              <div className="bg-[#0b141a] rounded-[22px] overflow-hidden flex flex-col h-[520px]">
                {/* Chat Top Bar */}
                <div className="bg-[#1f2c34] p-3 flex items-center justify-between text-white border-b border-white/5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center font-bold text-xs text-black">
                      GL
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-xs text-white">
                        GrowthLeap AI Assistant
                      </h4>
                      <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Verified Business Agent
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 bg-black/40 px-2 py-0.5 rounded">
                    +91 97614 40027
                  </span>
                </div>

                {/* Scenario Toggle */}
                <div className="grid grid-cols-3 bg-[#111b21] p-1.5 text-[10px] font-mono border-b border-white/5">
                  <button
                    onClick={() => setActiveTab('buyer')}
                    className={`py-1 rounded text-center transition-colors cursor-pointer ${
                      activeTab === 'buyer' ? 'bg-[#1f2c34] text-emerald-300 font-bold' : 'text-slate-400'
                    }`}
                  >
                    Buyer RFQ
                  </button>
                  <button
                    onClick={() => setActiveTab('tracking')}
                    className={`py-1 rounded text-center transition-colors cursor-pointer ${
                      activeTab === 'tracking' ? 'bg-[#1f2c34] text-emerald-300 font-bold' : 'text-slate-400'
                    }`}
                  >
                    Tracking
                  </button>
                  <button
                    onClick={() => setActiveTab('support')}
                    className={`py-1 rounded text-center transition-colors cursor-pointer ${
                      activeTab === 'support' ? 'bg-[#1f2c34] text-emerald-300 font-bold' : 'text-slate-400'
                    }`}
                  >
                    Catalog Share
                  </button>
                </div>

                {/* Chat Stream */}
                <div className="flex-1 p-3.5 space-y-3 overflow-y-auto text-xs bg-[#0b141a]">
                  {activeTab === 'buyer' && (
                    <>
                      {/* Incoming Customer */}
                      <div className="bg-[#202c33] text-white p-2.5 rounded-xl rounded-tl-none max-w-[85%] space-y-1">
                        <p>Hello, we need 5,000 units of Part #GL-420 for export to Dubai next month. Can you share FOB rates?</p>
                        <span className="text-[9px] text-slate-400 block text-right">10:42 AM</span>
                      </div>

                      {/* AI Agent Response */}
                      <div className="bg-[#005c4b] text-white p-2.5 rounded-xl rounded-tr-none ml-auto max-w-[85%] space-y-1.5">
                        <div className="flex items-center gap-1 text-[10px] text-emerald-200 font-mono">
                          <Bot className="w-3 h-3" /> GrowthLeap Agent
                        </div>
                        <p>Hi! FOB benchmark for #GL-420 (5k qty) is $14.20/unit with 18-day lead time. I have prepared your tailored spec sheet.</p>
                        <div className="p-2 bg-black/20 rounded border border-white/10 text-[11px] flex items-center justify-between">
                          <span>📄 Quotation_GL420_Dubai.pdf</span>
                          <span className="text-emerald-300 font-bold">142 KB</span>
                        </div>
                        <span className="text-[9px] text-emerald-200 block text-right">10:42 AM · Sent</span>
                      </div>

                      {/* System Action Log */}
                      <div className="text-[10px] text-center text-slate-400 font-mono bg-white/5 py-1 px-2 rounded-md">
                        ✓ Inbound Lead logged in Zoho CRM · Sales rep notified via SMS
                      </div>
                    </>
                  )}

                  {activeTab === 'tracking' && (
                    <>
                      <div className="bg-[#202c33] text-white p-2.5 rounded-xl rounded-tl-none max-w-[85%] space-y-1">
                        <p>Can you tell me the container location for BL #EXP-99214 to Hamburg?</p>
                        <span className="text-[9px] text-slate-400 block text-right">11:15 AM</span>
                      </div>

                      <div className="bg-[#005c4b] text-white p-2.5 rounded-xl rounded-tr-none ml-auto max-w-[85%] space-y-1.5">
                        <div className="flex items-center gap-1 text-[10px] text-emerald-200 font-mono">
                          <Bot className="w-3 h-3" /> Live Logistics Query
                        </div>
                        <p>Container MSKU8291410 departed Nhava Sheva (INNSA) on Sep 28. Current ETA Hamburg: Oct 18. Port clearance docs verified.</p>
                        <span className="text-[9px] text-emerald-200 block text-right">11:15 AM · Instant lookup</span>
                      </div>
                    </>
                  )}

                  {activeTab === 'support' && (
                    <>
                      <div className="bg-[#202c33] text-white p-2.5 rounded-xl rounded-tl-none max-w-[85%] space-y-1">
                        <p>Do you have food-grade packaging material compliance certificates?</p>
                        <span className="text-[9px] text-slate-400 block text-right">02:10 PM</span>
                      </div>

                      <div className="bg-[#005c4b] text-white p-2.5 rounded-xl rounded-tr-none ml-auto max-w-[85%] space-y-1.5">
                        <div className="flex items-center gap-1 text-[10px] text-emerald-200 font-mono">
                          <Bot className="w-3 h-3" /> Knowledge Engine
                        </div>
                        <p>Yes. All materials comply with US FDA 21 CFR and EU Regulation 10/2011. Here is our certified laboratory test report:</p>
                        <div className="p-2 bg-black/20 rounded border border-white/10 text-[11px] flex items-center justify-between">
                          <span>📑 FDA_EU_Compliance_2026.pdf</span>
                          <span className="text-emerald-300 font-bold">Download</span>
                        </div>
                        <span className="text-[9px] text-emerald-200 block text-right">02:10 PM</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Mockup Chat Input */}
                <div className="p-2.5 bg-[#202c33] border-t border-white/5 flex items-center gap-2">
                  <input
                    type="text"
                    disabled
                    value="Try live demo: WhatsApp +91 97614 40027"
                    className="flex-1 bg-[#2a3942] text-slate-300 px-3 py-1.5 rounded-lg text-xs outline-none"
                  />
                  <div className="w-8 h-8 rounded-full bg-[#00a884] flex items-center justify-center text-white shrink-0">
                    <Send className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
