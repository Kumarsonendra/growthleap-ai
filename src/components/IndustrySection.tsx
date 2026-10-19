import React from 'react';
import {
  Ship,
  Globe2,
  Building2,
  Factory,
  ArrowRight,
  CheckCircle2,
  Share2,
} from 'lucide-react';
import { INDUSTRY_CARDS } from '../data/siteData';

interface IndustrySectionProps {
  onOpenBooking: () => void;
  onOpenAudit: () => void;
}

export const IndustrySection: React.FC<IndustrySectionProps> = ({
  onOpenBooking,
  onOpenAudit,
}) => {
  const getVisual = (type: string) => {
    switch (type) {
      case 'export':
        return (
          <div className="relative w-full h-36 bg-gradient-to-br from-blue-950/80 to-[#070B14] rounded-xl border border-cyan-500/20 p-4 flex items-center justify-between overflow-hidden">
            <div className="space-y-1 z-10">
              <span className="text-[10px] font-mono text-cyan-400">GLOBAL TRADE GATEWAY</span>
              <p className="text-xs font-bold text-white">Cross-Border Export Pipeline</p>
              <div className="flex gap-2 text-[10px] text-slate-300">
                <span className="bg-white/10 px-1.5 py-0.5 rounded">ICEGATE EDI</span>
                <span className="bg-white/10 px-1.5 py-0.5 rounded">HS Codes</span>
              </div>
            </div>
            <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <Ship className="w-8 h-8" />
            </div>
          </div>
        );
      case 'import':
        return (
          <div className="relative w-full h-36 bg-gradient-to-br from-emerald-950/80 to-[#070B14] rounded-xl border border-emerald-500/20 p-4 flex items-center justify-between overflow-hidden">
            <div className="space-y-1 z-10">
              <span className="text-[10px] font-mono text-emerald-400">SUPPLY CHAIN SYNCHRONIZER</span>
              <p className="text-xs font-bold text-white">Overseas Vendor & RFQ Hub</p>
              <div className="flex gap-2 text-[10px] text-slate-300">
                <span className="bg-white/10 px-1.5 py-0.5 rounded">Bill of Entry</span>
                <span className="bg-white/10 px-1.5 py-0.5 rounded">Duty Calc</span>
              </div>
            </div>
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Globe2 className="w-8 h-8" />
            </div>
          </div>
        );
      case 'msme':
        return (
          <div className="relative w-full h-36 bg-gradient-to-br from-purple-950/80 to-[#070B14] rounded-xl border border-purple-500/20 p-4 flex items-center justify-between overflow-hidden">
            <div className="space-y-1 z-10">
              <span className="text-[10px] font-mono text-purple-300">LEAN TEAM MULTIPLIER</span>
              <p className="text-xs font-bold text-white">Back-Office Autonomous Stack</p>
              <div className="flex gap-2 text-[10px] text-slate-300">
                <span className="bg-white/10 px-1.5 py-0.5 rounded">Tally Prime</span>
                <span className="bg-white/10 px-1.5 py-0.5 rounded">WhatsApp API</span>
              </div>
            </div>
            <div className="w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0">
              <Building2 className="w-8 h-8" />
            </div>
          </div>
        );
      case 'manufacturing':
        return (
          <div className="relative w-full h-36 bg-gradient-to-br from-amber-950/80 to-[#070B14] rounded-xl border border-amber-500/20 p-4 flex items-center justify-between overflow-hidden">
            <div className="space-y-1 z-10">
              <span className="text-[10px] font-mono text-amber-400">SHOPFLOOR TO BOARDROOM</span>
              <p className="text-xs font-bold text-white">Production Order Execution</p>
              <div className="flex gap-2 text-[10px] text-slate-300">
                <span className="bg-white/10 px-1.5 py-0.5 rounded">Job Cards</span>
                <span className="bg-white/10 px-1.5 py-0.5 rounded">E-Way Bills</span>
              </div>
            </div>
            <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Factory className="w-8 h-8" />
            </div>
          </div>
        );
      case 'trading':
      default:
        return (
          <div className="relative w-full h-36 bg-gradient-to-br from-cyan-950/80 to-[#070B14] rounded-xl border border-cyan-500/20 p-4 flex items-center justify-between overflow-hidden">
            <div className="space-y-1 z-10">
              <span className="text-[10px] font-mono text-cyan-300">HIGH-VELOCITY TRADE</span>
              <p className="text-xs font-bold text-white">Instant Margin & Quote Engine</p>
              <div className="flex gap-2 text-[10px] text-slate-300">
                <span className="bg-white/10 px-1.5 py-0.5 rounded">Proforma Sync</span>
                <span className="bg-white/10 px-1.5 py-0.5 rounded">IndiaMART API</span>
              </div>
            </div>
            <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-300 shrink-0">
              <Share2 className="w-8 h-8" />
            </div>
          </div>
        );
    }
  };

  return (
    <section id="industries" className="bg-[#0A0F1D] py-16 lg:py-20 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold tracking-wider text-cyan-400 uppercase">
            <span>Specialized Domain Workflows</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
            AI Automation Built Around Your Business.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            Tailored pipelines designed specifically for the real-world operational challenges of Indian and international trade.
          </p>
        </div>

        {/* 5 Industry Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INDUSTRY_CARDS.map((ind) => (
            <div
              key={ind.id}
              className="bg-[#0D1527] border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/5 transition-all group"
            >
              <div className="space-y-4">
                {/* Visual Graphic Header */}
                {getVisual(ind.visualType)}

                <div>
                  <h3 className="font-heading font-extrabold text-xl text-white group-hover:text-cyan-300 transition-colors">
                    {ind.name}
                  </h3>
                  <p className="text-xs text-cyan-300 font-medium mt-1">
                    {ind.tagline}
                  </p>
                </div>

                <div className="space-y-2 pt-1">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block font-bold">
                    Specialized Automation Workflows:
                  </span>
                  <div className="space-y-1.5">
                    {ind.solutions.map((sol, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300 leading-snug">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{sol}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-white/5 flex gap-2">
                <button
                  onClick={onOpenBooking}
                  className="w-full py-2.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400 text-white font-heading font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>{ind.ctaLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                </button>
              </div>
            </div>
          ))}

          {/* 6th Card: Cross-Industry Custom Engine */}
          <div className="bg-gradient-to-br from-[#0D1527] via-blue-950/40 to-[#070B14] border border-cyan-500/30 rounded-2xl p-6 flex flex-col justify-between shadow-lg">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00F0FF] to-[#0066FF] text-[#070B14] flex items-center justify-center font-heading font-black text-lg">
                360°
              </div>
              <h3 className="font-heading font-extrabold text-xl text-white">
                CUSTOM INDUSTRIAL AUTOMATION
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Operating a specialized trading desk, multi-plant engineering operation, or third-party logistics firm?
              </p>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs text-slate-400 space-y-1">
                <p>✓ Custom API & database connectors</p>
                <p>✓ WhatsApp & ERP bi-directional sync</p>
                <p>✓ Fixed ROI deployment guarantee</p>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-white/5">
              <button
                onClick={onOpenAudit}
                className="w-full py-2.5 px-4 bg-gradient-to-r from-[#00F0FF] to-[#0066FF] text-[#070B14] font-heading font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Custom Industry Audit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
