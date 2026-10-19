import React, { useState } from 'react';
import { USE_CASES } from '../data/siteData';
import { UseCaseItem } from '../types';
import { ArrowRight, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

interface UseCasesSectionProps {
  onOpenBooking: () => void;
}

export const UseCasesSection: React.FC<UseCasesSectionProps> = ({ onOpenBooking }) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const categories = [
    'All',
    'Sales',
    'Marketing',
    'Customer Support',
    'Export',
    'Import',
    'MSME',
    'CRM',
    'WhatsApp',
    'Documents',
    'Reporting',
  ];

  const filtered =
    activeFilter === 'All'
      ? USE_CASES
      : USE_CASES.filter((u) => u.category === activeFilter);

  return (
    <section id="use-cases" className="bg-[#070B14] py-16 lg:py-20 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold tracking-wider text-cyan-400 uppercase">
            <span>Practical Transformation Matrix</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
            Proven AI Automation Use Cases.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            Explore how specific manual bottlenecks convert into autonomous digital systems.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-heading font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeFilter === cat
                  ? 'bg-gradient-to-r from-[#00F0FF] to-[#0066FF] text-[#070B14] shadow-sm shadow-cyan-500/20'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((uc) => (
            <div
              key={uc.id}
              className="bg-[#0D1527] border border-white/10 rounded-2xl p-6 space-y-4 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-bold text-base text-white">
                    {uc.title}
                  </h3>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded">
                    {uc.category}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl space-y-1">
                    <span className="font-mono text-[10px] text-rose-400 font-bold uppercase tracking-wider block">
                      The Operational Problem & Manual Pain:
                    </span>
                    <p className="text-slate-300">{uc.problem}</p>
                    <p className="text-slate-400 italic">Manual: {uc.manualProcess}</p>
                  </div>

                  <div className="p-3 bg-cyan-950/40 border border-cyan-500/30 rounded-xl space-y-1">
                    <span className="font-mono text-[10px] text-cyan-300 font-bold uppercase tracking-wider block">
                      GrowthLeap AI Engineered Solution:
                    </span>
                    <p className="text-slate-200">{uc.aiSolution}</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Outcome: {uc.businessResult}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
