import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Database,
  Users,
  TrendingUp,
  AlertTriangle,
  Zap,
} from 'lucide-react';
import { SiteSettings } from '../types';

interface HeroProps {
  onOpenAudit: () => void;
  onOpenBooking: () => void;
  onExploreSolutions: () => void;
  settings: SiteSettings;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenAudit,
  onOpenBooking,
  onExploreSolutions,
  settings,
}) => {
  const [pulseActive, setPulseActive] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseActive((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#070B14] py-16 lg:py-24 border-b border-white/10 bg-grid-pattern">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-96 h-96 bg-[#005A9C]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#2E8540]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Core Brand Messaging */}
          <div className="lg:col-span-6 space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-cyan-500/30 text-[#00F0FF] text-xs font-mono font-semibold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
              <span>AI BUSINESS AUTOMATION</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-heading font-extrabold text-white tracking-tight leading-[1.12] text-balance">
              Automate Your Business.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#38bdf8] to-[#005A9C]">
                Accelerate Your Growth.
              </span>
            </h1>

            {/* Supporting Message */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-xl">
              GrowthLeap AI helps MSMEs, exporters and importers automate repetitive processes, connect business systems and use AI to improve productivity and customer response.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={onOpenAudit}
                className="cta-button py-3.5 px-6 bg-[#2E8540] hover:bg-[#246B33] active:scale-[0.98] text-white font-heading font-bold text-sm rounded-xl shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>Get Your AI Business Audit</span>
              </button>

              <button
                onClick={onExploreSolutions}
                className="py-3.5 px-6 bg-white/5 hover:bg-white/10 text-white font-heading font-semibold text-sm rounded-xl border border-white/15 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore AI Solutions</span>
                <ArrowRight className="w-4 h-4 text-cyan-400" />
              </button>
            </div>

            {/* Micro-CTA required on Homepage directly below hero CTA button */}
            <p style={{ textAlign: 'center', marginTop: '10px' }} className="text-xs text-slate-300">
              or,{' '}
              <a
                href="#how-it-works"
                style={{ color: '#005A9C', textDecoration: 'underline' }}
                className="font-semibold hover:text-cyan-400 transition-colors"
              >
                see how it works first
              </a>
            </p>

            {/* Trust Statement */}
            <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-cyan-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                Identify your highest-value automation opportunities.
              </span>

              <a
                href={`https://wa.me/919761440027?text=${encodeURIComponent(
                  'Hi Sonendra / GrowthLeap AI, I would like to know more about automating my business.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 underline font-semibold"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Talk on WhatsApp (9761440027)</span>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Transformation (Complex/Messy Left -> Streamlined/Simple Right) */}
          <div className="lg:col-span-6">
            <div className="relative bg-[#0D1527]/95 rounded-2xl border border-white/15 p-5 sm:p-6 shadow-2xl backdrop-blur-xl">
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#2E8540] animate-pulse" />
                  <span className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
                    Operational Transformation
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#00F0FF] bg-cyan-950/80 border border-cyan-500/40 px-2 py-0.5 rounded font-semibold">
                  BEFORE vs. AFTER
                </span>
              </div>

              {/* Transformation Visual Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
                {/* LEFT: Complex / Messy State (Before) */}
                <div className="bg-[#121929]/90 border border-red-500/25 rounded-xl p-4 space-y-3 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800/40">
                      BEFORE: Complex & Messy
                    </span>
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                  </div>

                  <h3 className="text-sm font-heading font-bold text-white leading-tight">
                    Fragmented Chores & Overhead
                  </h3>

                  <div className="space-y-2 text-[11px] text-slate-300">
                    <div className="p-2 rounded bg-black/40 border border-white/5 flex items-start gap-1.5">
                      <span className="text-rose-400 font-bold">✕</span>
                      <span>4+ hrs daily typing invoices & POs into Tally</span>
                    </div>

                    <div className="p-2 rounded bg-black/40 border border-white/5 flex items-start gap-1.5">
                      <span className="text-rose-400 font-bold">✕</span>
                      <span>Dropped WhatsApp RFQs & delayed buyer follow-ups</span>
                    </div>

                    <div className="p-2 rounded bg-black/40 border border-white/5 flex items-start gap-1.5">
                      <span className="text-rose-400 font-bold">✕</span>
                      <span>Customs clerical errors & port demurrage penalties</span>
                    </div>

                    <div className="p-2 rounded bg-black/40 border border-white/5 flex items-start gap-1.5">
                      <span className="text-rose-400 font-bold">✕</span>
                      <span>Constant evening calls asking "Where is my container?"</span>
                    </div>
                  </div>
                </div>

                {/* RIGHT: Simple / Streamlined State (After) */}
                <div className="bg-gradient-to-br from-[#0C1E1B] to-[#0A1A2E] border border-emerald-500/40 rounded-xl p-4 space-y-3 relative overflow-hidden shadow-lg shadow-emerald-950/30">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/50">
                      AFTER: Simple & Streamlined
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </div>

                  <h3 className="text-sm font-heading font-bold text-white leading-tight flex items-center gap-1.5">
                    <span>Autonomous AI Workflows</span>
                    <Zap className="w-3.5 h-3.5 text-cyan-400 fill-current" />
                  </h3>

                  <div className="space-y-2 text-[11px] text-slate-200">
                    <div className="p-2 rounded bg-[#07131B] border border-emerald-500/30 flex items-start gap-1.5">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>15-sec optical OCR & 2-way instant Tally ERP sync</span>
                    </div>

                    <div className="p-2 rounded bg-[#07131B] border border-emerald-500/30 flex items-start gap-1.5">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>45-sec AI WhatsApp lead qualification & auto-routing</span>
                    </div>

                    <div className="p-2 rounded bg-[#07131B] border border-emerald-500/30 flex items-start gap-1.5">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>99.8% accurate customs shipping bills & zero fines</span>
                    </div>

                    <div className="p-2 rounded bg-[#07131B] border border-emerald-500/30 flex items-start gap-1.5">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>Automated 24/7 client dispatch tracking via WhatsApp</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transformation Conduit Footer */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#005A9C]" />
                  <span className="text-slate-400 text-[11px]">Blue/Green Architecture:</span>
                  <span className="font-mono text-[#2E8540] font-bold text-[11px]">
                    15–20 Hours Reclaimed / Week
                  </span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400 font-semibold">
                  Zero Code Changes
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
