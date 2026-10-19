import React from 'react';
import { Sparkles, MessageCircle, Phone, ArrowRight, ShieldCheck, Calendar } from 'lucide-react';
import { SiteSettings } from '../types';

interface FinalCTASectionProps {
  onOpenAudit: () => void;
  onOpenBooking: () => void;
  settings: SiteSettings;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({
  onOpenAudit,
  onOpenBooking,
  settings,
}) => {
  return (
    <section className="bg-gradient-to-b from-[#070B14] via-[#0D1527] to-[#050811] py-20 lg:py-28 relative overflow-hidden border-b border-white/10 bg-grid-pattern">
      {/* Background glow & mesh */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-blue-600/15 via-cyan-500/15 to-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" />
          <span>Transform Repetitive Work Into Scalable Systems</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight leading-[1.12]">
          Ready to Find Your{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-sky-300 to-[#0066FF]">
            Automation Opportunities?
          </span>
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Let's identify the repetitive work slowing your business down and design an automation roadmap around your actual processes.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenAudit}
            className="cta-button w-full sm:w-auto py-4 px-8 bg-[#2E8540] hover:bg-[#246B33] active:scale-[0.98] text-white font-heading font-bold text-sm rounded-xl shadow-xl shadow-emerald-950/40 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>Get Your AI Business Audit</span>
          </button>

          <a
            href={`https://wa.me/919761440027?text=${encodeURIComponent(
              'Hi Sonendra / GrowthLeap AI, I am ready to explore automation opportunities for our business.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto py-4 px-7 bg-[#25D366] hover:bg-[#20ba5a] text-[#070B14] font-heading font-bold text-sm rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Talk on WhatsApp (9761440027)</span>
          </a>

          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto py-4 px-6 bg-white/10 hover:bg-white/15 text-white font-heading font-semibold text-xs rounded-xl border border-white/15 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span>Book Consultation</span>
          </button>
        </div>

        <div className="pt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            100% Confidential
          </span>
          <span>·</span>
          <span>Zero Software Replacement</span>
          <span>·</span>
          <span>Payback in 30–60 Days</span>
        </div>
      </div>
    </section>
  );
};
