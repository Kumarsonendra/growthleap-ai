import React from 'react';
import { PROCESS_PIPELINE } from '../data/siteData';
import { ArrowRight, CheckCircle2, ShieldCheck, Calendar } from 'lucide-react';

interface HowItWorksSectionProps {
  onOpenBooking: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="how-it-works" className="bg-[#0A0F1D] py-16 lg:py-20 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold tracking-wider text-cyan-400 uppercase">
            <span>Engineering Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
            Our 6-Stage Connected Digital Pipeline.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            From initial operational discovery to live autonomous execution with zero business disruption.
          </p>
        </div>

        {/* Pipeline Grid (Horizontal Flow) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5 relative">
          {PROCESS_PIPELINE.map((stage, idx) => (
            <div
              key={stage.step}
              className="bg-[#0D1527] border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:border-cyan-500/40 hover:shadow-lg transition-all relative group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono font-bold text-xs flex items-center justify-center">
                    {stage.step}
                  </span>
                  {idx < 5 && (
                    <span className="hidden xl:block text-slate-600 font-mono text-xs">
                      →
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-heading font-bold text-base text-white group-hover:text-cyan-300 transition-colors">
                    {stage.name}
                  </h3>
                  <p className="text-[11px] font-semibold text-cyan-400 mt-0.5">
                    {stage.headline}
                  </p>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {stage.description}
                  </p>
                </div>
              </div>

              <div className="pt-3 mt-4 border-t border-white/5 text-[10px] font-mono text-slate-500">
                Phase 0{idx + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Reassurance Banner */}
        <div className="mt-12 bg-[#0D1527] border border-cyan-500/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-heading font-bold text-base text-white">
              Zero Operational Disruption Guarantee
            </h4>
            <p className="text-xs text-slate-400 max-w-xl">
              We construct and test workflows in a sandbox. Your daily shipments, accounting, and factory operations continue without interruption.
            </p>
          </div>

          <button
            onClick={onOpenBooking}
            className="py-3 px-6 bg-gradient-to-r from-[#00F0FF] to-[#0066FF] text-[#070B14] font-heading font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Calendar className="w-4 h-4 text-[#070B14]" />
            <span>Start with Phase 01: Discover</span>
          </button>
        </div>
      </div>
    </section>
  );
};
