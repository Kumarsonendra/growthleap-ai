import React from 'react';
import { AUTOMATION_SCENARIOS } from '../data/siteData';
import { ShieldCheck, ArrowRight, Layers, Cpu, Calendar } from 'lucide-react';

interface ScenariosSectionProps {
  onOpenBooking: () => void;
}

export const ScenariosSection: React.FC<ScenariosSectionProps> = ({ onOpenBooking }) => {
  return (
    <section className="bg-[#0A0F1D] py-16 lg:py-20 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold tracking-wider text-amber-400 uppercase">
            <span>Engineering Architecture Models</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
            Automation Scenarios & Reference Implementations.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            *Transparent Note: The following are illustrative reference scenarios demonstrating how our AI architecture solves specific trade bottlenecks without fabricated claims.
          </p>
        </div>

        {/* Scenarios Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {AUTOMATION_SCENARIOS.map((sc) => (
            <div
              key={sc.id}
              className="bg-[#0D1527] border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-cyan-500/40 transition-all space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-amber-300 bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded">
                    HYPOTHETICAL SCENARIO
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    {sc.industry}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-base text-white">
                  {sc.clientType}
                </h3>

                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-0.5">
                    <strong className="text-slate-300 block text-[10px] uppercase font-mono">
                      Challenge:
                    </strong>
                    <p className="text-slate-400">{sc.challenge}</p>
                  </div>

                  <div className="p-3 bg-cyan-950/30 rounded-xl border border-cyan-500/20 space-y-0.5">
                    <strong className="text-cyan-300 block text-[10px] uppercase font-mono">
                      Engineered Solution:
                    </strong>
                    <p className="text-slate-300">{sc.solution}</p>
                  </div>
                </div>

                {/* Tech Stack */}
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-1.5">
                    Integrated Stack:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {sc.technology.map((t, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono text-slate-300 bg-white/5 px-2 py-0.5 rounded border border-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 space-y-3">
                <div className="text-xs text-emerald-300 font-medium">
                  <strong>Expected Impact:</strong> {sc.measuredResult}
                </div>

                <button
                  onClick={onOpenBooking}
                  className="w-full py-2 px-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-heading font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Discuss Similar Implementation</span>
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
